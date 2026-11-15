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
    <section className="pe-hero" data-section="hero" aria-label="Naslovnica">
      <div className="pe-hero__stage">
        <div className="pe-hero__ground-shadow" aria-hidden="true" />

        <div className="pe-hero__lift">
          <article className="pe-hero__card">
            <div className="pe-hero__media">
              {heroImage ? (
                <img
                  className="pe-hero__photo"
                  src={heroImage.src}
                  alt={photoAlt}
                  draggable={false}
                />
              ) : null}
            </div>

            <div className="pe-hero__veil" aria-hidden="true" />

            <div className="pe-hero__content">
              <h1 className="pe-hero__names">
                <span className="pe-hero__name">{couple.partnerOne}</span>
                <span className="pe-hero__joiner">{joiner}</span>
                <span className="pe-hero__name">{couple.partnerTwo}</span>
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

      <div className="pe-hero__scroll" aria-hidden="true">
        <span className="pe-hero__scroll-chevron" />
      </div>
    </section>
  );
}

export default HeroSection;
