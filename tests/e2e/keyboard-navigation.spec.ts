import { expect, test } from "@playwright/test";

test("keyboard navigation and skip link", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to main content")).toBeFocused();
  await page.keyboard.press("Enter");

  const activeId = await page.evaluate(() => document.activeElement?.id ?? "");
  expect(activeId).toBe("main-content");

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/\/framework|\/diagrams|\/cases|\/lab|\/$/);
});
