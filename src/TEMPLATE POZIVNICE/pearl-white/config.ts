import type { InvitationTemplateConfig } from "../shared/types";

export const PEARL_WHITE_ID = "pearl-white" as const;

export const pearlWhiteConfig: InvitationTemplateConfig = {
  id: PEARL_WHITE_ID,
  title: "Pearl White",
  assets: {},
  sections: [
    { id: "hero", component: "HeroSection" },
    { id: "welcome", component: "WelcomeSection" },
    { id: "countdown", component: "CountdownSection" },
    { id: "timeline", component: "ScheduleSection" },
    { id: "venue", component: "LocationSection" },
    { id: "dress-code", component: "DressCodeSection" },
    { id: "details", component: "DetailsSection" },
    { id: "rsvp", component: "RsvpSection" },
  ],
};
