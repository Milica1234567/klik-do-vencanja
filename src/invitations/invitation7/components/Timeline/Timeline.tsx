import type { CSSProperties } from "react";

import "./Timeline.css";

const events = [
  ["15:00", "Crkveno venčanje"],
  ["16:30", "Okupljanje gostiju"],
  ["17:00", "Građansko venčanje"],
  ["18:00", "Svečana večera"],
];

function Timeline() {
  return (
    <section className="inv7-wedding-timeline" aria-labelledby="inv7-timeline-title">
      <header data-reveal><p>Redosled događaja</p><h2 id="inv7-timeline-title">Plan dana</h2></header>
      <div className="inv7-wedding-timeline__list">
        {events.map(([time, title], index) => (
          <article data-reveal style={{ "--inv7-reveal-delay": `${index * 0.11}s` } as CSSProperties} key={time}>
            <div className={`inv7-timeline-flower inv7-timeline-flower--${index + 1}`} aria-hidden="true"><i /><i /><i /></div>
            <time>{time}</time><h3>{title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Timeline;
