import { createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  authRedirectUrl,
  createResumableSession,
  deleteDriveFile,
  exchangeCode,
  forwardChunk,
  getAccessToken,
  queryUpload,
  readDriveFile,
  readFileHead,
} from "./drive.mjs";
import { allowedUploadUrl, clientAddress, hitLimit } from "./net.mjs";
import { proofMatchesUpload, readProof, signProof } from "./proof.mjs";
import { loadRefreshToken, saveRefreshToken } from "./store.mjs";
import { expectedMime, matchesSignature, safeFileName } from "./validate.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
loadEnv(join(root, ".env"));
loadEnv(join(root, "server", ".env"));

const CHUNK_LIMIT = 8 * 1024 * 1024;
const TEN_MINUTES = 10 * 60 * 1000;

const config = {
  port: Number(process.env.PORT || process.env.API_PORT || 8787),
  host: process.env.API_HOST || "0.0.0.0",
  publicOrigin: process.env.PUBLIC_ORIGIN || "https://klikdovencanja.rs",
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  redirectUri:
    process.env.GOOGLE_REDIRECT_URI || "http://127.0.0.1:8787/api/memories/oauth/callback",
  folderId: process.env.GOOGLE_DRIVE_FOLDER_ID || "",
  scope: process.env.GOOGLE_DRIVE_SCOPE || "https://www.googleapis.com/auth/drive",
  setupSecret: process.env.OWNER_SETUP_SECRET || "",
  maxFileBytes: Number(process.env.MAX_FILE_BYTES || 5 * 1024 * 1024 * 1024),
  maxFiles: Number(process.env.MAX_FILES_PER_BATCH || 40),
  trustProxy: process.env.TRUST_PROXY === "1",
  proxyHops: Number(process.env.TRUST_PROXY_HOPS || 1),
};

function loadEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function proofSecret() {
  return process.env.PROOF_SECRET || config.setupSecret;
}

function ready() {
  return Boolean(
    loadRefreshToken() && config.folderId && config.clientId && config.clientSecret && proofSecret(),
  );
}

function guestKey(request) {
  const value = request.headers["x-guest-key"];
  return typeof value === "string" && /^[0-9a-f-]{36}$/i.test(value) ? value.toLowerCase() : "";
}

function address(request) {
  return clientAddress(request, { trustProxy: config.trustProxy, hops: config.proxyHops });
}

function tooMany(request, action) {
  const ip = address(request);
  const guest = guestKey(request) || `anon:${ip}`;
  const limits = {
    session: [80, 600, 500],
    confirm: [160, 1200, 800],
    relay: [4000, 20000, 4000],
  };
  const [guestLimit, ipLimit, globalLimit] = limits[action] || limits.confirm;
  return (
    hitLimit(`guest:${guest}:${action}`, guestLimit, TEN_MINUTES) ||
    hitLimit(`ip:${ip}:${action}`, ipLimit, TEN_MINUTES) ||
    hitLimit(`all:${action}`, globalLimit, 60 * 1000)
  );
}

function allowedOrigin(origin) {
  if (!origin) return false;
  if (origin === config.publicOrigin) return true;
  const extra = (process.env.PUBLIC_ORIGINS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  if (extra.includes(origin)) return true;
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function send(response, status, payload, origin) {
  const body = JSON.stringify(payload);
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Content-Length": Buffer.byteLength(body),
    "Referrer-Policy": "no-referrer",
  };
  if (origin && allowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers.Vary = "Origin";
  }
  response.writeHead(status, headers);
  response.end(body);
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 32_768) {
        reject(new Error("invalid"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
      } catch {
        reject(new Error("invalid"));
      }
    });
    request.on("error", () => reject(new Error("network")));
  });
}

function readChunk(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > CHUNK_LIMIT) {
        reject(new Error("too_large"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", () => reject(new Error("network")));
  });
}

function signState() {
  const payload = Buffer.from(
    JSON.stringify({ t: Date.now(), n: randomBytes(8).toString("hex") }),
  ).toString("base64url");
  const mac = createHmac("sha256", config.setupSecret).update(payload).digest("base64url");
  return `${payload}.${mac}`;
}

function validState(state) {
  if (!config.setupSecret || typeof state !== "string" || !state.includes(".")) return false;
  const dot = state.indexOf(".");
  const payload = state.slice(0, dot);
  const mac = state.slice(dot + 1);
  const expected = createHmac("sha256", config.setupSecret).update(payload).digest("base64url");
  const left = Buffer.from(mac);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return Date.now() - Number(data.t) < 10 * 60 * 1000;
  } catch {
    return false;
  }
}

