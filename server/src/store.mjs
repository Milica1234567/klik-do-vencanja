import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

let memoryToken = "";

function encryptionKey(secret) {
  if (/^[0-9a-f]{64}$/i.test(secret)) return Buffer.from(secret, "hex");
  return scryptSync(secret, "klik-memories-token-v1", 32);
}

function tokenPath() {
  if (!process.env.DATA_DIR) return "";
  return join(process.env.DATA_DIR, "refresh-token.bin");
}

function encrypt(token, secret) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(secret), iv);
  const body = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, body]);
}

function decrypt(bytes, secret) {
  const iv = bytes.subarray(0, 12);
  const tag = bytes.subarray(12, 28);
  const body = bytes.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(secret), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(body), decipher.final()]).toString("utf8");
}

export function loadRefreshToken() {
  if (process.env.GOOGLE_REFRESH_TOKEN) return process.env.GOOGLE_REFRESH_TOKEN;
  const file = tokenPath();
  const secret = process.env.TOKEN_ENCRYPTION_KEY || "";
  if (file && secret && existsSync(file)) {
    try {
      return decrypt(readFileSync(file), secret);
    } catch {
      return "";
    }
  }
  return memoryToken;
}

export function saveRefreshToken(token) {
  const file = tokenPath();
  const secret = process.env.TOKEN_ENCRYPTION_KEY || "";
  if (file && secret) {
    mkdirSync(process.env.DATA_DIR, { recursive: true });
    writeFileSync(file, encrypt(token, secret), { mode: 0o600 });
    memoryToken = "";
    return "volume";
  }
  memoryToken = token;
  return "memory";
}
