import "./Hero.css";

function Hero() {
  return (
    <section className="inv7-watercolor-hero" aria-labelledby="invitation7-inv7-watercolor-title">
      <div className="inv7-watercolor-hero__content">
        <p className="inv7-watercolor-hero__eyebrow">Venčanje</p>
        <h1 id="invitation7-inv7-watercolor-title">
          <span>Jelena</span><i>&amp;</i><span>Nikola</span>
        </h1>
        <div className="inv7-watercolor-hero__sprig" aria-hidden="true"><span /><i /><span /></div>
        <time dateTime="2027-06-06">06 · 06 · 2027.</time>
      </div>
      <a className="inv7-watercolor-hero__scroll" href="#inv7-invitation-message">
        <span>Nastavite</span><i aria-hidden="true" />
      </a>
    </section>
  );
}

export default Hero;
