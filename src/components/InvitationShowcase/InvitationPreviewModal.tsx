import { useEffect } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import type { InvitationTemplate } from "../../types/invitation";
import "./InvitationPreviewModal.css";

type InvitationPreviewModalProps = {
  template: InvitationTemplate | null;
  onClose: () => void;
};

function InvitationPreviewModal({
  template,
  onClose,
}: InvitationPreviewModalProps) {
  useEffect(() => {
    if (!template) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [template, onClose]);

  if (!template || typeof document === "undefined") {
    return null;
  }

  const { media, title, slug, previewPath } = template;
  const detailPath = `/pozivnice/${slug}`;

  return createPortal(
    <div
      className="invitation-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`Pregled pozivnice: ${title}`}
      style={
        {
          "--invite-accent": template.accentColor ?? "#3e4a3c",
          "--invite-paper": template.paperColor ?? "#f4f1ea",
        } as CSSProperties
      }
    >
      <button
        type="button"
        className="invitation-modal__backdrop"
        aria-label="Zatvori pregled"
        onClick={onClose}
      />

      <div className="invitation-modal__panel">
        <button
          type="button"
          className="invitation-modal__close"
          aria-label="Zatvori"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="invitation-modal__media">
          {previewPath ? (
            <iframe
              key={template.id}
              className="invitation-modal__live"
              src={`${previewPath}?embed=1`}
              title={title}
            />
          ) : media.type === "video" ? (
            <video
              key={template.id}
              className="invitation-modal__video"
              src={media.src}
              poster={media.poster}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
            />
          ) : (
            <img
              key={template.id}
              className="invitation-modal__video"
              src={media.src}
              alt={media.alt}
            />
          )}
        </div>

        <p className="invitation-modal__title">{title}</p>

        <div className="invitation-modal__actions">
          <Link
            className="invitation-modal__cta"
            to={detailPath}
            onClick={onClose}
          >
            Pogledaj celu pozivnicu
          </Link>
          <Link
            className="invitation-modal__cta invitation-modal__cta--quiet"
            to={`/poruci/${slug}`}
            onClick={onClose}
          >
            Poruči
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default InvitationPreviewModal;
