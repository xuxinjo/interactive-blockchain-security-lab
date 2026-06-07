import { CaseComparisonTable } from "@/components/cases/CaseComparisonTable";
import { CaseTemplateCard } from "@/components/cases/CaseTemplate";
import { MotionSection } from "@/components/ui/MotionSection";
import { incidentCases } from "@/content/cases/incidents";

export default function CasesPage() {
  return (
    <MotionSection className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold text-white">Cases</h2>
        <p className="text-slate-300">
          The six incidents are shown with the same five-part structure used in the thesis.
        </p>
      </header>
      <CaseComparisonTable incidents={incidentCases} />
      <div className="grid gap-4 lg:grid-cols-2">
        {incidentCases.map((incident) => (
          <CaseTemplateCard key={incident.slug} incident={incident} />
        ))}
      </div>
    </MotionSection>
  );
}
