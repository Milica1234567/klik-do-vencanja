import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { AccentLily, PearlDrop } from "../decor";
import type { PearlEleganceContent } from "../content";
import { useScrub } from "../scrollMotion";

type SectionProps = {
  content: PearlEleganceContent;
};

/** Whole days remaining until the target date (0 once it has arrived). */
function useDaysUntil(targetIso: string): number {
  const compute = () => {
    const diff = new Date(targetIso).getTime() - Date.now();
    return diff <= 0 ? 0 : Math.ceil(diff / 86_400_000);
  };
  const [days, setDays] = useState(compute);

  useEffect(() => {
    setDays(compute());
    const id = window.setInterval(() => setDays(compute()), 60_000 * 60);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIso]);

  return days;
}

/** Serbian plural for "dan" (1 dan, 2 dana, 5 dana, 21 dan, 361 dan…). */
function serbianDayWord(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "dan";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "dana";
  return "dana";
}

function countdownUnitLabel(
  days: number,
  countdown: NonNullable<PearlEleganceContent["countdown"]>,
): string {
  if (countdown.unitSuffix) {
    return `${serbianDayWord(days)} ${countdown.unitSuffix}`;
  }
  return countdown.unit ?? `${serbianDayWord(days)} do našeg venčanja`;
}

export function InviteSection({ content }: SectionProps) {
  const invite = content.invite;
  const { ref, scrollYProgress, reduce } = useScrub<HTMLElement>();
  const flowerY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [10, -15]);

  if (!invite) return null;

  return (
    <section
      ref={ref}
      className="inv4-pe-section inv4-pe-section--cream"
      data-section="invite"
      aria-label="Poziv"
    >
      <motion.div className="inv4-pe-lily-float" style={{ y: flowerY }}>
        <AccentLily variant="a" className="inv4-pe-lily--invite" />
      </motion.div>
      <div className="inv4-pe-section__inner">
        <div className="inv4-pe-heading">
          <h2 className="inv4-pe-title">{invite.title}</h2>
          {invite.script ? <p className="inv4-pe-script">{invite.script}</p> : null}
        </div>
        <p className="inv4-pe-editorial">{invite.body}</p>
      </div>
    </section>
  );
}

