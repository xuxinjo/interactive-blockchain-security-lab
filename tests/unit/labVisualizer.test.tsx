import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ConceptLabVisualizer } from "@/components/lab/ConceptLabVisualizer";

describe("concept lab visualizer", () => {
  it("updates state when mode and step change", async () => {
    const user = userEvent.setup();
    render(<ConceptLabVisualizer />);

    await user.click(screen.getByRole("button", { name: /guarded/i }));
    await user.click(screen.getByRole("button", { name: /step 2: re-enter\/attest/i }));

    expect(screen.getByText(/re-entry attempt is conceptually blocked/i)).toBeInTheDocument();
    expect(screen.getByText("normal")).toBeInTheDocument();
  });
});
