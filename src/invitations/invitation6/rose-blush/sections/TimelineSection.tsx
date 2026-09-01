import ScrollReveal from "../../shared/ScrollReveal";
import { revealUp } from "../../shared/motion";
import type { InvitationContent } from "../../shared/types";
import { blushArt } from "../art";
import LineArt from "../components/LineArt";

type TimelineSectionProps = {
  content: InvitationContent;
};

const ICONS: Record<string, string> = {
  camera: blushArt.camera,
  car: blushArt.car,
  rings: blushArt.rings,
  dancing: blushArt.dancing,
  glasses: blushArt.glasses,
  cocktails: blushArt.cocktails,
  couple: blushArt.couple,
};

function TimelineSection({ content }: TimelineSectionProps) {
  const { timeline } = content;
  if (!timeline?.length) return null;

  return (
    <ScrollReveal as="section" className="inv6-qb-section" variants={revealUp} amount={0.06} once>
      <div className="inv6-qb-day" data-section="timeline">
        <h2 className="inv6-qb-gold-title">Dan venčanja</h2>
        <div className="inv6-qb-day__grid">
          {timeline.map((item) => {
            const icon = item.icon ? ICONS[item.icon] : undefined;

            return (
              <article key={item.id} className="inv6-qb-day__block">
                {icon ? (
                  <LineArt src={icon} className="inv6-qb-day__art" />
                ) : null}

                <h3 className="inv6-qb-day__title">{item.title}</h3>

                {item.description ? (
                  <p className="inv6-qb-day__place">{item.description}</p>
                ) : null}

                {item.time ? (
                  <>
                    <span className="inv6-qb-day__dots" aria-hidden="true" />
                    <p className="inv6-qb-day__time">{item.time}</p>
                  </>
                ) : null}
              </article>
            );
          })}
        </div>
        <article className="inv6-qb-day__block inv6-qb-day__block--kraj">
          <LineArt src={blushArt.glasses} className="inv6-qb-day__art" />
          <p className="inv6-qb-day__kraj">Kraj</p>
          <span className="inv6-qb-day__dots" aria-hidden="true" />
          <p className="inv6-qb-day__time">00.00</p>
        </article>
      </div>
    </ScrollReveal>
  );
}

export default TimelineSection;
