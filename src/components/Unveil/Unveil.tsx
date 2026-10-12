import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./Unveil.css";

function Unveil() {
  const frameRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);

  return (
    <section className="unveil" aria-labelledby="unveil-title">
      <figure className="unveil__photo" ref={frameRef}>
        <motion.img
          src="/brand/table.jpg"
          alt="Postavljen sto za proslavu, u toplom svetlu."
          style={reduce ? undefined : { y }}
        />
      </figure>
      <div className="unveil__copy">
        <p className="unveil__kicker">Kolekcija</p>
        <h2 id="unveil-title">
          <em>izaberite</em> ritam
        </h2>
        <p>
          Ovde vidite kako dan može da izgleda na ekranu. Svaka pozivnica nosi drugi osećaj.
        </p>
        <p>
          Vi birate onaj koji vam leži. Oblik, imena i satnicu slažemo u tom ritmu.
        </p>
        <a href="#invitation-showcase">Pogledajte kolekciju —</a>
      </div>
    </section>
  );
}

export default Unveil;
