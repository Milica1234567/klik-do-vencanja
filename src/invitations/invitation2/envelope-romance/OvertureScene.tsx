import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

import type { InvitationContent } from "../shared/types";
import couplePlaceholder from "./assets/couple-hero-placeholder.jpg";
import { envelopeRomanceParentsImage } from "./content";
import { useFramePin } from "./scrollMotion";

type OvertureSceneProps = {
  content: InvitationContent;
};

function parseEventParts(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return { day: "12", month: "09", year: "2027" };
  }
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: String(d.getMonth() + 1).padStart(2, "0"),
    year: String(d.getFullYear()),
  };
}

function OvertureScene({ content }: OvertureSceneProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const { stageRef, frameRef } = useFramePin(!reduceMotion);
  const [wide, setWide] = useState(false);
  const { couple, heroImage, quote, eventDateIso, eventDateLabel, parentsNote, monogram } = content;
  const joiner = couple.joiner ?? "&";
  const photoSrc = heroImage?.src ?? couplePlaceholder;
  const photoAlt = heroImage?.alt ?? `${couple.partnerOne} i ${couple.partnerTwo}`;
  const { day, month, year } = parseEventParts(eventDateIso);
  const inviteText =
    quote ??
    "Sa velikom radošću vas pozivamo da budete deo našeg najlepšeg dana i proslavite sa nama trenutak kada naše dve priče postaju jedna.";

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const shift = wide ? 36 : 14;
  const photoEnd = wide ? 78 : 64;
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const open = useTransform(scrollYProgress, [0.02, 0.4], reduceMotion ? [0, 0] : [0, 54], { clamp: true });
  const photoClip = useTransform(open, (value) => `inset(0px 0px ${value}% 0px)`);
  const photoScale = useTransform(scrollYProgress, [0, 0.4], reduceMotion ? [1, 1] : [1.14, 1], { clamp: true });
  const imgY = useTransform(scrollYProgress, [0, 0.42], reduceMotion ? ["0%", "0%"] : ["0%", "-18%"], { clamp: true });
  const nameY = useTransform(
    scrollYProgress,
    [0.04, 0.4],
    reduceMotion ? ["0vh", "0vh"] : ["0vh", "-22vh"],
    { clamp: true },
  );
  const nameScale = useTransform(scrollYProgress, [0.04, 0.4], reduceMotion ? [1, 1] : [1, 0.84], { clamp: true });
  const xDay = useTransform(scrollYProgress, [0.28, 0.62], reduceMotion ? [0, 0] : [shift * 0.2, -shift], { clamp: true });
  const xMonth = useTransform(scrollYProgress, [0.28, 0.62], reduceMotion ? [0, 0] : [-shift * 0.2, shift], { clamp: true });
  const xYear = useTransform(scrollYProgress, [0.28, 0.62], reduceMotion ? [0, 0] : [0, wide ? -4 : -2], { clamp: true });

  const reveal = useTransform(scrollYProgress, [0.64, 0.98], reduceMotion ? [0, 0] : [100, 0], { clamp: true });
  const togetherClip = useTransform(reveal, (value) => `inset(${value}% 0px 0px 0px)`);
  const photoPct = useTransform(scrollYProgress, [0.66, 0.98], reduceMotion ? [50, 50] : [50, photoEnd], { clamp: true });
  const splitPhoto = useTransform(photoPct, (value) => `inset(0 ${100 - value}% 0 0)`);
  const splitPanel = useTransform(photoPct, (value) => `inset(0 0 0 ${value}%)`);
  const copyLeft = useTransform(photoPct, (value) => `${value}%`);
  const copyWidth = useTransform(photoPct, (value) => `${Math.max(100 - value, 18)}%`);
  const copyTop = useTransform(reveal, (value) => `${value}%`);
  const copyHeight = useTransform(reveal, (value) => `${Math.max(100 - value, 0)}%`);
  const copyScale = useTransform(reveal, [100, 55, 0], reduceMotion ? [1, 1, 1] : [0.78, 0.9, 1], { clamp: true });

  return (
    <div className={`inv2-er-overture${reduceMotion ? " is-still" : ""}`} ref={stageRef}>
      <div className="inv2-er-overture__pin" ref={frameRef}>
        <div className="inv2-er-overture__date" data-section="story" aria-label="Poziv">
          <p className="inv2-er-overture__invite">{inviteText}</p>
          <time className="inv2-er-overture__nums" dateTime={eventDateIso} aria-label={eventDateLabel}>
            <motion.span style={{ x: xDay }}>{day}</motion.span>
            <motion.span style={{ x: xMonth }}>{month}</motion.span>
            <motion.span style={{ x: xYear }}>{year}</motion.span>
          </time>
        </div>

        <motion.div className="inv2-er-overture__photo" data-section="hero" aria-label="Naslovnica" style={{ clipPath: photoClip }}>
          <motion.img src={photoSrc} alt={photoAlt} draggable={false} style={{ scale: photoScale, y: imgY }} />
          <div className="inv2-er-overture__veil" aria-hidden="true" />
          <motion.h1 className="inv2-er-hero__names inv2-er-overture__names" style={{ y: nameY, scale: nameScale }}>
            <span className="inv2-er-hero__name">{couple.partnerOne}</span>
            <span className="inv2-er-hero__joiner" aria-hidden="true">{joiner}</span>
            <span className="inv2-er-hero__name">{couple.partnerTwo}</span>
          </motion.h1>
        </motion.div>

        <motion.div
          className="inv2-er-overture__together"
          data-section="parents"
          aria-label="Porodice"
          style={reduceMotion ? undefined : { clipPath: togetherClip }}
        >
          <motion.div className="inv2-er-together__photo" style={{ clipPath: splitPhoto }}>
            <img src={envelopeRomanceParentsImage} alt="" />
          </motion.div>
          <motion.div className="inv2-er-together__panel" style={{ clipPath: splitPanel }} />
          <motion.div
            className="inv2-er-together__copy"
            style={{ left: copyLeft, width: copyWidth, top: copyTop, height: copyHeight, scale: copyScale }}
          >
            <h2 className="inv2-er-together__title">Zajedno</h2>
            {parentsNote ? <p className="inv2-er-together__note">{parentsNote}</p> : null}
            {monogram ? <p className="inv2-er-together__mark">{monogram}</p> : null}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default OvertureScene;
