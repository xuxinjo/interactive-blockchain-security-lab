import { HeroNetwork } from "@/components/home/HeroNetwork";
import { ModuleTiles } from "@/components/home/ModuleTiles";
import { MotionSection } from "@/components/ui/MotionSection";
import { findingOne, researchQuestions } from "@/content/thesis";

export default function HomePage() {
  return (
    <MotionSection className="space-y-8">
      <HeroNetwork />

      <section className="panel space-y-3" aria-label="Thesis plain-language summary">
        <h2 className="text-2xl font-semibold text-white">What this lab is</h2>
        <p className="text-slate-200">
          Blockchain security is a layered trust problem. Trust is relocated from central operators into protocol rules,
          distributed network behaviour, and application code.
        </p>
        <p className="text-slate-300">
          This concept-stage prototype shows how those layers interact, why assumptions fail in documented incidents,
          and how known defences fit the thesis framework.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="panel space-y-3">
          <h2 className="text-2xl font-semibold text-white">Layered Framework</h2>
          <p className="text-slate-300">
            The thesis framework reads protocol, network, and application layers against the CIA pillars. The six-case
            sample contains one protocol-layer incident and five application-layer incidents.
          </p>
          <div className="grid gap-2 text-sm sm:grid-cols-3">
            {["Protocol", "Network", "Application"].map((layer) => (
              <div key={layer} className="rounded-lg border border-slate-700 bg-slate-950/60 p-3">
                <p className="font-semibold text-cyan-200">{layer}</p>
                <p className="mt-1 text-slate-400">Trust assumptions + defences</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel space-y-3">
          <h2 className="text-2xl font-semibold text-white">Research Questions</h2>
          <ol className="grid gap-2 text-sm text-slate-200">
            {researchQuestions.map((question) => (
              <li key={question.id} className="rounded-lg border border-slate-800 bg-slate-950/45 p-3">
                <span className="font-semibold text-cyan-200">{question.id}:</span> {question.text}
              </li>
            ))}
          </ol>
        </article>
      </section>

      <aside className="glow-card p-5" aria-label="Finding 1 under-application gap">
        <h2 className="text-2xl font-semibold text-white">Finding 1 - Under-Application Gap</h2>
        <p className="mt-2 text-slate-200">{findingOne}</p>
      </aside>

      <ModuleTiles />
    </MotionSection>
  );
}
