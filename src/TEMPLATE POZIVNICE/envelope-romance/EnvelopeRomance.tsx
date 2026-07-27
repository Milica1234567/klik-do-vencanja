import InvitationShell from "../shared/InvitationShell";
import type { InvitationContent } from "../shared/types";
import {
  ENVELOPE_ROMANCE_ID,
  envelopeRomanceConfig,
} from "./config";
import { envelopeRomanceDemoContent } from "./content";
import {
  ClosingSection,
  CountdownSection,
  DressCodeSection,
  GiftsSection,
  HeroSection,
  HotelsSection,
  MusicSection,
  ParentsSection,
  RsvpSection,
  StorySection,
  TimelineSection,
  VenueSection,
} from "./sections";
import "./EnvelopeRomance.css";

export { ENVELOPE_ROMANCE_ID, envelopeRomanceConfig };

export const envelopeRomanceMeta = {
  id: envelopeRomanceConfig.id,
  title: envelopeRomanceConfig.title,
  sections: envelopeRomanceConfig.sections,
} as const;

type EnvelopeRomanceProps = {
  content?: InvitationContent;
};

/**
 * Envelope Romance template.
 * Full invitation sections with alternating left/right slide-in motion.
 */
function EnvelopeRomance({
  content = envelopeRomanceDemoContent,
}: EnvelopeRomanceProps) {
  return (
    <InvitationShell
      templateId={ENVELOPE_ROMANCE_ID}
      className="envelope-romance"
    >
      <HeroSection content={content} />
      <StorySection content={content} />
      <MusicSection content={content} />
      <ParentsSection content={content} />
      <CountdownSection content={content} />
      <VenueSection content={content} />
      <TimelineSection content={content} />
      <DressCodeSection content={content} />
      <GiftsSection content={content} />
      <HotelsSection content={content} />
      <RsvpSection content={content} />
      <ClosingSection content={content} />
    </InvitationShell>
  );
}

export default EnvelopeRomance;
