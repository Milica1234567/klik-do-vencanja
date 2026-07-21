function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__container">
        <div className="hero__content">
          <span className="hero__eyebrow">
            Digitalne pozivnice za venčanja i posebne događaje
          </span>

          <h1 className="hero__title">
            Vaša priča počinje <br />
            jednim klikom.
          </h1>

          <p className="hero__description">
            Kreiramo elegantne, interaktivne digitalne pozivnice koje će
            oduševiti vaše goste. RSVP, mapa, galerija, muzika i još mnogo toga
            – sve na jednom mestu.
          </p>

          <div className="hero__buttons">
            <a href="#demo" className="btn btn--primary">
              Pogledajte demo
            </a>

            <a href="#contact" className="btn btn--secondary">
              Zatražite ponudu
            </a>
          </div>
        </div>

        <div className="hero__preview">
          {/* Ovde kasnije ide mockup telefona ili animirana pozivnica */}
          <div className="hero__placeholder">
            Preview pozivnice
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;