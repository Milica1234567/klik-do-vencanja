import { useEffect, useState } from "react";

import "./Countdown.css";

const WEDDING_TIME = new Date("2026-09-12T16:00:00+02:00").getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

function getTimeLeft(): TimeLeft {
  const difference = Math.max(0, WEDDING_TIME - Date.now());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
    finished: difference === 0,
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    if (timeLeft.finished) return;

    const interval = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(interval);
  }, [timeLeft.finished]);

  const units = [
    { value: timeLeft.days, label: "dana" },
    { value: timeLeft.hours, label: "sati" },
    { value: timeLeft.minutes, label: "minuta" },
    { value: timeLeft.seconds, label: "sekundi" },
  ];

  return (
    <section className="countdown" aria-labelledby="countdown-title">
      <div className="countdown__inner">
        <span className="countdown__monogram" aria-hidden="true">A&amp;M</span>
        <p className="countdown__eyebrow">Do našeg velikog dana</p>
        <h2 id="countdown-title">Još samo</h2>

        {timeLeft.finished ? (
          <p className="countdown__today">Danas slavimo ljubav</p>
        ) : (
          <div className="countdown__units" role="timer" aria-live="off">
            {units.map((unit) => (
              <div className="countdown__unit" key={unit.label}>
                <strong>{String(unit.value).padStart(2, "0")}</strong>
                <span>{unit.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="countdown__ornament" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
      </div>
    </section>
  );
}

export default Countdown;
