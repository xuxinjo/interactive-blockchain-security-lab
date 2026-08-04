import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BlockchainNetworkCanvas } from "@/components/home/BlockchainNetworkCanvas";

const portalMocks = vi.hoisted(() => ({
  navigateWithPortal: vi.fn(),
  prefetchPortal: vi.fn()
}));

vi.mock("@/components/layout/RouteTransitionProvider", () => ({
  useRouteTransition: () => ({
    navigateWithPortal: portalMocks.navigateWithPortal,
    prefetchPortal: portalMocks.prefetchPortal,
    isTransitioning: false
  })
}));

vi.mock("@react-three/fiber", async () => {
  const React = await import("react");

  return {
    Canvas: () => React.createElement("div", { "data-testid": "three-canvas" }),
    useFrame: () => undefined
  };
});

describe("3D blockchain network controls", () => {
  beforeEach(() => {
    portalMocks.navigateWithPortal.mockClear();
    portalMocks.prefetchPortal.mockClear();
  });

  afterEach(cleanup);

  it("uses Control as an exclusive portal-selection mode", () => {
    render(<BlockchainNetworkCanvas />);

    const network = screen.getByRole("region", {
      name: /interactive three-dimensional blockchain network/i
    });
    const zoomIn = screen.getByRole("button", { name: /zoom in 3d network/i });
    const zoomOut = screen.getByRole("button", { name: /zoom out 3d network/i });

    expect(network).not.toHaveClass("is-portal-mode");
    expect(zoomIn).toBeEnabled();
    expect(zoomOut).toBeEnabled();

    fireEvent.keyDown(window, { key: "Control", ctrlKey: true });

    expect(network).toHaveClass("is-portal-mode");
    expect(screen.getByText(/portal mode active/i)).toBeInTheDocument();
    expect(zoomIn).toBeDisabled();
    expect(zoomOut).toBeDisabled();

    fireEvent.pointerDown(network, {
      pointerId: 1,
      pointerType: "mouse",
      button: 0,
      ctrlKey: true,
      clientX: 120,
      clientY: 80
    });
    expect(network).not.toHaveClass("is-dragging");

    fireEvent.keyUp(window, { key: "Control" });

    expect(network).not.toHaveClass("is-portal-mode");
    expect(zoomIn).toBeEnabled();
    expect(zoomOut).toBeEnabled();
  });

  it("supports keyboard rotation, zoom, and reset shortcuts", () => {
    render(<BlockchainNetworkCanvas />);

    const network = screen.getByRole("region", {
      name: /interactive three-dimensional blockchain network/i
    });

    fireEvent.keyDown(network, { key: "+" });
    expect(screen.getByText(/3d view · 107%/i)).toBeInTheDocument();

    fireEvent.keyDown(network, { key: "Home" });
    expect(screen.getByText(/3d view · 100%/i)).toBeInTheDocument();
  });
});
