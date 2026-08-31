import "./Header.css";

import logoAM from "../../assets/AM.png";

type HeaderProps = {
  revealed: boolean;
};

function Header({ revealed }: HeaderProps) {
  return (
    <section
      className={`hero ${revealed ? "hero--revealed" : ""}`}
      id="hero"
    >
        
      <div className="hero-inner">

        <div className="hero-top">
          <img
            className="hero-logo hero-reveal hero-reveal--logo"
            src={logoAM}
            alt="AM monogram"
          />

          <p className="hero-date hero-reveal hero-reveal--date">
            12 · 09 · 2026
          </p>
        </div>

        <div className="hero-content">

          <p className="hero-intro hero-reveal hero-reveal--intro">
            Sa velikom radošću
            <br />
            pozivamo Vas da sa nama
            <br />
            proslavite venčanje
          </p>

          <h1 className="hero-names">
            <span className="hero-name hero-name--ana">
              Ana
            </span>

            <span className="hero-ampersand">
              &amp;
            </span>

            <span className="hero-name hero-name--marko">
              Marko
            </span>
          </h1>

        </div>

        <div className="hero-bottom">

          <p className="hero-location hero-reveal hero-reveal--location">
            Beograd · 2026
          </p>

          <a
            className="hero-scroll hero-reveal hero-reveal--scroll"
            href="#plan"
            aria-label="Nastavi na detalje"
          >
            <span />
          </a>

        </div>

      </div>
    </section>
  );
}

export default Header;
