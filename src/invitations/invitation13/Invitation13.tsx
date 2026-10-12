import { useEffect, useRef, useState } from "react";

import hero from "./assets/hero.jpg";
import collageA from "./assets/collage-a.jpg";
import collageB from "./assets/collage-b.jpg";
import collageC from "./assets/collage-c.jpg";
import veil from "./assets/veil.jpg";
import dome from "./assets/dome.jpg";
import "./Invitation13.css";

const EVENT = new Date("2027-09-12T16:00:00+02:00").getTime();

const DRESS_COLORS = [
  { name: "Crna", hex: "#1c1916" },
  { name: "Teget", hex: "#243044" },
  { name: "Šampanjac", hex: "#cbb892" },
  { name: "Smaragd", hex: "#1d3b34" },
  { name: "Grafit", hex: "#5c564e" },
];

const MAPS = {
  church: "https://maps.google.com/?q=Crkva+Svetog+Luke+Beograd",
  magazin: "https://maps.google.com/?q=Restoran+Magazin+Beograd",
  moskva: "https://maps.google.com/?q=Hotel+Moskva+Beograd",
  hotel: "https://www.google.com/search?q=Hotel+Moskva+Beograd+rezervacija",
};

function HeartKey() {
  return (
    <svg viewBox="0 0 64 86" aria-hidden="true">
      <path
        d="M32 6.5a6.2 6.2 0 0 0-6.2 6.2V20"
        fill="none"
        stroke="#b08948"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M32 6.5a6.2 6.2 0 0 1 6.2 6.2V20"
        fill="none"
        stroke="#b08948"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M22 20h20" stroke="#b08948" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M32 76C15.5 59 7 46.5 10.2 32.2 12.6 21.6 21 18.2 32 29.2 43 18.2 51.4 21.6 53.8 32.2 57 46.5 48.5 59 32 76z"
        fill="#f0ddb4"
        stroke="#a48445"
        strokeWidth="1.25"
      />
      <path
        d="M32 72.5C18 58 11 47 13.6 34.5 15.5 25.6 22.4 22.8 32 32.4 41.6 22.8 48.5 25.6 50.4 34.5 53 47 46 58 32 72.5z"
        fill="none"
        stroke="#c6a56a"
        strokeWidth="0.6"
        opacity="0.85"
      />
      <circle cx="32" cy="44" r="3.4" fill="none" stroke="#7c6132" strokeWidth="1.25" />
      <path d="M32 47.4v8" stroke="#7c6132" strokeWidth="1.45" strokeLinecap="round" />
      <path d="M32 78.2l2.3 4.2h-4.6z" fill="#c6a56a" />
    </svg>
  );
}

