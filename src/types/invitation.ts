export type InvitationCategory =
  | "wedding"
  | "birthday"
  | "baptism"
  | "engagement"
  | "baby-shower"
  | "other";

export type InvitationImageMedia = {
  type: "image";
  src: string;
  alt: string;
};

export type InvitationVideoMedia = {
  type: "video";
  src: string;
  poster?: string;
};

export type InvitationMedia = InvitationImageMedia | InvitationVideoMedia;

export type InvitationTemplate = {
  id: string;
  title: string;
  category: InvitationCategory;
  media: InvitationMedia;
  accentColor?: string;
};
