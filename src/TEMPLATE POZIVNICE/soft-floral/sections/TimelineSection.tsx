import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import type { InvitationContent } from "../../shared/types";
import { TimelineIcon } from "../components/TimelineIcons";

type TimelineSectionProps = {
  content: InvitationContent;
};

type TimelineItem = NonNullable<InvitationContent["timeline"]>[number];

type DayItemProps = {
  item: TimelineItem;
  reduceMotion: boolean;
};

function DayItem({ item, reduceMotion }: DayItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "center start"],
  });
  const emphasis = useTransform(scrollYProgress, [0.43, 0.5, 0.57], reduceMotion ? [0, 0, 0] : [0, 1, 0]);
  const color = useTransform(emphasis, [0, 1], ["rgba(244, 239, 232, 0.72)", "#f7f1ea"]);
  const borderColor = useTransform(emphasis, [0, 1], ["rgba(244, 239, 232, 0.35)", "#f7f1ea"]);
  const backgroundColor = useTransform(emphasis, [0, 1], ["rgba(0, 0, 0, 0.15)", "rgba(247, 241, 234, 0.14)"]);

  return (
    <li className="sf-day__item" ref={ref}>
      <motion.span className="sf-day__time" style={{ color }}>
        {item.time}
      </motion.span>
      <motion.span className="sf-day__mark" style={{ borderColor, backgroundColor }}>
        <TimelineIcon name={item.icon} className="sf-day__icon" />
      </motion.span>
      <motion.span className="sf-day__label" style={{ color }}>
        {item.title ?? ""}
      </motion.span>
    </li>
  );
}

function TimelineSection({ content }: TimelineSectionProps) {
  const { timeline } = content;
  const reduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.12, 0.82], reduceMotion ? [1, 1] : [0, 1]);

  if (!timeline?.length) return null;

  return (
    <section className="sf-day" data-section="timeline" aria-label="Dan venčanja" ref={ref}>
      <div className="sf-day__veil" aria-hidden="true" />

      <div className="sf-day__copy">
        <h2 className="sf-day__title">Dan venčanja</h2>
        <p className="sf-day__script">redosled dana</p>

        <div className="sf-day__list">
          <span className="sf-day__track" aria-hidden="true" />
          <motion.span className="sf-day__line" style={{ scaleY: lineScale }} aria-hidden="true" />
          <ol>
            {timeline.map((item) => (
              <DayItem key={item.id} item={item} reduceMotion={reduceMotion} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
