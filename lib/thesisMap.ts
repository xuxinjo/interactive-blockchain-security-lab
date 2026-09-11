import type { ThesisSectionMapping } from "@/lib/types";

export const thesisSectionMappings: ThesisSectionMapping[] = [
  {
    thesisSection: "Section 2.1 Foundations",
    route: "/ + /diagrams layered architecture",
    purpose: "Foundations and layered model",
    status: "implemented"
  },
  {
    thesisSection: "Section 2.2 Consensus attacks",
    route: "/diagrams",
    purpose: "Consensus attack diagrams",
    status: "implemented"
  },
  {
    thesisSection: "Section 2.3 Smart-contract vulnerabilities",
    route: "/diagrams + /lab",
    purpose: "Re-entrancy view",
    status: "implemented"
  },
  {
    thesisSection: "Section 2.4 Cross-chain bridges",
    route: "/diagrams + /lab",
    purpose: "Bridge view",
    status: "implemented"
  },
  {
    thesisSection: "Section 2.5 ML-assisted detection",
    route: "/insights",
    purpose: "Detection limits matrix",
    status: "implemented"
  },
  {
    thesisSection: "Chapter 3 Theoretical framework",
    route: "/framework",
    purpose: "Layer x CIA grid",
    status: "implemented"
  },
  {
    thesisSection: "Section 5.2 Case studies (six)",
    route: "/cases + six detail pages",
    purpose: "Case table and pages",
    status: "implemented"
  },
  {
    thesisSection: "Section 5.3 Quantitative profile",
    route: "/data",
    purpose: "Table 6 charts",
    status: "implemented"
  },
  {
    thesisSection: "Section 5.4 Feedback",
    route: "/feedback",
    purpose: "Local notes",
    status: "implemented"
  }
];
