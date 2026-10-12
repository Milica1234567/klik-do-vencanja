import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./Hero.css";

function Hero() {
  const frameRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);

  return (
    <section className="brand-hero" id="home-hero" aria-labelledby="brand-hero-title">
      <div className="brand-hero__copy">
        <p className="brand-hero__kicker">
          <em>digitalni atelier</em>
        </p>
        <h1 id="brand-hero-title">
          Pozivnica
          <span> koja prati</span>
          <span> vaš dan.</span>
        </h1>
        <p className="brand-hero__lede">
          Moderne digitalne pozivnice, izrađene za vaš događaj. Jedan link, a gosti odgovaraju na
          istom mestu.
        </p>
        <a className="brand-hero__cta" href="#invitation-showcase">
          Pogledajte kolekciju
        </a>
      </div>
      <figure className="brand-hero__frame" ref={frameRef}>
        <motion.img
          src="/brand/room-light.jpg"
          alt="Svetli kameni prolaz u dnevnom svetlu."
          style={reduce ? undefined : { y }}
        />
      </figure>
    </section>
  );
}

export default Hero;
