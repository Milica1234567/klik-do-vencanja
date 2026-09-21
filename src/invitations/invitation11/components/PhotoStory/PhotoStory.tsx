import "./PhotoStory.css";
import motionPhoto from "../../assets/img1.jpg";
import detailPhoto from "../../assets/img3.jpg";
import filmPhoto from "../../assets/img4.jpg";

function PhotoStory() {
  return (
    <section className="inv11-story" aria-label="Naša priča u fotografijama">
      <div className="inv11-story__texture" aria-hidden="true" />
      <figure className="inv11-story__portrait" data-inv11-reveal><img src={detailPhoto} alt="Mladenci sa bidermajerom" /><figcaption>U pokretu, zajedno.</figcaption></figure>
      <figure className="inv11-story__detail" data-inv11-reveal><img src={filmPhoto} alt="Filmski detalj mladenaca" /></figure>
      <blockquote data-inv11-reveal>Naša najlepša<br />priča tek počinje.</blockquote>
      <figure className="inv11-story__wide" data-inv11-reveal><img src={motionPhoto} alt="Mladenci u filmskom kadru" /></figure>
    </section>
  );
}

export default PhotoStory;
