import type { DiagramMetadata } from "@/lib/types";

export const diagramModels: DiagramMetadata[] = [
  {
    id: "layered-architecture",
    title: "Layered Blockchain Architecture",
    description: "How protocol, network, and application layers co-create system trust.",
    longDescription:
      "This diagram abstracts the three-layer security model and shows how assumptions pass from protocol rules through network behaviour into application logic.",
    layers: ["protocol", "network", "application"],
    steps: [
      { title: "Baseline", description: "All three layers coordinate under normal assumptions." },
      { title: "Stress", description: "One layer experiences adversarial pressure or design weakness." },
      { title: "Containment", description: "Defence-in-depth controls reduce cross-layer impact." }
    ]
  },
  {
    id: "selfish-mining",
    title: "Selfish-Mining Flow",
    description: "Conceptual publication race and incentive imbalance.",
    longDescription:
      "The model visualizes an abstract private-branch strategy and its effect on honest participants without presenting operational tactics.",
    layers: ["protocol", "network"],
    steps: [
      { title: "Private branch", description: "A branch is withheld from public propagation in the model." },
      { title: "Release race", description: "Competing publication timing influences visible chain growth." },
      { title: "Protocol response", description: "Incentive and monitoring mechanisms discourage persistent advantage." }
    ]
  },
  {
    id: "long-range-pos",
    title: "Long-Range PoS Model",
    description: "Timeline for checkpoint trust in proof-of-stake ecosystems.",
    longDescription:
      "This visualization explains why client checkpoint policies matter when evaluating distant historical alternatives.",
    layers: ["protocol"],
    steps: [
      { title: "Trusted checkpoint", description: "Client starts from a recent trusted checkpoint." },
      { title: "Alternative history", description: "A competing historical narrative appears in the model." },
      { title: "Policy gate", description: "Weak-subjectivity policy preserves safety assumptions." }
    ]
  },
  {
    id: "mev-extraction",
    title: "MEV Extraction Process",
    description: "High-level transaction-ordering pressure in open mempools.",
    longDescription:
      "The flow highlights incentive competition around ordering visibility.",
    layers: ["network", "application"],
    steps: [
      { title: "Observation", description: "Public pending actions are observed by market participants." },
      { title: "Competition", description: "Ordering competition emerges around inclusion priority." },
      { title: "Mitigation research", description: "Fair-ordering and batching proposals aim to reduce extractive pressure." }
    ]
  },
  {
    id: "reentrancy-sequence",
    title: "Re-Entrancy Call Sequence",
    description: "State-ordering comparison between vulnerable and guarded patterns.",
    longDescription:
      "This sequence compares vulnerable ordering against checks-effects-interactions behaviour.",
    layers: ["application"],
    steps: [
      { title: "Initial call", description: "Execution enters with precondition checks." },
      { title: "External transfer", description: "Control transfer may permit nested callbacks in vulnerable designs." },
      { title: "Guarded sequence", description: "State-first updates block repeated entry." }
    ]
  },
  {
    id: "cross-chain-bridge",
    title: "Cross-Chain Bridge Architecture",
    description: "Abstract source-lock, attestation, and destination-release lifecycle.",
    longDescription:
      "The architecture highlights trust boundaries between chain domains, validator attestations, and operational recovery controls.",
    layers: ["network", "application"],
    steps: [
      { title: "Source lock", description: "A source-chain event creates an abstract transfer intent." },
      { title: "Attestation gate", description: "Validator/guardian assumptions determine message validity." },
      { title: "Destination release", description: "Controlled release occurs if checks pass and operations remain healthy." }
    ]
  }
];
