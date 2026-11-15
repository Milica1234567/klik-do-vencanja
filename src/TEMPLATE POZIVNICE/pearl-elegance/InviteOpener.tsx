import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import type { PearlEleganceContent } from "./content";
import openerVideo from "./assets/opener.mp4";
import "./InviteOpener.css";

type InviteOpenerProps = {
  content: PearlEleganceContent;
  onFinished: () => void;
  onMusicUnlock?: () => void;
};

type Phase = "hold" | "opening";

const ZOOM_S = 2.6;
const CTA_FADE_S = 0.75;
const silk: [number, number, number, number] = [0.22, 0.08, 0.2, 1];

function InviteOpener({ onFinished, onMusicUnlock }: InviteOpenerProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const timers = useRef<number[]>([]);
  const holding = useRef(true);
  const zoomingRef = useRef(false);

  const [phase, setPhase] = useState<Phase>("hold");
  const [zooming, setZooming] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const finishNow = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    onFinished();
  }, [onFinished]);

  const beginOpen = useCallback(() => {
    if (zoomingRef.current) return;
    zoomingRef.current = true;
    setZooming(true);
    setLeaving(true);
    later(onFinished, ZOOM_S * 1000);
  }, [onFinished]);

  const playVideo = useCallback(() => {
    if (!holding.current) return;
    onMusicUnlock?.();
    holding.current = false;
    setPhase("opening");
    beginOpen();

    const video = videoRef.current;
    if (!video) return;

    const begin = () => {
      void video.play().catch(() => {
        video.load();
        void video.play().catch(() => undefined);
      });
    };

    if (video.readyState >= 2) {
      video.currentTime = 0;
      begin();
      return;
    }

    const onReady = () => {
      video.removeEventListener("canplay", onReady);
      video.currentTime = 0;
      begin();
    };
    video.addEventListener("canplay", onReady);
    video.load();
  }, [beginOpen, onMusicUnlock]);

  useEffect(() => {
    if (!reduceMotion) return;
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

    const freeze = () => {
      if (!holding.current) return;
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* ignore seek race */
      }
    };

    if (video.readyState >= 1) freeze();
    else video.addEventListener("loadeddata", freeze, { once: true });

    return () => video.removeEventListener("loadeddata", freeze);
  }, [reduceMotion]);

  return (
    <section
      className={`pe-opener${leaving ? " is-leaving" : ""}`}
      aria-label="Otvaranje pozivnice"
      style={{ "--pe-opener-zoom-s": `${ZOOM_S}s` } as CSSProperties}
      onClick={phase === "hold" ? undefined : finishNow}
    >
      <svg className="pe-opener__filters" width="0" height="0" aria-hidden="true">
        <filter id="pe-sharpen" colorInterpolationFilters="sRGB">
          <feConvolveMatrix order="3" preserveAlpha="true" kernelMatrix="0 -0.45 0 -0.45 2.8 -0.45 0 -0.45 0" />
        </filter>
      </svg>
      <div className="pe-opener__stage">
        <div className={`pe-opener__stack${zooming ? " is-zoom" : ""}`}>
          <div className="pe-opener__crop">
            <video
              ref={videoRef}
              className="pe-opener__video"
              src={openerVideo}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </div>
        </div>

        <AnimatePresence>
          {phase === "hold" ? (
            <motion.button
              type="button"
              className="pe-opener__cta"
              aria-label="Otvori kovertu"
              onClick={playVideo}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: CTA_FADE_S, ease: silk }}
            >
              <span className="pe-opener__cta-script">Otvori</span>
              <span className="pe-opener__cta-label">kovertu</span>
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default InviteOpener;
