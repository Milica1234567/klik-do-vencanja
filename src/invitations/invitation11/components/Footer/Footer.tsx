import type { CSSProperties } from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="inv11-footer">
      <div className="inv11-footer__content">
        <strong data-inv11-reveal>A · N</strong>
        <time data-inv11-reveal style={{ "--inv11-delay": "0.13s" } as CSSProperties} dateTime="2026-10-18">18 · 10 · 2026</time>
        <p data-inv11-reveal style={{ "--inv11-delay": "0.26s" } as CSSProperties}>Hvala što ste deo naše priče.</p>
      </div>
    </footer>
  );
}

export default Footer;
