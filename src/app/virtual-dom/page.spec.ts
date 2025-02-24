import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/virtual-dom");
});

test("title", async ({ page }) => {
  await expect(page.locator("#title")).toContainText(/virtual dom/i);
});
