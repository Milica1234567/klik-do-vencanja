export const DEFAULT_MAX_FILE_BYTES = 5 * 1024 * 1024 * 1024;
export const DEFAULT_MAX_FILES = 40;

const ALLOWED_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "heic",
  "heif",
  "mp4",
  "mov",
]);

export type MemoriesStatus = {
  ready: boolean;
  maxFileBytes: number;
  maxFiles: number;
};

export type UploadSession = {
  id: string;
  uploadUrl: string;
  proof: string;
};

const apiBase = (import.meta.env.VITE_MEMORIES_API_URL ?? "").replace(/\/$/, "");
const GUEST_KEY = "memories-guest-key";
const SAVED_KEY = "memories-pending-uploads";
const CHUNK_BYTES = 8 * 1024 * 1024;

function api(path: string) {
  return `${apiBase}${path}`;
}

function guestKey() {
  try {
    const existing = localStorage.getItem(GUEST_KEY);
    if (existing && /^[0-9a-f-]{36}$/i.test(existing)) return existing;
    const created = crypto.randomUUID();
    localStorage.setItem(GUEST_KEY, created);
    return created;
  } catch {
    return crypto.randomUUID();
  }
}

function apiHeaders(extra?: Record<string, string>) {
  return { "X-Guest-Key": guestKey(), ...extra };
}

export type SavedUpload = {
  key: string;
  id: string;
  uploadUrl: string;
  proof: string;
  size: number;
  mime: string;
};

function readSavedAll(): SavedUpload[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]") as SavedUpload[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSavedAll(entries: SavedUpload[]) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(entries));
  } catch {
    /* The upload can still finish in this tab. */
  }
}

export function fileIdentity(file: File) {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

export function hasSavedUploads() {
  return readSavedAll().length > 0;
}

function rememberUpload(entry: SavedUpload) {
  const rest = readSavedAll().filter((item) => item.key !== entry.key);
  writeSavedAll([...rest, entry]);
}

function forgetUpload(key: string) {
  writeSavedAll(readSavedAll().filter((item) => item.key !== key));
}

function savedUpload(key: string) {
  return readSavedAll().find((item) => item.key === key) ?? null;
}

export function fileExtension(name: string) {
  const match = /\.([a-z0-9]+)$/i.exec(name.trim());
  return match ? match[1].toLowerCase() : "";
}

export function isAllowedGuestFile(file: File) {
  return ALLOWED_EXTENSIONS.has(fileExtension(file.name));
}

function formatAmount(value: number) {
  if (value >= 10 || Math.abs(value - Math.round(value)) < 0.05) return String(Math.round(value));
  return value.toFixed(1);
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  if (bytes < 1024 * 1024 * 1024) {
    const mb = bytes / (1024 * 1024);
    return `${formatAmount(mb)} MB`;
  }
  return `${formatAmount(bytes / (1024 * 1024 * 1024))} GB`;
}

export async function fetchMemoriesStatus(): Promise<MemoriesStatus> {
  const response = await fetch(api("/api/memories/status"), { headers: apiHeaders() });
  if (!response.ok) throw new Error("status");
  const data = (await response.json()) as Partial<MemoriesStatus>;
  return {
    ready: Boolean(data.ready),
    maxFileBytes:
      typeof data.maxFileBytes === "number" ? data.maxFileBytes : DEFAULT_MAX_FILE_BYTES,
    maxFiles: typeof data.maxFiles === "number" ? data.maxFiles : DEFAULT_MAX_FILES,
  };
}

export async function createUploadSession(input: {
  name: string;
  size: number;
  mime: string;
  company: string;
}): Promise<UploadSession> {
  const response = await fetch(api("/api/memories/sessions"), {
    method: "POST",
    headers: apiHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(input),
  });
  const data = (await response.json().catch(() => ({}))) as {
    id?: string;
    uploadUrl?: string;
    proof?: string;
    error?: string;
  };
  if (!response.ok || !data.id || !data.uploadUrl || !data.proof) {
    throw new Error(data.error || "network");
  }
  return { id: data.id, uploadUrl: data.uploadUrl, proof: data.proof };
}

export async function confirmUpload(sessionId: string, driveFileId: string, proof: string) {
  const response = await fetch(api("/api/memories/confirm"), {
    method: "POST",
    headers: apiHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ driveFileId, proof, sessionId }),
  });
  const data = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) throw new Error(data.error || "rejected");
}

