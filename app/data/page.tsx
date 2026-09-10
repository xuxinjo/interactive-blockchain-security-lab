import { DataExplorer } from "@/components/ui/DataExplorer";
import { PageIntro } from "@/components/ui/PageIntro";
import { MotionSection } from "@/components/ui/MotionSection";

export default function DataPage() {
  return (
    <MotionSection className="space-y-6">
      <PageIntro number="06" label="The incident profile" title="Look closer at the numbers.">
        <p className="max-w-3xl text-slate-300">
          These SVG charts follow the thesis Figure 7 and Figure 8 style from Table 6. Values are approximate documented
          losses for the selected cases, not population statistics.
        </p>
      </PageIntro>
      <DataExplorer />

      <article className="panel space-y-3">
        <h3 className="text-xl font-semibold text-white">How to read this sample</h3>
        <p className="text-sm text-slate-300">
          Source: author&apos;s own elaboration from thesis Table 6. Parity 2017 is omitted because the funds were frozen
          rather than stolen. Bitcoin Gold includes the approximately USD 18 million 2018 episode; the 2020 double-spends
          are noted as minor in the thesis.
        </p>
      </article>

      <article className="panel space-y-3">
        <h3 className="text-xl font-semibold text-white">Context and sources</h3>
        <p className="text-sm text-slate-300">
          The sample contains one protocol-layer incident and five application-layer incidents. Application-layer cases
          appear in 2016, 2017, 2021, and 2022; Bitcoin Gold represents the protocol layer in 2018 and 2020. The bridge-loss
          context is consistent with the{" "}
          <a
            href="https://www.chainalysis.com/wp-content/uploads/2024/06/the-2024-crypto-crime-report-release.pdf"
            className="text-cyan-300 underline hover:text-cyan-200"
          >
            Chainalysis Crypto Crime Report 2024
          </a>
          . This purposive sample is not a statistical estimate of all blockchain incidents.
        </p>
      </article>
    </MotionSection>
  );
}
