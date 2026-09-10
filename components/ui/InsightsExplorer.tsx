"use client";

import { useState } from "react";
import { mlDetectionMatrix } from "@/content/analysis";

const methods = [
  { key: "ml", label: "ML-assisted", description: "Triage recognizable patterns and prioritize human review." },
  { key: "static", label: "Static analysis", description: "Inspect code paths and known vulnerability patterns." },
  { key: "formal", label: "Formal methods", description: "Check specified properties and the meaning of security rules." },
  { key: "operational", label: "Operational controls", description: "Review keys, governance, monitoring, and response processes." }
] as const;

function Fit({ value }: { value: string }) {
  return <span className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-medium ${value === "High" ? "border-teal-300/30 bg-teal-300/10 text-teal-200" : value === "Medium" ? "border-amber-300/25 bg-amber-300/10 text-amber-200" : "border-slate-600 bg-slate-800 text-slate-300"}`}>{value}</span>;
}

export function InsightsExplorer() {
  const [methodIndex, setMethodIndex] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);
  const method = methods[methodIndex];
  const selected = mlDetectionMatrix[caseIndex];
  return <section className="panel space-y-5" aria-label="ML-assisted detection matrix">
    <div><p className="eyebrow">Defence explorer</p><h3 className="mt-2 text-2xl font-semibold text-white">What helps, and where?</h3><p className="mt-2 text-sm text-slate-400">Choose a method and an incident. Ratings indicate rough fit for classroom comparison, not detection accuracy.</p></div>
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label="Detection method">{methods.map((item, index) => <button key={item.key} className="step-button" aria-pressed={methodIndex === index} onClick={() => setMethodIndex(index)}><strong className="block text-sm">{item.label}</strong><span className="mt-2 block text-xs leading-relaxed text-slate-400">{item.description}</span></button>)}</div>
    <label className="grid gap-2 text-sm text-slate-300 sm:max-w-sm">Inspect a case<select className="field" value={caseIndex} onChange={(event) => setCaseIndex(Number(event.target.value))}>{mlDetectionMatrix.map((row, index) => <option key={row.caseTitle} value={index}>{row.caseTitle}</option>)}</select></label>
    <div className="inspector-card space-y-3" aria-live="polite"><div className="flex flex-wrap items-center justify-between gap-3"><h4 className="text-lg font-semibold text-white">{selected.caseTitle} <span className="text-slate-500">/</span> {method.label}</h4><Fit value={selected[method.key]} /></div><p className="text-sm leading-relaxed text-slate-300">{selected.note}</p><p className="text-xs text-teal-200">{mlDetectionMatrix.filter((row) => row[method.key] === "High").length} of 6 cases have a High fit for {method.label.toLowerCase()}.</p></div>
    <p className="text-xs text-slate-400">Select any rating to inspect that pairing. <span className="sm:hidden">Swipe sideways inside the matrix to see all columns.</span></p>
    <div className="visual-scroll" role="region" aria-label="Detection matrix columns" tabIndex={0}><table className="academic-table"><thead><tr><th>Incident</th>{methods.map((item) => <th key={item.key}>{item.label}</th>)}</tr></thead><tbody>{mlDetectionMatrix.map((row, rowIndex) => <tr key={row.caseTitle} className={rowIndex === caseIndex ? "bg-teal-300/5" : ""}><th scope="row">{row.caseTitle}</th>{methods.map((item, colIndex) => <td key={item.key}><button className="min-h-11 rounded-lg px-1" aria-label={`${row.caseTitle}, ${item.label}: ${row[item.key]}`} aria-pressed={caseIndex === rowIndex && methodIndex === colIndex} onClick={() => { setCaseIndex(rowIndex); setMethodIndex(colIndex); }}><Fit value={row[item.key]} /></button></td>)}</tr>)}</tbody></table></div>
  </section>;
}
