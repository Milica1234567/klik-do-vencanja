import { motion, useReducedMotion } from "framer-motion";

import ScrollReveal from "../../shared/ScrollReveal";
import {
  invitationEase,
  invitationTransition,
  revealFade,
} from "../../shared/motion";
import type { InvitationContent } from "../../shared/types";
import { TimelineIcon } from "../components/TimelineIcons";
import SectionScrollShadow from "../components/SectionScrollShadow";

type TimelineSectionProps = {
  content: InvitationContent;
};

function TimelineSection({ content }: TimelineSectionProps) {
  const { timeline } = content;
  const reduceMotion = useReducedMotion();

  if (!timeline?.length) return null;

  return (
    <ScrollReveal as="section" className="inv5-sf-section" variants={revealFade}>
      <article
        className="inv5-sf-timeline-section"
        data-section="timeline"
        aria-label="Dan venčanja"
      >
        <SectionScrollShadow>
          <motion.div
            className="inv5-sf-striped-frame"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: invitationEase }}
          >
            <div className="inv5-sf-striped-frame__inner inv5-sf-striped-frame__inner--timeline">
              <h2 className="inv5-sf-heading inv5-sf-heading--timeline">Dan venčanja</h2>
              <span className="inv5-sf-ornament" aria-hidden="true">
                <span className="inv5-sf-ornament__line" />
                <span className="inv5-sf-ornament__diamond" />
                <span className="inv5-sf-ornament__line" />
              </span>

              <ol className="inv5-sf-timeline">
                {timeline.map((item, index) => (
                  <motion.li
                    key={item.id}
                    className="inv5-sf-timeline__item"
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      ...invitationTransition,
                      delay: reduceMotion ? 0 : index * 0.08,
                      ease: invitationEase,
                    }}
                  >
                    <span className="inv5-sf-timeline__time">{item.time}</span>

                    <motion.span
                      className="inv5-sf-timeline__icon-wrap"
                      animate={reduceMotion ? undefined : { y: [0, -2.5, 0] }}
                      transition={
                        reduceMotion
                          ? undefined
                          : {
                              duration: 2.6,
                              repeat: Infinity,
                              delay: index * 0.2,
                              ease: "easeInOut",
                            }
                      }
                    >
                      <TimelineIcon
                        name={item.icon}
                        className="inv5-sf-timeline__icon"
                      />
                    </motion.span>

                    {item.title ? (
                      <span className="inv5-sf-timeline__title">{item.title}</span>
                    ) : (
                      <span className="inv5-sf-timeline__title" aria-hidden="true" />
                    )}
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.div>
        </SectionScrollShadow>
      </article>
    </ScrollReveal>
  );
}

export default TimelineSection;
