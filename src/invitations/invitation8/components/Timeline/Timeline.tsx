import type { CSSProperties } from "react";

import "./Timeline.css";

const timelineItems = [
  { time: "15:00", title: "Crkveno venčanje", place: "Crkva Svetog Đorđa", mark: "leaf" },
  { time: "16:30", title: "Okupljanje gostiju", place: "Vila Jelena", mark: "berry" },
  { time: "17:00", title: "Građansko venčanje", place: "Vila Jelena", mark: "flower" },
  { time: "18:00", title: "Svečana večera", place: "Vila Jelena", mark: "blue" },
];

function Timeline() {
  return (
    <section className="inv8-timeline" aria-labelledby="inv8-timeline-title">
      <div className="inv8-content">
        <header data-inv8-reveal>
          <p>Redosled svečanosti</p>
          <h2 id="inv8-timeline-title">Plan dana</h2>
        </header>
        <div className="inv8-timeline__items">
          {timelineItems.map((item, index) => (
            <article data-inv8-reveal style={{ "--inv8-delay": `${index * 0.12}s` } as CSSProperties} key={item.time}>
              <span className={`inv8-timeline__mark inv8-timeline__mark--inv8-${item.mark}`} aria-hidden="true"><i /><i /><i /></span>
              <time>{item.time}</time>
              <h3>{item.title}</h3>
              <p>{item.place}</p>
            </article>
          ))}
        </div>
      </div>
      <span className="inv8-bee" aria-hidden="true" />
    </section>
  );
}

export default Timeline;