type ChunkResult =
  | { kind: "continue"; offset: number }
  | { kind: "done"; driveFileId: string };

function offsetFromRange(range: string | null, fallback: number) {
  const match = range ? /bytes=0-(\d+)/i.exec(range) : null;
  return match ? Number(match[1]) + 1 : fallback;
}

function putChunk(
  uploadUrl: string,
  body: Blob | null,
  mime: string,
  start: number,
  endInclusive: number,
  total: number,
  onLoaded: (loaded: number) => void,
) {
  return new Promise<ChunkResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", mime);
    xhr.setRequestHeader(
      "Content-Range",
      body ? `bytes ${start}-${endInclusive}/${total}` : `bytes */${total}`,
    );
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onLoaded(event.loaded);
    };
    xhr.onload = () => {
      if (xhr.status === 308) {
        const range = xhr.getResponseHeader("Range");
        if (body && !range) {
          reject(new Error("unconfirmed"));
          return;
        }
        resolve({
          kind: "continue",
          offset: offsetFromRange(range, 0),
        });
        return;
      }
      if (xhr.status === 404 || xhr.status === 410) {
        reject(new Error("expired"));
        return;
      }
      if (xhr.status === 200 || xhr.status === 201) {
        try {
          const payload = JSON.parse(xhr.responseText) as { id?: string };
          if (!payload.id) {
            reject(new Error("rejected"));
            return;
          }
          resolve({ kind: "done", driveFileId: payload.id });
        } catch {
          reject(new Error("rejected"));
        }
        return;
      }
      reject(new Error(xhr.status === 429 ? "rate" : "network"));
    };
    xhr.onerror = () => reject(new Error("network"));
    xhr.onabort = () => reject(new Error("network"));
    xhr.send(body);
  });
}

async function resumeOnServer(session: UploadSession) {
  const response = await fetch(api("/api/memories/resume"), {
    method: "POST",
    headers: apiHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ proof: session.proof, uploadUrl: session.uploadUrl }),
  });
  const data = (await response.json().catch(() => ({}))) as {
    status?: string;
    offset?: number;
    driveFileId?: string;
    error?: string;
  };
  if (!response.ok) throw new Error(data.error || "network");
  if (data.status === "done" && data.driveFileId) {
    return { kind: "done", driveFileId: data.driveFileId } as ChunkResult;
  }
  if (data.status === "continue" && typeof data.offset === "number") {
    return { kind: "continue", offset: data.offset } as ChunkResult;
  }
  throw new Error("network");
}

async function relayChunk(
  session: UploadSession,
  chunk: Blob,
  mime: string,
  start: number,
  endInclusive: number,
  total: number,
  onLoaded: (loaded: number) => void,
) {
  const buffer = await chunk.arrayBuffer();
  return new Promise<ChunkResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", api("/api/memories/relay"));
    const headers = apiHeaders({
      "Content-Type": "application/octet-stream",
      "Content-Range": `bytes ${start}-${endInclusive}/${total}`,
      "X-Proof": session.proof,
      "X-Upload-Url": session.uploadUrl,
      "X-Mime": mime,
    });
    for (const [name, value] of Object.entries(headers)) xhr.setRequestHeader(name, value);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onLoaded(event.loaded);
    };
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText || "{}") as {
        status?: string;
        offset?: number;
        driveFileId?: string;
        error?: string;
      };
      if (xhr.status === 409 || data.error === "expired") {
        reject(new Error("expired"));
        return;
      }
      if (data.status === "done" && data.driveFileId) {
        resolve({ kind: "done", driveFileId: data.driveFileId });
        return;
      }
      if (data.status === "continue" && typeof data.offset === "number") {
        resolve({ kind: "continue", offset: data.offset });
        return;
      }
      reject(new Error(data.error || "network"));
    };
    xhr.onerror = () => reject(new Error("network"));
    xhr.send(buffer);
  });
}

async function confirmedOffset(session: UploadSession, total: number, mime: string) {
  try {
    return await putChunk(session.uploadUrl, null, mime, 0, 0, total, () => {});
  } catch (error) {
    if (error instanceof Error && error.message === "expired") throw error;
    return resumeOnServer(session);
  }
}

