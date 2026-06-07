import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FrameworkExplorer } from "@/components/framework/FrameworkExplorer";

describe("framework explorer", () => {
  it("switches details when a matrix cell is selected", async () => {
    const user = userEvent.setup();
    render(<FrameworkExplorer />);

    const networkIntegrity = screen.getByRole("button", {
      name: /select network and integrity analysis/i
    });

    await user.click(networkIntegrity);

    expect(screen.getByText(/ordering pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/peer reputation policies/i)).toBeInTheDocument();
    expect(screen.getByText(/MEV and ordering/i)).toBeInTheDocument();
  });
});
