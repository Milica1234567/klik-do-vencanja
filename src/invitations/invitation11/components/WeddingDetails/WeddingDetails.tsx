import type { CSSProperties } from "react";
import "./WeddingDetails.css";

const details = [
  ["16", "00", "Crkveno venčanje", "Crkva Svetog Marka"],
  ["18", "00", "Svečani prijem", "Vila Aleksandra"],
  ["19", "00", "Građansko venčanje", "Vila Aleksandra"],
];

function WeddingDetails() {
  return (
    <section className="inv11-details" aria-labelledby="inv11-details-title">
      <div className="inv11-content">
        <header data-inv11-reveal><p className="inv11-kicker">18. oktobar 2026.</p><h2 id="inv11-details-title">Redosled svečanosti</h2></header>
        <div className="inv11-details__list">
          {details.map(([hour, minute, title, place], index) => (
            <article data-inv11-reveal style={{ "--inv11-delay": `${index * 0.12}s` } as CSSProperties} key={hour + title}>
              <time><strong>{hour}</strong><span>{minute}</span></time>
              <div><h3>{title}</h3><p>{place}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WeddingDetails;