function Program() {
  const ref = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const lock = lockRef.current;
    if (!root || !lock) return;

    const shown = { current: -1 };
    const goal = { current: 0 };
    const moving = { current: false };
    let timer = 0;

    const list = () => [...root.querySelectorAll<HTMLElement>(".inv13-dot")];

    const nearest = () => {
      const dots = list();
      const focus = window.innerHeight * 0.42;
      let best = 0;
      let bestDist = Infinity;
      dots.forEach((dot, index) => {
        const dist = Math.abs(dot.getBoundingClientRect().top - focus);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      return best;
    };

    const apply = (index: number) => {
      const dots = list();
      const dot = dots[index];
      if (!dot) return;
      const rootRect = root.getBoundingClientRect();
      const rect = dot.getBoundingClientRect();
      lock.style.top = `${rect.top + rect.height / 2 - rootRect.top}px`;
      dots.forEach((item, i) => item.classList.toggle("is-here", i === index));
    };

    const step = () => {
      if (shown.current === goal.current) {
        moving.current = false;
        return;
      }
      moving.current = true;
      shown.current += shown.current < goal.current ? 1 : -1;
      apply(shown.current);
      window.clearTimeout(timer);
      timer = window.setTimeout(step, 280);
    };

    const onScroll = () => {
      goal.current = nearest();
      if (shown.current < 0) {
        shown.current = goal.current;
        lock.style.transition = "none";
        apply(shown.current);
        requestAnimationFrame(() => {
          lock.style.transition = "";
        });
        return;
      }
      if (!moving.current && shown.current !== goal.current) step();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section aria-label="Program dana">
      <div className="inv13-cal">
        <p>Septembar 2027</p>
        <div className="inv13-cal__days">
          <span>10</span>
          <span>11</span>
          <span className="inv13-cal__heart" aria-label="12">
            <svg viewBox="0 0 32 30" aria-hidden="true">
              <path
                d="M16 27C6 18 2 13 2 8.2 2 4.4 4.8 2 8 2c2.2 0 3.8 1.1 4.8 3C13.8 3.1 15.4 2 17.6 2 20.8 2 23.6 4.4 23.6 8.2 23.6 13 19.6 18 16 27z"
                fill="#a88b5a"
              />
            </svg>
            <b>12</b>
          </span>
          <span>13</span>
          <span>14</span>
        </div>
      </div>
      <div className="inv13-tl" ref={ref}>
        <div className="inv13-heartkey" ref={lockRef} aria-hidden="true">
          <HeartKey />
        </div>
        <ol>
          {EVENTS.map((event) => (
            <li className={`inv13-event inv13-event--${event.side}`} key={event.time + event.title}>
              {event.art ? <Art kind={event.art} /> : null}
              <div className="inv13-event__row">
                <div className="inv13-event__body">
                  <time dateTime={event.time}>{event.time}</time>
                  <h3>{event.title}</h3>
                </div>
                <span className="inv13-dot" />
              </div>
              {event.place || event.map ? (
                <div className="inv13-event__meta">
                  {event.place ? <p>Lokacija: {event.place}</p> : null}
                  {event.map ? <MapLink href={event.map} /> : null}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Art({ kind }: { kind: string }) {
  if (kind === "cherub") {
    return (
      <svg className="inv13-art inv13-art--cherub" viewBox="0 0 80 64" aria-hidden="true">
        <path d="M40 34c8-14 22-18 30-8-8 2-12 10-12 16 8 2 8 10 0 12-8-6-14-12-18-20z" fill="none" stroke="currentColor" />
        <path d="M40 34C32 20 18 16 10 26c8 2 12 10 12 16-8 2-8 10 0 12 8-6 14-12 18-20z" fill="none" stroke="currentColor" />
        <circle cx="40" cy="28" r="5" fill="none" stroke="currentColor" />
      </svg>
    );
  }
  if (kind === "rings") {
    return (
      <svg className="inv13-art inv13-art--rings" viewBox="0 0 90 60" aria-hidden="true">
        <circle cx="34" cy="34" r="16" fill="none" stroke="currentColor" />
        <circle cx="56" cy="34" r="16" fill="none" stroke="currentColor" />
        <path d="M34 16l4-8 4 8" fill="none" stroke="currentColor" />
      </svg>
    );
  }
  if (kind === "bouquet") {
    return (
      <svg className="inv13-art inv13-art--bouquet" viewBox="0 0 70 80" aria-hidden="true">
        <circle cx="35" cy="24" r="8" fill="none" stroke="currentColor" />
        <circle cx="22" cy="30" r="7" fill="none" stroke="currentColor" />
        <circle cx="48" cy="30" r="7" fill="none" stroke="currentColor" />
        <path d="M35 32v28M28 60h14" fill="none" stroke="currentColor" />
      </svg>
    );
  }
  if (kind === "fountain") {
    return (
      <svg className="inv13-art inv13-art--fountain" viewBox="0 0 80 90" aria-hidden="true">
        <path d="M40 8v18" stroke="currentColor" />
        <path d="M40 26c-14 8-22 8-22 16M40 26c14 8 22 8 22 16" fill="none" stroke="currentColor" />
        <path d="M22 48c8 6 28 6 36 0" fill="none" stroke="currentColor" />
        <path d="M28 62h24v8H28zM24 74h32" fill="none" stroke="currentColor" />
      </svg>
    );
  }
  if (kind === "cake") {
    return (
      <svg className="inv13-art inv13-art--cake" viewBox="0 0 70 80" aria-hidden="true">
        <path d="M18 70V48h34v22M24 48V34h22v14M30 34V24h10v10" fill="none" stroke="currentColor" />
        <path d="M35 24v-8" stroke="currentColor" />
      </svg>
    );
  }
  return (
    <svg className="inv13-art inv13-art--candles" viewBox="0 0 70 80" aria-hidden="true">
      <path d="M24 28v36M46 22v42" stroke="currentColor" />
      <path d="M24 28c6-8 8-2 0-8M46 22c6-8 8-2 0-8" fill="none" stroke="currentColor" />
      <path d="M16 64h16M38 64h16" stroke="currentColor" />
    </svg>
  );
}

function MapLink({ href }: { href: string }) {
  return (
    <a className="inv13-map" href={href} target="_blank" rel="noreferrer">
      <span aria-hidden="true">⌖</span>
      Mapa
    </a>
  );
}

const EVENTS = [
  {
    side: "left",
    time: "15:45",
    title: "Okupljanje gostiju",
    place: "Crkva Svetog Luke",
    map: MAPS.church,
    art: "cherub",
  },
  {
    side: "right",
    time: "16:00",
    title: "Ceremonija venčanja",
    place: "Crkva Svetog Luke",
    map: "",
    art: "rings",
  },
  {
    side: "left",
    time: "17:00",
    title: "Fotografisanje na Kalemegdanu",
    place: "",
    map: "",
    art: "bouquet",
  },
  {
    side: "right",
    time: "17:30",
    title: "Dobrodošlica i koktel",
    place: "Restoran Magazin",
    map: MAPS.magazin,
    art: "fountain",
  },
  {
    side: "left",
    time: "18:30",
    title: "Svečana večera",
    place: "Restoran Magazin",
    map: "",
    art: "",
  },
  {
    side: "right",
    time: "21:00",
    title: "Sečenje torte i prvi ples",
    place: "Restoran Magazin",
    map: "",
    art: "cake",
  },
  {
    side: "left",
    time: "00:00",
    title: "After party",
    place: "Hotel Moskva",
    map: MAPS.moskva,
    art: "candles",
  },
];

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, EVENT - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

const ATTENDANCE = ["Da, sa zadovoljstvom", "Nažalost, ne mogu"];

function Rsvp() {
  const [open, setOpen] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [coming, setComing] = useState("");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (open == null) return;
    const field = document
      .getElementById(`inv13-q${open}`)
      ?.querySelector("input, select, textarea");
    if (field instanceof HTMLElement) field.focus();
  }, [open]);

  const toggle = (id: number) => setOpen((current) => (current === id ? null : id));

  return (
    <section className="inv13-rsvp" aria-labelledby="inv13-rsvp-title">
      <svg className="inv13-rsvp__seal" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r="10" fill="none" stroke="currentColor" />
        <path d="M18 8v6M14 12h8" stroke="currentColor" />
      </svg>
      <h2 id="inv13-rsvp-title">RSVP</h2>
      <p>
        Biće nam drago da potvrdite dolazak i odgovorite na nekoliko kratkih
        pitanja, najkasnije do 1. avgusta 2027.
      </p>

      <div className={`inv13-q${open === 1 ? " is-open" : ""}`} id="inv13-q1">
        <button className="inv13-q__hit" type="button" aria-expanded={open === 1} onClick={() => toggle(1)}>
          <span>01</span>
          <strong>Vaše ime i prezime</strong>
        </button>
        <div className="inv13-q__panel">
          <div className="inv13-q__panel-inner">
            <input name="ime" autoComplete="name" placeholder="Na primer, Ana Petrović" />
          </div>
        </div>
      </div>

      <div className={`inv13-q${open === 2 ? " is-open" : ""}`} id="inv13-q2">
        <button className="inv13-q__hit" type="button" aria-expanded={open === 2} onClick={() => toggle(2)}>
          <span>02</span>
          <strong>Vaša e-adresa</strong>
        </button>
        <div className="inv13-q__panel">
          <div className="inv13-q__panel-inner">
            <input name="email" type="email" autoComplete="email" placeholder="ime@mail.com" />
          </div>
        </div>
      </div>

      <div className={`inv13-q${open === 3 ? " is-open" : ""}`} id="inv13-q3">
        <button className="inv13-q__hit" type="button" aria-expanded={open === 3} onClick={() => toggle(3)}>
          <span>03</span>
          <strong>Da li ćete biti sa nama tog dana?</strong>
        </button>
        <div className="inv13-q__panel">
          <div className="inv13-q__panel-inner">
            <div className={`inv13-choice${menu ? " is-open" : ""}`}>
              <button
                className="inv13-choice__btn"
                type="button"
                aria-expanded={menu}
                onClick={() => setMenu((value) => !value)}
              >
                <span>{coming || "Izaberite odgovor"}</span>
              </button>
              <ul className="inv13-choice__list">
                {ATTENDANCE.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      className={coming === option ? "is-on" : ""}
                      onClick={() => {
                        setComing(option);
                        setMenu(false);
                      }}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={`inv13-q${open === 4 ? " is-open" : ""}`} id="inv13-q4">
        <button className="inv13-q__hit" type="button" aria-expanded={open === 4} onClick={() => toggle(4)}>
          <span>04</span>
          <strong>Navedite broj gostiju sa vaše strane</strong>
        </button>
        <div className="inv13-q__panel">
          <div className="inv13-q__panel-inner">
            <input name="gosti" inputMode="numeric" placeholder="1" />
          </div>
        </div>
      </div>

      <div className={`inv13-q${open === 5 ? " is-open" : ""}`} id="inv13-q5">
        <button className="inv13-q__hit" type="button" aria-expanded={open === 5} onClick={() => toggle(5)}>
          <span>05</span>
          <strong>Imate li alergije ili posebnosti u ishrani?</strong>
        </button>
        <div className="inv13-q__panel">
          <div className="inv13-q__panel-inner">
            <textarea name="ishrana" rows={2} />
          </div>
        </div>
      </div>

      {sent ? (
        <p className="inv13-thanks">Hvala vam. Vaš odgovor je zabeležen.</p>
      ) : (
        <button className="inv13-submit" type="button" onClick={() => setSent(true)}>
          Potvrdi prisustvo
        </button>
      )}
    </section>
  );
}

function FlorenceInvitation() {
  const count = useCountdown();
  const units = [
    [count.days, "Dana"],
    [count.hours, "Sati"],
    [count.minutes, "Minuta"],
    [count.seconds, "Sekunde"],
  ] as const;

  return (
    <article className="inv13">
      <header className="inv13-hero">
        <img src={hero} alt="" />
        <div className="inv13-hero__copy">
          <p className="inv13-kicker">Venčavamo se</p>
          <h1>
            Mila
            <em>&amp;</em>
            Aleksa
          </h1>
          <p className="inv13-hero__date">12.09.2027.</p>
          <p className="inv13-hero__place">Beograd</p>
        </div>
      </header>

      <section className="inv13-story" aria-labelledby="inv13-story-title">
        <h2 id="inv13-story-title">Naša priča</h2>
        <p>
          Svaka lepa priča ima početak, a naša je počela iz zajedničkog sna.
          Danas otvaramo novo poglavlje i biće nam drago ako taj dan provedete
          sa nama.
        </p>
      </section>

      <section className="inv13-collage" aria-label="Fotografije">
        <img src={collageA} alt="" />
        <img src={collageB} alt="" />
        <img src={collageC} alt="" />
      </section>
      <p className="inv13-names">Mila &amp; Aleksa</p>

      <section className="inv13-note">
        <h2>Dragi gosti</h2>
        <p>
          Želimo da dan našeg venčanja bude poseban, zato vas pozivamo da ga
          podelite sa nama.
        </p>
      </section>

      <Program />

      <section className="inv13-dress" aria-labelledby="inv13-dress-title">
        <h2 id="inv13-dress-title">Dres-kod</h2>
        <p className="inv13-script">Black Tie</p>
        <p>
          Za nas je važno da stvorimo atmosferu večernje elegancije, zato vas
          molimo da izaberete svečane kombinacije u duhu Black Tie. Za
          muškarce: odelo ili smoking. Za dame: duge elegantne haljine. Molimo
          vas da izbegavate belu i crvenu boju.
        </p>
        <ul className="inv13-palette">
          {DRESS_COLORS.map((color) => (
            <li key={color.name}>
              <span style={{ background: color.hex }} />
              <em>{color.name}</em>
            </li>
          ))}
        </ul>
      </section>

      <section className="inv13-wishes">
        <h2>Želje</h2>
        <svg className="inv13-key" viewBox="0 0 64 28" aria-hidden="true">
          <circle cx="12" cy="14" r="7" fill="none" stroke="currentColor" />
          <path d="M18 14h34M44 14v6M52 14v4" fill="none" stroke="currentColor" />
        </svg>
        <p>
          Veoma volimo vašu decu, ali mesto i oblik proslave predviđeni su samo
          za odrasle. Izuzetak su naša kumčad.
        </p>
        <p>
          Hvala vam na razumevanju. Biće nam drago da ovaj dan podelimo sa
          vama.
        </p>
        <svg className="inv13-rose" viewBox="0 0 40 56" aria-hidden="true">
          <path d="M20 22c4-8 10-10 10-4s-6 8-10 10c-4-2-10-4-10-10s6-4 10 4z" fill="none" stroke="#a88b5a" />
          <path d="M20 28v20" stroke="#6d7a52" />
        </svg>
        <p>
          Bićemo zahvalni ako, umesto tradicionalnih poklona, podržite naše
          buduće planove i snove svojim doprinosom.
        </p>
        <svg className="inv13-locket" viewBox="0 0 48 40" aria-hidden="true">
          <path d="M10 22c0-8 6-12 14-6 8-6 14-2 14 6 0 10-14 16-14 16S10 32 10 22z" fill="#e6d3a4" stroke="#a88b5a" />
          <path d="M24 8c6-8 16-4 14 4" fill="none" stroke="#a88b5a" />
        </svg>
        <p>
          Ako dolazite iz drugog grada, sobu možete rezervisati u Hotelu Moskva.
        </p>
        <a className="inv13-hotel" href={MAPS.hotel} target="_blank" rel="noreferrer">
          Rezervišite hotel
        </a>
      </section>

      <Rsvp />

      <svg className="inv13-flourish" viewBox="0 0 120 16" aria-hidden="true">
        <path d="M4 8h40M76 8h40M60 8c6-6 10-6 12 0 2 6 6 6 12 0" fill="none" stroke="currentColor" />
      </svg>

      <section className="inv13-host">
        <h2>Imate li pitanja?</h2>
        <p>
          Ako vam nešto nije jasno, javite se, molimo vas, našoj organizatorki.
        </p>
        <p>Organizator</p>
        <strong>Jelena</strong>
        <a href="tel:+381641234567">+381 64 123 4567</a>
      </section>

      <section className="inv13-finale" aria-label="Odbrojavanje">
        <div className="inv13-finale__veil" style={{ backgroundImage: `url(${veil})` }} />
        <h2>Do susreta u Beogradu</h2>
        <div className="inv13-count">
          {units.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <img className="inv13-finale__dome" src={dome} alt="" />
      </section>
    </article>
  );
}

export default FlorenceInvitation;
