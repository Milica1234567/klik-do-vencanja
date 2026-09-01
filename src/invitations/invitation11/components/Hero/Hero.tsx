import "./Hero.css";

function Hero() {
  return (
    <section className="inv11-hero" aria-labelledby="inv11-title">
      <div className="inv11-hero__cover" aria-hidden="true" />
      <div className="inv11-hero__content">
        <p className="inv11-hero__line inv11-hero__enter inv11-hero__enter--inv11-1">Jedno drugom. Zauvek.</p>
        <h1 id="inv11-title">
          <span className="inv11-hero__enter inv11-hero__enter--inv11-2">Aleksandra</span>
          <i className="inv11-hero__enter inv11-hero__enter--inv11-3">&amp;</i>
          <span className="inv11-hero__enter inv11-hero__enter--inv11-4">Nikola</span>
        </h1>
        <time className="inv11-hero__enter inv11-hero__enter--inv11-5" dateTime="2026-10-18">18 · 10 · 2026</time>
      </div>
      <a href="#inv11-photo-intro" className="inv11-hero__continue" aria-label="Nastavite"><span /></a>
    </section>
  );
}

export default Hero;
