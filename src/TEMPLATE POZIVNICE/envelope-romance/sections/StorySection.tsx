import SlideIn from "../../shared/SlideIn";
import TornPaperEdge from "../../shared/TornPaperEdge";
import type { InvitationContent } from "../../shared/types";

type StorySectionProps = {
  content: InvitationContent;
};

function StorySection({ content }: StorySectionProps) {
  const photo = content.storyImage;

  return (
    <section className="er-story" data-section="story" aria-label="Priča">
      <div className="er-story__tear">
        <TornPaperEdge />
      </div>

      <div className="er-story__paper">
        <div className="er-story__inner">
          <SlideIn from="right" className="er-block">
            <p className="er-eyebrow">naša priča</p>
            <h2 className="er-title">Priča</h2>
          </SlideIn>

          {photo ? (
            <SlideIn from="left" className="er-photo-frame" delay={0.08}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </SlideIn>
          ) : null}

          {content.quote ? (
            <SlideIn from="right" delay={0.12}>
              <blockquote className="er-quote">{content.quote}</blockquote>
            </SlideIn>
          ) : null}

          {content.announcement ? (
            <SlideIn from="left" delay={0.16}>
              <p className="er-script">{content.announcement}</p>
            </SlideIn>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default StorySection;