export async function uploadFileToDrive(
  session: UploadSession,
  file: File,
  mime: string,
  onProgress: (ratio: number) => void,
) {
  if (file.size === 0) throw new Error("invalid");
  let direct = true;
  let offset = 0;
  const located = await confirmedOffset(session, file.size, mime);
  if (located.kind === "done") {
    onProgress(1);
    return located.driveFileId;
  }
  offset = located.offset;
  onProgress(Math.min(1, offset / file.size));

  let guard = 0;
  let stalls = 0;
  while (offset < file.size) {
    if (guard++ > 100000) throw new Error("network");
    const end = Math.min(offset + CHUNK_BYTES, file.size);
    const chunk = file.slice(offset, end);
    try {
      const result = direct
        ? await putChunk(session.uploadUrl, chunk, mime, offset, end - 1, file.size, (loaded) =>
            onProgress(Math.min(1, (offset + loaded) / file.size)),
          )
        : await relayChunk(session, chunk, mime, offset, end - 1, file.size, (loaded) =>
            onProgress(Math.min(1, (offset + loaded) / file.size)),
          );
      if (result.kind === "done") {
        onProgress(1);
        return result.driveFileId;
      }
      if (result.offset <= offset) throw new Error("network");
      offset = result.offset;
    } catch (error) {
      const code = error instanceof Error ? error.message : "network";
      if (code === "expired") throw error;
      if (code === "unconfirmed") {
        const recovered = await resumeOnServer(session);
        if (recovered.kind === "done") {
          onProgress(1);
          return recovered.driveFileId;
        }
        if (recovered.offset < offset) throw new Error("network");
        if (recovered.offset === offset) {
          stalls += 1;
          if (stalls > 3) throw new Error("network");
        } else {
          stalls = 0;
        }
        offset = recovered.offset;
        continue;
      }
      if (!direct) throw error;
      direct = false;
      const recovered = await resumeOnServer(session);
      if (recovered.kind === "done") {
        onProgress(1);
        return recovered.driveFileId;
      }
      offset = recovered.offset;
    }
  }
  throw new Error("rejected");
}

export async function uploadGuestFile(
  file: File,
  company: string,
  onProgress: (ratio: number) => void,
) {
  const key = fileIdentity(file);
  const mime = declaredMime(file);
  let saved = savedUpload(key);
  if (saved && saved.size !== file.size) {
    forgetUpload(key);
    saved = null;
  }
  let restarted = false;
  while (true) {
    const session =
      saved ??
      (await createUploadSession({
        name: file.name,
        size: file.size,
        mime,
        company,
      }));
    rememberUpload({
      key,
      id: session.id,
      uploadUrl: session.uploadUrl,
      proof: session.proof,
      size: file.size,
      mime,
    });
    try {
      const driveFileId = await uploadFileToDrive(session, file, mime, onProgress);
      await confirmUpload(session.id, driveFileId, session.proof);
      forgetUpload(key);
      return;
    } catch (error) {
      const code = error instanceof Error ? error.message : "network";
      if (code === "expired" && !restarted) {
        forgetUpload(key);
        saved = null;
        restarted = true;
        continue;
      }
      throw error;
    }
  }
}

export function guestErrorMessage(code: string) {
  switch (code) {
    case "unavailable":
      return "Čuvanje uspomena još nije povezano. Pokušajte malo kasnije.";
    case "too_large":
      return "Fajl je veći od dozvoljene veličine.";
    case "invalid":
      return "Ovaj format ne možemo da primimo.";
    case "rate":
      return "Previše pokušaja odjednom. Sačekajte nekoliko minuta.";
    case "expired":
      return "Prethodno slanje je isteklo. Odaberite fajl i pošaljite ga ponovo.";
    case "rejected":
      return "Fajl nije sačuvan. Pokušajte ponovo.";
    default:
      return "Slanje je prekinuto. Pokušajte ponovo.";
  }
}

export function declaredMime(file: File) {
  const extension = fileExtension(file.name);
  if (file.type && file.type !== "application/octet-stream") return file.type;
  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "heic":
      return "image/heic";
    case "heif":
      return "image/heif";
    case "mp4":
      return "video/mp4";
    case "mov":
      return "video/quicktime";
    default:
      return "application/octet-stream";
  }
}
