import { useEffect, useRef } from "react";
import { LINKS } from "../data";
import { IconClose } from "./icons";

/**
 * Accessible demo video modal.
 * - role="dialog" + aria-modal, labelled by its title
 * - closes on Escape and on backdrop click
 * - the iframe is only mounted while the modal is open (no preloading / no autoplay)
 * - restores focus to the trigger on close, traps focus while open
 */
export default function VideoModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocus = useRef<Element | null>(null);

  useEffect(() => {
    prevFocus.current = document.activeElement;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], iframe, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      (prevFocus.current as HTMLElement | null)?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Cloud Native Platform demo video"
        ref={dialogRef}
      >
        <div className="modal-head">
          <span className="mt">
            <span className="rec" aria-hidden="true" />
            Demo — end-to-end walkthrough
          </span>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close demo video"
            ref={closeRef}
          >
            <IconClose />
          </button>
        </div>
        <div className="modal-video">
          <iframe
            src={`${LINKS.youtubeEmbed}?autoplay=1&rel=0`}
            title="Cloud Native Platform demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
