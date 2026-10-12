import type { InvitationContent } from "../shared/types";
import bloomImage from "./assets/veil-bloom.jpg";
import silkImage from "./assets/veil-silk.jpg";
import stemsImage from "./assets/veil-stems.jpg";

export { bloomImage, silkImage, stemsImage };

export const softFloralDemoContent: InvitationContent = {
  couple: {
    partnerOne: "Jelena",
    partnerTwo: "Stefan",
    joiner: "i",
  },
  eventDateIso: "2027-09-12T15:00:00",
  eventDateLabel: "12. septembar 2027.",
  heroImage: {
    src: stemsImage,
    alt: "Jelena i Stefan — pozivnica",
  },
  closingImage: {
    src: stemsImage,
    alt: "Jelena i Stefan — završna fotografija",
  },
  venue: {
    title: "Glavni događaj",
    timeLabel: "15:00",
    placeName: "Villa Botanica",
    address: "Knez Mihailova 12, Beograd",
  },
  rsvp: {
    title: "RSVP",
    deadlineLabel: "Molimo vas da potvrdite dolazak do 1. avgusta 2027.",
    ctaLabel: "Potvrdite dolazak",
  },
  timeline: [
    { id: "ceremony", time: "15:00", title: "Ceremonija", icon: "rings" },
    { id: "drinks", time: "16:00", title: "Kokteli", icon: "champagne" },
    { id: "photos", time: "17:00", title: "Fotografisanje", icon: "camera" },
    { id: "dinner", time: "19:00", title: "Večera", icon: "dinner" },
    { id: "party", time: "22:00", title: "Zabava", icon: "party" },
    { id: "end", time: "00:00", title: "Kraj", icon: "moon" },
  ],
  dressCode: {
    title: "Dress code",
    label: "Svečano — pastelne i neutralne nijanse",
    note: "Molimo vas da izbegnete belu boju.",
  },
  closingMessage: "Radujemo se što ćemo proslavu provesti sa vama",
};

export type SoftFloralDetails = {
  children: string;
  directions: string;
  publicTransport: string;
};

export const softFloralDetails: SoftFloralDetails = {
  children:
    "Deca su dobrodošla. Molimo vas da nas obavestite unapred kako bismo obezbedili odgovarajuće mesto za sedenje.",
  directions:
    "Villa Botanica se nalazi u centru grada. Parking je obezbeđen u blizini lokala — pratite table sa našim imenima.",
  publicTransport:
    "Autobuske linije 15, 31 i 78 staju na stanici Kalemegdan, pet minuta hoda od sale.",
};

export const softFloralMoments = {
  quote: "Gde cveta ljubav, rastu i snovi.",
  frames: [{ id: "m1", position: "50% 35%" }],
} as const;
