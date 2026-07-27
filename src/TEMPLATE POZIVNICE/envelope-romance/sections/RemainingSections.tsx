import SlideIn from "../../shared/SlideIn";
import type { InvitationContent } from "../../shared/types";
import {
  envelopeRomanceFloral,
  envelopeRomanceVenueImage,
} from "../content";
import { useCountdown } from "../useCountdown";

type SectionProps = {
  content: InvitationContent;
};

export function MusicSection({ content }: SectionProps) {
  const title = content.music?.title ?? "Naša pesma";

  return (
    <section
      className="er-section er-section--wine"
      data-section="music"
      aria-label="Muzika"
    >
      <div className="er-section__inner">
        <SlideIn from="left">
          <p className="er-eyebrow er-eyebrow--light">muzika</p>
          <h2 className="er-title er-title--light">Naša pesma</h2>
        </SlideIn>
        <SlideIn from="right" delay={0.1}>
          <div className="er-music">
            <div className="er-music__disc" aria-hidden="true" />
            <p className="er-music__title">{title}</p>
            <p className="er-music__hint">Pusti dok čitaš našu priču</p>
            {content.music?.src ? (
              <audio
                className="er-music__audio"
                controls
                src={content.music.src}
              />
            ) : (
              <button type="button" className="er-btn er-btn--ghost" disabled>
                Uskoro dostupno
              </button>
            )}
          </div>
        </SlideIn>
      </div>
    </section>
  );
}

