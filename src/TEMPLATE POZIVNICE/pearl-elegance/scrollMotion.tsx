import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";

/** Scroll progress of an element. Values stay put when reduced motion is on. */
export function useScrub<T extends HTMLElement>(
  offset: NonNullable<Parameters<typeof useScroll>[0]>["offset"] = ["start end", "end start"],
) {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return { ref, scrollYProgress, reduce: reduce === true };
}

/**
 * Holds a block in place while the next sheet scrolls over it.
 * The distance is the scroll itself: stop scrolling and the sheet stops.
 */
/** Height is measured when the box changes, not on every scroll frame. */
export function useBoxHeight(ref: RefObject<HTMLElement | null>) {
  const height = useRef(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      height.current = el.offsetHeight;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return height;
}

export function useCoverHold(
  ref: RefObject<HTMLElement | null>,
  scrollYProgress: MotionValue<number>,
  reduce: boolean,
) {
  const height = useBoxHeight(ref);
  return useTransform(scrollYProgress, (progress) => {
    if (reduce) return 0;
    const box = height.current;
    if (!box) return 0;
    const travel = Math.min(box, window.innerHeight * 0.85);
    return Math.min(Math.max(progress, 0), travel / box) * box;
  });
}

type PaperHoldProps = {
  children: ReactNode;
  className?: string;
};

/** Program and dress code stay put while the RSVP sheet covers them. */
export function PaperHold({ children, className }: PaperHoldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useCoverHold(ref, scrollYProgress, reduce);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

type FinalRevealProps = {
  rsvp: ReactNode;
  closing: ReactNode;
  className?: string;
};

/**
 * RSVP sheet scrolls away and the closing paper stays underneath it.
 * Before the RSVP reaches the top, the closing is already tucked behind it,
 * so the page above is unchanged.
 */
export function FinalReveal({ rsvp, closing, className }: FinalRevealProps) {
  const rsvpRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({
    target: rsvpRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, (progress) => {
    if (reduce) return 0;
    const sheet = rsvpRef.current;
    const paper = closingRef.current;
    if (!sheet || !paper) return 0;
    const overlap = paper.offsetTop - sheet.offsetTop;
    const t = Math.min(Math.max(progress, 0), 1);
    return -overlap * (1 - t);
  });

  return (
    <div className={className}>
      <div ref={rsvpRef} className="pe-final-sheet">
        {rsvp}
      </div>
      <motion.div ref={closingRef} className="pe-final-under" style={reduce ? undefined : { y }}>
        {closing}
      </motion.div>
    </div>
  );
}

type MaskRevealProps = {
  children: ReactNode;
  className?: string;
};

/** Text stays on its final position. A scroll-linked mask uncovers it. */
export function MaskReveal({ children, className }: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "start 58%"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { clipPath }}>{children}</motion.div>
    </div>
  );
}
