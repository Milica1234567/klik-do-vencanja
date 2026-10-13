import { blushArt } from "../art";
import LineArt from "./LineArt";

type OrnamentSet = "hero" | "detail" | "quote" | "reception" | "dress";

type CardOrnamentsProps = {
  set?: OrnamentSet;
};

const SETS: Record<
  OrnamentSet,
  { src: string; className: string }[]
> = {
  hero: [
    { src: blushArt.floralCorner, className: "qb-orn qb-orn--tl" },
    { src: blushArt.floralCorner, className: "qb-orn qb-orn--tr-corner" },
  ],
  detail: [
    { src: blushArt.floralCorner, className: "qb-orn qb-orn--tl" },
    { src: blushArt.floralCorner, className: "qb-orn qb-orn--br" },
    { src: blushArt.butterfly, className: "qb-orn qb-orn--mr" },
  ],
  reception: [
    { src: blushArt.floralCorner, className: "qb-orn qb-orn--tl" },
  ],
  dress: [
    { src: blushArt.floralCorner, className: "qb-orn qb-orn--br-vine" },
  ],
  quote: [
    { src: blushArt.bird, className: "qb-orn qb-orn--tr qb-orn--sm" },
  ],
};

function CardOrnaments({ set = "detail" }: CardOrnamentsProps) {
  return (
    <div className="qb-card__ornaments" aria-hidden="true">
      {SETS[set].map((item) => (
        <LineArt
          key={`${item.src}-${item.className}`}
          src={item.src}
          className={item.className}
        />
      ))}
    </div>
  );
}

export default CardOrnaments;
