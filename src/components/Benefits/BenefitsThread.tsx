import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { benefitBlocks } from "../../data/benefits";
import "./BenefitsThread.css";

const easePremium: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerGroup: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easePremium },
  },
};

const railGroup: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const stationReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easePremium },
  },
};

/**
 * Alternative B — compact horizontal typographic ribbon.
 * Text only; comparison option beneath the collage Benefits section.
 */
function BenefitsThread() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? "visible" : "hidden";

  return (
    <section
      className="benefits-thread"
      id="benefits-thread"
      aria-labelledby="benefits-thread-title"
    >
      <div className="benefits-thread__inner">
        <motion.header
          className="benefits-thread__header"
          variants={headerGroup}
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.p className="benefits-thread__eyebrow" variants={fadeUp}>
            zašto digitalno
          </motion.p>
          <div className="benefits-thread__heading-row">
            <motion.h2
              className="benefits-thread__title"
              id="benefits-thread-title"
              variants={fadeUp}
            >
              Osmišljene oko <em>vašeg</em> događaja
            </motion.h2>
            <motion.p className="benefits-thread__lede" variants={fadeUp}>
              Pet tihih prednosti — jedna linija misli.
            </motion.p>
          </div>
        </motion.header>

        <motion.div
          className="benefits-thread__ribbon"
          variants={railGroup}
          initial={initial}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="benefits-thread__hairline" aria-hidden="true">
            <span className="benefits-thread__hairline-fill" />
          </div>

          <ul className="benefits-thread__stations">
            {benefitBlocks.map((block, index) => {
              const numeral = String(index + 1).padStart(2, "0");

              return (
                <motion.li
                  key={block.id}
                  className="benefits-thread__station"
                  variants={stationReveal}
                >
                  <span className="benefits-thread__dot" aria-hidden="true" />
                  <span className="benefits-thread__numeral" aria-hidden="true">
                    {numeral}
                  </span>
                  <h3 className="benefits-thread__station-title">
                    {block.note.title}
                  </h3>
                  <p className="benefits-thread__station-body">
                    {block.note.body}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default BenefitsThread;
