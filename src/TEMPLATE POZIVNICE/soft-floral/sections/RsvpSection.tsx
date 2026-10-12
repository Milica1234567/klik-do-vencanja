import { useEffect, useRef, useState, type FormEvent } from "react";

import type { InvitationContent } from "../../shared/types";

type RsvpSectionProps = {
  content: InvitationContent;
};

type Attendance = "yes" | "no" | "";

const PARTY_SIZES = Array.from({ length: 8 }, (_, index) => index + 1);

function partySizeLabel(size: number) {
  return size === 1 ? "Samo ja" : `+${size - 1} (ukupno ${size})`;
}

function PartySizeMenu({ value, onChange }: { value: number; onChange: (size: number) => void }) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className="sf-rsvp-form__menu" ref={rootRef}>
      <button
        type="button"
        className="sf-rsvp-form__menu-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          if (!open) {
            const rect = rootRef.current?.getBoundingClientRect();
            setDropUp(rect ? window.innerHeight - rect.bottom < 260 : false);
          }
          setOpen((current) => !current);
        }}
      >
        {partySizeLabel(value)}
      </button>
      {open ? (
        <ul
          className={["sf-rsvp-form__menu-list", dropUp ? "is-up" : ""].filter(Boolean).join(" ")}
          role="listbox"
          aria-label="Koliko vas dolazi"
        >
          {PARTY_SIZES.map((size) => (
            <li key={size} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={size === value}
                className={size === value ? "is-selected" : undefined}
                onClick={() => {
                  onChange(size);
                  setOpen(false);
                }}
              >
                {partySizeLabel(size)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function RsvpSection({ content }: RsvpSectionProps) {
  const { rsvp } = content;
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("");
  const [partySize, setPartySize] = useState(1);
  const [companions, setCompanions] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  if (!rsvp) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!guestName.trim()) {
      setError("Unesite ime i prezime.");
      return;
    }
    if (!attendance) {
      setError("Izaberite da li dolazite.");
      return;
    }

    setError(null);
    setStatus("done");
  };

  return (
    <section className="sf-rsvp-scene">
      <article className="sf-rsvp" data-section="rsvp" aria-label="Potvrda dolaska">
        <div className="sf-rsvp__vellum">
          <h2 className="sf-rsvp__title">{rsvp.title}</h2>
          <p className="sf-rsvp__deadline">{rsvp.deadlineLabel}</p>

          {status === "done" ? (
            <div className="sf-rsvp-form sf-rsvp-form--done">
              <p className="sf-rsvp-form__thanks">Hvala — vaš odgovor je zabeležen.</p>
              <button
                type="button"
                className="sf-rsvp-form__again"
                onClick={() => {
                  setStatus("idle");
                  setGuestName("");
                  setAttendance("");
                  setPartySize(1);
                  setCompanions("");
                }}
              >
                Pošalji još jedan odgovor
              </button>
            </div>
          ) : (
            <form className="sf-rsvp-form" onSubmit={handleSubmit} noValidate>
              <label className="sf-rsvp-form__field">
                <span>Ime i prezime</span>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                  placeholder="Vaše ime"
                  autoComplete="name"
                />
              </label>

              <fieldset className="sf-rsvp-form__attendance">
                <legend>Da li dolazite?</legend>
                <label>
                  <input
                    type="radio"
                    name="sf-attendance"
                    checked={attendance === "yes"}
                    onChange={() => setAttendance("yes")}
                  />
                  Da
                </label>
                <label>
                  <input
                    type="radio"
                    name="sf-attendance"
                    checked={attendance === "no"}
                    onChange={() => {
                      setAttendance("no");
                      setPartySize(1);
                      setCompanions("");
                    }}
                  />
                  Ne
                </label>
              </fieldset>

              {attendance === "yes" ? (
                <>
                  <div className="sf-rsvp-form__field">
                    <span>Koliko vas dolazi?</span>
                    <PartySizeMenu value={partySize} onChange={setPartySize} />
                  </div>

                  {partySize > 1 ? (
                    <label className="sf-rsvp-form__field">
                      <span>Ko dolazi sa vama?</span>
                      <input
                        type="text"
                        value={companions}
                        onChange={(event) => setCompanions(event.target.value)}
                        placeholder="Imena pratnje"
                      />
                    </label>
                  ) : null}
                </>
              ) : null}

              {error ? <p className="sf-rsvp-form__error">{error}</p> : null}

              <button type="submit" className="sf-rsvp-form__submit">
                {rsvp.ctaLabel}
              </button>
            </form>
          )}
        </div>
      </article>
    </section>
  );
}

export default RsvpSection;
