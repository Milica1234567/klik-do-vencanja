import { useEffect } from "react";

import LetoLjubavi from "./leto-ljubavi";
import "./Invitation3Page.css";

function Invitation3Page() {
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
    <div className="invitation-3-route">
      <LetoLjubavi />
    </div>
  );
}

export default Invitation3Page;
