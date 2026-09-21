import type { InvitationTemplateConfig } from "../shared/types";

export const DUSTY_BLUE_SEAL_ID = "dusty-blue-seal" as const;

export const dustyBlueSealConfig: InvitationTemplateConfig = {
  id: DUSTY_BLUE_SEAL_ID,
  title: "Dusty Blue Seal",
  assets: {},
  opener: {
    id: "envelope-video",
    phases: ["intro", "enter"] as const,
    layers: [],
  },
  sections: [
    { id: "spread", component: "SpreadSection" },
    { id: "rsvp", component: "RsvpSection" },
  ],
};
