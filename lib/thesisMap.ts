import type { ThesisSectionMapping } from "@/lib/types";

export const thesisSectionMappings: ThesisSectionMapping[] = [
  {
    thesisSection: "Section 2.1 Foundations",
    route: "/ + /diagrams layered architecture",
    purpose: "Foundations and layered model",
    status: "prototype"
  },
  {
    thesisSection: "Section 2.2 Consensus attacks",
    route: "/diagrams",
    purpose: "Consensus attack diagrams",
    status: "prototype"
  },
  {
    thesisSection: "Section 2.3 Smart-contract vulnerabilities",
    route: "/diagrams + /lab",
    purpose: "Re-entrancy view",
    status: "prototype"
  },
  {
    thesisSection: "Section 2.4 Cross-chain bridges",
    route: "/diagrams + /lab",
    purpose: "Bridge view",
    status: "prototype"
  },
  {
    thesisSection: "Section 2.5 ML-assisted detection",
    route: "/insights",
    purpose: "Detection limits matrix",
    status: "prototype"
  },
  {
    thesisSection: "Chapter 3 Theoretical framework",
    route: "/framework",
    purpose: "Layer x CIA grid",
    status: "prototype"
  },
  {
    thesisSection: "Section 5.2 Case studies (six)",
    route: "/cases + six detail pages",
    purpose: "Case table and pages",
    status: "prototype"
  },
  {
    thesisSection: "Section 5.3 Quantitative profile",
    route: "/data",
    purpose: "Table 6 charts",
    status: "prototype"
  },
  {
    thesisSection: "Section 5.4 Feedback",
    route: "/feedback",
    purpose: "Local notes",
    status: "planned"
  }
];
