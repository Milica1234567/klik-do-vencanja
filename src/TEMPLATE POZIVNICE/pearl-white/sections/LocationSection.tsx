import ScrollReveal from "../../shared/ScrollReveal";
import { revealFade } from "../../shared/motion";
import chateauLine from "../assets/chateau-line.png";
import type { PearlWhiteContent } from "../content";

type LocationSectionProps = {
  content: PearlWhiteContent;
};

function LocationSection({ content }: LocationSectionProps) {
  const { venue } = content;
  if (!venue) return null;

  return (
    <ScrollReveal as="section" className="bs-section" variants={revealFade}>
      <div className="bs-panel">
        <h2 className="bs-script">
          {content.locationTitle ?? venue.title ?? "Lokacija"}
        </h2>
        <p className="bs-location__place">{venue.placeName}</p>
        {venue.address ? (
          <p className="bs-location__address">{venue.address}</p>
        ) : null}
        <img
          className="bs-location__art"
          src={chateauLine}
          alt=""
          draggable={false}
        />
      </div>
    </ScrollReveal>
  );
}

export default LocationSection;
