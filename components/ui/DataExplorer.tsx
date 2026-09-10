"use client";

import { useState } from "react";
import { chartIncidentValues } from "@/content/analysis";
import { IncidentBarChart, IncidentTimelineChart } from "@/components/ui/IncidentCharts";

export function DataExplorer() {
  const [layer, setLayer] = useState("all");
  const [since, setSince] = useState(2016);
  const [view, setView] = useState("value");
  const [selection, setSelection] = useState(chartIncidentValues[0].label);
  const values = chartIncidentValues.filter((item) => (layer === "all" || item.layer === layer) && item.year >= since);
  const selected = values.find((item) => item.label === selection) ?? values[0];
  const total = values.reduce((sum, item) => sum + item.usdMillions, 0);
  const largest = values.reduce((largest, item) => Math.max(largest, item.usdMillions), 0);

  return (
    <section className="space-y-5" aria-label="Interactive incident data">
      <div className="panel space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow mb-3">Explore the sample</p><div className="flex flex-wrap gap-2" role="group" aria-label="Chart layer filter">{["all", "protocol", "application"].map((item) => <button key={item} className="filter-chip capitalize" aria-pressed={layer === item} onClick={() => setLayer(item)}>{item === "all" ? "All layers" : item}</button>)}</div></div><label className="grid gap-2 text-sm text-slate-400">From year<select className="field" value={since} onChange={(event) => setSince(Number(event.target.value))}>{[2016, 2018, 2021, 2022].map((year) => <option key={year}>{year}</option>)}</select></label></div>
        <div className="grid gap-3 sm:grid-cols-3" role="status"><div className="stat-card"><span>Incidents in view</span><strong>{values.length}<span className="text-base text-slate-500"> / 5</span></strong></div><div className="stat-card"><span>Approximate value in view</span><strong>${total.toLocaleString("en-US")}M</strong></div><div className="stat-card"><span>Largest value in view</span><strong>{values.length ? `$${largest}M` : "—"}</strong></div></div>
      </div>
      <article className="panel space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">Incident profile</p><h3 className="mt-1 text-xl font-semibold text-white">{view === "value" ? "Value by incident" : "The incident timeline"}</h3></div><div className="flex flex-wrap gap-2" role="group" aria-label="Chart view"><button className="filter-chip" aria-pressed={view === "value"} onClick={() => setView("value")}>By value</button><button className="filter-chip" aria-pressed={view === "timeline"} onClick={() => setView("timeline")}>Timeline</button></div></div>
        <p className="text-sm text-slate-400">Select a bar, point, or incident below to inspect its value. <span className="sm:hidden">Swipe sideways inside the chart to see everything.</span></p>
        {values.length > 0 ? <>
          <div className="visual-scroll rounded-xl border border-slate-700 bg-slate-950 p-2" role="region" aria-label="Incident chart" tabIndex={0}>{view === "value" ? <IncidentBarChart values={values} selectedLabel={selected?.label} onSelect={setSelection} /> : <IncidentTimelineChart values={values} selectedLabel={selected?.label} onSelect={setSelection} />}</div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Inspect an incident">{values.map((item) => <button key={item.label} className="filter-chip" aria-pressed={item.label === selected?.label} onClick={() => setSelection(item.label)}>{item.label}</button>)}</div>
          {selected && <div className="inspector-card" aria-live="polite"><p className="eyebrow">Selected incident</p><div className="mt-2 flex flex-wrap items-baseline justify-between gap-3"><h4 className="text-xl font-semibold text-white">{selected.label}</h4><strong className="text-2xl text-teal-200">~${selected.usdMillions}M</strong></div><p className="mt-2 text-sm capitalize text-slate-300">{selected.year} · {selected.layer} layer</p>{selected.note && <p className="mt-2 text-sm text-slate-400">{selected.note}</p>}</div>}
        </> : <div className="rounded-xl border border-dashed border-slate-600 px-5 py-10 text-center"><h4 className="font-semibold text-white">No incidents in this view</h4><p className="my-3 text-sm text-slate-400">Try an earlier year or a different layer.</p><button className="action-button" onClick={() => { setLayer("all"); setSince(2016); }}>Reset data filters</button></div>}
      </article>
    </section>
  );
}
