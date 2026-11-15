import type { PearlEleganceContent } from "../content";
import { usePearlReveal } from "../reveal";
import HeroCountdown from "./hero/HeroCountdown";
import { useHeroCountdown } from "./hero/useHeroCountdown";

type HeroSectionProps = {
  content: PearlEleganceContent;
};

function HeroSection({ content }: HeroSectionProps) {
  const { couple, heroImage, eventDateIso, countdown } = content;
  const revealed = usePearlReveal();
  const countdownState = useHeroCountdown(eventDateIso);
  const photoAlt = heroImage?.alt ?? `${couple.partnerOne} & ${couple.partnerTwo}`;
  const joiner = couple.joiner ?? "i";

  return (
    <section className="inv4-pe-hero" data-section="hero" aria-label="Naslovnica">
      <div className="inv4-pe-hero__stage">
        <div className="inv4-pe-hero__ground-shadow" aria-hidden="true" />

        <div className="inv4-pe-hero__lift">
          <article className="inv4-pe-hero__card">
            <div className="inv4-pe-hero__media">
              {heroImage ? (
                <img
                  className="inv4-pe-hero__photo"
                  src={heroImage.src}
                  alt={photoAlt}
                  draggable={false}
                />
              ) : null}
            </div>

            <div className="inv4-pe-hero__veil" aria-hidden="true" />

            <div className="inv4-pe-hero__content">
              <h1 className="inv4-pe-hero__names">
                <span className="inv4-pe-hero__name">{couple.partnerOne}</span>
                <span className="inv4-pe-hero__joiner">{joiner}</span>
                <span className="inv4-pe-hero__name">{couple.partnerTwo}</span>
              </h1>

              <HeroCountdown
                parts={countdownState}
                arrived={countdownState.arrived}
                arrivedNote={countdown?.arrivedNote ?? "Danas je taj dan!"}
                active={revealed}
              />
            </div>
          </article>
        </div>
      </div>

      <div className="inv4-pe-hero__scroll" aria-hidden="true">
        <span className="inv4-pe-hero__scroll-chevron" />
      </div>
    </section>
  );
}

export default HeroSection;
