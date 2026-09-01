import { useEffect, useState } from "react";

import "./Countdown.css";

const WEDDING_DATE = new Date(2026, 9, 18, 0, 0, 0).getTime();

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
    <section className="inv11-countdown" aria-labelledby="inv11-countdown-title">
      <div className="inv11-content" data-inv11-reveal>
        <p id="inv11-countdown-title">Do našeg dana ostalo je</p>
        {timeLeft.finished ? (
          <h2>Danas je naš dan</h2>
        ) : (
          <div className="inv11-countdown__grid" role="timer" aria-live="off">
            {units.map(([value, label]) => (
              <div className="inv11-countdown__unit" key={label}>
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
