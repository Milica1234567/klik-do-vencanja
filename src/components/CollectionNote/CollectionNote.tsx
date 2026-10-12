import Reveal from "../motion/Reveal";
import "./CollectionNote.css";

function CollectionNote() {
  return (
    <section className="collection-note" aria-label="Kolekcija pozivnica">
      <Reveal className="collection-note__inner" kind="slide">
        <p>Kolekcija</p>
        <h2>Izaberite osećaj.</h2>
      </Reveal>
    </section>
  );
}

export default CollectionNote;
