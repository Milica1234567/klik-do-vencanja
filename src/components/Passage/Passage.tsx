import "./Passage.css";

function Passage() {
  return (
    <section className="passage" aria-labelledby="passage-title">
      <div className="passage__lock">
        <h2 id="passage-title">
          <span>
            <em>složimo</em> dan u
          </span>
          <span>
            pozivnicu <em>koju</em>
          </span>
          <span>gosti otvore odmah</span>
        </h2>
        <p className="passage__lead">
          Vi donosite osećaj proslave. Mi ga pretvaramo u digitalnu pozivnicu koju gosti otvore
          odmah.
        </p>
        <a className="passage__cta" href="#invitation-showcase">
          Pogledajte kolekciju
        </a>
      </div>
      <ol className="passage__steps">
        <li>
          <h3>Vaša ideja</h3>
          <p>Počinje od osećaja proslave: tona, ritma i onoga što želite da gosti ponesu sa sobom.</p>
        </li>
        <li>
          <h3>Vaš događaj</h3>
          <p>Imena, datum, mesto i detalji koje nam poverite postaju osnova pozivnice.</p>
        </li>
        <li>
          <h3>Naša izrada</h3>
          <p>Mi oblikujemo digitalno iskustvo oko vaše priče. Vi ne prolazite kroz alat i ne sklapate je sami.</p>
        </li>
        <li>
          <h3>Dorada</h3>
          <p>Zajedno pregledamo svaki detalj pre nego što pozivnica krene ka gostima.</p>
        </li>
        <li>
          <h3>Jedan link</h3>
          <p>Gosti dobijaju jedan link. Odgovori se skupljaju na jednom mestu, bez dodatnih poruka.</p>
        </li>
      </ol>
    </section>
  );
}

export default Passage;
