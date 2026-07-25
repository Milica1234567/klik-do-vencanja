import "./Hero.css";

import Container from "../layout/Container";

function Hero() {
  return (
    <section className="hero" id="hero">
      <Container>
        <div className="col-6 hero__content">
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

        {/* Right half reserved for future hero media (grid 6+6 like wireframe) */}
        <div className="col-6 hero__media" aria-hidden="true" />
      </Container>
    </section>
  );
}

export default Hero;
