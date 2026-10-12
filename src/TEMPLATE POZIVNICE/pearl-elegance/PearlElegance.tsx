import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import InvitationShell from "../shared/InvitationShell";
import type { InvitationContent } from "../shared/types";
import { PEARL_ELEGANCE_ID, pearlEleganceConfig } from "./config";
import { pearlEleganceDemoContent, type PearlEleganceContent } from "./content";
import InviteOpener from "./InviteOpener";
import InviteAmbientMusic, {
  type InviteAmbientMusicHandle,
} from "../envelope-romance/InviteAmbientMusic";
import { PearlRevealContext } from "./reveal";
import { PaperHold } from "./scrollMotion";
import {
  CalendarSection,
  CinematicSection,
  ClosingSection,
  CountdownSection,
  HeroSection,
  InviteSection,
  ProgramSection,
  RsvpSection,
  VenueSection,
} from "./sections";
import "./PearlElegance.css";

export { PEARL_ELEGANCE_ID, pearlEleganceConfig };

export const pearlEleganceMeta = {
  id: pearlEleganceConfig.id,
  title: pearlEleganceConfig.title,
  sections: pearlEleganceConfig.sections,
} as const;

type PearlEleganceProps = {
  content?: InvitationContent;
};

function FloralBackdrop() {
  const reduce = useReducedMotion() === true;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => {
    if (reduce) return 0;
    return -Math.min(value * 0.35, window.innerHeight * 0.28);
  });
  return <motion.div className="pe-backdrop" style={{ y }} aria-hidden="true" />;
}

function isPearlContent(
  content: InvitationContent,
): content is PearlEleganceContent {
  return "invite" in content || "dateDigits" in content;
}

/**
 * Pearl Elegance template.
 * Premium pearl-adorned wedding invitation with cream + taupe sections
 * and scroll-linked paper layers. Fully data-driven via content.
 */
function PearlElegance({ content }: PearlEleganceProps) {
  const data: PearlEleganceContent =
    content && isPearlContent(content)
      ? content
      : pearlEleganceDemoContent;
  const [showOpener, setShowOpener] = useState(true);
  const musicRef = useRef<InviteAmbientMusicHandle>(null);

  const dismissOpener = useCallback(() => {
    window.scrollTo(0, 0);
    setShowOpener(false);
  }, []);

  const unlockMusic = useCallback(() => {
    musicRef.current?.unlockFromGesture();
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = showOpener ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [showOpener]);

  return (
    <>
      <FloralBackdrop />
      <PearlRevealContext.Provider value={!showOpener}>
        <InvitationShell
          templateId={PEARL_ELEGANCE_ID}
          className="pearl-elegance"
          aria-hidden={showOpener}
        >
          <InviteAmbientMusic ref={musicRef} music={data.music} />
          <HeroSection content={data} />
          <InviteSection content={data} />
          <CalendarSection content={data} />
          <CountdownSection content={data} />
          <CinematicSection content={data} />
          <VenueSection content={data} />
          <PaperHold className="pe-paper-hold">
            <ProgramSection content={data} />
          </PaperHold>
          <RsvpSection content={data} />
          <ClosingSection content={data} />
        </InvitationShell>
      </PearlRevealContext.Provider>

      {showOpener ? (
        <div className="pe-invite-cover" aria-hidden="true" />
      ) : null}

      {showOpener ? (
        <InviteOpener
          content={data}
          onFinished={dismissOpener}
          onMusicUnlock={unlockMusic}
        />
      ) : null}
    </>
  );
}

export default PearlElegance;
