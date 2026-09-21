import type { CSSProperties } from "react";
import "./Timeline.css";

const events = [
  ["15:00", "Crkveno venčanje", "Crkva Svetog Đorđa"],
  ["16:30", "Okupljanje gostiju", "Vila Jelena"],
  ["17:00", "Građansko venčanje", "Vila Jelena"],
  ["18:00", "Svečana večera", "Vila Jelena"],
];

function Timeline() {
  return (
    <section className="inv9-timeline" aria-labelledby="inv9-timeline-title">
      <div className="inv9-content">
        <h2 id="inv9-timeline-title" data-inv9-reveal>Raspored događaja</h2>
        <div className="inv9-timeline__list">
          {events.map(([time, title, place], index) => (
            <article data-inv9-reveal style={{ "--inv9-delay": `${index * 0.11}s` } as CSSProperties} key={time}>
              <span className="inv9-timeline__diamond" aria-hidden="true" />
              <time>{time}</time><h3>{title}</h3><p>{place}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
