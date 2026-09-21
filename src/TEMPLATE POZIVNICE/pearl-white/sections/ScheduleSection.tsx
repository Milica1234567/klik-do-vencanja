import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import ScrollReveal from "../../shared/ScrollReveal";
import { revealFade } from "../../shared/motion";
import floral2 from "../assets/floral-2.png";
import type { PearlWhiteContent } from "../content";

type ScheduleSectionProps = {
  content: PearlWhiteContent;
};

function ScheduleSection({ content }: ScheduleSectionProps) {
  const { timeline } = content;
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.7", "end 0.4"],
  });

  const ballY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!timeline?.length) return null;

  return (
    <ScrollReveal as="section" className="bs-section bs-schedule" variants={revealFade}>
      <div className="bs-panel">
        <h2 className="bs-script">
          {content.scheduleTitle ?? "Raspored događaja"}
        </h2>
        <ol ref={listRef} className="bs-schedule__list">
          <div className="bs-schedule__track" aria-hidden="true">
            <span className="bs-schedule__line" />
            {reduceMotion ? (
              <span className="bs-schedule__ball bs-schedule__ball--static" />
            ) : (
              <motion.span className="bs-schedule__ball" style={{ top: ballY }} />
            )}
          </div>
          {timeline.map((item) => (
            <li key={item.id} className="bs-schedule__item">
              <span className="bs-schedule__time">{item.time}</span>
              <span className="bs-schedule__mark" aria-hidden="true" />
              <span className="bs-schedule__title">{item.title}</span>
            </li>
          ))}
        </ol>
      </div>
      <img
        className="bs-float-floral bs-float-floral--schedule"
        src={floral2}
        alt=""
        draggable={false}
      />
    </ScrollReveal>
  );
}

export default ScheduleSection;
