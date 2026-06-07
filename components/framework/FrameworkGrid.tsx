import type { FrameworkCell } from "@/lib/types";

interface FrameworkGridProps {
  cells: FrameworkCell[];
  selectedCell: FrameworkCell;
  onSelect: (cell: FrameworkCell) => void;
}

const layers = ["protocol", "network", "application"] as const;
const pillars = ["confidentiality", "integrity", "availability"] as const;

export function FrameworkGrid({ cells, selectedCell, onSelect }: FrameworkGridProps) {
  return (
    <div className="grid gap-2" role="grid" aria-label="Layer and CIA framework grid">
      <div className="grid grid-cols-4 gap-2 text-center text-xs uppercase tracking-wide text-slate-400">
        <span aria-hidden="true" />
        {pillars.map((pillar) => (
          <span key={pillar}>{pillar}</span>
        ))}
      </div>
      {layers.map((layer) => (
        <div className="grid grid-cols-4 gap-2" key={layer} role="row">
          <div className="rounded-md border border-slate-700 bg-slate-900/80 p-3 text-sm font-medium capitalize text-white">
            {layer}
          </div>
          {pillars.map((pillar) => {
            const cell = cells.find((entry) => entry.layer === layer && entry.pillar === pillar);
            if (!cell) {
              return <div key={`${layer}-${pillar}`} className="rounded-md border border-slate-800" />;
            }
            const selected = selectedCell.id === cell.id;
            return (
              <button
                key={cell.id}
                type="button"
                className={`rounded-md border p-3 text-left text-sm transition duration-300 ${
                  selected
                    ? "border-cyan-300 bg-cyan-900/30 text-cyan-100 shadow-[0_0_18px_rgba(45,212,191,0.16)]"
                    : "border-slate-700 bg-slate-900/80 text-slate-200 hover:border-teal-300/70"
                }`}
                onClick={() => onSelect(cell)}
                aria-pressed={selected}
                aria-label={`Select ${layer} and ${pillar} analysis`}
              >
                {cell.description}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
