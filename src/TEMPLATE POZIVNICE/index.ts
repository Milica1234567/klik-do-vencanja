import type { ComponentType } from "react";

import EnvelopeRomance, {
  ENVELOPE_ROMANCE_ID,
  envelopeRomanceMeta,
} from "./envelope-romance";
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
