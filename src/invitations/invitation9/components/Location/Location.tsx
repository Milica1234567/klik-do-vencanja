import type { CSSProperties } from "react";
import "./Location.css";

function Location() {
  return (
    <section className="inv9-location" aria-labelledby="inv9-location-title">
      <div className="inv9-content">
        <p data-inv9-reveal>Mesto proslave</p>
        <h2 id="inv9-location-title" data-inv9-reveal style={{ "--inv9-delay": "0.1s" } as CSSProperties}>Vila Jelena</h2>
        <address data-inv9-reveal style={{ "--inv9-delay": "0.2s" } as CSSProperties}>Topola</address>
        <a data-inv9-reveal style={{ "--inv9-delay": "0.3s" } as CSSProperties} href="https://maps.google.com/?q=Vila+Jelena+Topola" target="_blank" rel="noreferrer"><i />Pogledaj lokaciju <span>→</span><i /></a>
      </div>
    </section>
  );
}

export default Location;
