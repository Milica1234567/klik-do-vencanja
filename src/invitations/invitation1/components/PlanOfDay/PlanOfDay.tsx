import "./PlanOfDay.css";

const events = [
  {
    time: "17:30",
    title: "Okupljanje gostiju",
    place: "Vila Jelena",
    note: "Koktel dobrodošlice",
  },
  {
    time: "18:30",
    title: "Svečana večera",
    place: "Vila Jelena",
    note: "Proslava počinje",
  },
  {
    time: "20:00",
    title: "Prvi ples",
    place: "Ana & Marko",
    note: "A zatim plešemo zajedno",
  },

  {
    time: "16:00",
    title: "Venčanje",
    place: "Crkva Svetog Marka",
    note: "Tašmajdan, Beograd",
  },
];

function PlanOfDay() {
  return (
    <section className="day-plan" id="plan" aria-labelledby="day-plan-title">
      <header className="day-plan__header">
        <p>12 · 09 · 2026</p>
        <h2 id="day-plan-title">Plan dana</h2>
        <span aria-hidden="true">A&amp;M</span>
      </header>

      <div className="day-path">
        <svg
          className="day-path__line day-path__line--desktop"
          viewBox="0 0 100 640"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M50 0 C50 70 23 75 23 150 C23 220 77 230 77 310 C77 385 23 400 23 475 C23 550 50 565 50 640" />
        </svg>

        <svg
          className="day-path__line day-path__line--mobile"
          viewBox="0 0 100 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M50 0 C50 25 23 35 23 70 S77 145 77 210 S23 285 23 350 S77 425 77 490 S50 565 50 600" />
        </svg>

        {events.map((event, index) => (
          <article
            className={`day-stop day-stop--${index % 2 === 0 ? "left" : "right"}`}
            key={`${event.time}-${event.title}`}
          >
            <span className="day-stop__dot" aria-hidden="true" />
            <div className="day-stop__content">
              <time>{event.time}</time>
              <h3>{event.title}</h3>
              <p>{event.place}</p>
              <small>{event.note}</small>
            </div>
          </article>
        ))}
      </div>

      <a className="day-plan__next" href="#details">
        Potvrdite dolazak
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}

export default PlanOfDay;
