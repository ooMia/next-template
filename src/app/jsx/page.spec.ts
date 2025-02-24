import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/jsx");
});

test("title", async ({ page }) => {
  await expect(page.locator("#title")).toContainText(/jsx/i);
});

test("code contains all list items", async ({ page }) => {
  const listItems = (await page.locator("#list").allInnerTexts()).flatMap((t) =>
    t.split(/\n+/),
  );
  const codeText = (await page.getByRole("code").allInnerTexts()).join("\n");

  await Promise.all(
    listItems.map(async (t) => {
      await expect(codeText).toContain(t);
    }),
  );
});
