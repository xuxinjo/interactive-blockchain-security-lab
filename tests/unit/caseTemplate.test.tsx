import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseTemplateDetail } from "@/components/cases/CaseTemplate";
import { incidentCases } from "@/content/cases/incidents";

describe("case template renderer", () => {
  it("renders all five thesis template elements", () => {
    const incident = incidentCases[0];
    render(<CaseTemplateDetail incident={incident} />);

    expect(screen.getByText(/Factual reconstruction:/i)).toBeInTheDocument();
    expect(screen.getByText(/Layers involved:/i)).toBeInTheDocument();
    expect(screen.getByText(/Pillar\(s\) affected:/i)).toBeInTheDocument();
    expect(screen.getByText(/Trust assumption violated:/i)).toBeInTheDocument();
    expect(screen.getByText(/Public response and lessons:/i)).toBeInTheDocument();
  });
});
