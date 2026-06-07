import { notFound } from "next/navigation";
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

  return (
    <section className="space-y-4">
      <CaseTemplateDetail incident={incident} />
    </section>
  );
}
