import type { InvitationContent } from "../shared/types";
import envelopeClosed from "./assets/envelope-closed.png";

export { envelopeClosed };

export const dustyBlueSealDemoContent: InvitationContent = {
  couple: {
    partnerOne: "Natalija",
    partnerTwo: "Luka Gabriel",
    joiner: "&",
  },
  eventDateIso: "2026-06-13T19:00:00",
  eventDateLabel: "13. jun 2026.",
  quote: "Sa vama želimo da proslavimo dan koji pamtimo ceo život.",
  monogram: "NL",
  announcement: "Zajedno sa našim porodicama",
  venue: {
    title: "Ceremonija",
    timeLabel: "19:00",
    placeName: "Crkva Svetog Marka",
    address: "Bulevar kralja Aleksandra, Beograd",
    mapUrl: "https://maps.google.com",
    mapCtaLabel: "Lokacija",
  },
  dressCode: {
    title: "Kodeks oblačenja",
    label: "Svečano",
    note: "Muted i krem tonovi. Molimo vas da izbegnete belu boju.",
  },
  gifts: {
    title: "Pokloni",
    body: "Vaše prisustvo nam je najveći poklon. Ako želite da nas počastite, radujemo se koverti sa željama.",
  },
  rsvp: {
    title: "Potvrdite dolazak",
    deadlineLabel: "do 1. maja 2026.",
    ctaLabel: "Pošaljite odgovor",
  },
};

export type DustyBlueSealCopy = {
  invitationSubline: string;
  dateDay: string;
  dateMonth: string;
  dateYear: string;
  receptionTitle: string;
  receptionPlace: string;
  receptionAddress: string;
  quoteSource: string;
  detailsTitle: string;
  detailsUrl: string;
  saveTheDateLabel: string;
};

export const dustyBlueSealCopy: DustyBlueSealCopy = {
  invitationSubline: "Pozivamo vas da proslavite našu zajednicu",
  dateDay: "13",
  dateMonth: "Jun",
  dateYear: "26",
  receptionTitle: "Prijem",
  receptionPlace: "Vila Aurora",
  receptionAddress: "Košutnjak, Beograd",
  quoteSource: "",
  detailsTitle: "Detalji",
  detailsUrl: "klikdovencanja.rs/natalija-luka",
  saveTheDateLabel: "Sačuvajte datum",
};
