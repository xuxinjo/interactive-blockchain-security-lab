"use client";

import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode
} from "react";

export interface PortalDestination {
  title: string;
  href: string;
  description: string;
  accent: string;
}

interface PortalOrigin {
  x: number;
  y: number;
}

interface TransitionState {
  destination: PortalDestination;
  origin: PortalOrigin;
  phase: "covering" | "revealing";
}

interface RouteTransitionContextValue {
  navigateWithPortal: (destination: PortalDestination, origin: PortalOrigin) => void;
  prefetchPortal: (href: string) => void;
  isTransitioning: boolean;
}

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

export function RouteTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const reduceMotion = Boolean(useReducedMotion());
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const active = useRef(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const prefetchPortal = useCallback(
    (href: string) => {
      router.prefetch(href);
    },
    [router]
  );

  const navigateWithPortal = useCallback(
    (destination: PortalDestination, origin: PortalOrigin) => {
      if (active.current) {
        return;
      }

      active.current = true;
      clearTimers();
      setTransition({ destination, origin, phase: "covering" });

      const isDesktop =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
      const navigationDelay = reduceMotion ? 120 : isDesktop ? 1300 : 820;
      const revealDelay = reduceMotion ? 210 : isDesktop ? 1660 : 1040;
      const completionDelay = reduceMotion ? 430 : isDesktop ? 2650 : 1660;

      timers.current.push(
        window.setTimeout(() => router.push(destination.href), navigationDelay),
        window.setTimeout(() => {
          setTransition((current) => (current ? { ...current, phase: "revealing" } : null));
        }, revealDelay),
        window.setTimeout(() => {
          setTransition(null);
          active.current = false;
        }, completionDelay)
      );
    },
    [clearTimers, reduceMotion, router]
  );

  const value: RouteTransitionContextValue = {
    navigateWithPortal,
    prefetchPortal,
    isTransitioning: transition !== null
  };

  const portalStyle = transition
    ? ({
        "--portal-origin-x": `${transition.origin.x}px`,
        "--portal-origin-y": `${transition.origin.y}px`,
        "--portal-accent": transition.destination.accent
      } as CSSProperties)
    : undefined;

  return (
    <RouteTransitionContext.Provider value={value}>
      {children}
      {transition && (
        <div
          className={`route-portal-overlay route-portal-${transition.phase}`}
          style={portalStyle}
          role="status"
          aria-live="polite"
          aria-label={`Opening ${transition.destination.title}`}
        >
          <div className="route-portal-backdrop" aria-hidden="true" />
          <div className="route-portal-burst" aria-hidden="true" />
          <div className="route-portal-ring route-portal-ring-one" aria-hidden="true" />
          <div className="route-portal-ring route-portal-ring-two" aria-hidden="true" />
          <div className="route-portal-title">
            <span className="route-portal-cube" aria-hidden="true" />
            <p>Entering</p>
            <strong>{transition.destination.title}</strong>
          </div>
        </div>
      )}
    </RouteTransitionContext.Provider>
  );
}

export function useRouteTransition() {
  const context = useContext(RouteTransitionContext);

  if (!context) {
    throw new Error("useRouteTransition must be used within RouteTransitionProvider");
  }

  return context;
}
