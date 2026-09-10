"use client";

import { useEffect, useState } from "react";
import { getLabState, scenarioLabels, stepLabels } from "@/lib/labMachine";
import type { LabMode, LabScenario, LabState } from "@/lib/types";

const steps: LabState["step"][] = [0, 1, 2];

export function ConceptLabVisualizer() {
  const [scenario, setScenario] = useState<LabScenario>("reentrancy");
  const [mode, setMode] = useState<LabMode>("vulnerable");
  const [step, setStep] = useState<LabState["step"]>(0);
  const [playing, setPlaying] = useState(false);
  const [compare, setCompare] = useState(false);

  const state = getLabState(scenario, mode, step);
  const baseline = getLabState(scenario, mode, 0);
  const other = getLabState(scenario, mode === "vulnerable" ? "guarded" : "vulnerable", step);

  useEffect(() => {
    if (!playing || step === 2) {
      if (playing) setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setStep((current) => (current + 1) as LabState["step"]), 2200);
    return () => window.clearTimeout(timer);
  }, [playing, step]);

  return (
    <section className="panel space-y-4" aria-label="Conceptual state visualizer lab">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">Scenario workbench</p><p className="mt-2 text-sm text-slate-400">Balances are illustrative units. Change the mode to see how the same scenario diverges.</p></div><span className="badge">{playing ? "Playing" : step === 2 ? "Sequence complete" : "Ready to explore"}</span></div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Scenario selector">
        {(["reentrancy", "bridge"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setScenario(option);
              setStep(0);
              setPlaying(false);
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
              setPlaying(false);
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

      <div className="flex flex-wrap gap-2">
        <button className="action-button" data-primary="true" onClick={() => { if (step === 2) setStep(0); setPlaying((current) => !current); }}>{playing ? "Pause simulation" : step === 2 ? "Replay simulation" : "Play simulation"}</button>
        <button className="action-button" onClick={() => { setPlaying(false); setStep(0); }}>Reset simulation</button>
        <button className="filter-chip sm:ml-auto" aria-pressed={compare} onClick={() => setCompare((current) => !current)}>Compare both modes</button>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="State transition steps">
        {steps.map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => { setPlaying(false); setStep(index); }}
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

      <div className="progress-track" aria-hidden="true"><div className="progress-fill" style={{ width: `${(step + 1) / 3 * 100}%` }} /></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <BalanceCard label="Vault balance" value={state.balances.vault} baseline={baseline.balances.vault} max={baseline.balances.vault} />
        <BalanceCard label="User balance" value={state.balances.user} baseline={baseline.balances.user} max={baseline.balances.vault} />
        <BalanceCard label="Reserve" value={state.balances.reserve} baseline={baseline.balances.reserve} max={baseline.balances.vault} />
        <Metric label="Stack depth" value={state.callStackDepth} />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Metric label="State label" value={state.stateLabel} />
        <Metric label="Lock flag" value={state.lockFlag ? "true" : "false"} />
        <Metric label="Watcher" value={state.watcherStatus} tone={state.watcherStatus === "alert" ? "alert" : "normal"} />
      </div>

      <p className={`rounded-xl border p-4 text-sm leading-relaxed ${state.watcherStatus === "alert" ? "border-rose-400/40 bg-rose-950/25 text-rose-100" : "border-teal-300/30 bg-teal-950/25 text-teal-100"}`} aria-live="polite">
        {state.narrative}
      </p>
      {compare && <section className="inspector-card space-y-4" aria-label="Mode comparison">
        <div><p className="eyebrow">At the same step</p><h3 className="mt-2 text-xl font-semibold capitalize text-white">{other.mode} alternative</h3></div>
        <div className="grid gap-3 sm:grid-cols-3"><Metric label="Vault balance" value={other.balances.vault} /><Metric label="User balance" value={other.balances.user} /><Metric label="Watcher" value={other.watcherStatus} tone={other.watcherStatus === "alert" ? "alert" : "normal"} /></div>
        <p className="text-sm text-slate-300">{other.narrative}</p>
        <p className="text-sm font-medium text-teal-200">Vault difference from the current mode: {other.balances.vault - state.balances.vault > 0 ? "+" : ""}{other.balances.vault - state.balances.vault} units</p>
      </section>}
      <div className="flex flex-wrap items-center justify-between gap-3"><button className="action-button" disabled={step === 0} onClick={() => { setPlaying(false); setStep((current) => (current - 1) as LabState["step"]); }}>Previous state</button><span className="text-xs text-slate-400">State {step + 1} of 3</span><button className="action-button" disabled={step === 2} onClick={() => { setPlaying(false); setStep((current) => (current + 1) as LabState["step"]); }}>Next state</button></div>
    </section>
  );
}

function BalanceCard({ label, value, baseline, max }: { label: string; value: number; baseline: number; max: number }) {
  const delta = value - baseline;
  return <div className="stat-card"><span>{label}</span><strong className="tabular-nums">{value}</strong><div className="progress-track mt-4" aria-hidden="true"><div className="progress-fill" style={{ width: `${Math.min(100, value / max * 100)}%` }} /></div><p className="mt-3 text-xs text-slate-400">{delta === 0 ? "Unchanged from initial state" : `${delta > 0 ? "+" : ""}${delta} units from initial state`}</p></div>;
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
