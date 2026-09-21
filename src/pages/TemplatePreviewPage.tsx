import type { ComponentType } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getInvitationTemplate,
  listInvitationTemplates,
} from "../TEMPLATE POZIVNICE";

export function TemplatePreviewIndexPage() {
  const templates = listInvitationTemplates();

  return (
    <main style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
      <p style={{ letterSpacing: "0.16em", textTransform: "uppercase" }}>
        Preview pozivnica
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: "1.5rem 0 0" }}>
        {templates.map((template) => (
          <li key={template.id} style={{ marginBottom: "0.85rem" }}>
            <Link to={`/preview/${template.id}`}>{template.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

function TemplatePreviewPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const entry = getInvitationTemplate(templateId ?? "");

  if (!entry) {
    return (
      <main style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <p>Template nije pronađen.</p>
        <p>
          <Link to="/preview">Sve pozivnice</Link>
        </p>
      </main>
    );
  }

  const { Component } = entry as {
    Component: ComponentType<{ content?: unknown }>;
  };

  return <Component />;
}

export default TemplatePreviewPage;
