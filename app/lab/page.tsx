import { ConceptLabVisualizer } from "@/components/lab/ConceptLabVisualizer";

export default function LabPage() {
  return (
    <section className="space-y-5">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold text-white">Lab</h2>
        <p className="text-slate-300">
          State visualizer for re-entrancy and bridge scenarios in vulnerable and guarded modes.
        </p>
      </header>
      <ConceptLabVisualizer />
    </section>
  );
}
