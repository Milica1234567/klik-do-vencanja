import "./InvitationMessage.css";

function InvitationMessage() {
  return (
    <section className="inv11-message">
      <div className="inv11-content" data-inv11-reveal>
        <p className="inv11-kicker">Pozivamo vas</p>
        <h2>Sa velikom radošću vas pozivamo<br />da budete deo dana<br />u kojem počinje naše zauvek.</h2>
        <span className="inv11-message__emboss" aria-hidden="true">A · N</span>
      </div>
    </section>
  );
}

export default InvitationMessage;
