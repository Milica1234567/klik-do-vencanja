import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";

import ScrollReveal from "../../shared/ScrollReveal";
import { invitationEase, revealFade } from "../../shared/motion";
import type { InvitationContent } from "../../shared/types";
import SectionScrollShadow from "../components/SectionScrollShadow";

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
    <ScrollReveal as="section" className="inv5-sf-section" variants={revealFade}>
      <article className="inv5-sf-rsvp" data-section="rsvp" aria-label="Potvrda dolaska">
        <SectionScrollShadow>
          <motion.div
            className="inv5-sf-card inv5-sf-card--bordered inv5-sf-card--rsvp"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: invitationEase }}
          >
            <h2 className="inv5-sf-heading inv5-sf-heading--large">{rsvp.title}</h2>
            <p className="inv5-sf-rsvp__deadline">{rsvp.deadlineLabel}</p>

            {status === "done" ? (
              <div className="inv5-sf-rsvp-form inv5-sf-rsvp-form--done">
                <p className="inv5-sf-rsvp-form__thanks">
                  Hvala — vaš odgovor je zabeležen.
                </p>
                <button
                  type="button"
                  className="inv5-sf-rsvp-form__again"
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
              <form className="inv5-sf-rsvp-form" onSubmit={handleSubmit} noValidate>
                <label className="inv5-sf-rsvp-form__field">
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

                <fieldset className="inv5-sf-rsvp-form__attendance">
                  <legend>Da li dolazite?</legend>
                  <label>
                    <input
                      type="radio"
                      name="inv5-sf-attendance"
                      checked={attendance === "yes"}
                      onChange={() => setAttendance("yes")}
                    />
                    Da
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="inv5-sf-attendance"
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
                    <label className="inv5-sf-rsvp-form__field">
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
                      <label className="inv5-sf-rsvp-form__field">
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

                {error ? <p className="inv5-sf-rsvp-form__error">{error}</p> : null}

                <button type="submit" className="inv5-sf-rsvp-form__submit">
                  {rsvp.ctaLabel}
                </button>
              </form>
            )}
          </motion.div>
        </SectionScrollShadow>
      </article>
    </ScrollReveal>
  );
}

export default RsvpSection;
