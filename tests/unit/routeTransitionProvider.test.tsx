import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  RouteTransitionProvider,
  useRouteTransition,
  type PortalDestination
} from "@/components/layout/RouteTransitionProvider";

const routerMocks = vi.hoisted(() => ({
  push: vi.fn(),
  prefetch: vi.fn()
}));

vi.mock("next/navigation", () => ({
  useRouter: () => routerMocks
}));

vi.mock("framer-motion", () => ({
  useReducedMotion: () => true
}));

const destination: PortalDestination = {
  title: "Framework",
  href: "/framework",
  description: "Layer by CIA security model",
  accent: "#22d3ee"
};

function TransitionHarness() {
  const { navigateWithPortal, prefetchPortal, isTransitioning } = useRouteTransition();

  return (
    <div>
      <span>{isTransitioning ? "Transition active" : "Transition idle"}</span>
      <button type="button" onClick={() => prefetchPortal(destination.href)}>
        Prefetch
      </button>
      <button type="button" onClick={() => navigateWithPortal(destination, { x: 240, y: 160 })}>
        Enter framework
      </button>
    </div>
  );
}

describe("route portal transition", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    routerMocks.push.mockClear();
    routerMocks.prefetch.mockClear();
  });

  afterEach(() => {
    cleanup();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("prefetches a destination before navigation", () => {
    render(
      <RouteTransitionProvider>
        <TransitionHarness />
      </RouteTransitionProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Prefetch" }));
    expect(routerMocks.prefetch).toHaveBeenCalledWith("/framework");
  });

  it("covers the screen, navigates, and clears the transition", () => {
    render(
      <RouteTransitionProvider>
        <TransitionHarness />
      </RouteTransitionProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /enter framework/i }));

    const overlay = screen.getByRole("status", { name: /opening framework/i });
    expect(overlay).toHaveClass("route-portal-covering");
    expect(overlay).toHaveStyle({
      "--portal-origin-x": "240px",
      "--portal-origin-y": "160px",
      "--portal-accent": "#22d3ee"
    });
    expect(screen.getByText("Transition active")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(120));
    expect(routerMocks.push).toHaveBeenCalledWith("/framework");

    act(() => vi.advanceTimersByTime(90));
    expect(screen.getByRole("status", { name: /opening framework/i })).toHaveClass("route-portal-revealing");

    act(() => vi.advanceTimersByTime(220));
    expect(screen.queryByRole("status", { name: /opening framework/i })).not.toBeInTheDocument();
    expect(screen.getByText("Transition idle")).toBeInTheDocument();
  });
});
