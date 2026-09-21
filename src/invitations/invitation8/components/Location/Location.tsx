import type { CSSProperties } from "react";

import "./Location.css";

function Location() {
  return (
    <section className="inv8-location" aria-labelledby="inv8-location-title">
      <div className="inv8-content">
        <div className="inv8-leaf-mark" data-inv8-reveal aria-hidden="true" />
        <p data-inv8-reveal style={{ "--inv8-delay": "0.08s" } as CSSProperties}>Mesto proslave</p>
        <h2 id="inv8-location-title" data-inv8-reveal style={{ "--inv8-delay": "0.16s" } as CSSProperties}>Vila Jelena</h2>
        <address data-inv8-reveal style={{ "--inv8-delay": "0.24s" } as CSSProperties}>Topola</address>
        <a data-inv8-reveal style={{ "--inv8-delay": "0.32s" } as CSSProperties} href="https://maps.google.com/?q=Vila+Jelena+Topola" target="_blank" rel="noreferrer">
          Pogledaj lokaciju <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export default Location;
