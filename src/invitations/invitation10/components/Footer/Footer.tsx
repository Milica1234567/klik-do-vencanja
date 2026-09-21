import type { CSSProperties } from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="inv10-footer">
      <div className="inv10-footer__texture" aria-hidden="true" />
      <div className="inv10-footer__veil" aria-hidden="true" />
      <div className="inv10-footer__content">
        <p data-inv10-reveal>Jedva čekamo da ovaj dan<br />podelimo sa vama.</p>
        <strong data-inv10-reveal style={{ "--inv10-delay": "0.14s" } as CSSProperties}>S <i>&amp;</i> A</strong>
        <time data-inv10-reveal style={{ "--inv10-delay": "0.26s" } as CSSProperties} dateTime="2027-07-18">18 · 07 · 2027</time>
      </div>
    </footer>
  );
}

export default Footer;