function secretMatches(given) {
  if (!config.setupSecret || typeof given !== "string") return false;
  const left = Buffer.from(given);
  const right = Buffer.from(config.setupSecret);
  return left.length === right.length && timingSafeEqual(left, right);
}

function driveAuth() {
  return {
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    refreshToken: loadRefreshToken(),
  };
}

function headerValue(request, name) {
  const value = request.headers[name];
  return typeof value === "string" ? value : "";
}

function originOf(request) {
  return typeof request.headers.origin === "string" ? request.headers.origin : "";
}

function rejectOrigin(origin) {
  return Boolean(origin) && !allowedOrigin(origin);
}

async function handleSession(request, response, origin) {
  if (tooMany(request, "session")) {
    send(response, 429, { error: "rate" }, origin);
    return;
  }
  if (!ready()) {
    send(response, 503, { error: "unavailable" }, origin);
    return;
  }
  const body = await readJson(request);
  if (body.company) {
    send(response, 400, { error: "invalid" }, origin);
    return;
  }
  const size = Number(body.size);
  const mime = expectedMime(body.name, String(body.mime || ""));
  if (!mime || !Number.isInteger(size) || size <= 0 || size > config.maxFileBytes) {
    send(response, 400, { error: size > config.maxFileBytes ? "too_large" : "invalid" }, origin);
    return;
  }
  const id = randomUUID();
  const driveName = `${new Date().toISOString().replace(/[:.]/g, "-")}_${id.slice(0, 8)}_${safeFileName(body.name)}`;
  const token = await getAccessToken(driveAuth());
  const uploadUrl = await createResumableSession({
    accessToken: token,
    folderId: config.folderId,
    name: driveName,
    mime,
    size,
    origin: origin || config.publicOrigin,
    sessionId: id,
  });
  const proof = signProof(proofSecret(), { id, size, mime, uploadUrl });
  send(response, 201, { id, uploadUrl, proof }, origin);
}

async function handleConfirm(request, response, origin) {
  if (tooMany(request, "confirm")) {
    send(response, 429, { error: "rate" }, origin);
    return;
  }
  const body = await readJson(request);
  const proof = readProof(proofSecret(), body.proof);
  if (proof?.expired) {
    send(response, 409, { error: "expired" }, origin);
    return;
  }
  if (!proof) {
    send(response, 400, { error: "rejected" }, origin);
    return;
  }
  const driveFileId = String(body.driveFileId || "");
  if (!/^[a-zA-Z0-9_-]{10,}$/.test(driveFileId)) {
    send(response, 400, { error: "rejected" }, origin);
    return;
  }
  const token = await getAccessToken(driveAuth());
  const file = await readDriveFile({ accessToken: token, fileId: driveFileId });
  const belongs =
    file &&
    !file.trashed &&
    file.appProperties?.sessionId === proof.id &&
    Array.isArray(file.parents) &&
    file.parents.includes(config.folderId) &&
    Number(file.size) === proof.size;
  if (!belongs) {
    send(response, 400, { error: "rejected" }, origin);
    return;
  }
  const head = await readFileHead({ accessToken: token, fileId: driveFileId });
  if (!head || !matchesSignature(head, proof.mime)) {
    if (head && file.appProperties?.sessionId === proof.id) {
      await deleteDriveFile({ accessToken: token, fileId: driveFileId });
    }
    send(response, 400, { error: "rejected" }, origin);
    return;
  }
  send(response, 200, { ok: true }, origin);
}

async function handleResume(request, response, origin) {
  if (tooMany(request, "relay")) {
    send(response, 429, { error: "rate" }, origin);
    return;
  }
  const body = await readJson(request);
  const proof = readProof(proofSecret(), body.proof);
  if (proof?.expired) {
    send(response, 409, { error: "expired" }, origin);
    return;
  }
  if (!proof || !allowedUploadUrl(body.uploadUrl) || !proofMatchesUpload(proof, body.uploadUrl)) {
    send(response, 400, { error: "rejected" }, origin);
    return;
  }
  const result = await queryUpload(body.uploadUrl, proof.size);
  if (result.status === "expired") {
    send(response, 409, { error: "expired" }, origin);
    return;
  }
  if (result.status === "rejected") {
    send(response, 502, { error: "network" }, origin);
    return;
  }
  send(response, 200, result, origin);
}

