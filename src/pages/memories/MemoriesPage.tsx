import { useEffect, useId, useMemo, useRef, useState } from "react";
import { couplePhotoSrc } from "./couplePhoto";
import {
  DEFAULT_MAX_FILE_BYTES,
  DEFAULT_MAX_FILES,
  fetchMemoriesStatus,
  fileExtension,
  formatFileSize,
  guestErrorMessage,
  hasSavedUploads,
  isAllowedGuestFile,
  uploadGuestFile,
} from "./uploadClient";
import "./MemoriesPage.css";

type ItemStatus = "ready" | "uploading" | "done" | "error";

type QueueItem = {
  localId: string;
  file: File;
  previewUrl: string | null;
  status: ItemStatus;
  progress: number;
  error?: string;
};

const ACCEPT =
  "image/jpeg,image/png,image/webp,image/heic,image/heif,video/mp4,video/quicktime,.jpg,.jpeg,.png,.webp,.heic,.heif,.mp4,.mov";

function fileKey(file: File) {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

function canPreviewImage(file: File) {
  const extension = fileExtension(file.name);
  return ["jpg", "jpeg", "png", "webp"].includes(extension);
}

export default function MemoriesPage() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<QueueItem[]>([]);
  const busyRef = useRef(new Set<string>());
  const [items, setItems] = useState<QueueItem[]>([]);
  const [phase, setPhase] = useState<"form" | "success">("form");
  const [notice, setNotice] = useState("");
  const [sending, setSending] = useState(false);
  const [limits, setLimits] = useState({
    maxFileBytes: DEFAULT_MAX_FILE_BYTES,
    maxFiles: DEFAULT_MAX_FILES,
    ready: false,
  });

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Teodora i Lazar";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    return () => {
      document.title = previousTitle;
      robots.remove();
    };
  }, []);

  useEffect(() => {
    let active = true;
    fetchMemoriesStatus()
      .then((status) => {
        if (!active) return;
        setLimits({
          maxFileBytes: status.maxFileBytes,
          maxFiles: status.maxFiles,
          ready: status.ready,
        });
      })
      .catch(() => {
        if (!active) return;
        setLimits((current) => ({ ...current, ready: false }));
      });
    if (hasSavedUploads()) {
      setNotice(
        "Ako je slanje prekinuto, odaberite iste fajlove. Nastaviće se od sačuvanog mesta.",
      );
    }
    return () => {
      active = false;
    };
  }, []);

  const overall = useMemo(() => {
    if (items.length === 0) return 0;
    const total = items.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(total / items.length);
  }, [items]);

  function commit(next: QueueItem[]) {
    itemsRef.current = next;
    setItems(next);
  }

  function addFiles(list: FileList | File[]) {
    const incoming = Array.from(list);
    if (incoming.length === 0) return;
    setPhase("form");
    const next = [...itemsRef.current];
    const seen = new Set(next.map((item) => fileKey(item.file)));
    let note = "";
    for (const file of incoming) {
      if (next.length >= limits.maxFiles) {
        note = `Možete dodati najviše ${limits.maxFiles} fajlova odjednom.`;
        break;
      }
      const key = fileKey(file);
      if (seen.has(key)) continue;
      if (!isAllowedGuestFile(file)) {
        note = `${file.name} nije u podržanom formatu.`;
        continue;
      }
      if (file.size <= 0 || file.size > limits.maxFileBytes) {
        note = `${file.name} je veći od ${formatFileSize(limits.maxFileBytes)}.`;
        continue;
      }
      seen.add(key);
      next.push({
        localId: crypto.randomUUID(),
        file,
        previewUrl: canPreviewImage(file) ? URL.createObjectURL(file) : null,
        status: "ready",
        progress: 0,
      });
    }
    commit(next);
    setNotice(note);
  }

  function removeItem(localId: string) {
    if (sending) return;
    const target = itemsRef.current.find((item) => item.localId === localId);
    if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
    commit(itemsRef.current.filter((item) => item.localId !== localId));
  }

  function patchItem(localId: string, patch: Partial<QueueItem>) {
    commit(
      itemsRef.current.map((entry) =>
        entry.localId === localId ? { ...entry, ...patch } : entry,
      ),
    );
  }

  async function sendItem(item: QueueItem) {
    if (busyRef.current.has(item.localId)) return false;
    busyRef.current.add(item.localId);
    patchItem(item.localId, { status: "uploading", progress: 0, error: undefined });
    try {
      await uploadGuestFile(item.file, companyRef.current?.value ?? "", (ratio) => {
        patchItem(item.localId, { progress: Math.round(ratio * 100) });
      });
      patchItem(item.localId, { status: "done", progress: 100 });
      return true;
    } catch (error) {
      const code = error instanceof Error ? error.message : "network";
      patchItem(item.localId, { status: "error", error: guestErrorMessage(code) });
      return false;
    } finally {
      busyRef.current.delete(item.localId);
    }
  }

  async function sendPending() {
    if (sending) return;
    const pending = itemsRef.current.filter(
      (item) => item.status === "ready" || item.status === "error",
    );
    if (pending.length === 0) return;
    setSending(true);
    setNotice("");
    let failed = 0;
    for (const item of pending) {
      const ok = await sendItem(item);
      if (!ok) failed += 1;
    }
    setSending(false);
    if (failed === 0) {
      setPhase("success");
      return;
    }
    setNotice(
      failed === pending.length
        ? "Uspomene nisu poslate. Pokušajte ponovo."
        : "Neke uspomene nisu poslate. Možete ponoviti samo njih.",
    );
  }

  function resetForMore() {
    for (const item of itemsRef.current) {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
    }
    commit([]);
    setPhase("form");
    setNotice("");
  }

  const hasPending = items.some((item) => item.status === "ready" || item.status === "error");

  return (
    <main className="memories-page">
      <div className="mem-wrap">
        <section className="mem-hero" aria-label="Teodora i Lazar">
          <div className="mem-copy">
            <p className="mem-names">
              <span>Teodora</span>
              <span className="mem-rule" aria-hidden="true" />
              <span>Lazar</span>
            </p>
            <h1 className="mem-headline">
              <em>Najljepši</em>
              <span>trenuci</span>
              <span>su oni koje</span>
              <em>dijelimo.</em>
            </h1>
          </div>
          <figure className="mem-arch">
            {couplePhotoSrc ? (
              <img src={couplePhotoSrc} alt="Teodora i Lazar" />
            ) : (
              <figcaption>Mjesto za vašu fotografiju</figcaption>
            )}
          </figure>
          <p className="mem-lead">
            Mi smo danas stvarali uspomene, a vi ste bili dio njih. Voljeli bismo da vidimo sve
            one male, spontane trenutke koje ste zabilježili.
          </p>
        </section>

        <section className="mem-card" aria-label="Slanje uspomena">
          <p className="mem-kicker">Podijelite svoje uspomene sa nama</p>
          {phase === "success" ? (
            <div className="mem-success">
              <h2>Hvala što ste sačuvali dio našeg dana.</h2>
              <p>
                Vaše fotografije su uspješno poslate. Jedva čekamo da vidimo naše vjenčanje
                vašim očima.
              </p>
              <button type="button" className="mem-text-button" onClick={resetForMore}>
                Dodaj još uspomena
              </button>
            </div>
          ) : (
            <div
              className="mem-drop"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                if (!sending && event.dataTransfer.files.length > 0) {
                  addFiles(event.dataTransfer.files);
                }
              }}
            >
              <div className="mem-mark" aria-hidden="true">
                <svg viewBox="0 0 48 48">
                  <rect x="11" y="14" width="26" height="20" rx="2" />
                  <circle cx="19" cy="21" r="2" />
                  <path d="M13 31l7-6 4 3 4-3 7 6" />
                </svg>
              </div>
              <h2>Dodajte fotografije i snimke</h2>
              <p className="mem-support">
                Odaberite fotografije i video-snimke koje ste zabilježili.
              </p>

              {items.length > 0 && (
                <ul className="mem-files">
                  {items.map((item) => (
                    <li key={item.localId} className={`is-${item.status}`}>
                      {item.previewUrl ? (
                        <img src={item.previewUrl} alt="" />
                      ) : (
                        <span className="mem-file-kind">
                          {fileExtension(item.file.name) === "mp4" ||
                          fileExtension(item.file.name) === "mov"
                            ? "Video"
                            : "Foto"}
                        </span>
                      )}
                      <span className="mem-file-copy">
                        <span className="mem-file-name">{item.file.name}</span>
                        <span className="mem-file-meta">
                          {formatFileSize(item.file.size)}
                          {item.status === "uploading" ? ` · ${item.progress}%` : ""}
                          {item.status === "done" ? " · sačuvano" : ""}
                        </span>
                        {item.error && <span className="mem-file-error">{item.error}</span>}
                        {(item.status === "uploading" || item.status === "done") && (
                          <span
                            className="mem-bar"
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={item.progress}
                            aria-label={item.file.name}
                          >
                            <span style={{ width: `${item.progress}%` }} />
                          </span>
                        )}
                      </span>
                      {item.status !== "uploading" && item.status !== "done" && (
                        <span className="mem-file-actions">
                          <button type="button" onClick={() => removeItem(item.localId)}>
                            Ukloni
                          </button>
                          {item.status === "error" && (
                            <button
                              type="button"
                              onClick={() => void sendItem(item)}
                              disabled={sending}
                            >
                              Pokušaj ponovo
                            </button>
                          )}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              <input
                id={inputId}
                ref={inputRef}
                className="mem-input"
                type="file"
                accept={ACCEPT}
                multiple
                onChange={(event) => {
                  if (event.target.files) addFiles(event.target.files);
                  event.target.value = "";
                }}
              />
              <label className="mem-hp" htmlFor="mem-company">
                Ostavite prazno
              </label>
              <input
                id="mem-company"
                ref={companyRef}
                className="mem-hp"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />

              <button
                type="button"
                className="mem-button"
                onClick={() => inputRef.current?.click()}
                disabled={sending}
              >
                Odaberi fajlove
              </button>
              {hasPending && (
                <button
                  type="button"
                  className="mem-button mem-button-send"
                  onClick={() => void sendPending()}
                  disabled={sending}
                >
                  {sending ? "Šaljemo…" : "Pošalji uspomene"}
                </button>
              )}
              {sending && (
                <p className="mem-overall" role="status">
                  Ukupno poslato {overall}%
                </p>
              )}
              {notice && (
                <p className="mem-notice" role="alert">
                  {notice}
                </p>
              )}
              <p className="mem-limits">
                Možete poslati više fotografija i video-snimaka.
                <br />
                Do {formatFileSize(limits.maxFileBytes)} po fajlu · Dozvoljeni formati: JPG, PNG,
                WEBP, HEIC, MP4, MOV
              </p>
            </div>
          )}
        </section>

        <p className="mem-close">Hvala što ste dio naše priče.</p>
      </div>
    </main>
  );
}
