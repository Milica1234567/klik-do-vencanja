import type { ReactNode } from "react";

import paperSheet from "../assets/paper-sheet.png";

type PaperSheetProps = {
  children: ReactNode;
  className?: string;
  compact?: boolean;
};

/** Optional torn-paper surface — used sparingly (welcome). */
function PaperSheet({ children, className = "", compact = false }: PaperSheetProps) {
  return (
    <div
      className={`bs-paper ${compact ? "bs-paper--compact" : ""} ${className}`.trim()}
    >
      <img
        className="bs-paper__sheet"
        src={paperSheet}
        alt=""
        draggable={false}
      />
      <div className="bs-paper__ink">{children}</div>
    </div>
  );
}

export default PaperSheet;
