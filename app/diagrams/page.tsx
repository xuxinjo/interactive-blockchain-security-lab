import { DiagramExplorer } from "@/components/diagram/DiagramExplorer";
import { MotionSection } from "@/components/ui/MotionSection";
import { PageIntro } from "@/components/ui/PageIntro";

export default function DiagramsPage() {
  return (
    <MotionSection className="space-y-6">
      <PageIntro number="02" label="Visual field guide" title="See the sequence. Understand the risk.">
        Choose a concept, play the sequence, and explore how each layer responds. Six guided diagrams, at your own pace.
      </PageIntro>
      <DiagramExplorer />
    </MotionSection>
  );
}
