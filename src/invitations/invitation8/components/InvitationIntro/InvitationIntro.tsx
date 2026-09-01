import type { CSSProperties } from "react";

import "./InvitationIntro.css";

function InvitationIntro() {
  return (
    <section className="inv8-intro" id="inv8-intro">
      <div className="inv8-content">
        <p data-inv8-reveal>
          Sa velikom radošću vas pozivamo<br />
          da svojim prisustvom uveličate dan<br />
          kada ćemo jedno drugom reći „da“.
        </p>
        <div className="inv8-intro__berry" data-inv8-reveal style={{ "--inv8-delay": "0.18s" } as CSSProperties} aria-hidden="true">
          <i /><i /><i /><span />
        </div>
        <span className="inv8-bee" aria-hidden="true" />
      </div>
    </section>
  );
}

export default InvitationIntro;
