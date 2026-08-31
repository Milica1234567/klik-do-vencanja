import { useEffect } from "react";

import Invitation1 from "./Invitation1";

function Invitation1Page() {
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
    <div className="invitation-1-route">
      <Invitation1 />
    </div>
  );
}

export default Invitation1Page;
