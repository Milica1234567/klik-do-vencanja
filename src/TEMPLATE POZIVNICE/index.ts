import type { ComponentType } from "react";

import DustyBlueSeal, {
  DUSTY_BLUE_SEAL_ID,
  dustyBlueSealMeta,
} from "./dusty-blue-seal";
import EnvelopeRomance, {
  ENVELOPE_ROMANCE_ID,
  envelopeRomanceMeta,
} from "./envelope-romance";
import PearlWhite, { PEARL_WHITE_ID, pearlWhiteMeta } from "./pearl-white";
import RoseBlush, { ROSE_BLUSH_ID, roseBlushMeta } from "./rose-blush";
import SoftFloral, { SOFT_FLORAL_ID, softFloralMeta } from "./soft-floral";
import type {
  InvitationContent,
  InvitationTemplateDefinition,
} from "./shared/types";

type InvitationTemplateModule = {
  meta: InvitationTemplateDefinition;
  Component: ComponentType<{ content?: InvitationContent }>;
};

/**
 * Lista svih template pozivnica.
 * Nova pozivnica = novi folder + jedan unos ovde.
 */
export const invitationTemplateRegistry: Record<
  string,
  InvitationTemplateModule
> = {
  [ENVELOPE_ROMANCE_ID]: {
    meta: {
      id: envelopeRomanceMeta.id,
      title: envelopeRomanceMeta.title,
      sections: [...envelopeRomanceMeta.sections],
    },
    Component: EnvelopeRomance,
  },
  [SOFT_FLORAL_ID]: {
    meta: {
      id: softFloralMeta.id,
      title: softFloralMeta.title,
      sections: [...softFloralMeta.sections],
    },
    Component: SoftFloral,
  },
  [DUSTY_BLUE_SEAL_ID]: {
    meta: {
      id: dustyBlueSealMeta.id,
      title: dustyBlueSealMeta.title,
      sections: [...dustyBlueSealMeta.sections],
    },
    Component: DustyBlueSeal,
  },
  [ROSE_BLUSH_ID]: {
    meta: {
      id: roseBlushMeta.id,
      title: roseBlushMeta.title,
      sections: [...roseBlushMeta.sections],
    },
    Component: RoseBlush,
  },
  [PEARL_WHITE_ID]: {
    meta: {
      id: pearlWhiteMeta.id,
      title: pearlWhiteMeta.title,
      sections: [...pearlWhiteMeta.sections],
    },
    Component: PearlWhite,
  },
};

export function getInvitationTemplate(id: string) {
  return invitationTemplateRegistry[id];
}

export function listInvitationTemplates() {
  return Object.values(invitationTemplateRegistry).map((entry) => entry.meta);
}

export type {
  InvitationContent,
  InvitationTemplateConfig,
  InvitationTemplateDefinition,
  TemplateAsset,
  TemplateLayer,
} from "./shared/types";
export { AssetLayer, LayerStage, TextLayer } from "./shared/layers";
export { invitationBreakpoints, invitationMinTapPx } from "./shared/viewport";
export { EnvelopeRomance, ENVELOPE_ROMANCE_ID };
export { SoftFloral, SOFT_FLORAL_ID };
export { DustyBlueSeal, DUSTY_BLUE_SEAL_ID };
export { RoseBlush, ROSE_BLUSH_ID };
export { PearlWhite, PEARL_WHITE_ID };
