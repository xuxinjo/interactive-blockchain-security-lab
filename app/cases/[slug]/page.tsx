import { notFound } from "next/navigation";
import Link from "next/link";
import { CaseTemplateDetail } from "@/components/cases/CaseTemplate";
import { incidentCases } from "@/content/cases/incidents";

export function generateStaticParams(): Array<{ slug: string }> {
  return incidentCases.map((incident) => ({ slug: incident.slug }));
}

export default function CaseDetailPage({ params }: { params: { slug: string } }) {
  const incident = incidentCases.find((entry) => entry.slug === params.slug);
  if (!incident) {
    notFound();
  }
  const index = incidentCases.indexOf(incident);
  const next = incidentCases[(index + 1) % incidentCases.length];

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3"><Link href="/cases" className="action-button">← All case studies</Link><span className="eyebrow">Case {index + 1} / {incidentCases.length}</span></div>
      <CaseTemplateDetail incident={incident} />
      <Link href={`/cases/${next.slug}`} className="journey-link"><div><p className="text-xs text-slate-400">Next incident</p><h3 className="mt-1 font-semibold text-white">{next.title}</h3></div><span aria-hidden="true" className="text-teal-300">→</span></Link>
    </section>
  );
}
