import { useState } from "react";
import type { FormEvent } from "react";

import "./RSVP.css";

type Attendance = "yes" | "no";

function RSVP() {
  const [attendance, setAttendance] = useState<Attendance>("yes");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="rsvp" id="details" aria-labelledby="rsvp-title">
      <div className="rsvp-ornament" aria-hidden="true">
        <span />
        <span className="rsvp-ornament__diamond" />
        <span />
      </div>

      <div className="rsvp-inner">
        <p className="rsvp-eyebrow">Radujemo se Vašem dolasku</p>
        <h2 className="rsvp-title" id="rsvp-title">Potvrdite dolazak</h2>
        <p className="rsvp-copy">
          Molimo Vas da svoj dolazak potvrdite<br />do 20. avgusta 2026.
        </p>

        {submitted ? (
          <div className="rsvp-success" role="status">
            <span className="rsvp-success__mark" aria-hidden="true">A&amp;M</span>
            <h3>Hvala Vam</h3>
            <p>Vaš odgovor je zabeležen.</p>
            <button type="button" onClick={() => setSubmitted(false)}>
              Izmeni odgovor
            </button>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <label className="rsvp-field">
              <span>Ime i prezime</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>

            <fieldset className="rsvp-attendance">
              <legend>Da li dolazite?</legend>
              <div className="rsvp-options">
                <label className={attendance === "yes" ? "is-selected" : ""}>
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={attendance === "yes"}
                    onChange={() => setAttendance("yes")}
                  />
                  <span>Sa radošću dolazim</span>
                </label>
                <label className={attendance === "no" ? "is-selected" : ""}>
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={attendance === "no"}
                    onChange={() => setAttendance("no")}
                  />
                  <span>Nažalost, ne dolazim</span>
                </label>
              </div>
            </fieldset>

            {attendance === "yes" && (
              <label className="rsvp-field">
                <span>Broj gostiju</span>
                <select name="guests" defaultValue="1">
                  <option value="1">1 gost</option>
                  <option value="2">2 gosta</option>
                  <option value="3">3 gosta</option>
                  <option value="4">4 gosta</option>
                </select>
              </label>
            )}

            <label className="rsvp-field">
              <span>Poruka za mladence <small>(opciono)</small></span>
              <textarea name="message" rows={3} />
            </label>

            <button className="rsvp-submit" type="submit">Pošalji odgovor</button>
          </form>
        )}
      </div>
    </section>
  );
}

export default RSVP;
