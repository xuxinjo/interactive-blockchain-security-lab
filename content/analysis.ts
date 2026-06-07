import type { ChartIncidentValue } from "@/lib/types";

export const chartIncidentValues: ChartIncidentValue[] = [
  { label: "The DAO", year: 2016, layer: "application", usdMillions: 60 },
  { label: "Bitcoin Gold", year: 2018, layer: "protocol", usdMillions: 18, note: "2020 double-spends were minor." },
  { label: "Poly Network", year: 2021, layer: "application", usdMillions: 610 },
  { label: "Wormhole", year: 2022, layer: "application", usdMillions: 320, note: "120,000 wETH." },
  { label: "Ronin", year: 2022, layer: "application", usdMillions: 624 }
];

export const mlDetectionMatrix = [
  {
    caseTitle: "The DAO",
    ml: "Medium",
    static: "High",
    formal: "High",
    operational: "Medium",
    note: "Re-entrancy is a known application-layer code pattern, but assurance still depends on review and specification."
  },
  {
    caseTitle: "Parity",
    ml: "Medium",
    static: "High",
    formal: "High",
    operational: "Medium",
    note: "A public initialization function and missing role checks are well suited to static-analysis triage."
  },
  {
    caseTitle: "Bitcoin Gold",
    ml: "Low",
    static: "Low",
    formal: "Low",
    operational: "High",
    note: "Rented hash power and exchange-confirmation policy sit outside contract-code analysis."
  },
  {
    caseTitle: "Poly Network",
    ml: "Medium",
    static: "Medium",
    formal: "High",
    operational: "High",
    note: "Privileged cross-chain message paths need specification and key-management review."
  },
  {
    caseTitle: "Wormhole",
    ml: "Low",
    static: "Medium",
    formal: "High",
    operational: "Medium",
    note: "A semantic verification error benefits more from formal specification than classifier-style detection."
  },
  {
    caseTitle: "Ronin",
    ml: "Low",
    static: "Low",
    formal: "Low",
    operational: "High",
    note: "The proximate cause was operational key compromise and a small validator threshold."
  }
] as const;
