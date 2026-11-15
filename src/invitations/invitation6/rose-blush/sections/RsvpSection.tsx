import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";

import ScrollReveal from "../../shared/ScrollReveal";
import { invitationEase, revealFade } from "../../shared/motion";
import type { InvitationContent } from "../../shared/types";
import { blushArt } from "../art";
import LineArt from "../components/LineArt";

type RsvpSectionProps = {
  content: InvitationContent;
};

type Attendance = "yes" | "no" | "";

const GUEST_OPTIONS = [
  { value: 1, label: "1 gost" },
  { value: 2, label: "2 gosta" },
  { value: 3, label: "3 gosta" },
  { value: 4, label: "4 gosta" },
  { value: 5, label: "5 gostiju" },
  { value: 6, label: "6 gostiju" },
] as const;

function RsvpSection({ content }: RsvpSectionProps) {
  const { rsvp } = content;
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("");
  const [partySize, setPartySize] = useState(1);
  const [companions, setCompanions] = useState("");
  const [status, setStatus] = useState<"idle" | "open" | "done">("idle");
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
    if (attendance === "yes" && partySize > 1 && !companions.trim()) {
      setError("Unesite imena gostiju.");
      return;
    }
    setError(null);
    setStatus("done");
  };

  const decline = () => {
    setAttendance("no");
    setPartySize(1);
    setCompanions("");
  };

  return (
    <ScrollReveal as="section" className="inv6-qb-section" variants={revealFade} amount={0.08} once>
      <article className="inv6-qb-card inv6-qb-card--detail" data-section="rsvp">
        <h3 className="inv6-qb-script inv6-qb-script--card">{rsvp.title}</h3>
        <LineArt src={blushArt.envelopeTulips} className="inv6-qb-detail-icon inv6-qb-detail-icon--lg" />
        <p className="inv6-qb-rsvp-note">{rsvp.deadlineLabel}</p>

        {status === "idle" ? (
          <motion.button
            type="button"
            className="inv6-qb-btn"
            onClick={() => setStatus("open")}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: invitationEase }}
          >
            {rsvp.ctaLabel}
          </motion.button>
        ) : null}

        {status === "open" ? (
          <form className="inv6-qb-rsvp-form" onSubmit={handleSubmit} noValidate>
            <label>
              Ime i prezime
              <input
                type="text"
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                autoComplete="name"
              />
            </label>
            <fieldset>
              <legend>Da li dolazite?</legend>
              <label>
                <input
                  type="radio"
                  name="inv6-qb-attendance"
                  checked={attendance === "yes"}
                  onChange={() => setAttendance("yes")}
                />
                Da
              </label>
              <label>
                <input
                  type="radio"
                  name="inv6-qb-attendance"
                  checked={attendance === "no"}
                  onChange={decline}
                />
                Ne
              </label>
            </fieldset>
            {attendance === "yes" ? (
              <>
                <label>
                  Broj gostiju
                  <select
                    value={partySize}
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      setPartySize(next);
                      if (next < 2) setCompanions("");
                    }}
                  >
                    {GUEST_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                {partySize > 1 ? (
                  <label>
                    Imena gostiju
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
            {error ? <p className="inv6-qb-rsvp-error">{error}</p> : null}
            <button type="submit" className="inv6-qb-btn">
              {rsvp.ctaLabel}
            </button>
          </form>
        ) : null}

        {status === "done" ? (
          <p className="inv6-qb-rsvp-thanks">Hvala — vaš odgovor je zabeležen.</p>
        ) : null}
      </article>
    </ScrollReveal>
  );
}

export default RsvpSection;
