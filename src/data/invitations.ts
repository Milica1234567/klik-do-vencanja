import type { InvitationTemplate } from "../types/invitation";

import beigePinkWedding from "../assets/invitations/beige-pink-compresed.mp4";
import whiteGreenWedding from "../assets/invitations/white-green-elegant-compresed.mp4";

export const invitationTemplates: InvitationTemplate[] = [
  {
    id: "wedding-beige-pink-watercolor",
    title: "Beige Pink Watercolor",
    category: "wedding",
    media: {
      type: "video",
      src: beigePinkWedding,
    },
    accentColor: "#C4A69B",
  },
  {
    id: "wedding-white-green-romantic",
    title: "White Green Romantic",
    category: "wedding",
    media: {
      type: "video",
      src: whiteGreenWedding,
    },
    accentColor: "#A3AE9A",
  },
];
