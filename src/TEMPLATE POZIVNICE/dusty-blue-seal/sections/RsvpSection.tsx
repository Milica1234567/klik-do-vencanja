import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";

import ScrollReveal from "../../shared/ScrollReveal";
import { invitationEase, revealScale } from "../../shared/motion";
import type { InvitationContent } from "../../shared/types";

type RsvpSectionProps = {
  content: InvitationContent;
};

type Attendance = "yes" | "no" | "";

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
    <ScrollReveal as="section" className="dbs-section" variants={revealScale}>
      <article className="dbs-card dbs-card--blue dbs-rsvp" data-section="rsvp">
        <h2 className="dbs-card-title dbs-card-title--light">{rsvp.title}</h2>
        <p className="dbs-rsvp__deadline">{rsvp.deadlineLabel}</p>

        {status === "done" ? (
          <div className="dbs-rsvp-form dbs-rsvp-form--done">
            <p className="dbs-rsvp-form__thanks">
              Hvala — vaš odgovor je zabeležen.
            </p>
            <button
              type="button"
              className="dbs-rsvp-form__again"
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
          <form className="dbs-rsvp-form" onSubmit={handleSubmit} noValidate>
            <label className="dbs-rsvp-form__field">
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

            <fieldset className="dbs-rsvp-form__attendance">
              <legend>Da li dolazite?</legend>
              <label>
                <input
                  type="radio"
                  name="dbs-attendance"
                  checked={attendance === "yes"}
                  onChange={() => setAttendance("yes")}
                />
                Da
              </label>
              <label>
                <input
                  type="radio"
                  name="dbs-attendance"
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
                <label className="dbs-rsvp-form__field">
                  <span>Koliko vas dolazi?</span>
                  <select
                    value={partySize}
                    onChange={(event) =>
                      setPartySize(Number(event.target.value))
                    }
                  >
                    {Array.from({ length: 8 }, (_, index) => index + 1).map(
                      (size) => (
                        <option key={size} value={size}>
                          {size === 1
                            ? "Samo ja"
                            : `+${size - 1} (ukupno ${size})`}
                        </option>
                      ),
                    )}
                  </select>
                </label>

                {partySize > 1 ? (
                  <label className="dbs-rsvp-form__field">
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

            {error ? <p className="dbs-rsvp-form__error">{error}</p> : null}

            <motion.button
              type="submit"
              className="dbs-rsvp-form__submit"
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: invitationEase }}
            >
              {rsvp.ctaLabel}
            </motion.button>
          </form>
        )}
      </article>
    </ScrollReveal>
  );
}

export default RsvpSection;
