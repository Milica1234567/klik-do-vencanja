import type { InvitationContent } from "../../shared/types";

type MainEventSectionProps = {
  content: InvitationContent;
};

function MainEventSection({ content }: MainEventSectionProps) {
  const { venue } = content;

  return (
    <section className="sf-event" data-section="main-event" aria-label="Kada i gde">
      <div className="sf-event__copy">
        <h2 className="sf-event__kicker">Kada i gde</h2>

        {venue ? (
          <div className="sf-event__placeblock">
            <p className="sf-event__time">{venue.timeLabel}</p>
            <p className="sf-event__place">{venue.placeName}</p>
            {venue.address ? <p className="sf-event__address">{venue.address}</p> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default MainEventSection;
