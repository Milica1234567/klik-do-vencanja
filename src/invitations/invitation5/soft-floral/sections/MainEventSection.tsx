import type { InvitationContent } from "../../shared/types";

type MainEventSectionProps = {
  content: InvitationContent;
};

function MainEventSection({ content }: MainEventSectionProps) {
  const { venue } = content;

  return (
    <section className="inv5-sf-event" data-section="main-event" aria-label="Kada i gde">
      <div className="inv5-sf-event__copy">
        <h2 className="inv5-sf-event__kicker">Kada i gde</h2>

        {venue ? (
          <div className="inv5-sf-event__placeblock">
            <p className="inv5-sf-event__time">{venue.timeLabel}</p>
            <p className="inv5-sf-event__place">{venue.placeName}</p>
            {venue.address ? <p className="inv5-sf-event__address">{venue.address}</p> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default MainEventSection;
