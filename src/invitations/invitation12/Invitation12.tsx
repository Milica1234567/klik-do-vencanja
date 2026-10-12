import { useEffect, useRef, type ReactNode } from "react";

import hero from "./assets/hero-photo.jpg";
import hands from "./assets/hands.jpg";
import soon from "./assets/soon-photo.jpg";
import "./Invitation12.css";

function useSoftReveals(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.classList.add("motion");
    const nodes = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.45 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [rootRef]);
}

function Reveal({
  kind,
  className = "",
  children,
}: {
  kind: "heading" | "stamp" | "cherries";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className} data-reveal={kind}>
      {children}
    </div>
  );
}

function StoryStamp() {
  return (
    <svg className="story-stamp" viewBox="0 0 80 96" aria-hidden="true">
      <rect x="3" y="3" width="74" height="90" fill="#f4efe6" />
      <rect x="9" y="9" width="62" height="78" fill="#6e7c55" />
      <path d="M14 58c8-14 16-8 22-18 7 7 14 5 20-4 5 9 8 18 8 26H14z" fill="#4d5c3e" />
      <circle cx="28" cy="34" r="7" fill="#e7efd4" />
      <circle cx="46" cy="28" r="4.5" fill="#f3e7b8" />
      <path d="M18 66c10-8 16-5 22-12" fill="none" stroke="#e7efd4" strokeWidth="1.2" />
    </svg>
  );
}

function PaperSprig() {
  return (
    <svg className="paper-sprig" viewBox="0 0 90 70" aria-hidden="true">
      <path
        d="M8 58c18-6 28-22 34-40 2 16 10 28 24 36"
        fill="none"
        stroke="#f4efe6"
        strokeWidth="1.2"
      />
      <path d="M40 28c8-8 14-8 20-4-6 2-10 8-12 14-4-2-6-6-8-10z" fill="#f4efe6" />
      <path d="M34 40c-8-2-12 2-14 8 6 0 10-2 14-8z" fill="#f4efe6" />
      <path d="M52 46c8-1 12 4 12 10-6-1-10-4-12-10z" fill="#f4efe6" />
    </svg>
  );
}

function CeremonyBadges() {
  return (
    <div className="ceremony-badges" aria-hidden="true">
      <svg className="badge badge-red" viewBox="0 0 64 64">
        <path
          d="M32 56C16 42 8 33 8 23 8 14 15 8 23 8c5 0 7 2 9 6 2-4 4-6 9-6 8 0 15 6 15 15 0 10-8 19-24 33z"
          fill="#8d2433"
        />
      </svg>
      <svg className="badge badge-cream" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="26" fill="#f3efe4" />
        <path
          d="M32 46c-8-7-14-12-14-18 0-4 3-7 7-7 2 0 4 1 7 4 3-3 5-4 7-4 4 0 7 3 7 7 0 6-6 11-14 18z"
          fill="#8d2433"
        />
      </svg>
    </div>
  );
}

function Cherries() {
  return (
    <svg className="cherries" viewBox="0 0 90 78" aria-hidden="true">
      <path d="M48 28c2-14 10-22 22-26" fill="none" stroke="#2a3a24" strokeWidth="1.6" />
      <path d="M46 30c-2-12-12-18-24-16" fill="none" stroke="#2a3a24" strokeWidth="1.4" />
      <path d="M40 18c6 2 10 6 12 12" fill="none" stroke="#3d5a32" strokeWidth="1.2" />
      <ellipse cx="30" cy="50" rx="16" ry="18" fill="#9a2433" />
      <ellipse cx="58" cy="46" rx="17" ry="19" fill="#b02b38" />
      <ellipse cx="24" cy="44" rx="5" ry="3" fill="#e7b7b4" opacity="0.45" />
    </svg>
  );
}

function Bloom({ tone }: { tone: "green" | "blue" | "gray" | "cream" }) {
  return (
    <svg className={`bloom bloom--${tone}`} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 34c0-10 6-16 6-22 6 4 10 12 8 20-6 0-10 1-14 2z" />
      <path d="M32 34c8-4 16-2 20 4-8 2-14 1-20-4z" />
      <path d="M32 34c6 6 8 14 4 20-6-4-8-12-4-20z" />
      <path d="M32 34c-8 4-16 2-18-6 8-1 14 1 18 6z" />
      <circle cx="32" cy="34" r="3.2" />
    </svg>
  );
}

