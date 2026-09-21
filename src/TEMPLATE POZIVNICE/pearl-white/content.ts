import type { InvitationContent } from "../shared/types";

export type PearlWhiteContent = InvitationContent & {
  welcome?: {
    greeting: string;
    body: string;
  };
  countdownTitle?: string;
  scheduleTitle?: string;
  locationTitle?: string;
  details?: {
    title: string;
    intro: string;
    contactName: string;
    contactPhone: string;
  };
  dressSwatches?: string[];
  dressGentlemenNote?: string;
};

export const pearlWhiteDemoContent: PearlWhiteContent = {
  couple: {
    partnerOne: "Viktor",
    partnerTwo: "Paula",
    joiner: "i",
  },
  eventDateIso: "2026-07-05T16:00:00",
  eventDateLabel: "05.07.26.",
  announcement: "Dan venčanja",
  monogram: "V&P",
  welcome: {
    greeting: "Dragi prijatelji i porodico,",
    body: "Dok se spremamo da kažemo „da”, osećamo zahvalnost prema svima vama koji činite naše živote lepšim. Vaša podrška nam mnogo znači i bila bi nam čast da budete uz nas dok započinjemo zajednički život.",
  },
  countdownTitle: "Proslava počinje za",
  scheduleTitle: "Raspored događaja",
  locationTitle: "Lokacija",
  venue: {
    title: "Lokacija",
    timeLabel: "16:00",
    placeName: "Chateau de Baron",
    address: "Arl, Francuska",
    mapUrl: "https://maps.google.com",
    mapCtaLabel: "Otvori mapu",
  },
  timeline: [
    { id: "ceremony", time: "16:00", title: "Ceremonija venčanja" },
    { id: "cocktail", time: "17:00", title: "Koktel" },
    { id: "dinner", time: "19:00", title: "Večera" },
    { id: "party", time: "20:00", title: "Zabava" },
  ],
  dressCode: {
    title: "Kodeks oblačenja",
    label: "Svečano",
    note: "Ljubazno vas molimo da dođete u elegantnoj svečanoj garderobi koja prati duh našeg dana.",
  },
  dressSwatches: ["#fffcf8", "#c5d6e4", "#8fa889", "#d8b4b4"],
  dressGentlemenNote:
    "Gospodo — poželjne su klasične svečane cipele.",
  gifts: {
    title: "Pokloni",
    body: "Vaše prisustvo nam je najveći poklon. Ako ipak želite da nas obradujete, doprinos našem zajedničkom početku bio bi nam od srca drag.",
  },
  details: {
    title: "Detalji",
    intro:
      "Za dodatne informacije ili pitanja, obratite se organizatorima venčanja.",
    contactName: "Amelija",
    contactPhone: "+381 60 123 4567",
  },
  rsvp: {
    title: "Potvrdite dolazak",
    deadlineLabel: "Molimo vas da potvrdite dolazak do 1. juna 2026.",
    ctaLabel: "Potvrdi",
  },
  closingMessage: "Viktor i Paula",
};
