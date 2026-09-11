export const researchQuestions = [
  {
    id: "RQ1",
    text: "What are the principal categories of threats currently observed in blockchain systems, organised across the protocol, network, and application layers?"
  },
  {
    id: "RQ2",
    text: "What defensive strategies correspond to those threats, and which trust assumptions do they protect?"
  },
  {
    id: "RQ3",
    text: "What role can ML-assisted detection play in blockchain security, and where are its limits?"
  },
  {
    id: "RQ4",
    text: "Can the layered framework classify the six purposively selected incidents and drive the structure of the educational artefact?"
  }
] as const;

export const findingOne =
  "Finding 1: the strongest pattern across the six cases is an under-application gap. The relevant defences were already known before the incidents; the problem was inconsistent application, not missing defensive knowledge.";

export const thesisMetadata = {
  title: "AI Security: Security in Blockchain Systems",
  subtitle: "A layered security framework and an educational artefact",
  artefact: "Interactive Blockchain Security Lab",
  status: "Completed educational artefact – final version",
  author: "Rrezon Halilabazi",
  university: "WSB University",
  supervisor: "Dr. inż. Adrian Kapczyński",
  degree: "Bachelor's thesis",
  license: "MIT",
  repositoryUrl: "https://github.com/xuxinjo/interactive-blockchain-security-lab",
  deploymentUrl: "https://interactive-blockchain-security-lab.vercel.app"
} as const;
