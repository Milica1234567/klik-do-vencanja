import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import SlideIn from "../../shared/SlideIn";
import { AccentLily, PearlDrop } from "../decor";
import type { PearlEleganceContent } from "../content";
import { usePearlReveal } from "../reveal";

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
    // Re-check hourly so the number stays accurate without a busy timer.
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
  const revealed = usePearlReveal();

  if (!invite) return null;

  return (
    <section
      className="inv4-pe-section inv4-pe-section--cream"
      data-section="invite"
      aria-label="Poziv"
    >
      <AccentLily variant="a" className="inv4-pe-lily--invite" />
      <div className="inv4-pe-section__inner">
        <SlideIn from="right" className="inv4-pe-heading" active={revealed}>
          <h2 className="inv4-pe-title">{invite.title}</h2>
          {invite.script ? <p className="inv4-pe-script">{invite.script}</p> : null}
        </SlideIn>

        <SlideIn from="left" delay={0.08} active={revealed}>
          <p className="inv4-pe-editorial">{invite.body}</p>
        </SlideIn>
      </div>
    </section>
  );
}

export function CalendarSection({ content }: SectionProps) {
  const calendar = content.calendar;
  const revealed = usePearlReveal();
  if (!calendar) return null;

  return (
    <section
      className="inv4-pe-section inv4-pe-section--cream inv4-pe-section--tight"
      data-section="calendar"
      aria-label="Datum"
    >
      <AccentLily variant="b" className="inv4-pe-lily--calendar" />
      <div className="inv4-pe-section__inner">
        <SlideIn from="right" className="inv4-pe-heading" active={revealed}>
          <h2 className="inv4-pe-title">{calendar.monthLabel}</h2>
          {calendar.script ? (
            <p className="inv4-pe-script">{calendar.script}</p>
          ) : null}
        </SlideIn>

        <SlideIn from="left" delay={0.08} active={revealed}>
          <div className="inv4-pe-calendar" role="list">
            {calendar.days.map((day) => (
              <motion.div
                key={day.id}
                role="listitem"
                className={`inv4-pe-calendar__day${
                  day.highlight ? " inv4-pe-calendar__day--active" : ""
                }`}
                initial={false}
                animate={
                  day.highlight && revealed
                    ? { scale: [1, 1.05, 1] }
                    : { scale: 1 }
                }
                transition={
                  day.highlight
                    ? { duration: 1.4, ease: "easeInOut", delay: 0.5 }
                    : undefined
                }
              >
                <span className="inv4-pe-calendar__weekday">{day.weekday}</span>
                <span className="inv4-pe-calendar__date">{day.day}</span>
                {day.highlight ? (
                  <PearlDrop className="inv4-pe-calendar__drop" />
                ) : null}
              </motion.div>
            ))}
          </div>
        </SlideIn>
      </div>
    </section>
  );
}

/**
 * Countdown — an elegant, integrated "days until the wedding" moment.
 * Driven purely by eventDateIso so it needs no extra data to work.
 */
export function CountdownSection({ content }: SectionProps) {
  const countdown = content.countdown;
  const revealed = usePearlReveal();
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
        <SlideIn from="right" className="inv4-pe-heading" active={revealed}>
          <h2 className="inv4-pe-title">{countdown.title}</h2>
          {countdown.script ? (
            <p className="inv4-pe-script">{countdown.script}</p>
          ) : null}
        </SlideIn>

        <SlideIn from="left" delay={0.08} className="inv4-pe-countdown__wrap" active={revealed}>
          {arrived ? (
            <p className="inv4-pe-countdown__arrived">
              {countdown.arrivedNote ?? "Danas je naš dan!"}
            </p>
          ) : (
            <p className="inv4-pe-countdown__display">
              {countdown.lead ? (
                <span className="inv4-pe-countdown__lead">{countdown.lead}</span>
              ) : null}
              <motion.span
                key={days}
                className="inv4-pe-countdown__number"
                aria-hidden="true"
                initial={{ opacity: 0, y: 28, scale: 0.82 }}
                animate={
                  revealed
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 28, scale: 0.82 }
                }
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                {days}
              </motion.span>
              <span className="inv4-pe-countdown__unit">
                {countdownUnitLabel(days, countdown)}
              </span>
            </p>
          )}
        </SlideIn>
      </div>
    </section>
  );
}

/**
 * Full-bleed cinematic photo interlude with a gentle parallax lift as the
 * viewer scrolls — the "wedding film" moment between sections.
 */
