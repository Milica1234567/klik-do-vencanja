import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import type { InvitationContent } from "../shared/types";
import openerSeal from "./assets/opener-seal.png";
import openerVideo from "./assets/opener.mp4";
import "./InviteOpener.css";

type InviteOpenerProps = {
  content: InvitationContent;
  onFinished: () => void;
  onMusicUnlock?: () => void;
};

type Phase = "hold" | "opening";

const FADE_DELAY_MS = 850;
const FADE_MS = 1550;
const SEAL_FADE_S = 0.4;
const silk: [number, number, number, number] = [0.22, 0.08, 0.2, 1];

function InviteOpener({ onFinished, onMusicUnlock }: InviteOpenerProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const timers = useRef<number[]>([]);
  const zoomingRef = useRef(false);
  const sealLoaded = useRef(false);
  const videoLoaded = useRef(false);

  const [mediaReady, setMediaReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("hold");
  const [zooming, setZooming] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const tryRevealMedia = useCallback(() => {
    if (sealLoaded.current && videoLoaded.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMediaReady(true);
        });
      });
    }
  }, []);

  const finishNow = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    onFinished();
  }, [onFinished]);

  const beginOpen = useCallback(() => {
    if (zoomingRef.current) return;
    zoomingRef.current = true;
    setZooming(true);
    later(() => setLeaving(true), FADE_DELAY_MS);
    later(onFinished, FADE_DELAY_MS + FADE_MS);
  }, [onFinished]);

  const playVideo = useCallback(async () => {
    if (phase !== "hold") return;
    onMusicUnlock?.();
    setPhase("opening");
    beginOpen();
    try {
      await videoRef.current?.play();
    } catch {
      /* click still reveals the invitation */
    }
  }, [beginOpen, onMusicUnlock, phase]);

  useEffect(() => {
    if (!reduceMotion) return;
    setMediaReady(true);
    later(onFinished, 200);
  }, [onFinished, reduceMotion]);

  useEffect(
    () => () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    },
    [],
  );

  useEffect(() => {
    if (reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const markVideoReady = () => {
      if (videoLoaded.current) return;
      videoLoaded.current = true;
      tryRevealMedia();
    };

    const freeze = () => {
      video.pause();
      try {
        if (video.currentTime !== 0) video.currentTime = 0;
      } catch {
        /* ignore seek errors on some mobile browsers */
      }
      markVideoReady();
    };

    video.load();

    if (video.readyState >= 2) {
      freeze();
    } else {
      video.addEventListener("loadeddata", freeze, { once: true });
      video.addEventListener("error", markVideoReady, { once: true });
    }

    const failSafe = window.setTimeout(markVideoReady, 5000);

    return () => {
      window.clearTimeout(failSafe);
      video.removeEventListener("loadeddata", freeze);
      video.removeEventListener("error", markVideoReady);
    };
  }, [reduceMotion, tryRevealMedia]);

  return (
    <section
      className={`er-opener${leaving ? " is-leaving" : ""}${mediaReady ? " is-ready" : ""}`}
      aria-label="Otvaranje pozivnice"
      aria-busy={!mediaReady}
      onClick={phase === "hold" ? undefined : finishNow}
    >
      <div className="er-opener__stage">
        <div className={`er-opener__stack${zooming ? " is-zoom" : ""}`}>
          <video
            ref={videoRef}
            className="er-opener__video"
            src={openerVideo}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>

        <div className="er-opener__fit" aria-hidden={phase !== "hold"}>
          <AnimatePresence>
            {phase === "hold" ? (
              <motion.div
                className="er-opener__seal-wrap"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: SEAL_FADE_S, ease: silk }}
              >
                <button
                  type="button"
                  className="er-opener__seal"
                  aria-label="Otvori pečat"
                  onClick={(event) => {
                    event.stopPropagation();
                    void playVideo();
                  }}
                >
                  <img
                    src={openerSeal}
                    alt=""
                    draggable={false}
                    ref={(node) => {
                      if (!node || sealLoaded.current) return;
                      if (node.complete && node.naturalWidth > 0) {
                        sealLoaded.current = true;
                        tryRevealMedia();
                      }
                    }}
                    onLoad={() => {
                      sealLoaded.current = true;
                      tryRevealMedia();
                    }}
                    onError={() => {
                      sealLoaded.current = true;
                      tryRevealMedia();
                    }}
                  />
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default InviteOpener;
