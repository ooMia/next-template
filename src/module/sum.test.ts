import { addTwoInts } from "@/module/example";
import { expect, test } from "@playwright/test";

test("title", async () => {
  expect(addTwoInts(1, 2)).toBe(3);
});
