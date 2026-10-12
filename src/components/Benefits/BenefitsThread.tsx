import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { invitationProcessSteps } from "../../data/benefits";
import Reveal from "../motion/Reveal";
import "./BenefitsThread.css";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function BenefitsThread() {
  const [active, setActive] = useState(2);

  return (
    <section className="idea" id="benefits-thread" aria-labelledby="benefits-thread-title">
      <div className="idea__frame">
        <div className="idea__head">
          <p className="idea__kicker">Kako nastaje</p>
          <Reveal as="h2" kind="fade" id="benefits-thread-title">
            Od prve ideje <em>do vaše pozivnice.</em>
          </Reveal>
        </div>
        <Reveal as="p" kind="fade" className="idea__lead" delay={0.08}>
          Vi donosite ideju i informacije o događaju. Mi ih pretvaramo u gotovu
          digitalnu pozivnicu.
        </Reveal>

        <div className="idea__score" role="tablist" aria-label="Koraci izrade">
          {invitationProcessSteps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={index === active ? "idea__moment is-on" : "idea__moment"}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
            >
              {step.titleLines[0]}
              <span>{step.titleLines[1]}</span>
            </button>
          ))}
        </div>

        <div className="idea__stage">
          <AnimatePresence mode="wait">
            <motion.p
              key={invitationProcessSteps[active].id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
            >
              {invitationProcessSteps[active].body}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default BenefitsThread;
