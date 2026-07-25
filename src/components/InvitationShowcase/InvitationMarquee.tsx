import { useAnimationFrame, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import type { InvitationTemplate } from "../../types/invitation";
import InvitationCard from "./InvitationCard";

export type InvitationMarqueeHandle = {
  step: (direction: -1 | 1) => void;
  setPaused: (paused: boolean) => void;
};

type InvitationMarqueeProps = {
  templates: InvitationTemplate[];
  mediaEnabled: boolean;
  onSelectTemplate?: (template: InvitationTemplate) => void;
};

type StepAnimation = {
  to: number;
};

const STAGGER_OFFSETS = [12, 56, 100, 36, 80, 24];
const CRUISE_SPEED = 64;
const SPEED_LERP = 0.0045;
/**
 * Arrow step glide strength (1/s). Lower = silkier slide.
 * Loop / cruise logic unchanged — only the step feel.
 */
const STEP_SMOOTH = 3.2;
const STEP_SETTLE_PX = 0.35;

function buildSequence(templates: InvitationTemplate[]): InvitationTemplate[] {
  if (templates.length === 0) return [];

  const density = Math.max(5, templates.length * 2);
  const sequence: InvitationTemplate[] = [];

  for (let i = 0; i < density; i += 1) {
    sequence.push(templates[i % templates.length]);
  }

  return sequence;
}

function normalizeLoop(
  position: number,
  target: number,
  loopWidth: number,
): { position: number; target: number } {
  if (loopWidth <= 0) {
    return { position, target };
  }

  let nextPosition = position;
  let nextTarget = target;

  while (nextPosition <= -loopWidth) {
    nextPosition += loopWidth;
    nextTarget += loopWidth;
  }

  while (nextPosition > 0) {
    nextPosition -= loopWidth;
    nextTarget -= loopWidth;
  }

  return { position: nextPosition, target: nextTarget };
}

const InvitationMarquee = forwardRef<
  InvitationMarqueeHandle,
  InvitationMarqueeProps
>(function InvitationMarquee(
  { templates, mediaEnabled, onSelectTemplate },
  ref,
) {
  const prefersReducedMotion = useReducedMotion();
  const sequence = useMemo(() => buildSequence(templates), [templates]);

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const stepWidthRef = useRef(0);
  const positionRef = useRef(0);
  const targetXRef = useRef(0);
  const speedRef = useRef(CRUISE_SPEED);
  const pausedRef = useRef(false);
  const stepAnimRef = useRef<StepAnimation | null>(null);

  const handleSelect = useCallback(
    (template: InvitationTemplate) => {
      onSelectTemplate?.(template);
    },
    [onSelectTemplate],
  );

  const applyTransform = (position: number) => {
    positionRef.current = position;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${position}px, 0, 0)`;
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    const firstSequence = sequenceRef.current;
    if (!track || !firstSequence) return;

    const measure = () => {
      const trackStyles = getComputedStyle(track);
      const trackGap =
        Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0") || 0;
      loopWidthRef.current = firstSequence.offsetWidth + trackGap;

      const item = itemRef.current;
      if (item) {
        const sequenceStyles = getComputedStyle(firstSequence);
        const itemGap =
          Number.parseFloat(
            sequenceStyles.columnGap || sequenceStyles.gap || "0",
          ) || 0;
        stepWidthRef.current = item.offsetWidth + itemGap;
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(firstSequence);
    observer.observe(track);
    return () => observer.disconnect();
  }, [sequence]);

  useEffect(() => {
    positionRef.current = 0;
    targetXRef.current = 0;
    speedRef.current = CRUISE_SPEED;
    stepAnimRef.current = null;
    applyTransform(0);
  }, [sequence]);

  useImperativeHandle(
    ref,
    () => ({
      step: (direction: -1 | 1) => {
        if (prefersReducedMotion) return;

        const step = stepWidthRef.current;
        const loopWidth = loopWidthRef.current;
        if (step <= 0 || loopWidth <= 0) return;

        // Start from the live on-screen position (supports rapid re-clicks).
        const liveFrom = positionRef.current;
        let nextTarget = liveFrom - direction * step;

        const normalized = normalizeLoop(liveFrom, nextTarget, loopWidth);
        positionRef.current = normalized.position;
        targetXRef.current = normalized.target;

        applyTransform(normalized.position);
        stepAnimRef.current = { to: normalized.target };
        speedRef.current = 0;
      },
      setPaused: (paused: boolean) => {
        pausedRef.current = paused;
      },
    }),
    [prefersReducedMotion],
  );

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;

    const loopWidth = loopWidthRef.current;
    const track = trackRef.current;
    if (loopWidth <= 0 || !track) return;

    const dt = Math.min(delta, 32);
    const stepAnim = stepAnimRef.current;

    // Glide step: exponential damp toward target (no mid-flight normalize).
    if (stepAnim) {
      let position = positionRef.current;
      const remaining = stepAnim.to - position;
      const alpha = 1 - Math.exp(-(dt / 1000) * STEP_SMOOTH);
      position += remaining * alpha;

      if (Math.abs(stepAnim.to - position) <= STEP_SETTLE_PX) {
        const settled = normalizeLoop(stepAnim.to, stepAnim.to, loopWidth);
        targetXRef.current = settled.position;
        stepAnimRef.current = null;
        applyTransform(settled.position);
        return;
      }

      applyTransform(position);
      return;
    }

    // Idle while paused — skip work so scrolling other sections stays smooth
    if (pausedRef.current && Math.abs(speedRef.current) < 0.15) {
      speedRef.current = 0;
      return;
    }

    let position = positionRef.current;
    ({ position } = normalizeLoop(position, position, loopWidth));

    const targetSpeed = pausedRef.current ? 0 : CRUISE_SPEED;
    const blend = Math.min(1, dt * SPEED_LERP);
    speedRef.current += (targetSpeed - speedRef.current) * blend;

    if (Math.abs(speedRef.current) >= 0.15 || targetSpeed !== 0) {
      position -= (speedRef.current * dt) / 1000;
    }

    ({ position } = normalizeLoop(position, position, loopWidth));
    targetXRef.current = position;
    applyTransform(position);
  });

  if (templates.length === 0) {
    return null;
  }

  const renderSequence = (
    keyPrefix: string,
    sequenceDomRef?: typeof sequenceRef,
    attachItemRef = false,
  ) => (
    <div ref={sequenceDomRef} className="invitation-marquee__sequence">
      {sequence.map((template, index) => (
        <div
          key={`${keyPrefix}-${template.id}-${index}`}
          ref={attachItemRef && index === 0 ? itemRef : undefined}
          className="invitation-marquee__item"
          style={{
            marginTop: `calc(var(--marquee-stagger-scale, 1) * ${STAGGER_OFFSETS[index % STAGGER_OFFSETS.length]}px)`,
          }}
        >
          <InvitationCard
            template={template}
            mediaEnabled={mediaEnabled}
            onSelectTemplate={handleSelect}
          />
        </div>
      ))}
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <div className="invitation-marquee invitation-marquee--static">
        {templates.map((template) => (
          <div key={template.id} className="invitation-marquee__item">
            <InvitationCard
              template={template}
              mediaEnabled={mediaEnabled}
              onSelectTemplate={handleSelect}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
      <div ref={rootRef} className="invitation-marquee">
      <div ref={trackRef} className="invitation-marquee__track">
        {renderSequence("a", sequenceRef, true)}
        {renderSequence("clone")}
      </div>
    </div>
  );
});

export default InvitationMarquee;
