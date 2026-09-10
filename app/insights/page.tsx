import { MotionSection } from "@/components/ui/MotionSection";
import { InsightsExplorer } from "@/components/ui/InsightsExplorer";
import { PageIntro } from "@/components/ui/PageIntro";

export default function InsightsPage() {
  return (
    <MotionSection className="space-y-6">
      <PageIntro number="05" label="Detection and defence" title="The right tool for the right failure.">
        <p className="max-w-3xl text-slate-300">
          Section 6.4 treats ML-assisted detection as a triage aid for application-layer code patterns, not as a
          replacement for audits, formal verification, or operational security review.
        </p>
      </PageIntro>
      <InsightsExplorer />

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

    </MotionSection>
  );
}
