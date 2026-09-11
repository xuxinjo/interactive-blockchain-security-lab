"use client";

import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

const modules = [
  {
    title: "Framework",
    href: "/framework",
    kicker: "Security model",
    description: "Map protocol, network, and application threats across confidentiality, integrity, and availability.",
    accent: "cyan"
  },
  {
    title: "Diagrams",
    href: "/diagrams",
    kicker: "Visual learning",
    description: "Step through six animated explanations of blockchain attacks, trust boundaries, and defences.",
    accent: "teal"
  },
  {
    title: "Cases",
    href: "/cases",
    kicker: "Incident library",
    description: "Compare six documented incidents using the same evidence-led, five-part analysis template.",
    accent: "sky"
  },
  {
    title: "Lab",
    href: "/lab",
    kicker: "Interactive states",
    description: "Explore vulnerable and guarded re-entrancy and bridge scenarios through state transitions.",
    accent: "indigo"
  },
  {
    title: "Insights",
    href: "/insights",
    kicker: "Detection limits",
    description: "See where ML, static analysis, formal methods, and operational controls are most useful.",
    accent: "cyan"
  },
  {
    title: "Data",
    href: "/data",
    kicker: "Incident profile",
    description: "Read the thesis incident values through accessible charts and a documented timeline.",
    accent: "teal"
  },
  {
    title: "About",
    href: "/about",
    kicker: "Thesis context",
    description: "Review the research questions, project status, source mapping, and reproduction details.",
    accent: "sky"
  },
  {
    title: "Feedback",
    href: "/feedback",
    kicker: "Local notes",
    description: "Capture private, browser-only observations while reviewing the educational artefact.",
    accent: "indigo"
  }
] as const;

const initialOrder = modules.map((_, index) => index);

const stackLayouts = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: -24, y: 18, rotate: -4.5, scale: 0.965, opacity: 0.9 },
  { x: 22, y: 36, rotate: 3.7, scale: 0.93, opacity: 0.78 },
  { x: -12, y: 55, rotate: -6.2, scale: 0.895, opacity: 0.62 },
  { x: 27, y: 73, rotate: 5.4, scale: 0.86, opacity: 0.42 }
] as const;

interface DepartingCard {
  moduleIndex: number;
  direction: 1 | -1;
  originX: number;
  token: number;
}

