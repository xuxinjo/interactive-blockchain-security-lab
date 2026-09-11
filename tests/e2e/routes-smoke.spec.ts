import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/framework",
  "/diagrams",
  "/cases",
  "/cases/the-dao-2016",
  "/lab",
  "/insights",
  "/data",
  "/about"
] as const;

for (const route of routes) {
  test(`renders ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByText(/no exploit code/i)).toBeVisible();
  });
}
