import "./Location.css";

function Location() {
  return (
    <section className="inv10-location" aria-labelledby="inv10-location-title">
      <div className="inv10-petal-crop inv10-location__petal" aria-hidden="true" />
      <div className="inv10-content" data-inv10-reveal>
        <p className="inv10-kicker">Lokacija</p>
        <h2 id="inv10-location-title">Vila Aleksandar</h2>
        <address>Beograd</address>
        <a href="https://maps.google.com/?q=Vila+Aleksandar+Beograd" target="_blank" rel="noreferrer">Prikaži lokaciju <span>↗</span></a>
      </div>
    </section>
  );
}

export default Location;
