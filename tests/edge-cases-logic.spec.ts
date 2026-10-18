import { expect, test } from "@playwright/test";
import {
  avlAudit,
  createInitialModel,
  executeOperation,
  isBstOrdered,
  isMinHeap,
  MAX_INPUT_VALUE,
  type GraphModel,
  type HeapModel,
  type StackModel,
  type StepFrame,
  type TreeModel,
} from "../app/_lib/structures";

// Edge-case matrix per structure: empty, single element, duplicate values,
// max input value, and max-size collections. These are pure-logic checks, so
// they run without a browser or dev server (see playwright.logic.config.ts).
function expectSyncedFrames(frames: StepFrame[]) {
  expect(frames.length).toBeGreaterThan(0);
  for (const frame of frames) {
    expect(frame.title.length).toBeGreaterThan(0);
    expect(frame.narration.length).toBeGreaterThan(0);
    expect(frame.pseudocode.length).toBeGreaterThan(0);
    expect(frame.complexity.length).toBeGreaterThan(0);
    expect(Array.isArray(frame.nodes)).toBe(true);
    expect(Array.isArray(frame.edges)).toBe(true);
  }
}

function inorderValues(root: TreeModel["root"], out: number[] = []): number[] {
  if (!root) return out;
  inorderValues(root.left, out);
  out.push(root.value);
  inorderValues(root.right, out);
  return out;
}

test.describe("empty structures", () => {
  test("stack/queue underflow, empty tree traverse, empty heap ops all hold", () => {
    const stack = executeOperation("stack", { values: [] }, "pop", "");
    expectSyncedFrames(stack.frames);
    expect((stack.model as StackModel).values).toEqual([]);
    expect(stack.frames[0].narration).toMatch(/empty|underflow/i);

    const queue = executeOperation("queue", { values: [] }, "dequeue", "");
    expectSyncedFrames(queue.frames);
    expect((queue.model as StackModel).values).toEqual([]);

    const bst = executeOperation("bst", { nextId: 1 }, "traverse", "");
    expectSyncedFrames(bst.frames);
    expect(bst.frames[0].narration).toMatch(/empty/i);

    const bstDelete = executeOperation("bst", { nextId: 1 }, "delete", "5");
    expect(bstDelete.model).toEqual({ nextId: 1 });

    const heapExtract = executeOperation("heap", { values: [] }, "extract", "");
    expectSyncedFrames(heapExtract.frames);
    expect((heapExtract.model as HeapModel).values).toEqual([]);

    const heapPeek = executeOperation("heap", { values: [] }, "peek", "");
    expect(heapPeek.frames[0].narration).toMatch(/empty/i);
  });

  test("graph with no vertices holds BFS/DFS/Dijkstra without crashing", () => {
    const empty: GraphModel = { vertices: [], edges: [], nextId: 0 };
    for (const [operation, input] of [
      ["bfs", "0"],
      ["dfs", "0"],
      ["dijkstra", "0 1"],
      ["remove-vertex", "0"],
      ["remove-edge", "0 1"],
    ] as const) {
      const result = executeOperation("graph", empty, operation, input);
      expectSyncedFrames(result.frames);
      expect(result.model).toEqual(empty);
    }
  });
});

test.describe("single-element structures", () => {
  test("single item pops to empty and back for stack/queue/heap", () => {
    const stack = executeOperation("stack", { values: [7] }, "pop", "");
    expect((stack.model as StackModel).values).toEqual([]);

    const queue = executeOperation("queue", { values: [7] }, "dequeue", "");
    expect((queue.model as StackModel).values).toEqual([]);

    const heap = executeOperation("heap", { values: [7] }, "extract", "");
    expect((heap.model as HeapModel).values).toEqual([]);
    expectSyncedFrames(heap.frames);

    const tree = executeOperation("bst", { root: { id: 1, value: 7 }, nextId: 2 }, "delete", "7");
    expect((tree.model as TreeModel).root).toBeUndefined();
    expect(isBstOrdered((tree.model as TreeModel).root)).toBe(true);
  });

  test("graph with one vertex reports disconnected searches and holds removals", () => {
    const single: GraphModel = { vertices: [5], edges: [], nextId: 6 };
    const bfs = executeOperation("graph", single, "bfs", "5");
    expectSyncedFrames(bfs.frames);
    expect(bfs.model).toEqual(single);
    const removed = executeOperation("graph", single, "remove-vertex", "5");
    expect((removed.model as GraphModel).vertices).toEqual([]);
  });
});

