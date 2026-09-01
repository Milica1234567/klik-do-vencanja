import { useEffect } from "react";

import PearlElegance from "./pearl-elegance";
import "./Invitation4Page.css";

function Invitation4Page() {
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
    <div className="invitation-4-route">
      <PearlElegance />
    </div>
  );
}

export default Invitation4Page;
