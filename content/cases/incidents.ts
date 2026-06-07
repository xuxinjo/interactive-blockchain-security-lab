import type { CaseStudy } from "@/lib/types";

export const incidentCases: CaseStudy[] = [
  {
    slug: "the-dao-2016",
    title: "The DAO (2016)",
    year: "2016",
    icon: "dao",
    summary: "Re-entrancy in splitDAO caused a state inconsistency and moved about 3.6 million ETH.",
    documentedLoss: {
      label: "~3.6M ETH (~USD 60 million); later reversed by hard fork",
      usdMillions: 60
    },
    primaryLayer: "application",
    factualReconstruction:
      "In June 2016, The DAO's splitDAO function sent ether to the caller before updating the contract's internal balance. A recursive call therefore allowed the same recorded balance to be withdrawn repeatedly, moving approximately 3.6 million ETH, worth about USD 60 million at the time, into an attacker-controlled child contract.",
    layersInvolved: ["application"],
    pillarsAffected: ["integrity"],
    trustAssumptionViolated:
      "The violated assumption was that contract state is updated before external calls, the assumption captured by the checks-effects-interactions pattern.",
    publicResponseAndLessons:
      "The Ethereum community debated and then executed a hard fork to return the funds; the minority that rejected the fork continued as Ethereum Classic. The lesson is that state-transition order is a core integrity property, not a minor coding detail.",
    references: [
      {
        label: "U.S. SEC report on The DAO",
        url: "https://www.sec.gov/files/litigation/investreport/34-81207.pdf"
      }
    ]
  },
  {
    slug: "parity-multisig-2017",
    title: "Parity multi-signature wallet (2017)",
    year: "2017",
    icon: "parity",
    summary: "A public initialisation function on a shared library was invoked, then self-destructed, freezing dependent wallets.",
    documentedLoss: {
      label: "Funds permanently frozen (no direct theft)",
      note: "Omitted from value charts because the thesis treats this as frozen funds, not stolen value."
    },
    primaryLayer: "application",
    factualReconstruction:
      "In November 2017, a user invoked the public initialisation function of a shared library contract used by Parity multi-signature wallets and then triggered self-destruct. Removing the library left every dependent wallet permanently inoperable and froze the funds held in them.",
    layersInvolved: ["application"],
    pillarsAffected: ["integrity", "availability"],
    trustAssumptionViolated:
      "The violated assumption was that privileged functions are protected by role-based access control; in this case, a privileged initialisation path was reachable publicly.",
    publicResponseAndLessons:
      "The immediate result was frozen withdrawals and a disputed proposal for protocol-level recovery. The case is a Parity wallet failure, not a hack, and it illustrates how missing access control can destroy state integrity even without theft.",
    references: [{ label: "Parity postmortem cited in thesis netography", url: "https://medium.com/paritytech/a-postmortem-on-the-parity-multi-sig-library-self-destruct-63daca3a4cf7" }]
  },
  {
    slug: "bitcoin-gold-2018-2020",
    title: "Bitcoin Gold (2018 and 2020)",
    year: "2018 and 2020",
    icon: "btg",
    summary: "Two rented-hash-power reorganization episodes challenged exchange settlement assumptions.",
    documentedLoss: {
      label: "~USD 18 million in 2018; minor double-spends in 2020",
      usdMillions: 18,
      note: "The 2020 episode is noted separately as smaller double-spends."
    },
    primaryLayer: "protocol",
    factualReconstruction:
      "In May 2018 and again in January 2020, attackers rented sufficient Equihash-compatible hashing power to reorganise the Bitcoin Gold chain and double-spend deposits at exchanges. The larger 2018 episode produced documented losses of about USD 18 million; the 2020 episode involved much smaller double-spends.",
    layersInvolved: ["protocol"],
    pillarsAffected: ["integrity"],
    trustAssumptionViolated:
      "The violated assumption was that an attacker cannot acquire decisive computational control on a per-chain basis. On a smaller proof-of-work chain with rentable mining power, that assumption did not hold.",
    publicResponseAndLessons:
      "Responses included stricter exchange confirmation policies and a protocol-side change of the underlying algorithm. The case shows that proof-of-work integrity depends on economic conditions around available hash power, not only on protocol design.",
    references: [
      {
        label: "Bitcoin Gold response to the attacks",
        url: "https://www.bitcoingold.org/responding-to-attacks/"
      }
    ]
  },
  {
    slug: "poly-network-2021",
    title: "Poly Network (2021)",
    year: "2021",
    icon: "poly",
    summary: "A cross-chain message path let an attacker replace keeper keys and authorise withdrawals of about USD 610 million.",
    documentedLoss: {
      label: "~USD 610 million, subsequently returned",
      usdMillions: 610
    },
    primaryLayer: "application",
    factualReconstruction:
      "In August 2021, Poly Network's cross-chain management contract accepted a message that passed the privileged owner check. The attacker used that path to replace the public keys used to authenticate cross-chain instructions with keys they controlled, then authorised withdrawals totalling approximately USD 610 million across Ethereum, BNB Smart Chain, and Polygon.",
    layersInvolved: ["application"],
    pillarsAffected: ["integrity"],
    trustAssumptionViolated:
      "The violated assumption was that only the legitimate keeper set can change the validator keys that authorise cross-chain withdrawals.",
    publicResponseAndLessons:
      "The attacker returned essentially all assets within about two weeks. The incident remains a clear bridge-security lesson: cross-chain systems reduce to the correctness of privileged contract logic and key-management paths.",
    references: [{ label: "Poly Network postmortem cited in thesis netography", url: "https://medium.com/poly-network/honour-exploit-and-code-how-we-lost-610m-dollar-and-got-it-back-c4a7d0606267" }]
  },
  {
    slug: "wormhole-bridge-2022",
    title: "Wormhole (2022)",
    year: "2022",
    icon: "wormhole",
    summary: "A deprecated verification routine bypassed guardian checks, minting about 120,000 unbacked wETH on Solana.",
    documentedLoss: {
      label: "~120,000 wETH (~USD 320 million)",
      usdMillions: 320
    },
    primaryLayer: "application",
    factualReconstruction:
      "In February 2022, a deprecated routine in Wormhole's signature-verification path failed to confirm the authenticity of the account it read. That flaw bypassed the guardian signature check and allowed approximately 120,000 wrapped ether to be minted on Solana without a corresponding Ethereum lock.",
    layersInvolved: ["application"],
    pillarsAffected: ["integrity"],
    trustAssumptionViolated:
      "The violated assumption was that the cross-chain verification logic was correctly implemented across every validation path.",
    publicResponseAndLessons:
      "The public response combined an out-of-band capital injection that restored user balances with re-engineering of the verification code and an external audit. The lesson is that semantic verification paths need specification-level assurance, not only surface review.",
    references: [
      {
        label: "Wormhole incident report",
        url: "https://wormholecrypto.medium.com/wormhole-incident-report-02-02-22-ad9b8f21eec6"
      }
    ]
  },
  {
    slug: "ronin-bridge-2022",
    title: "Ronin (2022)",
    year: "2022",
    icon: "ronin",
    summary: "Control of five of nine validator signatures authorised bridge withdrawals worth about USD 624 million.",
    documentedLoss: {
      label: "~USD 624 million (~USD 540 million at theft-day rate)",
      usdMillions: 624
    },
    primaryLayer: "application",
    factualReconstruction:
      "In March 2022, an attacker gained control of five of the nine validator signatures of the Ronin sidechain bridge: four through compromised Sky Mavis keys and a fifth through an unrevoked delegation to the Axie DAO validator. That threshold majority authorised withdrawals totalling approximately USD 624 million, about USD 540 million at the exchange rate on the day of the theft.",
    layersInvolved: ["application"],
    pillarsAffected: ["integrity"],
    trustAssumptionViolated:
      "The violated assumption was that the withdrawal threshold was meaningfully large relative to an adversary's ability to compromise validator keys.",
    publicResponseAndLessons:
      "The response included partial fund recovery, an increased validator threshold, and a broader review of operator-level security. The case is operational in proximate cause even though the bridge sits at the application layer.",
    references: [
      {
        label: "Ronin Bridge incident record",
        url: "https://github.com/tayvano/lazarus-bluenoroff-research/blob/main/hacks-and-thefts/ronin_bridge.md"
      }
    ]
  }
];
