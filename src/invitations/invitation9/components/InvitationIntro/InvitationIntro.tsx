import type { CSSProperties } from "react";

import "./InvitationIntro.css";

function InvitationIntro() {
  return (
    <section className="inv9-intro" id="inv9-intro">
      <div className="inv9-content">
        <p data-inv9-reveal>Sa velikom radošću vas pozivamo<br />da svojim prisustvom uveličate dan<br />kada ćemo jedno drugom reći „da“.</p>
        <div className="inv9-ornament" data-inv9-reveal style={{ "--inv9-delay": "0.16s" } as CSSProperties} aria-hidden="true"><span>❦</span></div>
      </div>
    </section>
  );
}

export default InvitationIntro;
