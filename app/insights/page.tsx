import { MotionSection } from "@/components/ui/MotionSection";
import { mlDetectionMatrix } from "@/content/analysis";

export default function InsightsPage() {
  return (
    <MotionSection className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold text-white">ML-Assisted Detection - Limits Across the Six Cases</h2>
        <p className="max-w-3xl text-slate-300">
          Section 6.4 treats ML-assisted detection as a triage aid for application-layer code patterns, not as a
          replacement for audits, formal verification, or operational security review.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="panel space-y-3">
          <h3 className="text-xl font-semibold text-white">Where ML Helps</h3>
          <p className="text-slate-300">
            ML-assisted and static-analysis workflows are most useful when the failure has recognizable code features:
            missing access control, public initialization paths, or known smart-contract vulnerability families. Parity-style
            access-control review is the clearest fit in the thesis discussion.
          </p>
        </article>
        <article className="panel space-y-3">
          <h3 className="text-xl font-semibold text-white">Where It Does Not</h3>
          <p className="text-slate-300">
            Wormhole&apos;s semantic verification error needs formal specification more than classifier confidence. Ronin&apos;s
            validator-key compromise is operational, and Bitcoin Gold&apos;s rented-hash-power reorganizations sit outside
            contract analysis entirely.
          </p>
        </article>
      </section>

      <section className="panel space-y-4" aria-label="ML-assisted detection matrix">
        <div>
          <h3 className="text-xl font-semibold text-white">Case Matrix</h3>
          <p className="text-sm text-slate-300">High, Medium, and Low mark rough fit for classroom comparison.</p>
        </div>
        <p className="text-xs text-slate-400 sm:hidden">Swipe sideways inside the table to compare all columns.</p>
        <div className="visual-scroll" role="region" aria-label="Detection matrix columns" tabIndex={0}>
          <table className="academic-table">
            <thead>
              <tr>
                <th>Case</th>
                <th>ML</th>
                <th>Static</th>
                <th>Formal</th>
                <th>Operational controls</th>
                <th>Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {mlDetectionMatrix.map((row) => (
                <tr key={row.caseTitle}>
                  <td className="font-medium text-cyan-200">{row.caseTitle}</td>
                  <td>{row.ml}</td>
                  <td>{row.static}</td>
                  <td>{row.formal}</td>
                  <td>{row.operational}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MotionSection>
  );
}
