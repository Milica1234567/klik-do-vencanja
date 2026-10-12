import type { InvitationContent } from "../../shared/types";
import { softFloralDetails } from "../content";

type DetailsSectionProps = {
  content: InvitationContent;
};

type DetailNote = {
  key: string;
  title: string;
  text?: string;
  note?: string;
};

function DetailsSection({ content }: DetailsSectionProps) {
  const { dressCode } = content;

  const notes: DetailNote[] = [
    {
      key: "dressCode",
      title: "Dress code",
      text: dressCode?.label,
      note: dressCode?.note,
    },
    { key: "children", title: "Deca", text: softFloralDetails.children },
    { key: "directions", title: "Uputstva", text: softFloralDetails.directions },
    {
      key: "publicTransport",
      title: "Javni prevoz",
      text: softFloralDetails.publicTransport,
    },
  ].filter((item) => item.text);

  if (!notes.length) return null;

  return (
    <section className="inv5-sf-details" data-section="details" aria-label="Ostali detalji">
      <div className="inv5-sf-details__veil" aria-hidden="true" />
      <div className="inv5-sf-details__copy">
        <h2 className="inv5-sf-details__title">Ostali detalji</h2>
        <div className="inv5-sf-details__list">
          {notes.map((item, index) => (
            <article key={item.key} className="inv5-sf-details__item">
              <span className="inv5-sf-details__index">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="inv5-sf-details__subheading">{item.title}</h3>
              <p className="inv5-sf-details__text">{item.text}</p>
              {item.note ? <p className="inv5-sf-details__text inv5-sf-details__text--note">{item.note}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DetailsSection;
