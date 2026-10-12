import { useState, type FormEvent } from "react";

import ScrollReveal from "../shared/ScrollReveal";
import type { InvitationContent } from "../shared/types";
import { doodles } from "./doodles";

const RSVP_FORMSPREE = "https://formspree.io/f/xwvgrvvw";

type LetoRsvpProps = {
  content: InvitationContent;
};

function LetoRsvp({ content }: LetoRsvpProps) {
  const rsvp = content.rsvp;
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState(1);

  if (!rsvp) return null;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set(
      "_subject",
      `RSVP: ${content.couple.partnerOne} ${content.couple.joiner ?? "&"} ${content.couple.partnerTwo}`,
    );
    data.set("pozivnica", "Leto ljubavi");

    setStatus("sending");
    try {
      const response = await fetch(RSVP_FORMSPREE, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("RSVP failed");
      form.reset();
      setGuests(1);
      setAttending(null);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  return (
    <ScrollReveal className="ll__block ll-rsvp" as="section" amount={0.2}>
      <doodles.Heart className="ll__heart" />
      <h2 className="ll__serif ll-rsvp__title">{rsvp.title}</h2>
      <p className="ll__script ll-rsvp__intro">{rsvp.deadlineLabel}</p>
      <doodles.BowDivider className="ll-rsvp__bow" />

      {status === "ok" ? (
        <p className="ll__script ll-rsvp__thanks">Hvala, primili smo potvrdu!</p>
      ) : (
        <form className="ll-rsvp__form" onSubmit={onSubmit}>
          <fieldset className="ll-rsvp__attend">
            <legend className="ll-rsvp__legend">Dolazite li?</legend>
            <div className="ll-rsvp__choices">
              <label className="ll-rsvp__choice">
                <input
                  type="radio"
                  name="dolazak"
                  value="Da"
                  checked={attending === "yes"}
                  required
                  onChange={() => {
                    setAttending("yes");
                    setGuests((count) => (count < 1 ? 1 : count));
                  }}
                />
                <span>Dolazim</span>
              </label>
              <label className="ll-rsvp__choice">
                <input
                  type="radio"
                  name="dolazak"
                  value="Ne"
                  checked={attending === "no"}
                  onChange={() => setAttending("no")}
                />
                <span>Ne dolazim</span>
              </label>
            </div>
          </fieldset>

          {attending === "yes" ? (
            <div className="ll-rsvp__panel" key="yes">
              <p className="ll__script ll-rsvp__hint">
                Rado ćemo vas dočekati. Recite nam ko dolazi.
              </p>
              <label className="ll-rsvp__line">
                <span className="ll-rsvp__label">Ime i prezime</span>
                <input className="ll-rsvp__input" name="ime" type="text" required autoComplete="name" />
              </label>
              <label className="ll-rsvp__line">
                <span className="ll-rsvp__label">Email</span>
                <input className="ll-rsvp__input" name="email" type="email" required autoComplete="email" />
              </label>
              <div className="ll-rsvp__guests">
                <span className="ll-rsvp__label" id="ll-guests-label">
                  Broj gostiju
                </span>
                <div className="ll-rsvp__stepper">
                  <button
                    type="button"
                    aria-label="Manje gostiju"
                    onClick={() => setGuests((count) => Math.max(1, count - 1))}
                  >
                    −
                  </button>
                  <input
                    className="ll-rsvp__count"
                    name="gosti"
                    type="number"
                    min={1}
                    max={20}
                    value={guests}
                    aria-labelledby="ll-guests-label"
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      if (Number.isFinite(next)) setGuests(Math.min(20, Math.max(1, next)));
                    }}
                    required
                  />
                  <button
                    type="button"
                    aria-label="Više gostiju"
                    onClick={() => setGuests((count) => Math.min(20, count + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
              <label className="ll-rsvp__line">
                <span className="ll-rsvp__label">Poruka, ako želite</span>
                <textarea className="ll-rsvp__input ll-rsvp__note" name="poruka" rows={2} />
              </label>
              <button type="submit" className="ll-btn ll-rsvp__submit" disabled={status === "sending"}>
                {status === "sending" ? "Šaljem…" : rsvp.ctaLabel}
              </button>
            </div>
          ) : null}

          {attending === "no" ? (
            <div className="ll-rsvp__panel" key="no">
              <p className="ll__script ll-rsvp__hint">
                Razumemo. Ostavite ime i, ako želite, kratku poruku.
              </p>
              <input type="hidden" name="gosti" value="0" />
              <label className="ll-rsvp__line">
                <span className="ll-rsvp__label">Ime i prezime</span>
                <input className="ll-rsvp__input" name="ime" type="text" required autoComplete="name" />
              </label>
              <label className="ll-rsvp__line">
                <span className="ll-rsvp__label">Poruka mladencima, ako želite</span>
                <textarea className="ll-rsvp__input ll-rsvp__note" name="poruka" rows={2} />
              </label>
              <button type="submit" className="ll-btn ll-rsvp__submit" disabled={status === "sending"}>
                {status === "sending" ? "Šaljem…" : "Pošalji odgovor"}
              </button>
            </div>
          ) : null}

          {status === "error" ? (
            <p className="ll-rsvp__error">Nešto nije uspelo. Pokušajte ponovo.</p>
          ) : null}
        </form>
      )}
    </ScrollReveal>
  );
}

export default LetoRsvp;
