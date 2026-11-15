import type { InvitationContent } from "../shared/types";

export const roseBlushDemoContent: InvitationContent = {
  couple: {
    partnerOne: "Jelena",
    partnerTwo: "Stefan",
    joiner: "i",
  },
  eventDateIso: "2027-09-12T17:00:00",
  eventDateLabel: "Nedelja 12. septembar 2027.",
  quote:
    "Sa vama želimo da proslavimo dan koji ćemo pamtiti ceo život.",
  announcement: "Venčavamo se",
  monogram: "JS",
  venue: {
    title: "Ceremonija",
    timeLabel: "17:00",
    placeName: "Villa Botanica",
    address: "Beograd",
    mapUrl: "https://maps.google.com",
    mapCtaLabel: "Pogledaj lokaciju",
  },
  timeline: [
    {
      id: "photos",
      time: "16.30",
      title: "Skup svatova i slikanje sa mladencima",
      icon: "camera",
    },
    {
      id: "ceremony",
      time: "17.00",
      title: "Ceremonija venčanja",
      icon: "rings",
    },
    {
      id: "entrance",
      time: "18.45",
      title: "Ulazak mladenaca",
      icon: "car",
    },
    {
      id: "dance",
      time: "19.00",
      title: "Svadbena torta i prvi ples",
      icon: "dancing",
    },
  ],
  dressCode: {
    title: "Kodeks oblačenja",
    label: "Svečano",
  },
  rsvp: {
    title: "Potvrdite dolazak",
    deadlineLabel: "Molimo vas da potvrdite dolazak do 1. avgusta 2027.",
    ctaLabel: "Potvrdi",
  },
  closingMessage: "Jelena i Stefan",
};

export const roseBlushDateParts = {
  weekday: "Nedelja",
  day: "12",
  month: "Septembar",
  year: "2027",
};