export function CinematicSection({ content }: SectionProps) {
  const cinematic = content.cinematic;
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.04, 1.12]);

  if (!cinematic) return null;

  return (
    <section
      ref={ref}
      className="inv4-pe-cinematic"
      data-section="cinematic"
      aria-label="Fotografija"
    >
      <motion.img
        className="inv4-pe-cinematic__img"
        src={cinematic.image.src}
        alt={cinematic.image.alt}
        draggable={false}
        style={reduceMotion ? undefined : { y, scale }}
      />
      <div className="inv4-pe-cinematic__veil" aria-hidden="true" />
      {cinematic.caption ? (
        <motion.p
          className="inv4-pe-cinematic__caption"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {cinematic.caption}
        </motion.p>
      ) : null}
    </section>
  );
}

export function VenueSection({ content }: SectionProps) {
  const venues = content.venues;
  const revealed = usePearlReveal();

  if (!venues) return null;

  return (
    <section
      className="inv4-pe-section inv4-pe-section--cream"
      data-section="venue"
      aria-label="Lokacija"
    >
      <AccentLily variant="b" className="inv4-pe-lily--venue" />
      <div className="inv4-pe-section__inner">
        <SlideIn from="right" className="inv4-pe-heading" active={revealed}>
          <h2 className="inv4-pe-title">{venues.title}</h2>
          {venues.script ? <p className="inv4-pe-script">{venues.script}</p> : null}
        </SlideIn>

        {venues.places.map((place, index) => (
          <SlideIn
            key={place.id}
            from="left"
            delay={0.08 + index * 0.06}
            active={revealed}
          >
            <article className="inv4-pe-locale">
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
          </SlideIn>
        ))}
      </div>
    </section>
  );
}

export function DressCodeSection({ content }: SectionProps) {
  const palette = content.palette;
  const revealed = usePearlReveal();
  if (!palette) return null;

  return (
    <section
      className="inv4-pe-section inv4-pe-section--cream"
      data-section="dress-code"
      aria-label="Odevanje"
    >
      <div className="inv4-pe-section__inner">
        <SlideIn from="right" className="inv4-pe-heading" active={revealed}>
          <h2 className="inv4-pe-title">{palette.title}</h2>
        </SlideIn>

        {palette.note ? (
          <SlideIn from="left" delay={0.06} active={revealed}>
            <p className="inv4-pe-body">{palette.note}</p>
          </SlideIn>
        ) : null}
      </div>
    </section>
  );
}

/**
 * RSVP — visual only for now. Renders a real, elegant form layout but the
 * submit handler is intentionally inert until wiring is added later.
 */
export function RsvpSection({ content }: SectionProps) {
  const rsvp = content.rsvpBlock;
  const revealed = usePearlReveal();
  if (!rsvp) return null;

  return (
    <section
      className="inv4-pe-section inv4-pe-section--sand inv4-pe-rsvp"
      data-section="rsvp"
      aria-label="Potvrda dolaska"
    >
      <div className="inv4-pe-section__inner">
        <SlideIn from="right" className="inv4-pe-heading" active={revealed}>
          <h2 className="inv4-pe-title">{rsvp.title}</h2>
          {rsvp.script ? <p className="inv4-pe-script">{rsvp.script}</p> : null}
        </SlideIn>

        {rsvp.body ? (
          <SlideIn from="left" delay={0.06} active={revealed}>
            <p className="inv4-pe-body">{rsvp.body}</p>
          </SlideIn>
        ) : null}

        <SlideIn from="left" delay={0.1} className="inv4-pe-rsvp__wrap" active={revealed}>
          <form
            className="inv4-pe-rsvp__form"
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

            {rsvp.deadlineNote ? (
              <p className="inv4-pe-rsvp__note">{rsvp.deadlineNote}</p>
            ) : null}
          </form>
        </SlideIn>
      </div>
    </section>
  );
}

/**
 * Closing — a spacious, romantic quote with soft pearl accents.
 */
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
        {closing.script ? (
          <motion.p
            className="inv4-pe-script inv4-pe-closing__script"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {closing.script}
          </motion.p>
        ) : null}

        <motion.blockquote
          className="inv4-pe-closing__quote"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          {closing.quote}
        </motion.blockquote>

        {closing.signature ? (
          <motion.p
            className="inv4-pe-closing__signature"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
          >
            {closing.signature}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
