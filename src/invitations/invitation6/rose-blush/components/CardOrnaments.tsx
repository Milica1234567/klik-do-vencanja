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
    { src: blushArt.floralCorner, className: "inv6-qb-orn inv6-qb-orn--tl" },
    { src: blushArt.floralCorner, className: "inv6-qb-orn inv6-qb-orn--tr-corner" },
    { src: blushArt.lavender, className: "inv6-qb-orn inv6-qb-orn--bl" },
    { src: blushArt.bouquet, className: "inv6-qb-orn inv6-qb-orn--br-spray" },
  ],
  detail: [
    { src: blushArt.floralCorner, className: "inv6-qb-orn inv6-qb-orn--tl" },
    { src: blushArt.spray, className: "inv6-qb-orn inv6-qb-orn--tr" },
    { src: blushArt.floralCorner, className: "inv6-qb-orn inv6-qb-orn--br" },
    { src: blushArt.lavender, className: "inv6-qb-orn inv6-qb-orn--bl" },
    { src: blushArt.butterfly, className: "inv6-qb-orn inv6-qb-orn--mr" },
  ],
  reception: [
    { src: blushArt.floralCorner, className: "inv6-qb-orn inv6-qb-orn--tl" },
    { src: blushArt.spray, className: "inv6-qb-orn inv6-qb-orn--br-spray" },
  ],
  dress: [
    { src: blushArt.spray, className: "inv6-qb-orn inv6-qb-orn--tl-spray" },
    { src: blushArt.floralCorner, className: "inv6-qb-orn inv6-qb-orn--br-vine" },
  ],
  quote: [
    { src: blushArt.bird, className: "inv6-qb-orn inv6-qb-orn--tr inv6-qb-orn--sm" },
  ],
};

function CardOrnaments({ set = "detail" }: CardOrnamentsProps) {
  return (
    <div className="inv6-qb-card__ornaments" aria-hidden="true">
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
