import { useEffect, useRef, useState } from "react";

import "./DoorIntro.css";
import waxSeal from "../../assets/waxseal.png";

type DoorIntroProps = {
  onReveal: () => void;
  onComplete: () => void;
};

function DoorIntro({ onReveal, onComplete }: DoorIntroProps) {
  const [opening, setOpening] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const pendingTimers = timers.current;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      pendingTimers.forEach(window.clearTimeout);
    };
  }, []);

  function openDoors() {
    if (opening) return;

    setOpening(true);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timers.current.push(window.setTimeout(onReveal, reducedMotion ? 60 : 520));
    timers.current.push(window.setTimeout(onComplete, reducedMotion ? 260 : 1900));
  }

  return (
    <div className={`inv11-door-intro ${opening ? "inv11-door-intro--inv11-opening" : ""}`}>
      <button className="inv11-door-trigger" type="button" onClick={openDoors} disabled={opening} aria-label="Otvori pozivnicu">
        <span className="inv11-door-stage">
          <span className="inv11-door inv11-door--inv11-left">
            <span className="inv11-door__edge" />
            <img className="inv11-door__seal inv11-door__seal--inv11-left" src={waxSeal} alt="" aria-hidden="true" />
          </span>
          <span className="inv11-door inv11-door--inv11-right">
            <span className="inv11-door__edge" />
            <img className="inv11-door__seal inv11-door__seal--inv11-right" src={waxSeal} alt="" aria-hidden="true" />
          </span>
          <span className="inv11-door-trigger__label">Dodirnite da otvorite</span>
        </span>
      </button>
    </div>
  );
}

export default DoorIntro;
