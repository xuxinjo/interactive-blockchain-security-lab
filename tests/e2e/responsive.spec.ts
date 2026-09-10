import { expect, test } from "@playwright/test";

const routes = ["/", "/framework", "/diagrams", "/cases", "/cases/the-dao-2016", "/cases/parity-multisig-2017", "/cases/bitcoin-gold-2018-2020", "/cases/poly-network-2021", "/cases/wormhole-bridge-2022", "/cases/ronin-bridge-2022", "/lab", "/insights", "/data", "/about", "/feedback", "/sandbox"];

for (const width of [320, 390, 768, 1440]) {
  test(`routes fit a ${width}px viewport`, async ({ page }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 844 });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.ok(), route).toBeTruthy();
      await expect(page.locator("main")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), route).toBeLessThanOrEqual(1);
    }
  });
}

test.describe("phone interactions", () => {
  test.use({ viewport: { width: 320, height: 740 }, hasTouch: true, isMobile: true });

  test("menu opens, closes with Escape, and navigates", async ({ page }) => {
    await page.goto("/framework");
    const menu = page.getByRole("button", { name: "Menu", exact: true });
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
    await menu.tap();
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await menu.tap();
    await page.getByRole("link", { name: "Lab", exact: true }).tap();
    await expect(page).toHaveURL(/\/lab$/);
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await page.getByRole("button", { name: "guarded", exact: true }).tap();
    await expect(page.getByRole("button", { name: "guarded", exact: true })).toHaveAttribute("aria-pressed", "true");
  });

  test("framework selections and wide content remain usable", async ({ page }) => {
    await page.goto("/framework");
    const cell = page.getByRole("button", { name: "Select application and confidentiality analysis" });
    await cell.tap();
    await expect(cell).toHaveAttribute("aria-pressed", "true");
    expect((await cell.boundingBox())?.width).toBeGreaterThan(250);
    for (const route of ["/cases", "/diagrams", "/data", "/insights", "/about"]) {
      await page.goto(route);
      const scroll = page.locator(".visual-scroll").first();
      expect(await scroll.evaluate((el) => el.scrollWidth > el.clientWidth), route).toBeTruthy();
      await scroll.evaluate((el) => { el.scrollLeft = 160; });
      expect(await scroll.evaluate((el) => el.scrollLeft), route).toBeGreaterThan(0);
    }
  });

  test("every module card keeps its link inside the card", async ({ page }) => {
    await page.goto("/");
    const next = page.getByRole("button", { name: "Show next module" });
    for (let index = 0; index < 8; index++) {
      const card = page.locator('.module-deck-card[aria-hidden="false"]');
      const link = card.getByRole("link");
      await link.scrollIntoViewIfNeeded();
      const cardBox = await card.boundingBox();
      const linkBox = await link.boundingBox();
      expect(cardBox).not.toBeNull();
      expect(linkBox).not.toBeNull();
      expect(linkBox!.y + linkBox!.height).toBeLessThanOrEqual(cardBox!.y + cardBox!.height);
      await expect(next).toBeEnabled();
      await next.tap();
      await expect(next).toBeEnabled();
    }
    await page.screenshot({ path: "test-results/mobile-home.png", fullPage: true });
  });

  test("network supports touch selection and vertical page scrolling", async ({ page }) => {
    await page.goto("/");
    const network = page.getByRole("region", { name: "Interactive three-dimensional blockchain network" });
    await expect(network.locator("canvas")).toBeVisible();
    const go = page.getByRole("button", { name: "Toggle destination selection" });
    await go.tap();
    await expect(go).toHaveAttribute("aria-pressed", "true");
    await go.tap();
    await expect(go).toHaveAttribute("aria-pressed", "false");
    await network.scrollIntoViewIfNeeded();
    const box = (await network.boundingBox())!;
    const startY = Math.min(box.y + box.height - 130, 580);
    const before = await page.evaluate(() => window.scrollY);
    const session = await page.context().newCDPSession(page);
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 160, y: startY }] });
    for (let offset = 20; offset <= 180; offset += 20) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 160, y: startY - offset }] });
    }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before + 30);
  });
});
