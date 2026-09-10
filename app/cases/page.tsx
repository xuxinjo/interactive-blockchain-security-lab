import { CaseLibrary } from "@/components/cases/CaseLibrary";
import { MotionSection } from "@/components/ui/MotionSection";
import { PageIntro } from "@/components/ui/PageIntro";

export default function CasesPage() {
  return (
    <MotionSection className="space-y-6">
      <PageIntro number="03" label="The incident library" title="Real incidents. Lasting lessons.">
        Search six documented cases, investigate the assumptions that failed, and select two incidents to compare their lessons.
      </PageIntro>
      <CaseLibrary />
    </MotionSection>
  );
}
