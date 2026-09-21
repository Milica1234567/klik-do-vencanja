import "./DateEditorial.css";

function DateEditorial() {
  return (
    <section className="inv10-date" aria-labelledby="inv10-date-title">
      <div className="inv10-content" data-inv10-reveal>
        <p className="inv10-kicker">Save the date</p>
        <div className="inv10-date__composition" id="inv10-date-title">
          <strong>18</strong>
          <div><span>Jul</span><time dateTime="2027-07-18">2027</time></div>
        </div>
      </div>
    </section>
  );
}

export default DateEditorial;
