"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function MotionSection({ children, className, ariaLabel }: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-label={ariaLabel}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