function OliveInvitation() {
  const rootRef = useRef<HTMLElement>(null);
  useSoftReveals(rootRef);

  return (
    <main className="inv12" ref={rootRef}>
      <section className="hero">
        <img className="hero-image" src={hero} alt="" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Olivia</h1>
          <p>June 26, 2026</p>
        </div>
      </section>

      <section className="story olive" aria-labelledby="story-title">
        <div className="story-heading-row">
          <Reveal kind="heading">
            <h2 id="story-title">
              Our
              <br />
              Story
            </h2>
          </Reveal>
          <Reveal kind="stamp" className="story-stamp-wrap">
            <StoryStamp />
          </Reveal>
        </div>

        <div className="story-copy">
          <p className="story-kicker">
            Наше кохання не
            <br />
            поспішало
          </p>
          <p>
            Воно зростало у розмовах, спільних подорожах та тихих вечорах, ставши нашою опорою. Ми
            віримо, що найпрекрасніші речі в житті потребують часу, щоб розквітнути.
          </p>
          <p>
            Сьогодні ми відкриваємо нову сторінку нашої спільної книги. Дякуємо, що ви поруч у цей
            день, коли наша історія стає частиною чогось більшого.
          </p>
        </div>

        <figure className="story-photo">
          <img src={hands} alt="Olivia і Mark тримаються за руки" />
        </figure>
      </section>

      <section className="details-long forest" aria-label="Wedding details">
        <div className="details-grid">
          <div className="details-left">
            <Reveal kind="heading">
              <h2>
                Wedding
                <br />
                details
              </h2>
            </Reveal>
            <p className="details-meta">
              Розклад
              <br />
              дня
            </p>
            <p className="details-date">June 26, 2026</p>
          </div>

          <div className="details-right">
            <div className="location-block">
              <Reveal kind="heading">
                <h2>Location</h2>
              </Reveal>
              <p className="place">Shelest Forest Resort</p>
              <p>14 Damska St,</p>
              <p>Khotyanivka,</p>
              <p>Kyiv Region,</p>
              <p>Ukraine, 07360</p>
              <PaperSprig />
            </div>

            <div className="ceremony-block">
              <CeremonyBadges />
              <Reveal kind="heading">
                <h2>Ceremony</h2>
              </Reveal>
              <p>14:00 приїзд гостей</p>
              <p>15:00 початок церемонії</p>
            </div>

            <div className="banquet-block">
              <Reveal kind="heading">
                <h2>
                  Wedding
                  <br />
                  Banquet
                </h2>
              </Reveal>
              <p className="banquet-time">16:00</p>
              <p>Вечеря, музика та нескінченні розмови під зірками</p>
              <Reveal kind="cherries">
                <Cherries />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="rsvp-area olive" aria-labelledby="rsvp-title">
        <div className="rsvp-card">
          <Reveal kind="heading">
            <h2 id="rsvp-title">RSVP</h2>
          </Reveal>
          <p>
            Будь ласка, повідомте нам, чи зможете ви розділити з нами цей особливий день, натиснувши
            на посилання.
          </p>
          <p className="rsvp-by">
            Просимо дати відповідь до
            <a href="#ending">10 липня</a>
          </p>
        </div>
      </section>

      <section className="dress olive" aria-labelledby="dress-title">
        <div className="dress-sheet">
          <Reveal kind="heading">
            <h2 id="dress-title">Dress code</h2>
          </Reveal>
          <p>
            Ми будемо вдячні, якщо ви підтримаєте атмосферу нашого свята, обравши вбрання у
            природних відтінках: оливковому, бежевому або сірому.
          </p>
          <p>І нехай ваш комфорт стане частиною нашого затишку</p>
          <div className="dress-flowers">
            <Bloom tone="green" />
            <Bloom tone="blue" />
            <Bloom tone="gray" />
            <Bloom tone="cream" />
          </div>
        </div>
      </section>

      <section className="soon" aria-labelledby="soon-title">
        <img className="soon-photo" src={soon} alt="" />
        <div className="soon-card">
          <Reveal kind="heading">
            <h2 id="soon-title">See you soon</h2>
          </Reveal>
          <p className="soon-place">Shelest Forest Resort</p>
          <p>вул. Дамська, 14, Хотянівка</p>
          <p>Київська область, Україна,</p>
          <p>07360</p>
          <div className="soon-map">
            <iframe
              title="Shelest Forest Resort"
              src="https://maps.google.com/maps?q=Shelest+Forest+Resort+Khotyanivka&z=14&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="ending olive" id="ending">
        <p>
          Якщо у вас виникли будь-які запитання — звертайтесь, будь ласка, до нашого координатора
          Ольги
        </p>
        <p className="ending-phone">+38 (097) xxx xx xx</p>
        <Reveal kind="heading">
          <h2>
            Olivia &amp;
            <br />
            Mark
          </h2>
        </Reveal>
      </section>
    </main>
  );
}

export default OliveInvitation;
