import { FrameworkExplorer } from "@/components/framework/FrameworkExplorer";
import { MotionSection } from "@/components/ui/MotionSection";

export default function FrameworkPage() {
  return (
    <MotionSection className="space-y-5">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold text-white">Framework</h2>
        <p className="text-slate-300">
          Select a matrix cell to view threats, trust assumptions, defences, and thesis references.
        </p>
        <p className="text-sm text-slate-400">
          Defence-in-depth means combining controls across layers so that one failed assumption does not expose the whole
          system.
        </p>
      </header>
      <FrameworkExplorer />
    </MotionSection>
  );
}
