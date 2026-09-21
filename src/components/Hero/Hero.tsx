import "./Hero.css";
function Hero() {
  return (
    <section className="quote-card">
      <div className="quote-card_inner">
        <p className="quote-card_text">
          Prvi utisak o Vašoj proslavi
          <br />
          <span className="quote-card_red">
            počinje <span style={{ fontStyle: "italic" }}>pozivnicom</span>.
          </span>
        </p>
      </div>
    </section>
  );
}

export default Hero;

