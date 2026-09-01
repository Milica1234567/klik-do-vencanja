import { useState } from "react";
import type { FormEvent } from "react";
import "./RSVP.css";

function RSVP() {
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="inv10-rsvp" aria-labelledby="inv10-rsvp-title">
      <div className="inv10-content">
        <header data-inv10-reveal>
          <h2 id="inv10-rsvp-title">Da li ćete nam se<br />pridružiti?</h2>
          <p>Molimo vas da svoj dolazak<br />potvrdite do 20. juna 2027.</p>
        </header>
        {submitted ? (
          <div className="inv10-rsvp__success" role="status"><span>S &amp; A</span><h3>Hvala vam.</h3><p>Vaš odgovor je zabeležen.</p><button type="button" onClick={() => setSubmitted(false)}>Izmeni odgovor</button></div>
        ) : (
          <form onSubmit={handleSubmit} data-inv10-reveal>
            <label className="inv10-rsvp__field"><span>Ime i prezime</span><input name="name" type="text" autoComplete="name" required /></label>
            <fieldset><legend>Dolazak</legend><div className="inv10-rsvp__choices">
              <label><input type="radio" name="attendance" value="yes" checked={attendance === "yes"} onChange={() => setAttendance("yes")} /><i /><span>Sa zadovoljstvom dolazim</span></label>
              <label><input type="radio" name="attendance" value="no" checked={attendance === "no"} onChange={() => setAttendance("no")} /><i /><span>Nažalost, ne mogu da dođem</span></label>
            </div></fieldset>
            {attendance === "yes" && <label className="inv10-rsvp__field"><span>Broj gostiju</span><select name="guests" defaultValue="1"><option value="1">1 gost</option><option value="2">2 gosta</option><option value="3">3 gosta</option><option value="4">4 gosta</option></select></label>}
            <label className="inv10-rsvp__field"><span>Poruka mladencima</span><textarea name="message" rows={3} /></label>
            <button className="inv10-rsvp__submit" type="submit">Potvrdi dolazak</button>
          </form>
        )}
      </div>
    </section>
  );
}

export default RSVP;
