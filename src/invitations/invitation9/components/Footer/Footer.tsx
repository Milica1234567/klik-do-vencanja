import type { CSSProperties } from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="inv9-footer">
      <div className="inv9-footer__inner">
        <p data-inv9-reveal>Radujemo se što ćemo<br />ovaj dan podeliti sa vama.</p>
        <div className="inv9-ornament" data-inv9-reveal style={{ "--inv9-delay": "0.12s" } as CSSProperties} aria-hidden="true"><span>❦</span></div>
        <strong data-inv9-reveal style={{ "--inv9-delay": "0.22s" } as CSSProperties}>J <i>&amp;</i> N</strong>
        <time data-inv9-reveal style={{ "--inv9-delay": "0.32s" } as CSSProperties} dateTime="2027-06-06">06 · 06 · 2027.</time>
      </div>
    </footer>
  );
}

export default Footer;
