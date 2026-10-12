import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { letoAssets } from "./media";
import "./LetoIntroGate.css";

type LetoIntroGateProps = {
  onOpen: () => void;
  onFinished: () => void;
};

type Phase = "idle" | "zoom" | "reveal";

const ZOOM_MS = 1550;
const REVEAL_MS = 580;
const OPEN_MS = ZOOM_MS + REVEAL_MS;

const slowEase: [number, number, number, number] = [0.22, 0.03, 0.12, 1];
const zoomEase: [number, number, number, number] = [0.22, 0.08, 0.18, 1];

function isMobileGate() {
  return window.matchMedia("(max-width: 719px)").matches;
}

function getZoomPlan() {
  const mobile = isMobileGate();
  const originY = mobile ? 0.34 : 0.3;
  const figure = document.querySelector(".inv3-ll-gate__figure");
  const rect = figure?.getBoundingClientRect();
  return {
    scale: mobile ? 3.3 : 4,
    origin: `50% ${Math.round(originY * 100)}%`,
    y: rect ? (0.5 - originY) * rect.height : 0,
  };
}

function LetoIntroGate({ onOpen, onFinished }: LetoIntroGateProps) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [videoSrc, setVideoSrc] = useState(letoAssets.introDanceWebm);
  const [useBlend, setUseBlend] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 34%");
  const [zoomScale, setZoomScale] = useState(3.3);
  const [zoomY, setZoomY] = useState(0);
  const leaving = phase !== "idle";
  const [writeMark, setWriteMark] = useState(false);

  const swayX = useMotionValue(0);

  useEffect(() => {
    if (reduce !== false) return;
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) setWriteMark(true);
    });
    return () => {
      cancelled = true;
    };
  }, [reduce]);

  useEffect(() => {
    const useMp4 = () => {
      setVideoSrc(letoAssets.introDance);
      setUseBlend(true);
    };

    const prefersMp4 =
      window.matchMedia("(max-width: 719px)").matches ||
      /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent);

    if (prefersMp4) {
      useMp4();
      return;
    }

    const probe = document.createElement("video");
    probe.preload = "auto";
    probe.muted = true;
    probe.src = letoAssets.introDanceWebm;

    probe.onloadeddata = () => {
      setVideoSrc(letoAssets.introDanceWebm);
      setUseBlend(false);
    };
    probe.onerror = useMp4;

    if (
      probe.canPlayType('video/webm; codecs="vp9"') === "" &&
      probe.canPlayType('video/webm; codecs="vp8"') === ""
    ) {
      useMp4();
      return;
    }

    probe.load();

    const fallbackTimer = window.setTimeout(() => {
      if (probe.readyState < 2) useMp4();
    }, 2500);

    return () => {
      window.clearTimeout(fallbackTimer);
      probe.onloadeddata = null;
      probe.onerror = null;
      probe.removeAttribute("src");
      probe.load();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;
    void video.play().catch(() => {});
  }, [reduce, videoSrc]);

  useEffect(() => {
    if (reduce || leaving) {
      swayX.set(0);
      return;
    }

    swayX.set(0);
  }, [leaving, reduce, swayX]);

  const open = () => {
    if (leaving) return;
    if (reduce) {
      onOpen();
      onFinished();
      return;
    }

    const plan = getZoomPlan();
    setZoomOrigin(plan.origin);
    setZoomScale(plan.scale);
    setZoomY(plan.y);
    setPhase("zoom");
    onOpen();

    animate(swayX, 0, { duration: ZOOM_MS / 1000, ease: zoomEase });

    window.setTimeout(() => setPhase("reveal"), ZOOM_MS);
    window.setTimeout(() => onFinished(), OPEN_MS);
  };

  const handleVideoError = () => {
    setVideoSrc(letoAssets.introDance);
    setUseBlend(true);
  };

  return (
    <motion.section
      className={`inv3-ll-gate${leaving ? " is-leaving" : ""}${phase === "reveal" ? " is-revealing" : ""}`}
      data-section="gate"
      aria-label="Ulaz u pozivnicu"
      initial={false}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: slowEase }}
    >
      <div className="inv3-ll-gate__stage">
        <div className="inv3-ll-gate__anchor">
          <motion.div className="inv3-ll-gate__sway" style={{ x: swayX }}>
            <motion.div
              className="inv3-ll-gate__figure"
              style={{ transformOrigin: zoomOrigin }}
              animate={
                phase === "zoom" || phase === "reveal"
                  ? {
                      scale: zoomScale,
                      y: zoomY,
                      opacity: phase === "reveal" ? 0 : 1,
                    }
                  : { scale: 1, y: 0, opacity: 1 }
              }
              transition={
                phase === "zoom" || phase === "reveal"
                  ? {
                      duration:
                        phase === "reveal" ? REVEAL_MS / 1000 : ZOOM_MS / 1000,
                      ease: zoomEase,
                    }
                  : { duration: 0.4, ease: slowEase }
              }
            >
              <div
                className={`inv3-ll-gate__video-shell${useBlend ? " inv3-ll-gate__video-shell--blend" : " inv3-ll-gate__video-shell--alpha"}`}
              >
                <video
                  ref={videoRef}
                  className="inv3-ll-gate__video"
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onError={handleVideoError}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </motion.div>
          {!leaving ? (
            <p className={`inv3-ll-gate__mark${writeMark ? " is-writing" : ""}`}>A&amp;M</p>
          ) : null}
        </div>
      </div>

      {!leaving ? (
        <motion.button
          type="button"
          className="inv3-ll-gate__cta"
          onClick={open}
          aria-label="Klikni i zapleši sa nama"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: reduce ? 0 : 0.4, ease: slowEase }}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
        >
          Klikni i zapleši sa nama
        </motion.button>
      ) : null}
    </motion.section>
  );
}

export default LetoIntroGate;
