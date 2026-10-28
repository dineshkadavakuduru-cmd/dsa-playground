import { expect, test, type Page } from "@playwright/test";

// Browser-level UI synchronization checks: every operation must update the
// frame counter, narration, pseudocode and complexity readout together, and
// invalid input must be refused visibly without changing state.
async function runOperation(page: Page, operation?: string, input?: string) {
  if (operation) await page.getByTestId("operation-select").selectOption(operation);
  if (input !== undefined) await page.getByTestId("operation-input").fill(input);
  await page.getByTestId("run-operation").click();
}

async function stepToLastFrame(page: Page) {
  for (let i = 0; i < 40; i++) {
    if (await page.getByTestId("step-forward").isDisabled()) break;
    await page.getByTestId("step-forward").click();
  }
}

test.describe("operation UI sync", () => {
  test("stack push updates frames and narration; invalid input is refused", async ({ page }) => {
    await page.goto("/stack");
    await runOperation(page, "push", "abc");
    await expect(page.locator(".current-narration")).toContainText("Invalid input");
    await expect(page.locator(".complexity-readout")).toContainText("O(1)");
    await runOperation(page, "push", "7");
    await expect(page.locator(".current-narration")).toContainText("7");
    await expect(page.getByTestId("step-1")).toBeVisible();
  });

  test("queue FIFO operation syncs readout", async ({ page }) => {
    await page.goto("/queue");
    await runOperation(page, "enqueue", "9");
    await expect(page.locator(".current-narration")).toContainText("9");
    await expect(page.locator(".complexity-readout")).toContainText("O(1)");
  });

  test("bst insert and traverse sync narration", async ({ page }) => {
    await page.goto("/bst");
    await runOperation(page, "insert", "21");
    await expect(page.locator(".current-narration")).toContainText("21");
    await runOperation(page, "traverse");
    await expect(page.locator(".current-narration")).toContainText("In-order visit 1/");
    await stepToLastFrame(page);
    await expect(page.locator(".current-narration")).toContainText("In-order output");
  });

  test("avl insert reports balance factors", async ({ page }) => {
    await page.goto("/avl");
    await runOperation(page, "insert", "25");
    await expect(page.locator(".current-narration")).toContainText("balance factor");
    await expect(page.locator(".complexity-readout")).toContainText("O(log n)");
  });

  test("heap insert syncs array strip; empty extract is held", async ({ page }) => {
    await page.goto("/heap");
    await runOperation(page, "insert", "2");
    await expect(page.locator(".array-strip")).toContainText("2");
    await runOperation(page, "delete", "999");
    await expect(page.locator(".current-narration")).toContainText("not in the heap");
  });

  test("graph add/remove vertex sync narration and vertex-label guidance", async ({ page }) => {
    await page.goto("/graph");
    // Verify guidance beside the field is displayed before submission
    await expect(page.getByTestId("vertex-label-guidance")).toBeVisible();
    await expect(page.getByTestId("vertex-label-guidance")).toHaveText("Single integer or blank for auto");
    await expect(page.getByTestId("vertex-label-hint")).toBeVisible();
    await expect(page.getByTestId("vertex-label-hint")).toContainText("Labels must be a single integer or left blank for automatic assignment.");

    // Submitting a letter produces an error and keeps state unchanged
    await runOperation(page, "add-vertex", "abc");
    await expect(page.locator(".current-narration")).toContainText("A vertex label must be a single integer");
    await expect(page.locator(".current-narration")).toContainText("unchanged");

    // Adding with blank / auto-assignment
    await runOperation(page, "add-vertex", "");
    await expect(page.locator(".current-narration")).toContainText("allocated");
    await stepToLastFrame(page);
    await expect(page.locator(".current-narration")).toContainText("joins the network");

    // Adding with a valid explicit integer vertex
    await runOperation(page, "add-vertex", "7");
    await expect(page.locator(".current-narration")).toContainText("Vertex 7 is allocated");
    await stepToLastFrame(page);
    await expect(page.locator(".current-narration")).toContainText("7 joins the network");

    await runOperation(page, "remove-vertex", "42");
    await expect(page.locator(".current-narration")).toContainText("unchanged");
  });
});
