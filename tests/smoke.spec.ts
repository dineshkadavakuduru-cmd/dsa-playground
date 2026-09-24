import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
  test("home page renders the landing content", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("See the state.");
    await expect(page.getByRole("link", { name: "OPEN THE LAB" }).first()).toBeVisible();
  });

  test("stack playground renders and runs an operation", async ({ page }) => {
    await page.goto("/stack");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Stack");
    await expect(page.getByTestId("run-operation")).toBeVisible();

    await page.getByTestId("run-operation").click();
    await expect(page.getByTestId("step-1")).toBeVisible();
  });

  test("navigation links between structures work", async ({ page }) => {
    await page.goto("/stack");
    await page.getByTestId("nav-queue").click();
    await expect(page).toHaveURL(/\/queue$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Queue");
  });
});
