"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { frameworkCells } from "@/content/framework";
import { FrameworkGrid } from "@/components/framework/FrameworkGrid";
import type { FrameworkCell } from "@/lib/types";

export function FrameworkExplorer() {
  const [selected, setSelected] = useState<FrameworkCell>(frameworkCells[0]);
  const reduceMotion = useReducedMotion();

  return (
    <section className="space-y-4">
      <FrameworkGrid cells={frameworkCells} selectedCell={selected} onSelect={setSelected} />

      <motion.aside
        key={selected.id}
        className="panel"
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        aria-live="polite"
      >
          <h3 className="text-lg font-semibold capitalize text-white">
            {selected.layer} x {selected.pillar}
          </h3>
          <p className="mt-2 text-sm text-slate-300">{selected.description}</p>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <section>
              <h4 className="font-medium text-cyan-200">Threats</h4>
              <ul className="mt-1 space-y-2 text-sm text-slate-200">
                {selected.threats.map((threat) => (
                  <li key={threat.title}>
                    <p className="font-medium text-white">{threat.title}</p>
                    <p>{threat.summary}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="font-medium text-cyan-200">Trust assumptions</h4>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-200">
                {selected.trustAssumptions.map((assumption) => (
                  <li key={assumption.statement}>{assumption.statement}</li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="font-medium text-cyan-200">Representative defences</h4>
              <ul className="mt-1 space-y-2 text-sm text-slate-200">
                {selected.defences.map((defence) => (
                  <li key={defence.title}>
                    <p className="font-medium text-white">{defence.title}</p>
                    <p>{defence.summary}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="font-medium text-cyan-200">Thesis references</h4>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-200">
                {selected.references.map((reference) => (
                  <li key={`${reference.label}-${reference.section}`}>
                    {reference.label} ({reference.section})
                  </li>
                ))}
              </ul>
            </section>
          </div>
      </motion.aside>
    </section>
  );
}
