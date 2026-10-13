import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";

import type { InvitationContent } from "../../shared/types";
import openerSeal from "../assets/opener-seal.png";
import { envelopeRomanceParentsImage } from "../content";
import { useFramePin } from "../scrollMotion";
import { useCountdown } from "../useCountdown";

const RSVP_FORMSPREE = "https://formspree.io/f/xwvgrvvw";
const rollEase = "cubic-bezier(0.4, 0, 0.2, 1)";

type SectionProps = {
  content: InvitationContent;
};

type TimelineItem = NonNullable<InvitationContent["timeline"]>[number];

function ParentsSection({ content }: SectionProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const { stageRef, frameRef } = useFramePin(!reduceMotion);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });
  const photoEnd = wide ? 78 : 64;
  const photoPct = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [50, 50] : [photoEnd, 50],
    { clamp: true },
  );
  const photoClip = useTransform(photoPct, (value) => `inset(0 ${100 - value}% 0 0)`);
  const panelClip = useTransform(photoPct, (value) => `inset(0 0 0 ${value}%)`);
  const copyLeft = useTransform(photoPct, (value) => `${value}%`);
  const copyWidth = useTransform(photoPct, (value) => `${100 - value}%`);

  return (
    <section
      className="er-together"
      data-section="parents"
      aria-label="Porodice"
      ref={stageRef}
    >
      <div className="er-together__frame" ref={frameRef}>
        <motion.div className="er-together__photo" style={{ clipPath: photoClip }}>
          <img src={envelopeRomanceParentsImage} alt="" />
        </motion.div>
        <motion.div className="er-together__panel" style={{ clipPath: panelClip }} />
        <motion.div className="er-together__copy" style={{ left: copyLeft, width: copyWidth }}>
          <h2 className="er-together__title">Zajedno</h2>
          {content.parentsNote ? <p className="er-together__note">{content.parentsNote}</p> : null}
          {content.monogram ? <p className="er-together__mark">{content.monogram}</p> : null}
        </motion.div>
      </div>
    </section>
  );
}

function Digit({ digit }: { digit: string }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [current, setCurrent] = useState(digit);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    if (digit === current) return;
    if (reduceMotion) {
      setCurrent(digit);
      setPrevious(null);
      return;
    }
    setPrevious(current);
    setCurrent(digit);
    const id = window.setTimeout(() => setPrevious(null), 460);
    return () => window.clearTimeout(id);
  }, [current, digit, reduceMotion]);

  return (
    <span className="er-digit">
      <span className={previous != null ? "er-digit__out" : "er-digit__rest"} style={{ animationTimingFunction: rollEase }}>
        {previous ?? current}
      </span>
      {previous != null ? (
        <span className="er-digit__in" style={{ animationTimingFunction: rollEase }} aria-hidden="true">
          {current}
        </span>
      ) : null}
    </span>
  );
}

function RollingValue({ value }: { value: number }) {
  const text = String(value).padStart(2, "0");
  const chars = text.split("");
  return (
    <span className="er-roll">
      {chars.map((digit, index) => (
        <Digit key={chars.length - index} digit={digit} />
      ))}
    </span>
  );
}

