import { DiagramFrame } from "@/components/diagram/DiagramFrame";
import { MotionSection } from "@/components/ui/MotionSection";
import { diagramModels } from "@/content/diagrams";

export default function DiagramsPage() {
  return (
    <MotionSection className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold text-white">Animated Conceptual Diagrams</h2>
        <p className="text-slate-300">
          Each diagram provides Play scenario, Next step, and Reset controls with abstract visuals only.
        </p>
      </header>
      <div className="grid gap-5">
        {diagramModels.map((model) => (
          <DiagramFrame key={model.id} model={model} />
        ))}
      </div>
    </MotionSection>
  );
}
