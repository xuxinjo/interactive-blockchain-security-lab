import Link from "next/link";
import type { CaseStudy } from "@/lib/types";

interface CaseTemplateCardProps {
  incident: CaseStudy;
}

function iconLabel(icon: CaseStudy["icon"]): string {
  switch (icon) {
    case "dao":
      return "DAO";
    case "parity":
      return "PAR";
    case "btg":
      return "BTG";
    case "poly":
      return "POLY";
    case "wormhole":
      return "WH";
    case "ronin":
      return "RON";
    default:
      return "CS";
  }
}

export function CaseTemplateCard({ incident }: CaseTemplateCardProps) {
  return (
    <article className="panel transition-transform hover:-translate-y-0.5 hover:border-cyan-300/70">
      <header className="flex items-start gap-3">
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal-300/60 bg-teal-950/35 text-xs font-semibold text-teal-100"
          aria-hidden="true"
        >
          {iconLabel(incident.icon)}
        </span>
        <div>
          <h3 className="text-lg font-semibold text-white">
            <Link href={`/cases/${incident.slug}`} className="hover:text-cyan-200">
              {incident.title}
            </Link>
          </h3>
          <p className="text-sm text-slate-400">{incident.year}</p>
        </div>
      </header>

      <p className="mt-3 text-sm text-slate-300">{incident.summary}</p>

      <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium text-cyan-200">Layers involved</dt>
          <dd className="capitalize text-slate-200">{incident.layersInvolved.join(", ")}</dd>
        </div>
        <div>
          <dt className="font-medium text-cyan-200">Pillars affected</dt>
          <dd className="capitalize text-slate-200">{incident.pillarsAffected.join(", ")}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-medium text-cyan-200">Documented loss/value</dt>
          <dd className="text-slate-200">{incident.documentedLoss?.label ?? "Not quantified"}</dd>
        </div>
      </dl>
    </article>
  );
}

interface CaseTemplateDetailProps {
  incident: CaseStudy;
}

export function CaseTemplateDetail({ incident }: CaseTemplateDetailProps) {
  return (
    <article className="panel space-y-5" aria-label={`${incident.title} five-element incident template`}>
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-teal-300/60 bg-teal-950/35 text-xs font-semibold text-teal-100"
          aria-hidden="true"
        >
          {iconLabel(incident.icon)}
        </span>
        <h2 className="text-2xl font-semibold text-white">{incident.title}</h2>
      </div>

      <p className="rounded-lg border border-slate-800 bg-slate-950/45 p-3 text-sm text-slate-200">
        <span className="font-semibold text-cyan-200">Documented loss/value:</span>{" "}
        {incident.documentedLoss?.label ?? "Not quantified"}
      </p>

      <ol className="list-decimal space-y-4 pl-5 text-slate-200">
        <li>
          <span className="font-semibold text-cyan-200">Factual reconstruction:</span> {incident.factualReconstruction}
        </li>
        <li>
          <span className="font-semibold text-cyan-200">Layers involved:</span>{" "}
          <span className="capitalize">{incident.layersInvolved.join(", ")}</span>
        </li>
        <li>
          <span className="font-semibold text-cyan-200">Pillar(s) affected:</span>{" "}
          <span className="capitalize">{incident.pillarsAffected.join(", ")}</span>
        </li>
        <li>
          <span className="font-semibold text-cyan-200">Trust assumption violated:</span> {incident.trustAssumptionViolated}
        </li>
        <li>
          <span className="font-semibold text-cyan-200">Public response and lessons:</span> {incident.publicResponseAndLessons}
        </li>
      </ol>

      <div>
        <h3 className="mb-2 font-medium text-white">Public references</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
          {incident.references.map((reference) => (
            <li key={reference.url}>
              <a href={reference.url} target="_blank" rel="noreferrer" className="text-cyan-300 hover:text-cyan-200">
                {reference.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