async function handleRelay(request, response, origin) {
  if (tooMany(request, "relay")) {
    send(response, 429, { error: "rate" }, origin);
    return;
  }
  const proof = readProof(proofSecret(), headerValue(request, "x-proof"));
  const uploadUrl = headerValue(request, "x-upload-url");
  const contentRange = headerValue(request, "content-range");
  const mime = headerValue(request, "x-mime");
  if (proof?.expired) {
    send(response, 409, { error: "expired" }, origin);
    return;
  }
  if (!proof || !uploadUrl || !allowedUploadUrl(uploadUrl) || !proofMatchesUpload(proof, uploadUrl)) {
    send(response, 400, { error: "rejected" }, origin);
    return;
  }
  if (typeof contentRange !== "string" || typeof mime !== "string" || mime !== proof.mime) {
    send(response, 400, { error: "invalid" }, origin);
    return;
  }
  const body = await readChunk(request);
  const match = /bytes (\d+)-(\d+)\/(\d+)/.exec(contentRange);
  if (!match || Number(match[3]) !== proof.size || Number(match[2]) - Number(match[1]) + 1 !== body.length) {
    send(response, 400, { error: "invalid" }, origin);
    return;
  }
  const result = await forwardChunk({ uploadUrl, mime, contentRange, body });
  if (result.status === "expired") {
    send(response, 409, { error: "expired" }, origin);
    return;
  }
  if (result.status === "rejected") {
    send(response, 502, { error: "network" }, origin);
    return;
  }
  send(response, 200, result, origin);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  const origin = originOf(request);

  if (request.method === "OPTIONS") {
    if (!allowedOrigin(origin)) {
      response.writeHead(403);
      response.end();
      return;
    }
    response.writeHead(204, {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Guest-Key, X-Proof, X-Upload-Url, X-Mime, Content-Range",
      "Access-Control-Max-Age": "600",
      Vary: "Origin",
    });
    response.end();
    return;
  }

  try {
    if (rejectOrigin(origin)) {
      send(response, 403, { error: "rejected" }, origin);
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/memories/status") {
      send(
        response,
        200,
        { ready: ready(), maxFileBytes: config.maxFileBytes, maxFiles: config.maxFiles },
        origin,
      );
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/memories/oauth/start") {
      if (!secretMatches(url.searchParams.get("setup") || "")) {
        send(response, 404, { error: "rejected" }, origin);
        return;
      }
      if (!config.clientId || !config.clientSecret || !config.setupSecret) {
        send(response, 503, { error: "unavailable" }, origin);
        return;
      }
      response.writeHead(302, {
        Location: authRedirectUrl({
          clientId: config.clientId,
          redirectUri: config.redirectUri,
          scope: config.scope,
          state: signState(),
        }),
      });
      response.end();
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/memories/oauth/callback") {
      if (!validState(url.searchParams.get("state") || "")) {
        response.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        response.end("<p>Povezivanje nije prihvaćeno.</p>");
        return;
      }
      const token = await exchangeCode({
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        redirectUri: config.redirectUri,
        code: url.searchParams.get("code") || "",
      });
      const where = process.env.GOOGLE_REFRESH_TOKEN ? "env" : saveRefreshToken(token);
      const message =
        where === "volume"
          ? "Google nalog je povezan. Ovaj prozor možete zatvoriti."
          : where === "env"
            ? "Nalog je već povezan promenljivom okruženja. Novi token nije upisan."
            : "Nalog je primljen samo u memoriji ovog procesa. Postavite DATA_DIR i TOKEN_ENCRYPTION_KEY, pa povežite nalog ponovo.";
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      response.end(`<p>${message}</p>`);
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/memories/sessions") {
      await handleSession(request, response, origin);
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/memories/confirm") {
      await handleConfirm(request, response, origin);
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/memories/resume") {
      await handleResume(request, response, origin);
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/memories/relay") {
      await handleRelay(request, response, origin);
      return;
    }

    send(response, 404, { error: "rejected" }, origin);
  } catch (error) {
    const code = error instanceof Error ? error.message : "error";
    console.error("memories_api_error", code);
    if (!response.headersSent) {
      send(response, code === "too_large" ? 413 : 500, { error: code === "invalid" ? "invalid" : "network" }, origin);
    }
  }
});

server.listen(config.port, config.host, () => {
  console.log(`memories api ${config.host}:${config.port} ready=${ready()} proxy=${config.trustProxy}`);
});
