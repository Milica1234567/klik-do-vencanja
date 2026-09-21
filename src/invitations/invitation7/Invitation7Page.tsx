import { useEffect } from "react";

import WatercolorInvitation from "./Invitation2";
import "./Invitation7Page.css";

function Invitation7Page() {
  useEffect(() => {
    const existingMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    const previousContent = existingMeta?.content;
    const robotsMeta = existingMeta ?? document.createElement("meta");

    if (!existingMeta) {
      robotsMeta.name = "robots";
      document.head.appendChild(robotsMeta);
    }

    robotsMeta.content = "noindex, nofollow";

    return () => {
      if (existingMeta && previousContent !== undefined) {
        existingMeta.content = previousContent;
      } else {
        robotsMeta.remove();
      }
    };
  }, []);

  return (
    <div className="invitation-7-route">
      <WatercolorInvitation />
    </div>
  );
}

export default Invitation7Page;
