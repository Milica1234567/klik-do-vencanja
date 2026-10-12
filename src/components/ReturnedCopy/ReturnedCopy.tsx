import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import "./ReturnedCopy.css";

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

const bits = [
  { word: "Program", note: "Satnica dana, jasno i kratko." },
  { word: "Lokacija", note: "Mapa koju gost otvori odmah." },
  { word: "RSVP", note: "Odgovor u par dodira." },
  { word: "Link", note: "Jedna poruka nosi celu pozivnicu." },
];

function ReturnedCopy() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState<boolean[]>(() => Array(points.length + 1).fill(Boolean(reduce)));

  useEffect(() => {
    if (reduce) {
      setSeen(Array(points.length + 1).fill(true));
      return;
    }

    const root = sectionRef.current;
    if (!root) return;

    const nodes = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.reveal);
          setSeen((current) => {
            if (current[index]) return current;
            const next = [...current];
            next[index] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.55 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <section className="returned" ref={sectionRef} aria-labelledby="returned-title">
      <div className="returned__wrap">
        <header className="returned__head">
          <h2 id="returned-title" className="returned__title">
            Osmišljene
            <em> oko vašeg događaja.</em>
          </h2>
          <p className="returned__lead">
            Vi donosite ideju i informacije o događaju. Mi ih pretvaramo u gotovu digitalnu
            pozivnicu.
          </p>
        </header>

        <div className="returned__list">
          {points.map((point, index) => (
            <article
              className={seen[index] ? "returned__point is-in" : "returned__point"}
              data-reveal={index}
              key={point.title}
              style={{ "--i": index } as CSSProperties}
            >
              <span className="returned__index">0{index + 1}</span>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>

        <div
          className={seen[points.length] ? "returned__bits is-in" : "returned__bits"}
          data-reveal={points.length}
        >
          <p className="returned__label">Na linku</p>
          <ul>
            {bits.map((bit) => (
              <li key={bit.word}>
                <strong>{bit.word}</strong>
                <span>{bit.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ReturnedCopy;
