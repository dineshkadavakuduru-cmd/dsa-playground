import { expect, test } from "@playwright/test";
import {
  createInitialModel,
  executeOperation,
  initialFrames,
  type StructureKind,
} from "../app/_lib/structures";

// Stage isolation at the frame layer. A prior bug leaked the AVL
// "balance factor" legend onto the BST stage; these tests pin down which
// scene/legend payloads may appear per structure so that class of leak cannot
// regress. Pure logic: no browser, no dev server.
const KINDS: StructureKind[] = ["stack", "queue", "bst", "avl", "heap", "graph"];

function overview(kind: StructureKind) {
  return initialFrames(kind, createInitialModel(kind))[0];
}

test.describe("stage isolation", () => {
  test("only AVL nodes carry balance-factor detail", () => {
    for (const kind of KINDS) {
      const frame = overview(kind);
      for (const node of frame.nodes) {
        if (kind === "avl") {
          expect(node.detail ?? "").toMatch(/^bf /);
        } else {
          expect(node.detail ?? "").not.toMatch(/bf/);
        }
      }
    }
  });

  test("only heap exposes the array strip payload and index detail", () => {
    for (const kind of KINDS) {
      const frame = overview(kind);
      if (kind === "heap") {
        expect(Array.isArray(frame.array)).toBe(true);
        expect(frame.nodes.every((node) => node.detail?.startsWith("i="))).toBe(true);
      } else {
        expect(frame.array).toBeUndefined();
        expect(frame.nodes.some((node) => node.detail?.startsWith("i="))).toBe(false);
      }
    }
  });

  test("only graph exposes weighted edges and distance detail", () => {
    for (const kind of KINDS) {
      const frame = overview(kind);
      const weighted = frame.edges.some((edge) => edge.weight !== undefined);
      const distanceDetail = frame.nodes.some((node) => node.detail?.startsWith("d="));
      if (kind === "graph") {
        expect(weighted).toBe(true);
      } else {
        expect(weighted).toBe(false);
      }
      expect(distanceDetail).toBe(false);
    }
  });

  test("camera rotation presets are confined to the stages that request them", () => {
    const allowed: Record<StructureKind, string[]> = {
      stack: ["default"],
      queue: ["default"],
      bst: ["default", undefined as unknown as string],
      avl: ["default", "rotate-left", "rotate-right", undefined as unknown as string],
      heap: ["default"],
      graph: ["default", "graph", undefined as unknown as string],
    };
    for (const kind of KINDS) {
      for (const frame of [overview(kind)]) {
        expect(allowed[kind]).toContain(frame.camera);
      }
    }
  });

  test("a heap operation never emits array payload for other structures", () => {
    for (const kind of ["stack", "queue", "bst", "avl", "graph"] as StructureKind[]) {
      const model = createInitialModel(kind);
      const probe: Record<string, [string, string]> = {
        stack: ["push", "5"],
        queue: ["enqueue", "5"],
        bst: ["insert", "5"],
        avl: ["insert", "5"],
        graph: ["add-vertex", "auto"],
      };
      const [operation, input] = probe[kind];
      const result = executeOperation(kind, model, operation, input);
      for (const frame of result.frames) {
        expect(frame.array).toBeUndefined();
      }
    }
  });
});
