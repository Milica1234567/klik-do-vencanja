import "./Hero.css";

function Hero() {
  return (
    <section className="inv9-hero" aria-labelledby="inv9-title">
      <div className="inv9-hero__inner">
        <div className="inv9-hero__monogram inv9-hero__enter inv9-hero__enter--inv9-1" aria-label="J i N"><span>J</span><i>❦</i><span>N</span></div>
        <p className="inv9-hero__intro inv9-hero__enter inv9-hero__enter--inv9-2">Sa velikom radošću<br />pozivamo vas na naše venčanje</p>
        <h1 id="inv9-title">
          <span className="inv9-hero__name inv9-hero__enter inv9-hero__enter--inv9-3">Jelena</span>
          <span className="inv9-hero__and inv9-hero__enter inv9-hero__enter--inv9-4">i</span>
          <span className="inv9-hero__name inv9-hero__enter inv9-hero__enter--inv9-5">Nikola</span>
        </h1>
        <time className="inv9-hero__date inv9-hero__enter inv9-hero__enter--inv9-6" dateTime="2027-06-06">06&nbsp; · &nbsp;06&nbsp; · &nbsp;2027.</time>
        <p className="inv9-hero__location inv9-hero__enter inv9-hero__enter--inv9-7">Topola</p>
      </div>
      <a className="inv9-hero__scroll" href="#inv9-intro" aria-label="Nastavite"><span /></a>
    </section>
  );
}

export default Hero;
