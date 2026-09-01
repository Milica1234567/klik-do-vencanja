import "./InvitationIntro.css";

function InvitationIntro() {
  return (
    <section className="inv10-intro" id="inv10-intro">
      <div className="inv10-petal-crop inv10-intro__petal" aria-hidden="true" />
      <div className="inv10-content" data-inv10-reveal>
        <p className="inv10-kicker">Sa velikom radošću</p>
        <h2>pozivamo vas da budete deo<br />dana kada počinje naše zauvek.</h2>
      </div>
    </section>
  );
}

export default InvitationIntro;
