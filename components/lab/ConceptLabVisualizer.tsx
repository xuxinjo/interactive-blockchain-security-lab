"use client";

import { useState } from "react";
import { getLabState, scenarioLabels, stepLabels } from "@/lib/labMachine";
import type { LabMode, LabScenario, LabState } from "@/lib/types";

const steps: LabState["step"][] = [0, 1, 2];

export function ConceptLabVisualizer() {
  const [scenario, setScenario] = useState<LabScenario>("reentrancy");
  const [mode, setMode] = useState<LabMode>("vulnerable");
  const [step, setStep] = useState<LabState["step"]>(0);

  const state = getLabState(scenario, mode, step);

  return (
    <section className="panel space-y-4" aria-label="Conceptual state visualizer lab">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Scenario selector">
        {(["reentrancy", "bridge"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setScenario(option);
              setStep(0);
            }}
            aria-pressed={scenario === option}
            className={`rounded-md border px-3 py-1.5 text-sm ${
              scenario === option
                ? "border-cyan-300 bg-cyan-900/30 text-cyan-100"
                : "border-slate-700 text-slate-300"
            }`}
          >
            {scenarioLabels[option]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Mode selector">
        {(["vulnerable", "guarded"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setMode(option);
              setStep(0);
            }}
            aria-pressed={mode === option}
            className={`rounded-md border px-3 py-1.5 text-sm capitalize ${
              mode === option
                ? "border-teal-300 bg-teal-950/30 text-teal-100"
                : "border-slate-700 text-slate-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="State transition steps">
        {steps.map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => setStep(index)}
            aria-pressed={step === index}
            className={`rounded-md border px-3 py-1.5 text-sm ${
              step === index
                ? "border-cyan-300 bg-cyan-900/30 text-cyan-100"
                : "border-slate-700 text-slate-300"
            }`}
          >
            {stepLabels[index]}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <Metric label="Vault balance" value={state.balances.vault} />
        <Metric label="User balance" value={state.balances.user} />
        <Metric label="Reserve" value={state.balances.reserve} />
        <Metric label="Stack depth" value={state.callStackDepth} />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Metric label="State label" value={state.stateLabel} />
        <Metric label="Lock flag" value={state.lockFlag ? "true" : "false"} />
        <Metric label="Watcher" value={state.watcherStatus} tone={state.watcherStatus === "alert" ? "alert" : "normal"} />
      </div>

      <p className="text-sm text-slate-300" aria-live="polite">
        {state.narrative}
      </p>
    </section>
  );
}

function Metric({
  label,
  value,
  tone = "normal"
}: {
  label: string;
  value: number | string;
  tone?: "normal" | "alert";
}) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/75 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`mt-1 text-xl font-semibold ${tone === "alert" ? "text-rose-300" : "text-white"}`}>{value}</p>
    </div>
  );
}
