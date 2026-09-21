import { useState, type FormEvent } from "react";

import type { InvitationContent } from "../../shared/types";
import ErReveal from "../ErReveal";
import {
  envelopeRomanceParentsImage,
  envelopeRomanceVenueImage,
} from "../content";
import { useCountdown } from "../useCountdown";

const RSVP_FORMSPREE = "https://formspree.io/f/xwvgrvvw";

type SectionProps = {
  content: InvitationContent;
};

export function ParentsSection({ content }: SectionProps) {
  return (
    <section
      className="inv2-er-section inv2-er-section--wine inv2-er-section--flush"
      data-section="parents"
      aria-label="Porodice"
    >
      <div className="inv2-er-split">
        <ErReveal kind="curtain" className="inv2-er-split__media" drift={false}>
          <img src={envelopeRomanceParentsImage} alt="" loading="lazy" />
        </ErReveal>
        <div className="inv2-er-split__copy">
          <ErReveal kind="float">
            <h2 className="inv2-er-title inv2-er-title--light">Zajedno</h2>
          </ErReveal>
          {content.parentsNote ? (
            <ErReveal kind="float" delay={0.12}>
              <p className="inv2-er-body inv2-er-body--light">{content.parentsNote}</p>
            </ErReveal>
          ) : null}
          {content.monogram ? (
            <ErReveal kind="bounce" delay={0.22}>
              <p className="inv2-er-monogram">{content.monogram}</p>
            </ErReveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function CountdownSection({ content }: SectionProps) {
  const { days, hours, minutes, seconds, done } = useCountdown(
    content.eventDateIso,
  );

  const units = [
    { label: "dana", value: days },
    { label: "sati", value: hours },
    { label: "min", value: minutes },
    { label: "sek", value: seconds },
  ];

  return (
    <section
      className="inv2-er-section inv2-er-section--cream inv2-er-section--tight-bottom"
      data-section="countdown"
      aria-label="Odbrojavanje"
    >
      <div className="inv2-er-section__inner">
        <ErReveal kind="float">
          <p className="inv2-er-eyebrow">odbrojavanje</p>
          <h2 className="inv2-er-title">Do našeg dana</h2>
          <p className="inv2-er-date-line">{content.eventDateLabel}</p>
        </ErReveal>
        <ErReveal kind="float" delay={0.18}>
          {done ? (
            <p className="inv2-er-script">Dan je stigao</p>
          ) : (
            <div className="inv2-er-countdown" role="timer" aria-live="polite">
              {units.map((unit) => (
                <div key={unit.label} className="inv2-er-countdown__cell">
                  <span className="inv2-er-countdown__value">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="inv2-er-countdown__label">{unit.label}</span>
                </div>
              ))}
            </div>
          )}
        </ErReveal>
      </div>
    </section>
  );
}

export function VenueSection({ content }: SectionProps) {
  const venue = content.venue;
  if (!venue) return null;

  return (
    <section
      className="inv2-er-section inv2-er-section--cream inv2-er-section--venue"
      data-section="venue"
      aria-label="Lokacija"
    >
      <div className="inv2-er-section__inner inv2-er-venue__intro">
        <ErReveal kind="float">
          <p className="inv2-er-eyebrow">{venue.title}</p>
          <h2 className="inv2-er-title">Gde se vidimo</h2>
        </ErReveal>
      </div>

      <ErReveal kind="curtain" className="inv2-er-venue__bleed" delay={0.08} drift={false}>
        <img
          src={envelopeRomanceVenueImage}
          alt={venue.placeName}
          loading="lazy"
        />
      </ErReveal>

      <div className="inv2-er-section__inner inv2-er-venue__meta">
        <ErReveal kind="float" delay={0.1}>
          <p className="inv2-er-venue__time">{venue.timeLabel}</p>
          <p className="inv2-er-venue__place">{venue.placeName}</p>
          {venue.address ? <p className="inv2-er-body">{venue.address}</p> : null}
          {venue.mapUrl ? (
            <a
              className="inv2-er-btn inv2-er-btn--solid"
              href={venue.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              {venue.mapCtaLabel ?? "Pogledaj lokaciju"}
            </a>
          ) : null}
        </ErReveal>
      </div>
    </section>
  );
}

export function DressCodeSection({ content }: SectionProps) {
  const dress = content.dressCode;
  if (!dress) return null;

  return (
    <section
      className="inv2-er-section inv2-er-section--wine inv2-er-dresscode"
      data-section="dress-code"
      aria-label="Dress code"
    >
      <div className="inv2-er-section__inner inv2-er-dresscode__inner">
        <ErReveal kind="float">
          <p className="inv2-er-eyebrow inv2-er-eyebrow--light">{dress.title}</p>
        </ErReveal>
        <ErReveal kind="float" delay={0.14}>
          <p className="inv2-er-dresscode__script">{dress.label}</p>
        </ErReveal>
        {dress.note ? (
          <ErReveal kind="float" delay={0.28}>
            <p className="inv2-er-dresscode__script inv2-er-dresscode__script--accent">
              {dress.note}
            </p>
          </ErReveal>
        ) : null}
      </div>
    </section>
  );
}

export function TimelineSection({ content }: SectionProps) {
  const items = content.timeline ?? [];

  return (
    <section
      className="inv2-er-section inv2-er-section--cream inv2-er-section--tight-y"
      data-section="timeline"
      aria-label="Raspored dana"
    >
      <div className="inv2-er-section__inner">
        <ErReveal kind="float">
          <p className="inv2-er-eyebrow">raspored</p>
          <h2 className="inv2-er-title">Tok dana</h2>
        </ErReveal>

        <ol className="inv2-er-timeline">
          {items.map((item, index) => (
            <li key={item.id} className="inv2-er-timeline__item">
              <ErReveal
                kind="float"
                delay={0.08 + index * 0.1}
                className="inv2-er-timeline__slide"
              >
                <span className="inv2-er-timeline__time">{item.time}</span>
                <p className="inv2-er-timeline__line">
                  <span className="inv2-er-timeline__title">{item.title}</span>
                </p>
              </ErReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HotelsSection({ content }: SectionProps) {
  const hotels = content.hotels;
  if (!hotels) return null;

  return (
    <section
      className="inv2-er-section inv2-er-section--wine"
      data-section="hotels"
      aria-label="Smeštaj"
    >
      <div className="inv2-er-section__inner">
        <ErReveal kind="float">
          <p className="inv2-er-eyebrow inv2-er-eyebrow--light">smeštaj</p>
          <h2 className="inv2-er-title inv2-er-title--light">{hotels.title}</h2>
        </ErReveal>
        <ul className="inv2-er-hotels">
          {hotels.items.map((hotel, index) => {
            const href = hotel.mapUrl ?? hotel.detailUrl;
            return (
              <li key={hotel.id} className="inv2-er-hotels__item">
                <ErReveal kind="float" delay={0.06 + index * 0.05}>
                  <h3 className="inv2-er-hotels__name">{hotel.name}</h3>
                  {href ? (
                    <a
                      className="inv2-er-btn inv2-er-btn--ghost inv2-er-btn--compact"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {hotel.ctaLabel ?? "Prikaži na mapi"}
                    </a>
                  ) : null}
                </ErReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function RsvpSection({ content }: SectionProps) {
  const rsvp = content.rsvp;
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );

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
    <section
      className="inv2-er-section inv2-er-section--wine"
      data-section="rsvp"
      aria-label="RSVP"
    >
      <div className="inv2-er-section__inner">
        <ErReveal kind="float">
          <p className="inv2-er-eyebrow inv2-er-eyebrow--light">rsvp</p>
          <h2 className="inv2-er-title inv2-er-title--light">{rsvp.title}</h2>
          <p className="inv2-er-body inv2-er-body--light">{rsvp.deadlineLabel}</p>
        </ErReveal>
        <ErReveal kind="float" delay={0.08} className="inv2-er-rsvp-wrap">
          {status === "ok" ? (
            <p className="inv2-er-script inv2-er-script--light">Hvala, primili smo potvrdu</p>
          ) : (
            <form className="inv2-er-rsvp" onSubmit={onSubmit}>
              <div className="inv2-er-rsvp__grid">
                <label className="inv2-er-rsvp__field">
                  <span>Ime i prezime</span>
                  <input name="ime" type="text" required autoComplete="name" placeholder="Vaše ime" />
                </label>
                <label className="inv2-er-rsvp__field">
                  <span>Email</span>
                  <input name="email" type="email" required autoComplete="email" placeholder="email@primer.rs" />
                </label>
              </div>
              <label className="inv2-er-rsvp__field">
                <span>Broj gostiju</span>
                <input name="gosti" type="number" min={1} max={20} defaultValue={1} required />
              </label>
              <div className="inv2-er-rsvp__pills" role="radiogroup" aria-label="Dolazite li?">
                <label className="inv2-er-rsvp__pill">
                  <input type="radio" name="dolazak" value="Da" defaultChecked required />
                  <span>Da, dolazim</span>
                </label>
                <label className="inv2-er-rsvp__pill">
                  <input type="radio" name="dolazak" value="Ne" />
                  <span>Ne mogu</span>
                </label>
              </div>
              <label className="inv2-er-rsvp__field">
                <span>Poruka (opciono)</span>
                <textarea name="poruka" rows={3} placeholder="Ostavite poruku…" />
              </label>
              <button
                type="submit"
                className="inv2-er-btn inv2-er-btn--cream inv2-er-rsvp__submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Šaljem…" : rsvp.ctaLabel}
              </button>
              {status === "error" ? (
                <p className="inv2-er-rsvp__error">Nešto nije uspelo. Pokušajte ponovo.</p>
              ) : null}
            </form>
          )}
        </ErReveal>
      </div>
    </section>
  );
}

export function ClosingSection({ content }: SectionProps) {
  const { couple, closingMessage, closingImage, monogram } = content;
  const joiner = couple.joiner ?? "&";

  return (
    <section
      className="inv2-er-closing"
      data-section="closing"
      aria-label="Završetak"
    >
      {closingImage ? (
        <ErReveal kind="zoomSoft" className="inv2-er-closing__photo" drift={false}>
          <img src={closingImage.src} alt={closingImage.alt} loading="lazy" />
          <div className="inv2-er-closing__veil" aria-hidden="true" />
        </ErReveal>
      ) : null}
      <div className="inv2-er-closing__copy">
        <ErReveal kind="bounce">
          {monogram ? (
            <p className="inv2-er-monogram inv2-er-monogram--light">{monogram}</p>
          ) : null}
          <p className="inv2-er-script inv2-er-script--light">
            {closingMessage ?? "Hvala vam"}
          </p>
        </ErReveal>
        <ErReveal kind="fade" delay={0.1}>
          <p className="inv2-er-closing__names">
            {couple.partnerOne} {joiner} {couple.partnerTwo}
          </p>
        </ErReveal>
      </div>
    </section>
  );
}
