import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Reveal from "../motion/Reveal";
import "./Benefits.css";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const points = [
  {
    title: "Moderan i sofisticiran izbor",
    body: "Ostavite snažan prvi utisak uz elegantno i savremeno rešenje, složeno oko vašeg dana.",
  },
  {
    title: "Jednostavno i bez stresa",
    body: "Bez štamparije i čekanja. Podelite link i pratite odgovore.",
  },
  {
    title: "Sve na jednom mestu",
    body: "Lokacija, raspored i smeštaj kroz jednu digitalnu stranicu.",
  },
  {
    title: "Laka komunikacija sa gostima",
    body: "Detalji, mesto i izmene ostaju dostupni svakome ko otvori link.",
  },
  {
    title: "Jednostavan RSVP",
    body: "Gosti brzo potvrde dolazak, a vi uvek znate broj gostiju.",
  },
];

function Benefits() {
  const [active, setActive] = useState(0);

  return (
    <section className="event-edit" id="benefits" aria-labelledby="benefits-title">
      <div className="event-edit__head">
        <p className="event-edit__kicker">Oko događaja</p>
        <Reveal as="h2" kind="fade" id="benefits-title">
          Osmišljene <em>oko vašeg događaja.</em>
        </Reveal>
      </div>

      <div className="event-edit__row" role="tablist" aria-label="O pozivnici">
        {points.map((point, index) => (
          <button
            key={point.title}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={index === active ? "is-on" : ""}
            onClick={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
          >
            {point.title}
          </button>
        ))}
      </div>

      <div className="event-edit__stage">
        <AnimatePresence mode="wait">
          <motion.p
            key={points[active].title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease }}
          >
            {points[active].body}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Benefits;
