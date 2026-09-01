import "./Location.css";

function Location() {
  return (
    <section className="inv11-location" aria-labelledby="inv11-location-title">
      <div className="inv11-content" data-inv11-reveal>
        <p className="inv11-kicker">Mesto proslave</p>
        <h2 id="inv11-location-title">Vila Aleksandra</h2>
        <address>Beograd</address>
        <p className="inv11-location__description">Veče posvećeno ljubavi, muzici<br />i najdražim ljudima.</p>
        <a href="https://maps.google.com/?q=Vila+Aleksandra+Beograd" target="_blank" rel="noreferrer">Pogledaj lokaciju <span>↗</span></a>
      </div>
    </section>
  );
}

export default Location;
