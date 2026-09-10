"use client";

import { useState } from "react";
import { diagramModels } from "@/content/diagrams";
import { DiagramFrame } from "@/components/diagram/DiagramFrame";

export function DiagramExplorer() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="space-y-5" aria-label="Diagram explorer">
      <div className="flex flex-wrap items-center justify-between gap-2"><p className="eyebrow">Choose a concept</p><span className="text-xs text-slate-400">{selected + 1} / {diagramModels.length}</span></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="group" aria-label="Concept selector">
        {diagramModels.map((model, index) => (
          <button key={model.id} type="button" className="step-button interactive-card" aria-pressed={selected === index} aria-controls="active-diagram" onClick={() => setSelected(index)}>
            <span className="mb-3 flex items-center justify-between text-xs text-teal-300"><span>0{index + 1}</span><span>{model.steps.length} steps <span aria-hidden="true">↗</span></span></span>
            <strong className="block font-medium text-white">{model.title}</strong>
            <span className="mt-2 block text-xs leading-relaxed text-slate-400">{model.description}</span>
          </button>
        ))}
      </div>
      <div id="active-diagram"><DiagramFrame key={diagramModels[selected].id} model={diagramModels[selected]} /></div>
    </section>
  );
}
