"use client";

import { useState } from "react";
import { frameworkCells } from "@/content/framework";
import { FrameworkGrid } from "@/components/framework/FrameworkGrid";
import type { FrameworkCell } from "@/lib/types";

export function FrameworkExplorer() {
  const [selected, setSelected] = useState<FrameworkCell>(frameworkCells[0]);
  const [visited, setVisited] = useState(() => new Set([frameworkCells[0].id]));
  const [focus, setFocus] = useState("All details");

  return (
    <section className="space-y-4">
      <div className="panel space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3"><p className="eyebrow">Explore the matrix</p><p className="text-xs text-teal-200" aria-live="polite">{visited.size} of 9 relationships explored</p></div>
        <div className="progress-track" aria-hidden="true"><div className="progress-fill" style={{ width: `${visited.size / 9 * 100}%` }} /></div>
        <p className="text-sm text-slate-400">Pick a relationship below. Each one connects a security goal to a layer of the system.</p>
      </div>
      <FrameworkGrid cells={frameworkCells} selectedCell={selected} onSelect={(cell) => {
        setSelected(cell);
        setVisited((current) => new Set([...current, cell.id]));
      }} />
      <a href="#framework-analysis" className="action-button md:hidden">View selected analysis ↓</a>

      <aside
        id="framework-analysis"
        key={selected.id}
        className="panel page-enter"
        aria-live="polite"
      >
          <p className="eyebrow mb-3">Relationship inspector</p>
          <h3 className="text-2xl font-semibold capitalize text-white">
            {selected.layer} x {selected.pillar}
          </h3>
          <p className="mt-2 text-sm text-slate-300">{selected.description}</p>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Analysis focus">
            {["All details", "Threats", "Trust assumptions", "Defences", "References"].map((label) => <button key={label} type="button" className="filter-chip" aria-pressed={focus === label} onClick={() => setFocus(label)}>{label}</button>)}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <section className="inspector-card" hidden={focus !== "All details" && focus !== "Threats"}>
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

            <section className="inspector-card" hidden={focus !== "All details" && focus !== "Trust assumptions"}>
              <h4 className="font-medium text-cyan-200">Trust assumptions</h4>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-200">
                {selected.trustAssumptions.map((assumption) => (
                  <li key={assumption.statement}>{assumption.statement}</li>
                ))}
              </ul>
            </section>

            <section className="inspector-card" hidden={focus !== "All details" && focus !== "Defences"}>
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

            <section className="inspector-card" hidden={focus !== "All details" && focus !== "References"}>
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
      </aside>
    </section>
  );
}
