import { useState } from "react";
import type { FormEvent } from "react";

import "./RSVP.css";

function RSVP() {
  const [attendance, setAttendance] = useState("yes");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="inv7-watercolor-rsvp" aria-labelledby="inv7-rsvp-title">
      <header data-reveal><p>Molimo vas da odgovorite do 15. maja</p><h2 id="inv7-rsvp-title">Potvrdite dolazak</h2></header>
      {submitted ? (
        <div className="inv7-watercolor-rsvp__thanks" role="status">
          <span>J &amp; N</span><h3>Hvala vam</h3><p>Vaš odgovor je zabeležen.</p>
          <button type="button" onClick={() => setSubmitted(false)}>Izmeni odgovor</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} data-reveal>
          <label><span>Ime i prezime</span><input type="text" name="name" autoComplete="name" required /></label>
          <fieldset>
            <legend>Da li dolazite?</legend>
            <div>
              <label><input type="radio" name="attendance" value="yes" checked={attendance === "yes"} onChange={() => setAttendance("yes")} /><span>Dolazim</span></label>
              <label><input type="radio" name="attendance" value="no" checked={attendance === "no"} onChange={() => setAttendance("no")} /><span>Ne mogu da dođem</span></label>
            </div>
          </fieldset>
          {attendance === "yes" && (
            <label><span>Broj gostiju</span><select name="guests" defaultValue="1"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></label>
          )}
          <label><span>Poruka mladencima</span><textarea name="message" rows={3} /></label>
          <button className="inv7-watercolor-rsvp__submit" type="submit">Potvrdi dolazak</button>
        </form>
      )}
    </section>
  );
}

export default RSVP;
