import type { CSSProperties } from "react";

import "./InvitationIntro.css";

function InvitationIntro() {
  return (
    <section className="inv7-invitation-intro" id="inv7-invitation-message">
      <div className="inv7-botanical-mark" data-reveal aria-hidden="true"><span /></div>
      <p data-reveal style={{ "--inv7-reveal-delay": "0.12s" } as CSSProperties}>
        Sa velikom radošću vas pozivamo da budete deo dana kada ćemo naše
        najlepše „da” pretvoriti u zauvek.
      </p>
      <small data-reveal style={{ "--inv7-reveal-delay": "0.24s" } as CSSProperties}>
        Radujemo se što ćemo ovaj trenutak podeliti sa vama
      </small>
    </section>
  );
}

export default InvitationIntro;
