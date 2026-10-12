import type { InvitationContent } from "../../shared/types";

type ClosingSectionProps = {
  content: InvitationContent;
};

function ClosingSection({ content }: ClosingSectionProps) {
  const { couple, closingMessage } = content;
  const joiner = couple.joiner ?? "i";

  return (
    <footer className="inv5-sf-closing" data-section="closing">
      <div className="inv5-sf-closing__wash" aria-hidden="true" />
      <div className="inv5-sf-closing__copy">
        <p className="inv5-sf-closing__message">
          {closingMessage ?? "Radujemo se što ćemo proslavu provesti sa vama"}
        </p>
        <p className="inv5-sf-closing__names">
          {couple.partnerOne} {joiner} {couple.partnerTwo}
        </p>
      </div>
    </footer>
  );
}

export default ClosingSection;
