import { useEffect, useState } from "react";

import "./Countdown.css";

const WEDDING_DATE = new Date(2027, 6, 18, 0, 0, 0).getTime();

function calculateTimeLeft() {
  const difference = Math.max(0, WEDDING_DATE - Date.now());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
    finished: difference === 0,
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    if (timeLeft.finished) return;

    const interval = window.setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => window.clearInterval(interval);
  }, [timeLeft.finished]);

  const units = [
    [timeLeft.days, "Dana"],
    [timeLeft.hours, "Sati"],
    [timeLeft.minutes, "Min"],
    [timeLeft.seconds, "Sek"],
  ] as const;

  return (
    <section className="inv10-countdown" aria-labelledby="inv10-countdown-title">
      <div className="inv10-countdown__petal" aria-hidden="true" />
      <div className="inv10-content" data-inv10-reveal>
        <p id="inv10-countdown-title">Do našeg dana ostalo je</p>
        {timeLeft.finished ? (
          <h2>Danas je naš dan</h2>
        ) : (
          <div className="inv10-countdown__grid" role="timer" aria-live="off">
            {units.map(([value, label]) => (
              <div className="inv10-countdown__unit" key={label}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Countdown;
