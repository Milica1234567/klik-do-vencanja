import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./DigitalMoment.css";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const bits = [
  { word: "Program", note: "Satnica dana, jasno i kratko." },
  { word: "Lokacija", note: "Mapa koju gost otvori odmah." },
  { word: "RSVP", note: "Odgovor u par dodira." },
  { word: "Link", note: "Jedna poruka nosi celu pozivnicu." },
] as const;

function DigitalMoment() {
  const [active, setActive] = useState(0);

  return (
    <section className="signal" aria-label="Šta gosti vide">
      <p className="signal__label">Na linku</p>
      <div className="signal__row">
        {bits.map((bit, index) => (
          <button
            key={bit.word}
            type="button"
            className={index === active ? "is-on" : ""}
            onClick={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
          >
            <span>{bit.word}</span>
          </button>
        ))}
      </div>
      <div className="signal__note">
        <AnimatePresence mode="wait">
          <motion.p
            key={bits[active].word}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
          >
            {bits[active].note}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default DigitalMoment;
