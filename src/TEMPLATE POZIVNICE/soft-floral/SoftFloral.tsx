import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import InvitationShell from "../shared/InvitationShell";
import type { InvitationContent } from "../shared/types";
import { SOFT_FLORAL_ID, softFloralConfig } from "./config";
import { softFloralDemoContent } from "./content";
import callaImage from "./assets/calla-gate.png";
import FlowerGateOpener from "./scenes/FlowerGateOpener";
import {
  CalendarSection,
  ClosingSection,
  CountdownSection,
  DetailsSection,
  HeroSection,
  MainEventSection,
  MomentsSection,
  RsvpSection,
  TimelineSection,
} from "./sections";
import "./SoftFloral.css";

export { SOFT_FLORAL_ID, softFloralConfig };

export const softFloralMeta = {
  id: softFloralConfig.id,
  title: softFloralConfig.title,
  sections: softFloralConfig.sections,
} as const;

type SoftFloralProps = {
  content?: InvitationContent;
};

function SoftFloral({ content = softFloralDemoContent }: SoftFloralProps) {
  const [phase, setPhase] = useState<"gate" | "opening" | "entered">("gate");
  const [writeNames, setWriteNames] = useState(false);
  const invitationReady = phase !== "gate";
  const { couple } = content;

  useEffect(() => {
    if (phase !== "opening") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => setWriteNames(true), reduce ? 0 : 2600);
    return () => window.clearTimeout(id);
  }, [phase]);

  return (
    <InvitationShell templateId={SOFT_FLORAL_ID} className="soft-floral">
      <AnimatePresence>
        {phase !== "entered" ? (
          <FlowerGateOpener
            key="flower-gate"
            partnerOne={couple.partnerOne}
            partnerTwo={couple.partnerTwo}
            joiner={couple.joiner}
            leaving={phase === "opening"}
            onOpen={() => setPhase("opening")}
            onComplete={() => {
              setWriteNames(true);
              setPhase("entered");
            }}
          />
        ) : null}
      </AnimatePresence>

      {invitationReady ? (
        <div className="sf-content">
          <div className="sf-bg" aria-hidden="true">
            <img src={callaImage} alt="" draggable={false} />
          </div>
          <HeroSection content={content} writeNames={writeNames} />
          <CountdownSection content={content} />
          <MainEventSection content={content} />
          <CalendarSection content={content} />
          <MomentsSection content={content} />
          <TimelineSection content={content} />
          <DetailsSection content={content} />
          <RsvpSection content={content} />
          <ClosingSection content={content} />
        </div>
      ) : null}
    </InvitationShell>
  );
}

export default SoftFloral;
