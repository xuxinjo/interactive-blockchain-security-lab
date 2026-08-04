import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ModuleTiles } from "@/components/home/ModuleTiles";

describe("homepage module card deck", () => {
  afterEach(cleanup);

  it("moves to the next module with the arrow control", () => {
    render(<ModuleTiles />);

    expect(screen.getByLabelText(/currently showing framework/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show next module/i }));

    expect(screen.getByLabelText(/currently showing diagrams/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open diagrams/i })).toHaveAttribute("href", "/diagrams");
  });

  it("moves backward and loops with the keyboard", () => {
    render(<ModuleTiles />);

    const deck = screen.getByLabelText(/currently showing framework/i);
    fireEvent.keyDown(deck, { key: "ArrowLeft" });

    expect(screen.getByLabelText(/currently showing feedback/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open feedback/i })).toHaveAttribute("href", "/feedback");
  });
});
