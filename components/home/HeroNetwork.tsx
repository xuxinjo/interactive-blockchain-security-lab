"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { id: "n1", x: 100, y: 120 },
  { id: "n2", x: 240, y: 70 },
  { id: "n3", x: 240, y: 170 },
  { id: "n4", x: 410, y: 120 },
  { id: "n5", x: 550, y: 120 }
];

const links: Array<[string, string]> = [
  ["n1", "n2"],
  ["n1", "n3"],
  ["n2", "n4"],
  ["n3", "n4"],
  ["n4", "n5"]
];

export function HeroNetwork() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="glow-card overflow-hidden p-6 md:p-8" aria-label="Conceptual blockchain network hero illustration">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-4">
          <span className="badge">Protocol | Network | Application</span>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Visualising Trust in Blockchain Security</h2>
          <p className="max-w-2xl text-slate-200">
            Blockchain security is not only about cryptography. It also depends on protocol rules, network behaviour,
            and application logic.
          </p>
          <p className="max-w-2xl text-slate-300">
            Incidents still happen when trust assumptions fail. The modules in this site help explain where those
            assumptions live and how layered defences reduce systemic risk.
          </p>
        </div>

        <div className="rounded-lg border border-slate-700/80 bg-slate-950/70 p-3">
          <svg viewBox="0 0 640 240" role="img" aria-label="Abstract network graph with blocks and links" className="w-full">
            <title>Conceptual blockchain network</title>
            <desc>Animated abstract cubes and links representing data flow in a blockchain system.</desc>

            {links.map(([fromId, toId]) => {
              const from = nodes.find((node) => node.id === fromId);
              const to = nodes.find((node) => node.id === toId);
              if (!from || !to) {
                return null;
              }
              return (
                <line
                  key={`${fromId}-${toId}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(45,212,191,0.34)"
                  strokeWidth="2"
                />
              );
            })}

            {nodes.map((node, index) => (
              <motion.g
                key={node.id}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, index % 2 === 0 ? -2 : 2, 0],
                        opacity: [0.62, 0.82, 0.62]
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 5 + index * 0.35,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      }
                }
              >
                <rect
                  x={node.x - 22}
                  y={node.y - 22}
                  width="44"
                  height="44"
                  rx="8"
                  fill="rgba(15,23,42,0.65)"
                  stroke="rgba(45,212,191,0.72)"
                />
                <circle cx={node.x} cy={node.y} r="4" fill="rgba(125,211,252,0.95)" />
              </motion.g>
            ))}

            {!reduceMotion && (
              <motion.circle
                cx="120"
                cy="120"
                r="4"
                fill="rgba(45,212,191,0.9)"
                animate={{ cx: [120, 240, 410, 550], cy: [120, 70, 120, 120], opacity: [0.25, 0.75, 0.75, 0.2] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            )}
          </svg>
        </div>
      </div>
    </section>
  );
}
