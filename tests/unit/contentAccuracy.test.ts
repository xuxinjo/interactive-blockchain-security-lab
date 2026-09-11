import { describe, expect, it } from "vitest";
import { chartIncidentValues, mlDetectionMatrix } from "@/content/analysis";
import { incidentCases } from "@/content/cases/incidents";
import { researchQuestions, thesisMetadata } from "@/content/thesis";

describe("content data", () => {
  it("has the six case pages", () => {
    expect(incidentCases.map((incident) => incident.slug)).toEqual([
      "the-dao-2016",
      "parity-multisig-2017",
      "bitcoin-gold-2018-2020",
      "poly-network-2021",
      "wormhole-bridge-2022",
      "ronin-bridge-2022"
    ]);
  });

  it("keeps the key case facts", () => {
    expect(incidentCases.find((incident) => incident.slug === "parity-multisig-2017")?.documentedLoss?.label).toMatch(
      /frozen/i
    );
    expect(incidentCases.find((incident) => incident.slug === "wormhole-bridge-2022")?.documentedLoss?.label).toContain(
      "120,000 wETH"
    );
    expect(incidentCases.find((incident) => incident.slug === "ronin-bridge-2022")?.factualReconstruction).toContain(
      "five of the nine"
    );
    expect(incidentCases.find((incident) => incident.slug === "bitcoin-gold-2018-2020")?.year).toBe("2018 and 2020");
  });

  it("uses the final thesis case sources", () => {
    const sourceUrls = incidentCases.flatMap((incident) => incident.references.map((reference) => reference.url));

    expect(sourceUrls).toContain("https://www.sec.gov/files/litigation/investreport/34-81207.pdf");
    expect(sourceUrls).toContain("https://www.bitcoingold.org/responding-to-attacks/");
    expect(sourceUrls).toContain(
      "https://wormholecrypto.medium.com/wormhole-incident-report-02-02-22-ad9b8f21eec6"
    );
    expect(sourceUrls).toContain(
      "https://github.com/tayvano/lazarus-bluenoroff-research/blob/main/hacks-and-thefts/ronin_bridge.md"
    );
  });

  it("uses the Table 6 chart values", () => {
    expect(chartIncidentValues.map((value) => [value.label, value.usdMillions])).toEqual([
      ["The DAO", 60],
      ["Bitcoin Gold", 18],
      ["Poly Network", 610],
      ["Wormhole", 320],
      ["Ronin", 624]
    ]);
  });

  it("has the research questions and insight rows", () => {
    expect(researchQuestions).toHaveLength(4);
    expect(mlDetectionMatrix).toHaveLength(6);
    expect(thesisMetadata.status).toMatch(/completed educational artefact/i);
  });
});
