import "./PhotoIntro.css";
import couplePhoto from "../../assets/img2.jpg";

function PhotoIntro() {
  return (
    <section className="inv11-photo-intro" id="inv11-photo-intro">
      <img src={couplePhoto} alt="Mladenci u pokretu" />
      <blockquote data-inv11-reveal>Postoje trenuci koji traju jedan dan,<br />a pamtimo ih zauvek.</blockquote>
    </section>
  );
}

export default PhotoIntro;