export function ParentsSection({ content }: SectionProps) {
  return (
    <section
      className="er-section er-section--wine er-section--flush"
      data-section="parents"
      aria-label="Porodice"
    >
      <div className="er-split">
        <SlideIn from="right" className="er-split__media">
          <img src={envelopeRomanceFloral} alt="" loading="lazy" />
        </SlideIn>
        <div className="er-split__copy">
          <SlideIn from="left">
            <p className="er-eyebrow er-eyebrow--light">porodice</p>
            <h2 className="er-title er-title--light">Uz blagoslov</h2>
          </SlideIn>
          {content.parentsNote ? (
            <SlideIn from="right" delay={0.1}>
              <p className="er-body er-body--light">{content.parentsNote}</p>
            </SlideIn>
          ) : null}
          {content.monogram ? (
            <SlideIn from="left" delay={0.16}>
              <p className="er-monogram">{content.monogram}</p>
            </SlideIn>
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
      className="er-section er-section--cream"
      data-section="countdown"
      aria-label="Odbrojavanje"
    >
      <div className="er-section__inner">
        <SlideIn from="left">
          <p className="er-eyebrow">odbrojavanje</p>
          <h2 className="er-title">Do našeg dana</h2>
          <p className="er-date-line">{content.eventDateLabel}</p>
        </SlideIn>
        <SlideIn from="right" delay={0.1}>
          {done ? (
            <p className="er-script">Dan je stigao</p>
          ) : (
            <div className="er-countdown" role="timer" aria-live="polite">
              {units.map((unit) => (
                <div key={unit.label} className="er-countdown__cell">
                  <span className="er-countdown__value">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="er-countdown__label">{unit.label}</span>
                </div>
              ))}
            </div>
          )}
        </SlideIn>
      </div>
    </section>
  );
}

export function VenueSection({ content }: SectionProps) {
  const venue = content.venue;
  if (!venue) return null;

  return (
    <section
      className="er-section er-section--cream"
      data-section="venue"
      aria-label="Lokacija"
    >
      <div className="er-section__inner">
        <SlideIn from="right">
          <p className="er-eyebrow">{venue.title}</p>
          <h2 className="er-title">Gde se vidimo</h2>
        </SlideIn>

        <SlideIn from="left" className="er-photo-frame er-photo-frame--wide" delay={0.08}>
          <img
            src={envelopeRomanceVenueImage}
            alt={venue.placeName}
            loading="lazy"
          />
        </SlideIn>

        <SlideIn from="right" delay={0.12}>
          <p className="er-venue__time">{venue.timeLabel}</p>
          <p className="er-venue__place">{venue.placeName}</p>
          {venue.address ? (
            <p className="er-body">{venue.address}</p>
          ) : null}
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
        </SlideIn>
      </div>
    </section>
  );
}

export function TimelineSection({ content }: SectionProps) {
  const items = content.timeline ?? [];

  return (
    <section
      className="er-section er-section--cream"
      data-section="timeline"
      aria-label="Raspored dana"
    >
      <div className="er-section__inner">
        <SlideIn from="left">
          <p className="er-eyebrow">raspored</p>
          <h2 className="er-title">Tok dana</h2>
        </SlideIn>

        <ol className="er-timeline">
          {items.map((item, index) => (
            <li key={item.id} className="er-timeline__item">
              <SlideIn
                from={index % 2 === 0 ? "right" : "left"}
                delay={index * 0.05}
                className="er-timeline__slide"
              >
                <span className="er-timeline__time">{item.time}</span>
                <div className="er-timeline__copy">
                  <h3 className="er-timeline__title">{item.title}</h3>
                  {item.description ? (
                    <p className="er-timeline__desc">{item.description}</p>
                  ) : null}
                </div>
              </SlideIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DressCodeSection({ content }: SectionProps) {
  const dress = content.dressCode;
  if (!dress) return null;

  return (
    <section
      className="er-section er-section--cream"
      data-section="dress-code"
      aria-label="Dress code"
    >
      <div className="er-section__inner">
        <SlideIn from="right">
          <p className="er-eyebrow">{dress.title}</p>
          <h2 className="er-title">{dress.label}</h2>
        </SlideIn>
        {dress.note ? (
          <SlideIn from="left" delay={0.1}>
            <p className="er-body">{dress.note}</p>
          </SlideIn>
        ) : null}
      </div>
    </section>
  );
}

export function GiftsSection({ content }: SectionProps) {
  const gifts = content.gifts;
  if (!gifts) return null;

  return (
    <section
      className="er-section er-section--wine"
      data-section="gifts"
      aria-label="Pokloni"
    >
      <div className="er-section__inner">
        <SlideIn from="left">
          <p className="er-eyebrow er-eyebrow--light">pokloni</p>
          <h2 className="er-title er-title--light">{gifts.title}</h2>
        </SlideIn>
        <SlideIn from="right" delay={0.1}>
          <p className="er-body er-body--light">{gifts.body}</p>
        </SlideIn>
      </div>
    </section>
  );
}

export function HotelsSection({ content }: SectionProps) {
  const hotels = content.hotels;
  if (!hotels) return null;

  return (
    <section
      className="er-section er-section--wine"
      data-section="hotels"
      aria-label="Smeštaj"
    >
      <div className="er-section__inner">
        <SlideIn from="right">
          <p className="er-eyebrow er-eyebrow--light">smeštaj</p>
          <h2 className="er-title er-title--light">{hotels.title}</h2>
        </SlideIn>
        <ul className="er-hotels">
          {hotels.items.map((hotel, index) => (
            <li key={hotel.id} className="er-hotels__item">
              <SlideIn
                from={index % 2 === 0 ? "left" : "right"}
                delay={0.08 + index * 0.06}
              >
                <h3 className="er-hotels__name">{hotel.name}</h3>
                {hotel.detailUrl ? (
                  <a className="er-link" href={hotel.detailUrl}>
                    {hotel.ctaLabel ?? "Više informacija"}
                  </a>
                ) : null}
              </SlideIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RsvpSection({ content }: SectionProps) {
  const rsvp = content.rsvp;
  if (!rsvp) return null;

  return (
    <section
      className="er-section er-section--wine"
      data-section="rsvp"
      aria-label="RSVP"
    >
      <div className="er-section__inner">
        <SlideIn from="left">
          <p className="er-eyebrow er-eyebrow--light">rsvp</p>
          <h2 className="er-title er-title--light">{rsvp.title}</h2>
        </SlideIn>
        <SlideIn from="right" delay={0.1}>
          <p className="er-body er-body--light">{rsvp.deadlineLabel}</p>
          <a className="er-btn er-btn--cream" href={rsvp.href ?? "#"}>
            {rsvp.ctaLabel}
          </a>
        </SlideIn>
      </div>
    </section>
  );
}

export function ClosingSection({ content }: SectionProps) {
  const { couple, closingMessage, closingImage, monogram } = content;
  const joiner = couple.joiner ?? "&";

  return (
    <section
      className="er-closing"
      data-section="closing"
      aria-label="Završetak"
    >
      {closingImage ? (
        <SlideIn from="right" className="er-closing__photo">
          <img src={closingImage.src} alt={closingImage.alt} loading="lazy" />
          <div className="er-closing__veil" aria-hidden="true" />
        </SlideIn>
      ) : null}
      <div className="er-closing__copy">
        <SlideIn from="left">
          {monogram ? <p className="er-monogram er-monogram--light">{monogram}</p> : null}
          <p className="er-script er-script--light">
            {closingMessage ?? "Hvala vam"}
          </p>
        </SlideIn>
        <SlideIn from="right" delay={0.12}>
          <p className="er-closing__names">
            {couple.partnerOne} {joiner} {couple.partnerTwo}
          </p>
        </SlideIn>
      </div>
    </section>
  );
}
