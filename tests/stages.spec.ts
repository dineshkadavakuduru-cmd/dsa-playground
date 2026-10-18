import { expect, test, type Page } from "@playwright/test";

// Browser-level audit:
//  - cross-stage UI leakage (legend + heap-only panels)
//  - 375px layout integrity
//  - no-WebGL fallback message
//  - rapid-click input integrity (operations must not clobber each other)
//  - reset mid-animation must not leave ghost nodes
const ALL_STAGES = ["stack", "queue", "bst", "avl", "heap", "graph"] as const;

async function runOperation(page: Page, operation: string, input?: string) {
  await page.getByTestId("operation-select").selectOption(operation);
  if (input !== undefined) await page.getByTestId("operation-input").fill(input);
  await page.getByTestId("run-operation").click();
}

test.describe("cross-stage UI leakage", () => {
  for (const stage of ALL_STAGES) {
    test(`${stage} exposes only its own legend entries`, async ({ page }) => {
      await page.goto(`/${stage}`);
      const legend = page.getByLabel("Stage legend");
      await expect(legend).toBeVisible();

      if (stage === "avl") {
        await expect(legend).toContainText("balance factor");
      } else {
        await expect(legend).not.toContainText("balance factor");
      }

      if (stage === "graph") {
        await expect(legend).toContainText("edge weight");
      } else {
        await expect(legend).not.toContainText("edge weight");
      }

      // The heap array strip is a heap-only panel outside the 3D canvas.
      if (stage === "heap") {
        await expect(page.getByText("Heap array")).toBeVisible();
        await expect(page.getByText("index-addressable")).toBeVisible();
      } else {
        await expect(page.getByText("Heap array")).toHaveCount(0);
      }
    });
  }
});

test.describe("375px layout", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("no horizontal overflow and navigation is reachable", async ({ page }) => {
    await page.goto("/stack");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    await expect(page.getByTestId("nav-queue")).toBeVisible();
    await page.getByTestId("nav-queue").click();
    await expect(page).toHaveURL(/\/queue$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Queue");

    const queueOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(queueOverflow).toBeLessThanOrEqual(1);
  });
});

test.describe("WebGL resilience", () => {
  test("renders a fallback message when WebGL is unavailable", async ({ page }) => {
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...rest: unknown[]) {
        if (typeof type === "string" && type.toLowerCase().includes("webgl")) return null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (original as any).call(this, type, ...rest);
      } as typeof HTMLCanvasElement.prototype.getContext;
    });
    await page.goto("/stack");
    await expect(page.getByText(/WEBGL UNAVAILABLE \/ STAGE OFFLINE/)).toBeVisible();
    // The page must remain usable without the 3D stage.
    await expect(page.getByTestId("run-operation")).toBeVisible();
  });
});

test.describe("input integrity", () => {
  test("rapid RUN clicks each commit an operation", async ({ page }) => {
    // Heap exposes its array as DOM cells, so we can count the structure size
    // directly. The seed heap has 5 values; five rapid inserts must reach 10.
    await page.goto("/heap");
    const cells = page.getByTestId("array-cell");
    await expect(cells).toHaveCount(5);

    await page.getByTestId("operation-select").selectOption("insert");
    await page.getByTestId("operation-input").fill("0");

    // Fire several clicks in a single task so React batches them and the
    // handlers run before any re-render — the exact race that used to clobber
    // earlier operations.
    await page.evaluate(() => {
      const button = document.querySelector('[data-testid="run-operation"]');
      if (!button) throw new Error("run button missing");
      for (let index = 0; index < 5; index += 1) (button as HTMLButtonElement).click();
    });

    await expect(page.getByTestId("history-count")).toHaveText("5");
    await expect(cells).toHaveCount(10);
  });

  test("playback advances sequentially and parks on the last frame", async ({ page }) => {
    await page.goto("/stack");
    await runOperation(page, "push", "7");
    await expect(page.getByText(/Frame 1 \//)).toBeVisible();
    await page.getByTestId("play-pause").click();
    // A two-frame push must land exactly on frame 2 and stop (no overlap/skip).
    await expect(page.getByText(/Frame 2 \/ 2/)).toBeVisible({ timeout: 6_000 });
    await expect(page.getByTestId("play-pause")).toHaveText("▶");
    await expect(page.getByTestId("step-forward")).toBeDisabled();
  });

  test("reset mid-animation returns to frame 1 without ghost nodes", async ({ page }) => {
    await page.goto("/heap");
    await page.getByTestId("operation-select").selectOption("insert");
    await page.getByTestId("operation-input").fill("0");
    await page.getByTestId("run-operation").click();

    const labels = page.locator(".node-label");
    const baseline = await labels.count();
    test.skip(baseline === 0, "WebGL/DOM overlay unavailable in this environment");

    await page.getByTestId("play-pause").click();
    await page.waitForTimeout(180);
    await page.getByTestId("reset-playback").click();

    await expect(page.getByText(/Frame 1 \//)).toBeVisible();
    await expect(page.getByTestId("step-back")).toBeDisabled();
    // Give the animation a moment to settle, then confirm node count matches
    // the fresh frame-1 state (no orphans left behind).
    await page.waitForTimeout(400);
    expect(await labels.count()).toBe(baseline);
  });
});
