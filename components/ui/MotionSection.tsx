import type { ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function MotionSection({ children, className, ariaLabel }: MotionSectionProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={`page-enter ${className ?? ""}`}
    >
      {children}
    </section>
  );
}
