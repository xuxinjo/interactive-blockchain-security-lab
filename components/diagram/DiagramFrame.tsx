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
  const [adversarialView, setAdversarialView] = useState(false);
  const [visibleLayers, setVisibleLayers] = useState(model.layers);
  const reduceMotion = useReducedMotion();

  const step = model.steps[stepIndex];
  const colors = useMemo(() => ["#2dd4bf", "#38bdf8", "#94a3b8"], []);

  useEffect(() => {
    if (!playing) {
      return;
    }
    const timer = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= model.steps.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1400);

    return () => window.clearInterval(timer);
  }, [playing, model.steps.length]);

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
          onClick={() => setPlaying((value) => !value)}
          className="rounded-md border border-cyan-400/70 bg-cyan-900/20 px-3 py-1.5 text-sm text-cyan-100"
          aria-label={playing ? `Pause ${model.title}` : `Play ${model.title}`}
        >
          {playing ? "Pause scenario" : "Play scenario"}
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="rounded-md border border-teal-300/70 bg-teal-950/30 px-3 py-1.5 text-sm text-teal-100"
          aria-label={`Advance ${model.title} to next step`}
        >
          Next step
        </button>
        <button
          type="button"
          onClick={resetDiagram}
          className="rounded-md border border-slate-600 px-3 py-1.5 text-sm text-slate-200"
          aria-label={`Reset ${model.title}`}
        >
          Reset
        </button>
      </div>

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
          {model.layers
            .filter((layer) => visibleLayers.includes(layer))
            .map((layer, index) => {
              const y = 28 + index * 68;
              const color = colors[index % colors.length];
              return (
                <g key={layer}>
                  <rect x="18" y={y} width="684" height="52" rx="10" fill={color} opacity={adversarialView ? 0.18 : 0.28} />
                  <text x="34" y={y + 32} fill="#e2e8f0" fontSize="15">
                    {layer.toUpperCase()} :: {step.title}
                  </text>
                </g>
              );
            })}

          {!reduceMotion && (
            <motion.circle
              cx="34"
              cy={36 + stepIndex * 68}
              r="5"
              fill={adversarialView ? "#f43f5e" : "#22d3ee"}
              animate={{ cx: [34, 350, 685], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
          )}
        </svg>
      </div>

      <motion.div
        key={`${model.id}-${stepIndex}-${adversarialView ? "adv" : "honest"}`}
        className="rounded-md border border-slate-700 bg-slate-900 p-3 text-sm"
        initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
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
      </motion.div>
    </section>
  );
}
