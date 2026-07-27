import type { InvitationContent } from "../shared/types";
import couplePlaceholder from "./assets/couple-hero-placeholder.png";
import inviteClosing from "./assets/invite-closing.jpg";
import inviteFloral from "./assets/invite-floral.jpg";
import inviteStory from "./assets/invite-story.jpg";
import inviteVenue from "./assets/invite-venue.jpg";

/**
 * Demo content for Envelope Romance.
 * Swap per client without changing section components.
 */
export const envelopeRomanceDemoContent: InvitationContent = {
  couple: {
    partnerOne: "Ana",
    partnerTwo: "Marko",
    joiner: "&",
  },
  eventDateIso: "2026-09-12T17:00:00",
  eventDateLabel: "12. 09. 2026.",
  heroImage: {
    src: couplePlaceholder,
    alt: "Ana i Marko",
  },
  storyImage: {
    src: inviteStory,
    alt: "Ana i Marko u bašti",
  },
  closingImage: {
    src: inviteClosing,
    alt: "Venčano prstenje i cveće",
  },
  quote:
    "Ljubav je strpljiva, ljubav je dobrostiva. Sve veruje, svemu se nada, sve trpi.",
  monogram: "A | M",
  announcement: "Venčavamo se",
  parentsNote:
    "Uz blagoslov naših porodica, sa radošću vas pozivamo da budete deo našeg dana.",
  music: {
    title: "Perfect",
    src: undefined,
  },
  venue: {
    title: "Svečanost",
    timeLabel: "17:00",
    placeName: "Vila Bella",
    address: "Avala, Beograd",
    mapUrl: "https://maps.google.com",
    mapCtaLabel: "Pogledaj lokaciju",
  },
  timeline: [
    {
      id: "gather",
      time: "15:00",
      title: "Okupljanje",
      description: "Dobrodošlica uz osveženje",
    },
    {
      id: "ceremony",
      time: "17:00",
      title: "Ceremonija",
      description: "Razmena zaveta u bašti",
    },
    {
      id: "toast",
      time: "18:30",
      title: "Zdravica",
      description: "Čaša u čast ljubavi",
    },
    {
      id: "dinner",
      time: "19:30",
      title: "Večera",
      description: "Svečana trpeza",
    },
    {
      id: "dance",
      time: "21:30",
      title: "Prvi ples",
      description: "Naša pesma",
    },
    {
      id: "party",
      time: "22:30",
      title: "Proslava",
      description: "Muzika do zore",
    },
  ],
  dressCode: {
    title: "Dress code",
    label: "Svečano",
    note: "Molimo vas da izbegavate belu boju.",
  },
  gifts: {
    title: "Pokloni",
    body: "Vaše prisustvo nam je najveći poklon. Ako želite, radujemo se koverti sa željama.",
  },
  hotels: {
    title: "Smeštaj",
    items: [
      {
        id: "hotel-1",
        name: "Hotel Avala",
        detailUrl: "#",
        ctaLabel: "Više informacija",
      },
      {
        id: "hotel-2",
        name: "Boutique Residence",
        detailUrl: "#",
        ctaLabel: "Više informacija",
      },
    ],
  },
  rsvp: {
    title: "Potvrdite dolazak",
    deadlineLabel: "do 1. avgusta 2026.",
    ctaLabel: "Potvrdi ovde",
    href: "#",
  },
  closingMessage: "Jedva čekamo da podelimo ovaj dan sa vama",
};

/** Decorative floral used across sections */
export const envelopeRomanceFloral = inviteFloral;
export const envelopeRomanceVenueImage = inviteVenue;