function CountdownSection({ content }: SectionProps) {
  const { days, hours, minutes, seconds, done } = useCountdown(content.eventDateIso);
  const units = [
    { label: "dana", value: days },
    { label: "sati", value: hours },
    { label: "min", value: minutes },
    { label: "sek", value: seconds },
  ];

  return (
    <section
      className="er-section er-section--cream er-section--tight-bottom"
      data-section="countdown"
      aria-label="Odbrojavanje"
    >
      <div className="er-section__inner">
        <div>
          <p className="er-eyebrow">odbrojavanje</p>
          <h2 className="er-title">Do našeg dana</h2>
          <p className="er-date-line">{content.eventDateLabel}</p>
        </div>
        {done ? (
          <p className="er-script">Dan je stigao</p>
        ) : (
          <div className="er-countdown" role="timer" aria-live="polite">
            {units.map((unit) => (
              <div key={unit.label} className="er-countdown__cell">
                <span className="er-countdown__value">
                  <RollingValue value={unit.value} />
                </span>
                <span className="er-countdown__label">{unit.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function VenueSection({ content }: SectionProps) {
  const venue = content.venue;

  if (!venue) return null;

  return (
    <section
      className="er-section er-section--cream er-section--venue"
      data-section="venue"
      aria-label="Lokacija"
    >
      <div className="er-section__inner er-venue__intro">
        <p className="er-eyebrow">{venue.title}</p>
        <h2 className="er-title">Gde se vidimo</h2>
      </div>

      <div className="er-section__inner er-venue__meta">
        <p className="er-venue__time">{venue.timeLabel}</p>
        <p className="er-venue__place">{venue.placeName}</p>
        {venue.address ? <p className="er-body">{venue.address}</p> : null}
        {venue.mapUrl ? (
          <a
            className="er-btn er-btn--solid"
            href={venue.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            {venue.mapCtaLabel ?? "Pogledaj lokaciju"}
          </a>
        ) : null}
      </div>
    </section>
  );
}

function TimelineRow({ item }: { item: TimelineItem }) {
  const reduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "center start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.32, 1, 0.32], {
    clamp: true,
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [1, 1.035, 1], {
    clamp: true,
  });
  const rule = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion
      ? ["rgba(46, 42, 40, 0.12)", "rgba(46, 42, 40, 0.12)", "rgba(46, 42, 40, 0.12)"]
      : ["rgba(46, 42, 40, 0.08)", "rgba(92, 36, 51, 0.38)", "rgba(46, 42, 40, 0.08)"],
    { clamp: true },
  );

  return (
    <motion.li
      ref={ref}
      className="er-timeline__item"
      style={{ opacity, scale, borderBottomColor: rule }}
    >
      <div className="er-timeline__slide">
        <span className="er-timeline__time">{item.time}</span>
        <p className="er-timeline__line">
          <span className="er-timeline__title">{item.title}</span>
        </p>
      </div>
    </motion.li>
  );
}

function TimelineSection({ content }: SectionProps) {
  const items = content.timeline ?? [];
  const reduceMotion = useReducedMotion() ?? false;
  const listRef = useRef<HTMLOListElement>(null);
  const washRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const wash = washRef.current;
    if (!list || !wash || reduceMotion) return;
    const section = list.closest("section");
    if (!section) return;

    let raf = 0;
    const update = () => {
      const last = list.lastElementChild;
      if (!last) return;
      const bottom = last.getBoundingClientRect().bottom;
      const bounds = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const active = bottom < vh - 4 && bottom > 36;
      wash.style.visibility = active ? "visible" : "hidden";
      wash.style.position = "fixed";
      wash.style.top = `${bottom}px`;
      wash.style.left = `${bounds.left}px`;
      wash.style.width = `${bounds.width}px`;
      wash.style.height = `${Math.max(vh - bottom, 0)}px`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduceMotion]);

  return (
    <section
      className="er-section er-section--cream er-section--tight-y er-timeline-scene"
      data-section="timeline"
      aria-label="Raspored dana"
    >
      <div className="er-section__inner">
        <div>
          <p className="er-eyebrow">raspored</p>
          <h2 className="er-title">Tok dana</h2>
        </div>

        <ol className="er-timeline" ref={listRef}>
          {items.map((item) => (
            <TimelineRow key={item.id} item={item} />
          ))}
        </ol>
      </div>
      <div className="er-flood" ref={washRef} aria-hidden="true" />
    </section>
  );
}

function DressCodeSection({ content }: SectionProps) {
  const dress = content.dressCode;
  const reduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const serifY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [10, -18]);
  const scriptY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [16, -6]);
  const { scrollYProgress: enter } = useScroll({
    target: ref,
    offset: ["start end", "start 0.55"],
  });
  const dip = useTransform(enter, [0, 1], reduceMotion ? [0, 0] : [92, 0], { clamp: true });
  const clipPath = useTransform(dip, (value) =>
    value < 1.5 ? "none" : `polygon(0px ${value}px, 50% 0px, 100% ${value}px, 100% 100%, 0px 100%)`,
  );

  if (!dress) return null;

  return (
    <motion.section
      className="er-section er-section--wine er-dresscode"
      data-section="dress-code"
      aria-label="Dress code"
      ref={ref}
      style={{ clipPath }}
    >
      <div className="er-section__inner er-dresscode__inner">
        <p className="er-eyebrow er-eyebrow--light">{dress.title}</p>
        <div className="er-dress__stage">
          <motion.p className="er-dress__display" style={{ y: serifY }}>
            {dress.label}
          </motion.p>
          {dress.note ? (
            <motion.p className="er-dress__script" style={{ y: scriptY }}>
              {dress.note}
            </motion.p>
          ) : null}
        </div>
      </div>
    </motion.section>
  );
}

function HotelsSection({ content }: SectionProps) {
  const hotels = content.hotels;
  if (!hotels) return null;

  return (
    <section className="er-section er-section--wine" data-section="hotels" aria-label="Smeštaj">
      <div className="er-section__inner">
        <h2 className="er-title er-title--light">{hotels.title}</h2>
        <ul className="er-hotels">
          {hotels.items.map((hotel, index) => {
            const href = hotel.mapUrl ?? hotel.detailUrl;
            const number = String(index + 1).padStart(2, "0");
            return (
              <li key={hotel.id} className="er-hotels__item">
                <span className="er-hotels__num" aria-hidden="true">
                  {number}
                </span>
                <h3 className="er-hotels__name">{hotel.name}</h3>
                <span className="er-hotels__rule" aria-hidden="true" />
                {href ? (
                  <a className="er-hotels__link" href={href} target="_blank" rel="noreferrer">
                    {hotel.ctaLabel ?? "Prikaži na mapi"}
                  </a>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function RsvpSection({ content }: SectionProps) {
  const rsvp = content.rsvp;
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  if (!rsvp) return null;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("_subject", `RSVP: ${content.couple.partnerOne} & ${content.couple.partnerTwo}`);
    data.set("pozivnica", "Envelope Romance");

    setStatus("sending");
    try {
      const response = await fetch(RSVP_FORMSPREE, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("RSVP failed");
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="er-section er-section--wine" data-section="rsvp" aria-label="RSVP">
      <div className="er-section__inner">
        <div>
          <p className="er-eyebrow er-eyebrow--light">rsvp</p>
          <h2 className="er-title er-title--light">{rsvp.title}</h2>
          <p className="er-body er-body--light">{rsvp.deadlineLabel}</p>
        </div>
        <div className="er-rsvp-wrap">
          {status === "ok" ? (
            <div className="er-rsvp__thanks">
              <p className="er-script er-script--light">Hvala, primili smo potvrdu</p>
              <img className="er-rsvp__seal" src={openerSeal} alt="" />
            </div>
          ) : (
            <form className="er-rsvp" onSubmit={onSubmit}>
              <div className="er-rsvp__grid">
                <label className="er-rsvp__field">
                  <span>Ime i prezime</span>
                  <input name="ime" type="text" required autoComplete="name" placeholder="Vaše ime" />
                </label>
                <label className="er-rsvp__field">
                  <span>Email</span>
                  <input name="email" type="email" required autoComplete="email" placeholder="email@primer.rs" />
                </label>
              </div>
              <label className="er-rsvp__field">
                <span>Broj gostiju</span>
                <input name="gosti" type="number" min={1} max={20} defaultValue={1} required />
              </label>
              <div className="er-rsvp__pills" role="radiogroup" aria-label="Dolazite li?">
                <label className="er-rsvp__pill">
                  <input type="radio" name="dolazak" value="Da" defaultChecked required />
                  <span>Da, dolazim</span>
                </label>
                <label className="er-rsvp__pill">
                  <input type="radio" name="dolazak" value="Ne" />
                  <span>Ne dolazim</span>
                </label>
              </div>
              <label className="er-rsvp__field">
                <span>Poruka (opciono)</span>
                <textarea name="poruka" rows={3} placeholder="Ostavite poruku…" />
              </label>
              <button
                type="submit"
                className="er-btn er-btn--cream er-rsvp__submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Šaljem…" : rsvp.ctaLabel}
              </button>
              {status === "error" ? (
                <p className="er-rsvp__error">Nešto nije uspelo. Pokušajte ponovo.</p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ClosingSection({ content }: SectionProps) {
  const { couple, closingMessage, closingImage, monogram } = content;
  const joiner = couple.joiner ?? "&";

  return (
    <section className="er-closing" data-section="closing" aria-label="Završetak">
      {closingImage ? (
        <div className="er-closing__photo">
          <img src={closingImage.src} alt={closingImage.alt} />
          <div className="er-closing__veil" aria-hidden="true" />
        </div>
      ) : null}
      <div className="er-closing__copy">
        <p className="er-script er-script--light">{closingMessage ?? "Hvala vam"}</p>
        <p className="er-closing__names">
          {couple.partnerOne} {joiner} {couple.partnerTwo}
        </p>
        {monogram ? <p className="er-monogram er-monogram--light">{monogram}</p> : null}
      </div>
    </section>
  );
}

export {
  ParentsSection,
  CountdownSection,
  VenueSection,
  DressCodeSection,
  TimelineSection,
  HotelsSection,
  RsvpSection,
  ClosingSection,
};
