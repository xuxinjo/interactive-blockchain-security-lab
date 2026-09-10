"use client";

import { useState } from "react";
import Link from "next/link";
import { incidentCases } from "@/content/cases/incidents";
import { CaseComparisonTable } from "@/components/cases/CaseComparisonTable";
import { CaseTemplateCard } from "@/components/cases/CaseTemplate";

export function CaseLibrary() {
  const [query, setQuery] = useState("");
  const [layer, setLayer] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const filtered = incidentCases.filter((item) => (layer === "all" || item.primaryLayer === layer) && `${item.title} ${item.year} ${item.summary} ${item.trustAssumptionViolated}`.toLowerCase().includes(query.toLowerCase().trim()));
  const comparison = selected.map((slug) => incidentCases.find((item) => item.slug === slug)!);

  return (
    <section className="space-y-5" aria-label="Incident library">
      <div className="panel space-y-4">
        <label className="block text-sm font-medium text-slate-300">Search the library<input className="field mt-2 w-full" type="search" placeholder="Try a name, year, or trust assumption…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter case cards by layer">{["all", "protocol", "network", "application"].map((item) => <button key={item} className="filter-chip capitalize" aria-pressed={layer === item} onClick={() => setLayer(item)}>{item === "all" ? "All layers" : item}</button>)}</div>
        <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm text-slate-400" role="status">{filtered.length} of {incidentCases.length} cases · {selected.length} of 2 selected for comparison</p>{(query || layer !== "all") && <button className="action-button" onClick={() => { setQuery(""); setLayer("all"); }}>Clear filters</button>}</div>
      </div>
      {selected.length > 0 && <section className="panel space-y-4 border-teal-300/40" aria-label="Selected case comparison">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">Side by side</p><h3 className="mt-1 text-xl font-semibold text-white">Compare the trust failures</h3></div><button className="action-button" onClick={() => setSelected([])}>Clear comparison</button></div>
        <div className="grid gap-4 md:grid-cols-2">{comparison.map((item) => <article className="inspector-card" key={item.slug}>
          <div className="flex items-start justify-between gap-2"><Link href={`/cases/${item.slug}`} className="text-lg font-semibold text-teal-200 underline">{item.title}</Link><button className="action-button" aria-label={`Remove ${item.title} from comparison`} onClick={() => setSelected((current) => current.filter((slug) => slug !== item.slug))}>×</button></div>
          <p className="mt-2 text-sm text-slate-400">{item.year} · <span className="capitalize">{item.primaryLayer}</span></p>
          <dl className="mt-4 space-y-4 text-sm"><div><dt className="text-slate-400">Documented loss / value</dt><dd className="mt-1 text-white">{item.documentedLoss?.label ?? "Not quantified"}</dd></div><div><dt className="text-slate-400">Trust assumption violated</dt><dd className="mt-1 text-slate-200">{item.trustAssumptionViolated}</dd></div><div><dt className="text-slate-400">Response and lessons</dt><dd className="mt-1 text-slate-200">{item.publicResponseAndLessons}</dd></div></dl>
        </article>)}{selected.length === 1 && <div className="grid place-content-center rounded-xl border border-dashed border-slate-600 p-6 text-center text-sm text-slate-400">Select one more case below<br />to explore their similarities and differences.</div>}</div>
      </section>}
      <div className="grid gap-4 lg:grid-cols-2">{filtered.map((item) => <div key={item.slug} className="interactive-card flex min-w-0 flex-col rounded-lg border border-transparent"><CaseTemplateCard incident={item} /><button className="action-button mt-2 w-full" aria-pressed={selected.includes(item.slug)} disabled={selected.length === 2 && !selected.includes(item.slug)} onClick={() => setSelected((current) => current.includes(item.slug) ? current.filter((slug) => slug !== item.slug) : [...current, item.slug])}>{selected.includes(item.slug) ? "✓ Selected" : "+ Compare"}<span className="sr-only"> {item.title}</span></button></div>)}</div>
      {filtered.length === 0 && <div className="panel py-10 text-center"><h3 className="text-lg font-semibold text-white">No cases match these filters</h3><p className="mt-2 text-sm text-slate-400">Try another search or choose a different layer. This sample has no primary network-layer cases.</p></div>}
      <details className="panel" open><summary className="text-lg font-semibold text-white">Full comparison table <span className="ml-2 text-xs font-normal text-slate-400">All six documented cases</span></summary><CaseComparisonTable incidents={incidentCases} /></details>
    </section>
  );
}
