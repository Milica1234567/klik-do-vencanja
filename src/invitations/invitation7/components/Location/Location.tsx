import type { CSSProperties } from "react";

import "./Location.css";

function Location() {
  return (
    <section className="inv7-wedding-location" aria-labelledby="inv7-location-title">
      <div className="inv7-wedding-location__illustration" data-reveal aria-hidden="true">
        <span className="inv7-wedding-location__roof" /><span className="inv7-wedding-location__house" /><i /><i /><i />
      </div>
      <p data-reveal>Proslava</p>
      <h2 id="inv7-location-title" data-reveal style={{ "--inv7-reveal-delay": "0.1s" } as CSSProperties}>Vila Jelena</h2>
      <address data-reveal style={{ "--inv7-reveal-delay": "0.2s" } as CSSProperties}>Topola</address>
      <a data-reveal style={{ "--inv7-reveal-delay": "0.3s" } as CSSProperties} href="https://maps.google.com/?q=Vila+Jelena+Topola" target="_blank" rel="noreferrer">
        Pogledaj lokaciju
      </a>
    </section>
  );
}

export default Location;
