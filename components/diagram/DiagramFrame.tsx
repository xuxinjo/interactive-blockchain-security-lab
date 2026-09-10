"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { DiagramMetadata } from "@/lib/types";

interface DiagramFrameProps {
  model: DiagramMetadata;
}

export function DiagramFrame({ model }: DiagramFrameProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [adversarialView, setAdversarialView] = useState(false);
  const [visibleLayers, setVisibleLayers] = useState(model.layers);
  const reduceMotion = useReducedMotion();

  const step = model.steps[stepIndex];
  const colors = useMemo(() => ["#2dd4bf", "#38bdf8", "#94a3b8"], []);

  useEffect(() => {
    if (!playing || stepIndex >= model.steps.length - 1) {
      if (playing) setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setStepIndex((current) => current + 1), 2200 / speed);

    return () => window.clearTimeout(timer);
  }, [playing, model.steps.length, stepIndex, speed]);

  function toggleLayer(layer: DiagramMetadata["layers"][number]) {
    setVisibleLayers((current) =>
      current.includes(layer) ? current.filter((item) => item !== layer) : [...current, layer]
    );
  }

  function resetDiagram() {
    setPlaying(false);
    setStepIndex(0);
    setVisibleLayers(model.layers);
    setAdversarialView(false);
  }

  function nextStep() {
    setPlaying(false);
    setStepIndex((current) => Math.min(current + 1, model.steps.length - 1));
  }

  return (
    <section className="panel space-y-4" aria-label={`${model.title} diagram`}>
      <header className="space-y-1">
        <h3 className="text-xl font-semibold text-white">{model.title}</h3>
        <p className="text-sm text-slate-300">{model.description}</p>
      </header>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Diagram controls">
        <button
          type="button"
          onClick={() => {
            if (stepIndex === model.steps.length - 1) setStepIndex(0);
            setPlaying((value) => !value);
          }}
          className="action-button"
          data-primary="true"
          aria-label={playing ? `Pause ${model.title}` : `Play ${model.title}`}
        >
          {playing ? "Pause scenario" : stepIndex === model.steps.length - 1 ? "Replay scenario" : "Play scenario"}
        </button>
        <button type="button" className="action-button" disabled={stepIndex === 0} onClick={() => { setPlaying(false); setStepIndex((current) => current - 1); }}>Previous step</button>
        <button
          type="button"
          onClick={nextStep}
          disabled={stepIndex === model.steps.length - 1}
          className="action-button"
          aria-label={`Advance ${model.title} to next step`}
        >
          Next step
        </button>
        <button
          type="button"
          onClick={resetDiagram}
          className="action-button"
          aria-label={`Reset ${model.title}`}
        >
          Reset
        </button>
        <label className="flex items-center gap-2 text-sm text-slate-400 sm:ml-auto">Speed<select className="field" value={speed} onChange={(event) => setSpeed(Number(event.target.value))}><option value={0.5}>0.5×</option><option value={1}>1×</option><option value={2}>2×</option></select></label>
      </div>

      <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label="Diagram steps">
        {model.steps.map((item, index) => <button key={item.title} type="button" className="step-button" aria-pressed={stepIndex === index} onClick={() => { setPlaying(false); setStepIndex(index); }}><span className="mb-1 block text-xs text-teal-300">{index < stepIndex ? "✓" : `0${index + 1}`}</span>{item.title}</button>)}
      </div>
      <div className="progress-track" aria-hidden="true"><div className="progress-fill" style={{ width: `${(stepIndex + 1) / model.steps.length * 100}%` }} /></div>

      <div className="flex flex-wrap items-center gap-3">
        {model.layers.map((layer) => (
          <button
            key={layer}
            type="button"
            onClick={() => toggleLayer(layer)}
            className={`rounded-md border px-3 py-1 text-xs uppercase tracking-wide ${
              visibleLayers.includes(layer)
                ? "border-cyan-300 bg-cyan-900/30 text-cyan-100"
                : "border-slate-700 text-slate-300"
            }`}
            aria-pressed={visibleLayers.includes(layer)}
          >
            {layer}
          </button>
        ))}

        <label className="flex w-full min-w-0 flex-col gap-2 text-sm text-slate-200 sm:ml-auto sm:w-auto sm:flex-row sm:items-center" htmlFor={`${model.id}-perspective`}>
          Perspective
          <select
            id={`${model.id}-perspective`}
            value={adversarialView ? "adversarial" : "honest"}
            onChange={(event) => setAdversarialView(event.target.value === "adversarial")}
            className="min-w-0 rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5"
          >
            <option value="honest">Honest</option>
            <option value="adversarial">Adversarial (abstract)</option>
          </select>
        </label>
      </div>

      <p className="text-xs text-slate-400 sm:hidden">Swipe sideways inside the diagram to see every layer.</p>
      <div className="visual-scroll rounded-xl border border-slate-700 bg-slate-950/70 p-3 sm:p-4" role="region" aria-label={`${model.title} scrollable diagram`} tabIndex={0}>
        <svg viewBox="0 0 720 250" role="img" aria-label={model.longDescription} className="w-full min-w-[36rem]">
          <title>{model.title}</title>
          <desc>{model.longDescription}</desc>
          {visibleLayers.length === 0 && <text x="360" y="125" textAnchor="middle" fill="#94a3b8" fontSize="17">Select a layer above to restore the diagram.</text>}
          {model.layers
            .filter((layer) => visibleLayers.includes(layer))
            .map((layer, index) => {
              const y = 28 + index * 68;
              const color = colors[index % colors.length];
              return (
                <g key={layer}>
                  <text x="20" y={y + 28} fill={color} fontSize="12">{layer.toUpperCase()}</text>
                  <line x1="176" y1={y + 24} x2="652" y2={y + 24} stroke={color} strokeOpacity="0.25" strokeDasharray="4 5" />
                  {model.steps.map((item, itemIndex) => <g key={item.title}>
                    <rect x={155 + itemIndex * 183} y={y} width="169" height="50" rx="10" fill={itemIndex === stepIndex ? (adversarialView ? "#881337" : "#134e4a") : "#0f172a"} stroke={itemIndex <= stepIndex ? color : "#334155"} />
                    <text x={239 + itemIndex * 183} y={y + 22} textAnchor="middle" fill={itemIndex === stepIndex ? "#f8fafc" : "#94a3b8"} fontSize="12">{item.title}</text>
                    <text x={239 + itemIndex * 183} y={y + 39} textAnchor="middle" fill={color} fontSize="10">{itemIndex < stepIndex ? "EXPLORED" : itemIndex === stepIndex ? "CURRENT STEP" : "UP NEXT"}</text>
                  </g>)}
                </g>
              );
            })}

          {visibleLayers.length > 0 && (
            <motion.circle
              className="motion-only"
              cx="34"
              cy={20}
              r="5"
              fill={adversarialView ? "#f43f5e" : "#22d3ee"}
              animate={reduceMotion ? undefined : { cx: [34, 350, 685], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
          )}
        </svg>
      </div>

      <div
        key={`${model.id}-${stepIndex}-${adversarialView ? "adv" : "honest"}`}
        className="page-enter rounded-md border border-slate-700 bg-slate-900 p-3 text-sm"
        aria-live="polite"
      >
        <p className="font-medium text-white">
          Step {stepIndex + 1}/{model.steps.length}: {step.title}
        </p>
        <p className="mt-1 text-slate-200">
          {adversarialView
            ? `Adversarial view: ${step.description}`
            : `Honest view: ${step.description}`}
        </p>
      </div>
    </section>
  );
}
