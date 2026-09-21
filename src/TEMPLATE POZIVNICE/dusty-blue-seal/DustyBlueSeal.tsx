import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import InvitationShell from "../shared/InvitationShell";
import type { InvitationContent } from "../shared/types";
import { DUSTY_BLUE_SEAL_ID, dustyBlueSealConfig } from "./config";
import { dustyBlueSealDemoContent } from "./content";
import EnvelopeVideoOpener from "./scenes/EnvelopeVideoOpener";
import { RsvpSection, SpreadSection } from "./sections";
import "./DustyBlueSeal.css";

export { DUSTY_BLUE_SEAL_ID, dustyBlueSealConfig };

export const dustyBlueSealMeta = {
  id: dustyBlueSealConfig.id,
  title: dustyBlueSealConfig.title,
  sections: dustyBlueSealConfig.sections,
} as const;

type DustyBlueSealProps = {
  content?: InvitationContent;
};

function DustyBlueSeal({ content = dustyBlueSealDemoContent }: DustyBlueSealProps) {
  const [phase, setPhase] = useState<"intro" | "entered">("intro");

  return (
    <InvitationShell templateId={DUSTY_BLUE_SEAL_ID} className="dusty-blue-seal">
      <AnimatePresence>
        {phase === "intro" ? (
          <EnvelopeVideoOpener
            key="envelope-video"
            onComplete={() => setPhase("entered")}
          />
        ) : null}
      </AnimatePresence>

      {phase === "entered" ? (
        <div className="dbs-content">
          <SpreadSection content={content} />
          <RsvpSection content={content} />
        </div>
      ) : null}
    </InvitationShell>
  );
}

export default DustyBlueSeal;
