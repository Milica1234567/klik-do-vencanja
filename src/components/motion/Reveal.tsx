import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Same curve inviteme uses for the rise and drop. */
const inviteEase = [0.25, 0.46, 0.45, 0.94] as const;

type Kind = "fade" | "up" | "down" | "slide";

type RevealProps = {
  children: ReactNode;
  kind?: Kind;
  delay?: number;
  className?: string;
  id?: string;
  as?: "div" | "li" | "article" | "h2" | "p" | "header";
};

function hiddenFor(kind: Kind) {
  if (kind === "fade") return { opacity: 0 };
  if (kind === "down") return { opacity: 0, y: -50 };
  return { opacity: 0, y: 50 };
}

function Reveal({
  children,
  kind = "up",
  delay = 0,
  className,
  id,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      id={id}
      initial={reduce ? false : hiddenFor(kind)}
      whileInView={
        reduce ? undefined : kind === "fade" ? { opacity: 1 } : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: kind === "fade" ? 0.5 : 0.4,
        delay,
        ease: kind === "fade" ? "easeOut" : inviteEase,
      }}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
