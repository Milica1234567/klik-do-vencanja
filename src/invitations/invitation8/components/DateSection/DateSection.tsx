import type { CSSProperties } from "react";

import "./DateSection.css";

function DateSection() {
  return (
    <section className="inv8-date" aria-labelledby="inv8-date-title">
      <div className="inv8-content">
        <p data-inv8-reveal>Sačuvajte datum</p>
        <div className="inv8-date__composition" id="inv8-date-title">
          <span data-inv8-reveal style={{ "--inv8-delay": "0.08s" } as CSSProperties}>Subota</span>
          <strong data-inv8-reveal style={{ "--inv8-delay": "0.17s" } as CSSProperties}>06</strong>
          <span data-inv8-reveal style={{ "--inv8-delay": "0.26s" } as CSSProperties}>Jun</span>
          <time data-inv8-reveal style={{ "--inv8-delay": "0.35s" } as CSSProperties} dateTime="2027-06-06">2027.</time>
        </div>
        <div className="inv8-leaf-mark" data-inv8-reveal aria-hidden="true" />
      </div>
    </section>
  );
}

export default DateSection;
