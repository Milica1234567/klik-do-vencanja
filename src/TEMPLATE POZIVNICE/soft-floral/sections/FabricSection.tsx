import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import silkImage from "../assets/veil-silk.jpg";

function FabricSection() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-3%", "3%"]);

  return (
    <section className="sf-fabric" ref={ref} aria-hidden="true">
      <motion.img className="sf-fabric__image" src={silkImage} alt="" draggable={false} style={{ x, scale: 1.18 }} />
    </section>
  );
}

export default FabricSection;
