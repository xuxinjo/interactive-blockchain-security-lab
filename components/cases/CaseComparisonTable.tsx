"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CaseStudy, SecurityLayer } from "@/lib/types";

type SortKey = "year" | "layer" | "loss";
type LayerFilter = "all" | SecurityLayer;

interface CaseComparisonTableProps {
  incidents: CaseStudy[];
}

function firstYear(year: string): number {
  const match = year.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

export function CaseComparisonTable({ incidents }: CaseComparisonTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("year");
  const [layerFilter, setLayerFilter] = useState<LayerFilter>("all");

  const rows = useMemo(() => {
    return incidents
      .filter((incident) => layerFilter === "all" || incident.primaryLayer === layerFilter)
      .sort((a, b) => {
        if (sortKey === "loss") {
          return (b.documentedLoss?.usdMillions ?? -1) - (a.documentedLoss?.usdMillions ?? -1);
        }
        if (sortKey === "layer") {
          return a.primaryLayer.localeCompare(b.primaryLayer) || firstYear(a.year) - firstYear(b.year);
        }
        return firstYear(a.year) - firstYear(b.year);
      });
  }, [incidents, layerFilter, sortKey]);

  return (
    <section className="panel space-y-4" aria-label="Sortable and filterable case comparison table">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Comparison Table</h3>
          <p className="text-sm text-slate-300">Purposive sample from thesis Section 5.2 and Table 6.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="text-sm text-slate-200">
            Layer
            <select
              value={layerFilter}
              onChange={(event) => setLayerFilter(event.target.value as LayerFilter)}
              className="ml-2 rounded-md border border-slate-700 bg-slate-950 px-2 py-1.5 text-slate-100"
            >
              <option value="all">All</option>
              <option value="protocol">Protocol</option>
              <option value="network">Network</option>
              <option value="application">Application</option>
            </select>
          </label>
          <label className="text-sm text-slate-200">
            Sort
            <select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
              className="ml-2 rounded-md border border-slate-700 bg-slate-950 px-2 py-1.5 text-slate-100"
            >
              <option value="year">Year</option>
              <option value="layer">Layer</option>
              <option value="loss">Loss/value</option>
            </select>
          </label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="academic-table">
          <thead>
            <tr>
              <th>Incident</th>
              <th>Year</th>
              <th>Layer</th>
              <th>Documented loss/value</th>
              <th>Trust assumption</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((incident) => (
              <tr key={incident.slug}>
                <td>
                  <Link href={`/cases/${incident.slug}`} className="font-medium text-cyan-300 underline hover:text-cyan-200">
                    {incident.title}
                  </Link>
                </td>
                <td>{incident.year}</td>
                <td className="capitalize">{incident.primaryLayer}</td>
                <td>{incident.documentedLoss?.label ?? "Not quantified"}</td>
                <td>{incident.trustAssumptionViolated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