export function CalendarSection({ content }: SectionProps) {
  const calendar = content.calendar;
  const { ref, scrollYProgress, reduce } = useScrub<HTMLElement>();
  const flowerY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-10, 15]);
  const dayRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: dayProgress } = useScroll({
    target: dayRef,
    offset: ["center end", "center center"],
  });
  const pearlScale = useTransform(dayProgress, [0, 1], reduce ? [1, 1] : [0.35, 1]);
  const pearlClip = useTransform(
    dayProgress,
    [0, 1],
    reduce
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(0% 42% 0% 42%)", "inset(0% 0% 0% 0%)"],
  );

  if (!calendar) return null;

  return (
    <section
      ref={ref}
      className="inv4-pe-section inv4-pe-section--cream inv4-pe-section--tight"
      data-section="calendar"
      aria-label="Datum"
    >
      <motion.div className="inv4-pe-lily-float" style={{ y: flowerY }}>
        <AccentLily variant="b" className="inv4-pe-lily--calendar" />
      </motion.div>
      <div className="inv4-pe-section__inner">
        <div className="inv4-pe-heading">
          <h2 className="inv4-pe-title">{calendar.monthLabel}</h2>
          {calendar.script ? <p className="inv4-pe-script">{calendar.script}</p> : null}
        </div>

        <div className="inv4-pe-calendar" role="list">
          {calendar.days.map((day) => (
            <div
              key={day.id}
              ref={day.highlight ? dayRef : undefined}
              role="listitem"
              className={`inv4-pe-calendar__day${
                day.highlight ? " inv4-pe-calendar__day--active" : ""
              }`}
            >
              <span className="inv4-pe-calendar__weekday">{day.weekday}</span>
              <span className="inv4-pe-calendar__date">{day.day}</span>
              {day.highlight ? (
                <motion.div
                  className="inv4-pe-calendar__pearls"
                  style={{ x: "-50%", scale: pearlScale, clipPath: pearlClip }}
                >
                  <PearlDrop className="inv4-pe-calendar__drop" />
                </motion.div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CountdownSection({ content }: SectionProps) {
  const countdown = content.countdown;
  const days = useDaysUntil(content.eventDateIso);
  if (!countdown) return null;

  const arrived = days <= 0;

  return (
    <section
      className="inv4-pe-section inv4-pe-section--sand inv4-pe-countdown"
      data-section="countdown"
      aria-label="Odbrojavanje"
    >
      <div className="inv4-pe-section__inner">
        <div className="inv4-pe-countdown__wrap">
          {arrived ? (
            <p className="inv4-pe-countdown__arrived">
              {countdown.arrivedNote ?? "Danas je naš dan!"}
            </p>
          ) : (
            <p className="inv4-pe-countdown__display">
              {countdown.lead ? (
                <span className="inv4-pe-countdown__lead">{countdown.lead}</span>
              ) : null}
              <span className="inv4-pe-countdown__number">{days}</span>
              <span className="inv4-pe-countdown__unit">
                {countdownUnitLabel(days, countdown)}
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function CinematicSection({ content }: SectionProps) {
  const cinematic = content.cinematic;
  const { ref, scrollYProgress, reduce } = useScrub<HTMLElement>(["start end", "center center"]);
  const metrics = useRef({ height: 0, cover: 0 });
  const { scrollYProgress: coverProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const hold = useTransform(coverProgress, (progress) => {
    if (reduce) return 0;
    const { height, cover } = metrics.current;
    if (!height) return 0;
    const travel = Math.max(0, Math.min(height, cover) - 8);
    return Math.min(Math.max(progress, 0), travel / height) * height;
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.12, 1]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const cover = el.nextElementSibling;
      metrics.current.height = el.offsetHeight;
      metrics.current.cover = cover instanceof HTMLElement ? cover.offsetHeight : 0;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (el.nextElementSibling instanceof HTMLElement) observer.observe(el.nextElementSibling);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref, cinematic]);

  if (!cinematic) return null;

  return (
    <motion.section
      ref={ref}
      className="inv4-pe-cinematic"
      data-section="cinematic"
      aria-label="Fotografija"
      style={reduce ? undefined : { y: hold }}
    >
      <div className="inv4-pe-cinematic__mask">
        <motion.img
          className="inv4-pe-cinematic__img"
          src={cinematic.image.src}
          alt={cinematic.image.alt}
          draggable={false}
          style={{ scale }}
        />
        <div className="inv4-pe-cinematic__veil" aria-hidden="true" />
      </div>
    </motion.section>
  );
}

export function VenueSection({ content }: SectionProps) {
  const venues = content.venues;
  const { ref, scrollYProgress, reduce } = useScrub<HTMLElement>();
  const flowerY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [16, -10]);

  if (!venues) return null;

  return (
    <section
      ref={ref}
      className="inv4-pe-section inv4-pe-section--cream"
      data-section="venue"
      aria-label="Lokacija"
    >
      <motion.div className="inv4-pe-lily-float" style={{ y: flowerY }}>
        <AccentLily variant="b" className="inv4-pe-lily--venue" />
      </motion.div>
      <div className="inv4-pe-section__inner">
        <div className="inv4-pe-heading">
          <h2 className="inv4-pe-title">{venues.title}</h2>
          {venues.script ? <p className="inv4-pe-script">{venues.script}</p> : null}
        </div>

        {venues.places.map((place) => (
          <article key={place.id} className="inv4-pe-locale">
            <p className="inv4-pe-venue__kind">{place.kind}</p>
            <p className="inv4-pe-venue__name">{place.name}</p>
            {place.addressLines.map((line) => (
              <p key={line} className="inv4-pe-venue__addr">
                {line}
              </p>
            ))}
            {place.mapUrl ? (
              <a
                className="inv4-pe-link inv4-pe-locale__map"
                href={place.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                {place.mapLabel ?? "Prikaži na mapi"}
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export function RsvpSection({ content }: SectionProps) {
  const rsvp = content.rsvpBlock;
  const { ref: formRef, scrollYProgress, reduce } = useScrub<HTMLFormElement>([
    "start end",
    "center center",
  ]);
  const shadow = useTransform(
    scrollYProgress,
    [0, 1],
    reduce
      ? [
          "0 22px 52px -30px rgba(74, 62, 44, 0.5)",
          "0 22px 52px -30px rgba(74, 62, 44, 0.5)",
        ]
      : ["0 5px 15px rgba(74, 62, 44, 0.08)", "0 22px 52px -30px rgba(74, 62, 44, 0.5)"],
  );

  if (!rsvp) return null;

  return (
    <section
      className="inv4-pe-section inv4-pe-section--sand inv4-pe-rsvp"
      data-section="rsvp"
      aria-label="Potvrda dolaska"
    >
      <div className="inv4-pe-section__inner">
        <div className="inv4-pe-heading">
          <h2 className="inv4-pe-title">{rsvp.title}</h2>
          {rsvp.script ? <p className="inv4-pe-script">{rsvp.script}</p> : null}
        </div>

        {rsvp.body ? <p className="inv4-pe-body">{rsvp.body}</p> : null}

        <div className="inv4-pe-rsvp__wrap">
          <motion.form
            ref={formRef}
            className="inv4-pe-rsvp__form"
            style={{ boxShadow: shadow }}
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="inv4-pe-field">
              <span className="inv4-pe-field__label">{rsvp.nameLabel}</span>
              <input
                className="inv4-pe-field__input"
                type="text"
                name="name"
                placeholder={rsvp.namePlaceholder}
                autoComplete="name"
              />
            </label>

            <label className="inv4-pe-field">
              <span className="inv4-pe-field__label">{rsvp.guestsLabel}</span>
              <input
                className="inv4-pe-field__input"
                type="number"
                name="guests"
                min={1}
                placeholder={rsvp.guestsPlaceholder}
              />
            </label>

            <fieldset className="inv4-pe-field inv4-pe-field--choice">
              <legend className="inv4-pe-field__label">{rsvp.attendingLabel}</legend>
              <div className="inv4-pe-choice">
                <label className="inv4-pe-choice__option">
                  <input type="radio" name="attending" value="yes" />
                  <span className="inv4-pe-choice__pill">{rsvp.attendingYes}</span>
                </label>
                <label className="inv4-pe-choice__option">
                  <input type="radio" name="attending" value="no" />
                  <span className="inv4-pe-choice__pill">{rsvp.attendingNo}</span>
                </label>
              </div>
            </fieldset>

            <button className="inv4-pe-btn inv4-pe-rsvp__submit" type="submit">
              {rsvp.ctaLabel}
            </button>

            {rsvp.deadlineNote ? <p className="inv4-pe-rsvp__note">{rsvp.deadlineNote}</p> : null}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export function ClosingSection({ content }: SectionProps) {
  const closing = content.closing;
  if (!closing) return null;

  return (
    <section
      className="inv4-pe-section inv4-pe-section--cream inv4-pe-closing"
      data-section="closing"
      aria-label="Poruka"
    >
      <div className="inv4-pe-section__inner">
        {closing.script ? <p className="inv4-pe-script inv4-pe-closing__script">{closing.script}</p> : null}

        <blockquote className="inv4-pe-closing__quote">{closing.quote}</blockquote>

        {closing.signature ? (
          <p className="inv4-pe-closing__signature">{closing.signature}</p>
        ) : null}
      </div>
    </section>
  );
}