export function ModuleTiles() {
  const reduceMotion = useReducedMotion();
  const [order, setOrder] = useState<number[]>(initialOrder);
  const [departing, setDeparting] = useState<DepartingCard | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const dragged = useRef(false);

  const activeModule = modules[order[0]];
  const visibleOrder = order.slice(0, stackLayouts.length);

  function cycleDeck(direction: 1 | -1, originX = 0) {
    if (isAnimating) {
      return;
    }

    const outgoingIndex = order[0];
    setIsAnimating(true);
    setDeparting({ moduleIndex: outgoingIndex, direction, originX, token: Date.now() });
    setOrder((current) =>
      direction === 1
        ? [...current.slice(1), current[0]]
        : [current[current.length - 1], ...current.slice(0, current.length - 1)]
    );
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const hasSwipeDistance = Math.abs(info.offset.x) > 85;
    const hasSwipeVelocity = Math.abs(info.velocity.x) > 520;

    if (hasSwipeDistance || hasSwipeVelocity) {
      cycleDeck(info.offset.x < 0 ? 1 : -1, info.offset.x);
    }

    window.setTimeout(() => {
      dragged.current = false;
    }, 0);
  }

  function handleKeyboard(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      cycleDeck(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      cycleDeck(1);
    }
  }

  return (
    <section className="module-carousel" aria-labelledby="module-carousel-title">
      <header className="module-carousel-heading">
        <p className="module-carousel-kicker">Choose your path</p>
        <h2 id="module-carousel-title" className="text-3xl font-bold text-white md:text-4xl">
          Explore the security lab
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
          Drag the front card, use the arrows, or press your keyboard arrow keys. The deck loops continuously.
        </p>
      </header>

      <div className="module-deck-shell">
        <button
          type="button"
          className="module-deck-arrow module-deck-arrow-left"
          aria-label="Show previous module"
          onClick={() => cycleDeck(-1)}
          disabled={isAnimating}
        >
          <ArrowIcon direction="left" />
        </button>

        <div
          className="module-deck-viewport"
          tabIndex={0}
          onKeyDown={handleKeyboard}
          aria-label={`Module card deck. Currently showing ${activeModule.title}.`}
        >
          <div className="module-deck-shadow" aria-hidden="true" />

          {visibleOrder
            .map((moduleIndex, stackIndex) => ({ moduleIndex, stackIndex }))
            .reverse()
            .map(({ moduleIndex, stackIndex }) => {
              const layout = stackLayouts[stackIndex];
              const isFront = stackIndex === 0;

              return (
                <motion.article
                  key={modules[moduleIndex].href}
                  className="module-deck-card"
                  data-accent={modules[moduleIndex].accent}
                  aria-hidden={!isFront}
                  animate={layout}
                  transition={{ type: "spring", stiffness: 250, damping: 27, mass: 0.9 }}
                  style={{ zIndex: stackLayouts.length - stackIndex, pointerEvents: isFront ? "auto" : "none" }}
                  drag={isFront && !isAnimating ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  dragSnapToOrigin
                  whileDrag={reduceMotion ? undefined : { scale: 1.025, cursor: "grabbing" }}
                  onDragStart={() => {
                    dragged.current = true;
                  }}
                  onDragEnd={handleDragEnd}
                >
                  <ModuleCardContent
                    moduleIndex={moduleIndex}
                    interactive={isFront}
                    preventNavigation={() => dragged.current}
                  />
                </motion.article>
              );
            })}

          {departing && (
            <motion.article
              key={departing.token}
              className="module-deck-card module-deck-card-departing"
              data-accent={modules[departing.moduleIndex].accent}
              aria-hidden="true"
              initial={{
                x: departing.originX,
                y: 0,
                rotate: departing.originX / 20,
                scale: 1,
                opacity: 1
              }}
              animate={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      x: departing.direction === 1 ? -620 : 620,
                      y: [0, -12, 76],
                      rotate: departing.direction === 1 ? -19 : 19,
                      scale: [1, 1.015, 0.86],
                      opacity: [1, 1, 0]
                    }
              }
              transition={{ duration: reduceMotion ? 0.01 : 0.62, ease: [0.22, 0.61, 0.36, 1] }}
              onAnimationComplete={() => {
                setDeparting(null);
                setIsAnimating(false);
              }}
            >
              <ModuleCardContent moduleIndex={departing.moduleIndex} interactive={false} />
            </motion.article>
          )}
        </div>

        <button
          type="button"
          className="module-deck-arrow module-deck-arrow-right"
          aria-label="Show next module"
          onClick={() => cycleDeck(1)}
          disabled={isAnimating}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      <div className="module-deck-pagination" aria-label={`${order[0] + 1} of ${modules.length}`}>
        {modules.map((moduleItem, index) => (
          <span
            key={moduleItem.href}
            className={index === order[0] ? "module-deck-dot module-deck-dot-active" : "module-deck-dot"}
            aria-hidden="true"
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {activeModule.title}, card {order[0] + 1} of {modules.length}.
      </p>
    </section>
  );
}

function ModuleCardContent({
  moduleIndex,
  interactive,
  preventNavigation
}: {
  moduleIndex: number;
  interactive: boolean;
  preventNavigation?: () => boolean;
}) {
  const moduleItem = modules[moduleIndex];
  const number = String(moduleIndex + 1).padStart(2, "0");

  return (
    <div className="module-card-content">
      <div className="module-card-visual" aria-hidden="true">
        <span className="module-card-orbit module-card-orbit-one" />
        <span className="module-card-orbit module-card-orbit-two" />
        <span className="module-card-core" />
        <span className="module-card-beam" />
      </div>

      <div className="module-card-copy">
        <div className="flex items-center justify-between gap-4">
          <span className="module-card-number">{number}</span>
          <span className="module-card-count">{number} / {String(modules.length).padStart(2, "0")}</span>
        </div>
        <p className="module-card-kicker">{moduleItem.kicker}</p>
        <h3 className="module-card-title">{moduleItem.title}</h3>
        <p className="module-card-description">{moduleItem.description}</p>
      </div>

      {interactive ? (
        <Link
          href={moduleItem.href}
          className="module-card-link"
          onClick={(event) => {
            if (preventNavigation?.()) {
              event.preventDefault();
            }
          }}
        >
          Open {moduleItem.title}
          <ArrowIcon direction="right" />
        </Link>
      ) : (
        <span className="module-card-link" aria-hidden="true">
          Open {moduleItem.title}
          <ArrowIcon direction="right" />
        </span>
      )}
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={direction === "left" ? "h-5 w-5 rotate-180" : "h-5 w-5"}
      fill="none"
    >
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
