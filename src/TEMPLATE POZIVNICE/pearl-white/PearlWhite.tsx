import { useEffect, useRef } from "react";

import InvitationShell from "../shared/InvitationShell";
import videoFlow from "./assets/videoflow-sharp.mp4";
import { PEARL_WHITE_ID, pearlWhiteConfig } from "./config";
import {
  pearlWhiteDemoContent,
  type PearlWhiteContent,
} from "./content";
import {
  CountdownSection,
  DetailsSection,
  DressCodeSection,
  HeroSection,
  LocationSection,
  RsvpSection,
  ScheduleSection,
  WelcomeSection,
} from "./sections";
import "./PearlWhite.css";

export { PEARL_WHITE_ID, pearlWhiteConfig };

export const pearlWhiteMeta = {
  id: pearlWhiteConfig.id,
  title: pearlWhiteConfig.title,
  sections: pearlWhiteConfig.sections,
} as const;

type PearlWhiteProps = {
  content?: PearlWhiteContent;
};

function PearlWhite({ content = pearlWhiteDemoContent }: PearlWhiteProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      video.pause();
      return;
    }

    video.muted = true;
    const play = video.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => {
        /* Autoplay blocked — first frame still visible */
      });
    }
  }, []);

  return (
    <InvitationShell templateId={PEARL_WHITE_ID} className="pearl-white">
      <div className="bs-page">
        <div className="bs-bg" aria-hidden="true">
          <video
            ref={videoRef}
            className="bs-bg__video"
            src={videoFlow}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            disablePictureInPicture
          />
        </div>

        <div className="bs-flow">
          <HeroSection content={content} />
          <WelcomeSection content={content} />
          <CountdownSection content={content} />
          <ScheduleSection content={content} />
          <LocationSection content={content} />
          <DressCodeSection content={content} />
          <DetailsSection content={content} />
          <RsvpSection content={content} />
        </div>
      </div>
    </InvitationShell>
  );
}

export default PearlWhite;
