export type SecurityLayer = "protocol" | "network" | "application";

export type CiaPillar = "confidentiality" | "integrity" | "availability";

export interface ThesisReference {
  label: string;
  section: string;
}

export interface Threat {
  title: string;
  summary: string;
}

export interface Defence {
  title: string;
  summary: string;
}

export interface TrustAssumption {
  statement: string;
}

export interface FrameworkCell {
  id: string;
  layer: SecurityLayer;
  pillar: CiaPillar;
  description: string;
  threats: Threat[];
  trustAssumptions: TrustAssumption[];
  defences: Defence[];
  references: ThesisReference[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  year: string;
  icon: string;
  summary: string;
  documentedLoss?: {
    label: string;
    usdMillions?: number;
    note?: string;
  };
  primaryLayer: SecurityLayer;
  factualReconstruction: string;
  layersInvolved: SecurityLayer[];
  pillarsAffected: CiaPillar[];
  trustAssumptionViolated: string;
  publicResponseAndLessons: string;
  references: { label: string; url: string }[];
}

export interface ChartIncidentValue {
  label: string;
  year: number;
  layer: SecurityLayer;
  usdMillions: number;
  note?: string;
}

export interface DiagramStep {
  title: string;
  description: string;
}

export interface DiagramMetadata {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  layers: SecurityLayer[];
  steps: DiagramStep[];
}

export interface ThesisSectionMapping {
  thesisSection: string;
  route: string;
  purpose: string;
  status: "implemented" | "planned";
}

export type LabMode = "vulnerable" | "guarded";

export type LabScenario = "reentrancy" | "bridge";

export interface LabState {
  scenario: LabScenario;
  mode: LabMode;
  step: 0 | 1 | 2;
  stateLabel: string;
  balances: { vault: number; user: number; reserve: number };
  lockFlag: boolean;
  callStackDepth: number;
  watcherStatus: "normal" | "alert";
  narrative: string;
}
