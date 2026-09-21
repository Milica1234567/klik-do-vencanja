import type { CSSProperties } from "react";

import "./DateSection.css";

function DateSection() {
  return (
    <section className="inv9-date" aria-labelledby="inv9-date-title">
      <div className="inv9-content">
        <p data-inv9-reveal>Sačuvajte datum</p>
        <div className="inv9-date__layout" id="inv9-date-title">
          <span data-inv9-reveal style={{ "--inv9-delay": "0.08s" } as CSSProperties}>Subota</span>
          <div className="inv9-date__number" data-inv9-reveal style={{ "--inv9-delay": "0.16s" } as CSSProperties}><i /><strong>06</strong><i /></div>
          <span data-inv9-reveal style={{ "--inv9-delay": "0.24s" } as CSSProperties}>Jun</span>
          <time data-inv9-reveal style={{ "--inv9-delay": "0.32s" } as CSSProperties} dateTime="2027-06-06">2027.</time>
        </div>
      </div>
    </section>
  );
}

export default DateSection;
