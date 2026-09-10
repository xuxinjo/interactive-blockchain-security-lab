import { ConceptLabVisualizer } from "@/components/lab/ConceptLabVisualizer";
import { PageIntro } from "@/components/ui/PageIntro";

export default function LabPage() {
  return (
    <section className="space-y-5">
      <PageIntro number="04" label="Hands-on learning" title="One scenario. Two very different outcomes.">
        Step through re-entrancy and bridge scenarios. Watch the state change, then compare what happens when safeguards are in place.
      </PageIntro>
      <ConceptLabVisualizer />
    </section>
  );
}
