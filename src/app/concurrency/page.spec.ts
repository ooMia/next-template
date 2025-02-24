import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/concurrency");
});

test("title", async ({ page }) => {
  await expect(page.locator("#title")).toContainText(/concurrency/i);
});
