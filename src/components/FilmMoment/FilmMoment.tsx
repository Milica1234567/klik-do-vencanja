import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./FilmMoment.css";

const frames = [
  {
    note: "gost",
    line: "Pozivnica stiže tamo gde gost već jeste.",
  },
  {
    note: "otvaranje",
    line: "Otvara se odmah, bez preuzimanja.",
  },
  {
    note: "jasno",
    line: "Ništa se ne gubi po porukama.",
  },
];

function FilmMoment() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const frame = frames[index];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % frames.length);
    }, 4600);
    return () => window.clearInterval(id);
  }, [reduce, index]);

  return (
    <section className="film" id="film" ref={sectionRef} aria-label="Kako nastaje pozivnica">
      <motion.img
        className="film__photo"
        src="/brand/table.jpg"
        alt=""
        style={reduce ? undefined : { y }}
      />
      <div className="film__veil" aria-hidden="true" />

      <p className="film__count">
        {String(index + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          className="film__quote"
          key={frame.line}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -14 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="film__mark" aria-hidden="true">
            “
          </span>
          <p aria-live="polite">{frame.line}</p>
          <span className="film__note">{frame.note}</span>
        </motion.div>
      </AnimatePresence>

      <button
        className="film__next"
        type="button"
        onClick={() => setIndex((current) => (current + 1) % frames.length)}
      >
        dalje
      </button>
    </section>
  );
}

export default FilmMoment;
