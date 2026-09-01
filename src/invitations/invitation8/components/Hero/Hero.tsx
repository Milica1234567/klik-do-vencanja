import "./Hero.css";

function Hero() {
  return (
    <section className="inv8-hero" aria-labelledby="inv8-title">
      <div className="inv8-hero__inner">
        <div className="inv8-hero__monogram inv8-hero__enter inv8-hero__enter--inv8-1" aria-label="J i N">
          <span>J</span><i aria-hidden="true" /><span>N</span>
        </div>
        <p className="inv8-hero__invitation inv8-hero__enter inv8-hero__enter--inv8-2">
          Sa velikom radošću<br />pozivamo vas na venčanje
        </p>
        <h1 id="inv8-title">
          <span className="inv8-hero__name inv8-hero__enter inv8-hero__enter--inv8-3">Jelena</span>
          <span className="inv8-hero__and inv8-hero__enter inv8-hero__enter--inv8-4">i</span>
          <span className="inv8-hero__name inv8-hero__enter inv8-hero__enter--inv8-5">Nikola</span>
        </h1>
        <time className="inv8-hero__date inv8-hero__enter inv8-hero__enter--inv8-6" dateTime="2027-06-06">06 · 06 · 2027.</time>
        <p className="inv8-hero__place inv8-hero__enter inv8-hero__enter--inv8-7">Topola</p>
      </div>
      <a className="inv8-hero__continue" href="#inv8-intro" aria-label="Nastavite na pozivni tekst"><span /></a>
    </section>
  );
}

export default Hero;
