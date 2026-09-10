import { FrameworkExplorer } from "@/components/framework/FrameworkExplorer";
import { MotionSection } from "@/components/ui/MotionSection";
import { PageIntro } from "@/components/ui/PageIntro";

export default function FrameworkPage() {
  return (
    <MotionSection className="space-y-5">
      <PageIntro number="01" label="The security model" title="Find where trust lives.">
        <p className="text-slate-300">
          Select a matrix cell to view threats, trust assumptions, defences, and thesis references.
        </p>
        <p className="text-sm text-slate-400">
          Defence-in-depth means combining controls across layers so that one failed assumption does not expose the whole
          system.
        </p>
      </PageIntro>
      <FrameworkExplorer />
    </MotionSection>
  );
}
