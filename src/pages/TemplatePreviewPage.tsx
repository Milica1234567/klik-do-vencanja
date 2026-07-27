import type { ComponentType } from "react";
import { useParams } from "react-router-dom";

import { getInvitationTemplate } from "../TEMPLATE POZIVNICE";

/**
 * Dev / design preview for invitation templates.
 * Example: /preview/envelope-romance
 */
function TemplatePreviewPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const entry = getInvitationTemplate(templateId ?? "");

  if (!entry) {
    return (
      <main style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <p>Template nije pronađen.</p>
      </main>
    );
  }

  const { Component } = entry as {
    Component: ComponentType<{ content?: unknown }>;
  };

  return <Component />;
}

export default TemplatePreviewPage;