test.describe("duplicate values", () => {
  test("bst/avl reject duplicates; heap keeps them", () => {
    let tree: TreeModel = { nextId: 1 };
    tree = executeOperation("bst", tree, "insert", "5").model as TreeModel;
    const dup = executeOperation("bst", tree, "insert", "5");
    expect(dup.model).toEqual(tree);
    expect(dup.frames.some((frame) => /duplicate/i.test(frame.narration))).toBe(true);
    expect(inorderValues((dup.model as TreeModel).root)).toEqual([5]);

    let avl: TreeModel = { nextId: 1 };
    avl = executeOperation("avl", avl, "insert", "5").model as TreeModel;
    const avlDup = executeOperation("avl", avl, "insert", "5");
    expect(avlDup.model).toEqual(avl);
    expect(avlAudit((avlDup.model as TreeModel).root).ok).toBe(true);

    const heap: HeapModel = { values: [3, 3, 9] };
    const heapDup = executeOperation("heap", heap, "insert", "3");
    expect((heapDup.model as HeapModel).values.filter((v) => v === 3)).toHaveLength(3);
    expect(isMinHeap((heapDup.model as HeapModel).values)).toBe(true);

    const heapDelete = executeOperation("heap", { values: [3, 3, 9] }, "delete", "3");
    expect((heapDelete.model as HeapModel).values.filter((v) => v === 3)).toHaveLength(1);
    expect(isMinHeap((heapDelete.model as HeapModel).values)).toBe(true);
  });
});

test.describe("max input value", () => {
  test(`±${MAX_INPUT_VALUE} is accepted and beyond is refused`, () => {
    const ok = executeOperation("stack", { values: [] }, "push", String(MAX_INPUT_VALUE));
    expect((ok.model as StackModel).values).toEqual([MAX_INPUT_VALUE]);
    const negOk = executeOperation("stack", { values: [] }, "push", String(-MAX_INPUT_VALUE));
    expect((negOk.model as StackModel).values).toEqual([-MAX_INPUT_VALUE]);

    const tooBig = executeOperation("stack", { values: [] }, "push", String(MAX_INPUT_VALUE + 1));
    expect((tooBig.model as StackModel).values).toEqual([]);
  });
});

test.describe("max-size collections", () => {
  test("200 stack pushes stay LIFO and frame-synced", () => {
    let model: StackModel = { values: [] };
    for (let index = 0; index < 200; index += 1) {
      model = executeOperation("stack", model, "push", String(index)).model as StackModel;
    }
    expect(model.values).toHaveLength(200);
    for (let index = 199; index >= 0; index -= 1) {
      expect(model.values[index]).toBe(index);
    }
  });

  test("heap of 200 shuffled inserts stays a valid min-heap and extracts ascending", () => {
    const values = Array.from({ length: 200 }, (_, index) => index);
    // Deterministic shuffle so failures are reproducible.
    let seed = 12345;
    const next = () => (seed = (seed * 1103515245 + 12345) % 2147483648);
    for (let index = values.length - 1; index > 0; index -= 1) {
      const swap = next() % (index + 1);
      [values[index], values[swap]] = [values[swap], values[index]];
    }
    let model: HeapModel = { values: [] };
    for (const value of values) {
      model = executeOperation("heap", model, "insert", String(value)).model as HeapModel;
      expect(isMinHeap(model.values)).toBe(true);
    }
    const extracted: number[] = [];
    while (model.values.length) {
      const minimum = model.values[0];
      model = executeOperation("heap", model, "extract", "").model as HeapModel;
      extracted.push(minimum);
    }
    expect(extracted).toHaveLength(200);
    for (let index = 1; index < extracted.length; index += 1) {
      expect(extracted[index - 1]).toBeLessThanOrEqual(extracted[index]);
    }
  });

  test("balanced insert of ascending values keeps every |bf| <= 1", () => {
    let model: TreeModel = { nextId: 1 };
    for (let value = 1; value <= 100; value += 1) {
      model = executeOperation("avl", model, "insert", String(value)).model as TreeModel;
    }
    const audit = avlAudit(model.root);
    expect(audit.ok).toBe(true);
    expect(audit.worst).toBeLessThanOrEqual(1);
  });

  test("graph grows to 60 vertices and reports no crashes on traversal", () => {
    let graph: GraphModel = { vertices: [], edges: [], nextId: 0 };
    for (let index = 0; index < 60; index += 1) {
      graph = executeOperation("graph", graph, "add-vertex", "auto").model as GraphModel;
    }
    expect(graph.vertices).toHaveLength(60);
    const bfs = executeOperation("graph", graph, "bfs", String(graph.vertices[0]));
    expectSyncedFrames(bfs.frames);
    expect(bfs.frames[bfs.frames.length - 1].narration).toMatch(/disconnected/i);
  });

  test("createInitialModel seeds every structure with valid content", () => {
    const probe: Record<string, [string, string]> = {
      stack: ["peek", ""],
      queue: ["peek", ""],
      bst: ["traverse", ""],
      avl: ["search", "10"],
      heap: ["peek", ""],
      graph: ["bfs", "0"],
    };
    for (const kind of ["stack", "queue", "bst", "avl", "heap", "graph"] as const) {
      const model = createInitialModel(kind);
      const [operation, input] = probe[kind];
      const result = executeOperation(kind, model, operation, input);
      expectSyncedFrames(result.frames);
    }
  });
});
