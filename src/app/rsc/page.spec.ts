import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/rsc");
});

test("title", async ({ page }) => {
  await expect(page.locator("#title")).toContainText(/rsc/i);
});
