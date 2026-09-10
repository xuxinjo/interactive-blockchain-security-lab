import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

test("framework tracks exploration and filters the analysis", async ({ page }) => {
  await page.goto("/framework");
  await page.getByRole("button", { name: "Select network and integrity analysis" }).tap();
  await expect(page.getByText("2 of 9 relationships explored")).toBeVisible();
  await page.getByRole("button", { name: "Defences", exact: true }).tap();
  await expect(page.getByRole("heading", { name: "Representative defences" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Threats", exact: true })).toBeHidden();
  await page.getByRole("button", { name: "All details" }).tap();
  await expect(page.getByRole("heading", { name: "Threats", exact: true })).toBeVisible();
});

test("diagrams select concepts, seek, play, complete and replay", async ({ page }) => {
  await page.goto("/diagrams");
  await page.getByRole("button", { name: /Cross-Chain Bridge Architecture/ }).tap();
  const diagram = page.getByRole("region", { name: "Cross-Chain Bridge Architecture diagram", exact: true });
  await diagram.getByRole("button", { name: /Advance/ }).tap();
  await expect(diagram.getByText("Step 2/3: Attestation gate")).toBeVisible();
  await diagram.getByRole("button", { name: "Previous step" }).tap();
  await diagram.getByLabel("Speed").selectOption("2");
  await diagram.getByRole("button", { name: /^Play / }).tap();
  await expect(diagram.getByText("Step 3/3: Destination release")).toBeVisible();
  await expect(diagram.getByRole("button", { name: /Advance/ })).toBeDisabled();
  await expect(diagram.getByRole("button", { name: /^Play / })).toHaveText("Replay scenario");
  await diagram.getByRole("button", { name: /^Play / }).tap();
  await expect(diagram.getByText("Step 1/3: Source lock")).toBeVisible();
  await diagram.getByRole("button", { name: /^Pause / }).tap();
});

test("cases search, reset, and compare two incidents", async ({ page }) => {
  await page.goto("/cases");
  await page.getByLabel("Search the library").fill("does-not-exist");
  await expect(page.getByText("No cases match these filters")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).tap();
  await page.getByRole("button", { name: /Compare The DAO/ }).tap();
  await page.getByRole("button", { name: /Compare Ronin/ }).tap();
  const comparison = page.getByRole("region", { name: "Selected case comparison" });
  await expect(comparison.getByRole("link")).toHaveCount(2);
  await expect(comparison.getByText(/withdrawal threshold was meaningfully large/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /Compare Parity/ })).toBeDisabled();
  await comparison.getByRole("button", { name: "Clear comparison" }).tap();
  await expect(comparison).toBeHidden();
});

test("lab playback and synchronized comparison expose different outcomes", async ({ page }) => {
  await page.goto("/lab");
  await page.getByRole("button", { name: "Compare both modes" }).tap();
  await page.getByRole("button", { name: "Play simulation" }).tap();
  await expect(page.getByText("Sequence complete")).toBeVisible({ timeout: 8000 });
  await expect(page.getByRole("region", { name: "Mode comparison" }).getByText("Vault difference from the current mode: +20 units")).toBeVisible();
  await page.getByRole("button", { name: "Reset simulation" }).tap();
  await expect(page.getByText("State 1 of 3")).toBeVisible();
  await page.getByRole("button", { name: "Bridge scenario" }).tap();
  await expect(page.getByText(/Source lock request/)).toBeVisible();
});

test("data filters, empty states and chart selection stay synchronized", async ({ page }) => {
  await page.goto("/data");
  await page.getByRole("button", { name: /^protocol$/i }).tap();
  await expect(page.getByRole("group", { name: "Inspect an incident" }).getByRole("button")).toHaveCount(1);
  await page.getByLabel("From year").selectOption("2022");
  await expect(page.getByText("No incidents in this view")).toBeVisible();
  await page.getByRole("button", { name: "Reset data filters" }).tap();
  await page.getByRole("button", { name: "Timeline", exact: true }).tap();
  await page.getByRole("button", { name: "Ronin", exact: true }).tap();
  await expect(page.getByRole("heading", { name: "Ronin", exact: true })).toBeVisible();
  await expect(page.getByText("~$624M", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "The DAO, 2016, approximately 60 million dollars" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "The DAO", exact: true })).toBeVisible();
});

test("insights matrix selects a method and incident together", async ({ page }) => {
  await page.goto("/insights");
  await page.getByRole("button", { name: "Ronin, Operational controls: High" }).tap();
  await expect(page.getByRole("heading", { name: "Ronin / Operational controls" })).toBeVisible();
  await expect(page.getByLabel("Inspect a case")).toHaveValue("5");
  await expect(page.getByRole("group", { name: "Detection method" }).getByRole("button", { name: /Operational controls/ })).toHaveAttribute("aria-pressed", "true");
});

test("notebook persists, removes, restores and exports notes", async ({ page }) => {
  await page.goto("/feedback");
  await expect(page.getByRole("button", { name: "Save local note" })).toBeDisabled();
  await page.getByLabel("Remark").fill("Test note: compare trust assumptions across layers.");
  await page.getByRole("button", { name: "Save local note" }).tap();
  await expect(page.getByRole("status")).toHaveText("Note saved in this browser.");
  await page.reload();
  await expect(page.getByText("Test note: compare trust assumptions across layers.")).toBeVisible();
  await page.getByRole("button", { name: /^Remove note from/ }).tap();
  await expect(page.getByText("Test note: compare trust assumptions across layers.")).toBeHidden();
  await page.getByRole("button", { name: "Undo removal" }).tap();
  await expect(page.getByText("Test note: compare trust assumptions across layers.")).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: /Export notes/ }).tap();
  expect((await download).suggestedFilename()).toBe("security-lab-notes.txt");
});

test("reduced motion keeps pages visible without hydration errors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["/framework", "/diagrams", "/data", "/insights", "/about"]) {
    await page.goto(route);
    await expect(page.locator(".page-enter").first()).toHaveCSS("opacity", "1");
    await page.getByRole("button", { name: "Menu", exact: true }).tap();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  }
  expect(errors).toEqual([]);
});
