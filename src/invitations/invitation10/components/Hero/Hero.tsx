import "./Hero.css";

function Hero() {
  return (
    <section className="inv10-hero" aria-labelledby="inv10-title">
      <div className="inv10-hero__texture" aria-hidden="true" />
      <div className="inv10-hero__veil" aria-hidden="true" />
      <div className="inv10-hero__content">
        <p className="inv10-hero__kicker inv10-hero__enter inv10-hero__enter--inv10-1">Venčanje</p>
        <h1 id="inv10-title">
          <span className="inv10-hero__name inv10-hero__name--inv10-sofija inv10-hero__enter inv10-hero__enter--inv10-2">Sofija</span>
          <span className="inv10-hero__and inv10-hero__enter inv10-hero__enter--inv10-3">i</span>
          <span className="inv10-hero__name inv10-hero__name--inv10-aleksandar inv10-hero__enter inv10-hero__enter--inv10-4">Aleksandar</span>
        </h1>
        <time className="inv10-hero__date inv10-hero__enter inv10-hero__enter--inv10-5" dateTime="2027-07-18">18 · 07 · 2027</time>
        <p className="inv10-hero__place inv10-hero__enter inv10-hero__enter--inv10-6">Beograd</p>
      </div>
      <a className="inv10-hero__scroll" href="#inv10-intro" aria-label="Nastavite"><span /></a>
    </section>
  );
}

export default Hero;
