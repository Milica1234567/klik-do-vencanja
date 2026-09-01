import type { CSSProperties } from "react";
import "./Schedule.css";

const events = [
  ["15:00", "Crkveno venčanje", "Crkva Svetog Marka"],
  ["17:00", "Građansko venčanje", "Vila Aleksandar"],
  ["18:00", "Svečana večera", "Vila Aleksandar"],
];

function Schedule() {
  return (
    <section className="inv10-schedule" aria-labelledby="inv10-schedule-title">
      <div className="inv10-content">
        <h2 id="inv10-schedule-title" data-inv10-reveal>Tok dana</h2>
        <div className="inv10-schedule__rows">
          {events.map(([time, title, place], index) => (
            <article data-inv10-reveal style={{ "--inv10-delay": `${index * 0.12}s` } as CSSProperties} key={time}>
              <time>{time}</time><div><h3>{title}</h3><p>{place}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Schedule;
