import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

import type { PearlEleganceContent } from "../content";

type ProgramSectionProps = {
  content: PearlEleganceContent;
};

function ProgramRule() {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 58%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return <motion.span ref={ref} className="inv4-pe-program__rule" style={{ scaleX }} aria-hidden="true" />;
}

function ProgramSection({ content }: ProgramSectionProps) {
  const program = content.program;
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const metrics = useRef({ section: 0, head: 0, inner: 0 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headY = useTransform(scrollYProgress, (progress) => {
    const { section, head, inner } = metrics.current;
    const room = section - head - inner * 0.55;
    if (room <= 24) return 0;
    const traveled = Math.max(0, progress) * Math.max(0, section - inner);
    return Math.min(traveled, room);
  });

  useEffect(() => {
    const section = sectionRef.current;
    const head = headRef.current;
    if (!section || !head) return;
    const measure = () => {
      metrics.current.section = section.offsetHeight;
      metrics.current.head = head.offsetHeight;
      metrics.current.inner = window.innerHeight;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    observer.observe(head);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [program]);

  if (!program) return null;

  return (
    <section
      ref={sectionRef}
      className="inv4-pe-section inv4-pe-section--cream inv4-pe-program"
      data-section="program"
      aria-label="Program dana"
    >
      <div className="inv4-pe-section__inner">
        <motion.div ref={headRef} className="inv4-pe-program__head" style={{ y: headY }}>
          <div className="inv4-pe-heading">
            <h2 className="inv4-pe-title">{program.title}</h2>
            {program.script ? <p className="inv4-pe-script">{program.script}</p> : null}
          </div>
        </motion.div>

        <ol className="inv4-pe-program__list">
          {program.items.map((item, index) => (
            <li key={item.id} className="inv4-pe-program__item">
              {index > 0 ? <ProgramRule /> : null}
              <div className="inv4-pe-program__slide">
                <span className="inv4-pe-program__time">{item.time}</span>
                <span className="inv4-pe-program__label">{item.label}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ProgramSection;
