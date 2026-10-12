import ScrollReveal from "../../shared/ScrollReveal";
import { revealFade } from "../../shared/motion";

const tones = [
  { name: "Ruža", color: "#d7a7a8" },
  { name: "Krem", color: "#f3efe6" },
  { name: "Zlato", color: "#c4a15a" },
  { name: "Maslina", color: "#9aa584" },
] as const;

function PaletteSection() {
  return (
    <ScrollReveal as="section" className="inv6-qb-section" variants={revealFade} amount={0.2} once>
      <article className="inv6-qb-card inv6-qb-card--detail inv6-qb-palette" data-section="palette">
        <h2 className="inv6-qb-palette__title">Boje večeri</h2>
        <p className="inv6-qb-palette__note">Svečano, u ovim tonovima.</p>
        <ul className="inv6-qb-palette__tones">
          {tones.map((tone) => (
            <li key={tone.name}>
              <span className="inv6-qb-palette__swatch" style={{ background: tone.color }} />
              <span className="inv6-qb-palette__name">{tone.name}</span>
            </li>
          ))}
        </ul>
      </article>
    </ScrollReveal>
  );
}

export default PaletteSection;
