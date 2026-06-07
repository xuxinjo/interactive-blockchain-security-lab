import type { LabMode, LabScenario, LabState } from "@/lib/types";

type StepIndex = LabState["step"];

const reentrancyStates: Record<LabMode, Record<StepIndex, LabState>> = {
  vulnerable: {
    0: {
      scenario: "reentrancy",
      mode: "vulnerable",
      step: 0,
      stateLabel: "Step 1: call",
      balances: { vault: 100, user: 10, reserve: 40 },
      lockFlag: false,
      callStackDepth: 1,
      watcherStatus: "normal",
      narrative: "External interaction starts before internal state is fully stabilized."
    },
    1: {
      scenario: "reentrancy",
      mode: "vulnerable",
      step: 1,
      stateLabel: "Step 2: re-enter",
      balances: { vault: 100, user: 25, reserve: 40 },
      lockFlag: false,
      callStackDepth: 2,
      watcherStatus: "alert",
      narrative: "Nested callback appears in the conceptual model because guard conditions are absent."
    },
    2: {
      scenario: "reentrancy",
      mode: "vulnerable",
      step: 2,
      stateLabel: "Step 3: settle",
      balances: { vault: 60, user: 50, reserve: 40 },
      lockFlag: false,
      callStackDepth: 1,
      watcherStatus: "alert",
      narrative: "Settlement leaves the vault in a degraded state in this educational scenario."
    }
  },
  guarded: {
    0: {
      scenario: "reentrancy",
      mode: "guarded",
      step: 0,
      stateLabel: "Step 1: call",
      balances: { vault: 100, user: 10, reserve: 40 },
      lockFlag: true,
      callStackDepth: 1,
      watcherStatus: "normal",
      narrative: "Guard is raised before external interaction and internal state is reserved." 
    },
    1: {
      scenario: "reentrancy",
      mode: "guarded",
      step: 1,
      stateLabel: "Step 2: re-enter",
      balances: { vault: 80, user: 30, reserve: 40 },
      lockFlag: true,
      callStackDepth: 1,
      watcherStatus: "normal",
      narrative: "Re-entry attempt is conceptually blocked because guard checks fail." 
    },
    2: {
      scenario: "reentrancy",
      mode: "guarded",
      step: 2,
      stateLabel: "Step 3: settle",
      balances: { vault: 80, user: 30, reserve: 40 },
      lockFlag: false,
      callStackDepth: 0,
      watcherStatus: "normal",
      narrative: "State settles predictably with one completed transition." 
    }
  }
};

const bridgeStates: Record<LabMode, Record<StepIndex, LabState>> = {
  vulnerable: {
    0: {
      scenario: "bridge",
      mode: "vulnerable",
      step: 0,
      stateLabel: "Step 1: lock",
      balances: { vault: 200, user: 20, reserve: 60 },
      lockFlag: false,
      callStackDepth: 1,
      watcherStatus: "normal",
      narrative: "Source lock request enters with minimal attestation safeguards." 
    },
    1: {
      scenario: "bridge",
      mode: "vulnerable",
      step: 1,
      stateLabel: "Step 2: attest",
      balances: { vault: 200, user: 20, reserve: 60 },
      lockFlag: false,
      callStackDepth: 2,
      watcherStatus: "alert",
      narrative: "Validation path mismatch allows inconsistent attestation in this abstract scenario." 
    },
    2: {
      scenario: "bridge",
      mode: "vulnerable",
      step: 2,
      stateLabel: "Step 3: release",
      balances: { vault: 150, user: 70, reserve: 60 },
      lockFlag: false,
      callStackDepth: 1,
      watcherStatus: "alert",
      narrative: "Destination release occurs under weak guarantees, increasing conceptual risk." 
    }
  },
  guarded: {
    0: {
      scenario: "bridge",
      mode: "guarded",
      step: 0,
      stateLabel: "Step 1: lock",
      balances: { vault: 200, user: 20, reserve: 60 },
      lockFlag: true,
      callStackDepth: 1,
      watcherStatus: "normal",
      narrative: "Lock proceeds with explicit governance checks and staged authorization." 
    },
    1: {
      scenario: "bridge",
      mode: "guarded",
      step: 1,
      stateLabel: "Step 2: attest",
      balances: { vault: 200, user: 20, reserve: 60 },
      lockFlag: true,
      callStackDepth: 1,
      watcherStatus: "normal",
      narrative: "Attestation is accepted only after consensus-aligned verification in this model." 
    },
    2: {
      scenario: "bridge",
      mode: "guarded",
      step: 2,
      stateLabel: "Step 3: release",
      balances: { vault: 180, user: 40, reserve: 60 },
      lockFlag: false,
      callStackDepth: 0,
      watcherStatus: "normal",
      narrative: "Release completes with bounded state changes and auditable checkpoints." 
    }
  }
};

export const scenarioLabels: Record<LabScenario, string> = {
  reentrancy: "Re-entrancy scenario",
  bridge: "Bridge scenario"
};

export const stepLabels: string[] = ["Step 1: call/lock", "Step 2: re-enter/attest", "Step 3: settle/release"];

export function getLabState(scenario: LabScenario, mode: LabMode, step: StepIndex): LabState {
  return scenario === "reentrancy" ? reentrancyStates[mode][step] : bridgeStates[mode][step];
}
