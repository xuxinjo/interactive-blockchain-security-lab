import type { FrameworkCell } from "@/lib/types";

export const frameworkCells: FrameworkCell[] = [
  {
    id: "protocol-confidentiality",
    layer: "protocol",
    pillar: "confidentiality",
    description: "Protocol transparency can reveal metadata unless privacy protections are explicitly designed.",
    threats: [
      { title: "Ledger metadata leakage", summary: "Observers can correlate timing and value patterns in public ledgers." },
      { title: "Mempool visibility", summary: "Pending transactions expose intent before confirmation." }
    ],
    trustAssumptions: [
      { statement: "Users understand pseudonymity is not full anonymity." },
      { statement: "Privacy tools are correctly configured by operators." }
    ],
    defences: [
      { title: "Metadata minimization", summary: "Limit unnecessary on-chain disclosure in application design." },
      { title: "Privacy-preserving relay patterns", summary: "Reduce direct linkage between origin and broadcast path." }
    ],
    references: [
      { label: "Thesis framework chapter", section: "Section 3.1" },
      { label: "CIA analysis notes", section: "Section 3.3" }
    ]
  },
  {
    id: "protocol-integrity",
    layer: "protocol",
    pillar: "integrity",
    description: "Consensus assumptions protect canonical history but remain sensitive to incentive pressure.",
    threats: [
      { title: "Selfish-mining pressure", summary: "Withholding strategies can bias block publication dynamics." },
      { title: "Long-range finality narratives", summary: "Historical chain reinterpretation challenges client trust anchors." }
    ],
    trustAssumptions: [
      { statement: "A sufficient majority follows protocol incentives." },
      { statement: "Clients enforce checkpoint and finality policy." }
    ],
    defences: [
      { title: "Checkpoint governance", summary: "Use transparent weak-subjectivity checkpoints in PoS contexts." },
      { title: "Fork-choice monitoring", summary: "Track unusual reorganisation behaviour across independent nodes." }
    ],
    references: [
      { label: "Consensus trust model", section: "Section 2.4" },
      { label: "Incident synthesis", section: "Section 5.2" }
    ]
  },
  {
    id: "protocol-availability",
    layer: "protocol",
    pillar: "availability",
    description: "Availability depends on resilient participation, timely propagation, and manageable throughput.",
    threats: [
      { title: "Congestion spikes", summary: "High demand can delay inclusion and confirmation." },
      { title: "Validator concentration", summary: "Centralized participation may create service bottlenecks." }
    ],
    trustAssumptions: [
      { statement: "Validator set remains sufficiently distributed." },
      { statement: "Protocol parameters balance throughput and safety." }
    ],
    defences: [
      { title: "Capacity planning", summary: "Tune protocol and client defaults to expected demand." },
      { title: "Diversity incentives", summary: "Encourage heterogeneous node operation." }
    ],
    references: [
      { label: "Availability discussion", section: "Section 3.4" }
    ]
  },
  {
    id: "network-confidentiality",
    layer: "network",
    pillar: "confidentiality",
    description: "Peer-to-peer communication can leak origin and topology information.",
    threats: [
      { title: "Traffic correlation", summary: "Observers infer transaction origin from propagation patterns." },
      { title: "Endpoint profiling", summary: "Repeated peer behaviour reveals infrastructure roles." }
    ],
    trustAssumptions: [
      { statement: "Peers use hardened transport and rotation strategies." },
      { statement: "No single observer controls a dominant network vantage." }
    ],
    defences: [
      { title: "Peer diversity", summary: "Distribute peer set and avoid static topologies." },
      { title: "Transport hardening", summary: "Use encrypted channels and metadata-aware relay strategies." }
    ],
    references: [
      { label: "Network layer trust", section: "Section 3.2" }
    ]
  },
  {
    id: "network-integrity",
    layer: "network",
    pillar: "integrity",
    description: "Integrity at the network layer concerns message authenticity, ordering assumptions, and relay behaviour.",
    threats: [
      { title: "Eclipse-like isolation", summary: "A node can receive a distorted view when peers are manipulated." },
      { title: "Ordering pressure", summary: "Transaction ordering incentives can skew fairness assumptions." }
    ],
    trustAssumptions: [
      { statement: "Peer selection mechanisms resist concentration." },
      { statement: "Validation catches malformed relay data quickly." }
    ],
    defences: [
      { title: "Peer reputation policies", summary: "Continuously evaluate peer quality and diversity." },
      { title: "Independent observers", summary: "Compare mempool and block ordering across viewpoints." }
    ],
    references: [
      { label: "MEV and ordering", section: "Section 4.4" }
    ]
  },
  {
    id: "network-availability",
    layer: "network",
    pillar: "availability",
    description: "Availability relies on robust relays, healthy connectivity, and fault-tolerant routing.",
    threats: [
      { title: "Relay outage cascades", summary: "Bridge and validator relayer failures can halt cross-domain operations." },
      { title: "Routing disruption", summary: "Targeted network pressure degrades propagation speed." }
    ],
    trustAssumptions: [
      { statement: "Multiple independent relay paths remain online." },
      { statement: "Recovery playbooks are rehearsed and transparent." }
    ],
    defences: [
      { title: "Redundant relays", summary: "Operate fallback paths for key message flows." },
      { title: "Outage communication", summary: "Provide clear status updates and safe degradation behaviour." }
    ],
    references: [
      { label: "Bridge operations", section: "Section 5.1" }
    ]
  },
  {
    id: "application-confidentiality",
    layer: "application",
    pillar: "confidentiality",
    description: "Application interfaces can expose user behaviour beyond protocol-level data.",
    threats: [
      { title: "Telemetry over-collection", summary: "Aggressive analytics can deanonymize user workflows." },
      { title: "UI metadata leakage", summary: "Client logs and traces may disclose operational context." }
    ],
    trustAssumptions: [
      { statement: "DApp teams apply data minimization." },
      { statement: "Users are informed about data practices." }
    ],
    defences: [
      { title: "Privacy-by-design UI", summary: "Collect only essential interaction data." },
      { title: "Clear consent controls", summary: "Expose tracking choices in plain language." }
    ],
    references: [
      { label: "Application-layer controls", section: "Section 3.5" }
    ]
  },
  {
    id: "application-integrity",
    layer: "application",
    pillar: "integrity",
    description: "Smart-contract and application logic integrity depends on safe state transitions and governance.",
    threats: [
      { title: "Re-entrancy design mistakes", summary: "Incorrect interaction ordering can violate state invariants." },
      { title: "Privilege misconfiguration", summary: "Overpowered roles can bypass intended safety checks." }
    ],
    trustAssumptions: [
      { statement: "Critical paths are reviewed and tested against known failure patterns." },
      { statement: "Upgrade controls are transparent and constrained." }
    ],
    defences: [
      { title: "Checks-effects-interactions", summary: "Commit internal state before external calls." },
      { title: "Role separation", summary: "Split operational authority across independent actors." }
    ],
    references: [
      { label: "Case study synthesis", section: "Section 6.1" }
    ]
  },
  {
    id: "application-availability",
    layer: "application",
    pillar: "availability",
    description: "Availability at the application layer depends on resilient service and safe emergency controls.",
    threats: [
      { title: "Single-operator dependency", summary: "Critical services may fail if a small operator set is disrupted." },
      { title: "Emergency halts", summary: "Safety pauses can reduce continuity when incident response is triggered." }
    ],
    trustAssumptions: [
      { statement: "Teams balance fail-safe controls with user continuity plans." },
      { statement: "Users receive timely and accurate incident communication." }
    ],
    defences: [
      { title: "Runbook-driven response", summary: "Predefined incident workflows reduce confusion under pressure." },
      { title: "Progressive recovery", summary: "Restore services in verifiable stages after containment." }
    ],
    references: [
      { label: "Operational response chapter", section: "Section 6.3" }
    ]
  }
];
