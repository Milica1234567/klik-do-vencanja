import { useEffect } from "react";

import WineInvitation from "./Invitation7";
import "./Invitation11Page.css";

function Invitation11Page() {
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
    <div className="invitation-11-route">
      <WineInvitation />
    </div>
  );
}

export default Invitation11Page;
