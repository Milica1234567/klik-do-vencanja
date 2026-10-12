import { useEffect, useRef } from "react";

/** Pins a frame inside a tall stage without relying on position: sticky. */
export function useFramePin(active: boolean) {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    if (!stage || !frame) return;

    const reset = () => {
      frame.style.position = "relative";
      frame.style.top = "0px";
      frame.style.bottom = "auto";
      frame.style.left = "0px";
      frame.style.width = "100%";
    };

    if (!active) {
      reset();
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top > 0) {
        reset();
        return;
      }
      if (rect.bottom <= vh) {
        frame.style.position = "absolute";
        frame.style.top = "auto";
        frame.style.bottom = "0px";
        frame.style.left = "0px";
        frame.style.width = "100%";
        return;
      }
      frame.style.position = "fixed";
      frame.style.top = "0px";
      frame.style.bottom = "auto";
      frame.style.left = `${rect.left}px`;
      frame.style.width = `${rect.width}px`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [active]);

  return { stageRef, frameRef };
}
