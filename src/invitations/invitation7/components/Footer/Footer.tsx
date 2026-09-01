import type { CSSProperties } from "react";

import "./Footer.css";

function Footer() {
  return (
    <footer className="inv7-watercolor-footer">
      <div className="inv7-botanical-mark" data-reveal aria-hidden="true"><span /></div>
      <p data-reveal style={{ "--inv7-reveal-delay": "0.1s" } as CSSProperties}>J &amp; N</p>
      <time data-reveal style={{ "--inv7-reveal-delay": "0.2s" } as CSSProperties} dateTime="2027-06-06">06 · 06 · 2027.</time>
    </footer>
  );
}

export default Footer;
