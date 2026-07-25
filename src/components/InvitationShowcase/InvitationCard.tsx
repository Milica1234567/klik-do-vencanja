import { memo, useEffect, useRef } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

import { invitationCategoryLabels } from "../../data/invitationLabels";
import type { InvitationTemplate } from "../../types/invitation";

type InvitationCardProps = {
  template: InvitationTemplate;
  mediaEnabled: boolean;
  onSelectTemplate?: (template: InvitationTemplate) => void;
};

function canHoverPlay() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function InvitationCardComponent({
  template,
  mediaEnabled,
  onSelectTemplate,
}: InvitationCardProps) {
  const articleRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceAttachedRef = useRef(false);
  const nearViewportRef = useRef(false);
  const hoveringRef = useRef(false);
  const { media, title, category, accentColor } = template;
  const label = invitationCategoryLabels[category];

  useEffect(() => {
    const node = articleRef.current;
    const video = videoRef.current;
    if (!node || !video || media.type !== "video") return;

    let cancelled = false;

    const attachSource = () => {
      if (sourceAttachedRef.current || cancelled) return;
      video.src = media.src;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.preload = "metadata";
      sourceAttachedRef.current = true;
    };

    const detachSource = () => {
      if (!sourceAttachedRef.current) return;
      video.pause();
      video.removeAttribute("src");
      video.load();
      sourceAttachedRef.current = false;
    };

    const showStillFrame = () => {
      if (cancelled || hoveringRef.current) return;
      video.pause();
      try {
        if (Number.isFinite(video.duration) && video.duration > 0) {
          video.currentTime = Math.min(0.08, video.duration * 0.02);
        } else {
          video.currentTime = 0.05;
        }
      } catch {
        // Seek can fail before readyState allows it.
      }
    };

    const onLoadedData = () => {
      showStillFrame();
    };

    const syncNearViewport = (near: boolean) => {
      nearViewportRef.current = near;
      if (!mediaEnabled) {
        video.pause();
        return;
      }

      if (near) {
        attachSource();
        if (video.readyState >= 2 && !hoveringRef.current) {
          showStillFrame();
        }
        return;
      }

      hoveringRef.current = false;
      detachSource();
    };

    if (!mediaEnabled) {
      hoveringRef.current = false;
      video.pause();
      return () => {
        cancelled = true;
      };
    }

    video.addEventListener("loadeddata", onLoadedData);

    const observer = new IntersectionObserver(
      ([entry]) => {
        syncNearViewport(entry.isIntersecting);
      },
      { rootMargin: "80px", threshold: 0.01 },
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", onLoadedData);
      observer.disconnect();
      hoveringRef.current = false;
      video.pause();
    };
  }, [media, mediaEnabled]);

  const playOnHover = () => {
    if (!canHoverPlay() || !mediaEnabled || media.type !== "video") return;
    const video = videoRef.current;
    if (!video || !nearViewportRef.current) return;

    hoveringRef.current = true;

    if (!sourceAttachedRef.current) {
      video.src = media.src;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      sourceAttachedRef.current = true;
    }

    video.muted = true;
    const playPromise = video.play();
    if (playPromise) {
      void playPromise.catch(() => {
        // Ignore transient autoplay / load races.
      });
    }
  };

  const pauseOnLeave = () => {
    hoveringRef.current = false;
    const video = videoRef.current;
    if (!video || media.type !== "video") return;
    video.pause();
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    playOnHover();
  };

  const handlePointerLeave = () => {
    pauseOnLeave();
  };

  return (
    <article
      ref={articleRef}
      className={`invitation-card${onSelectTemplate ? " invitation-card--interactive" : ""}`}
      style={
        accentColor
          ? ({ "--invitation-accent": accentColor } as CSSProperties)
          : undefined
      }
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <button
        type="button"
        className="invitation-card__hit"
        onClick={() => onSelectTemplate?.(template)}
        aria-label={`Otvori pregled: ${title}`}
      >
        <div className="invitation-card__frame">
          {media.type === "video" ? (
            <video
              ref={videoRef}
              className="invitation-card__media"
              muted
              loop
              playsInline
              preload="none"
              poster={media.poster}
              aria-hidden="true"
            />
          ) : (
            <img
              className="invitation-card__media"
              src={mediaEnabled ? media.src : undefined}
              alt=""
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <p className="invitation-card__label">{label}</p>
      </button>
    </article>
  );
}

const InvitationCard = memo(
  InvitationCardComponent,
  (prev, next) =>
    prev.template.id === next.template.id &&
    prev.mediaEnabled === next.mediaEnabled &&
    prev.onSelectTemplate === next.onSelectTemplate,
);

export default InvitationCard;
