import { expect, test } from "@playwright/test";
import {
  avlAudit,
  createInitialModel,
  executeOperation,
  isBstOrdered,
  isMinHeap,
  type GraphModel,
  type HeapModel,
  type StackModel,
  type StepFrame,
  type StructureModel,
  type TreeModel,
} from "../app/_lib/structures";

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

const INVALID_INPUTS = ["", "   ", "abc", "12a", "3.5", "100001", "999999999999999999999"];

test.describe("stack/queue regression", () => {
  test("stack LIFO, peek is read-only, underflow holds state", () => {
    let model: StackModel = { values: [] };
    model = executeOperation("stack", model, "push", "10").model as StackModel;
    model = executeOperation("stack", model, "push", "10").model as StackModel;
    model = executeOperation("stack", model, "push", "-3").model as StackModel;
    expect(model.values).toEqual([10, 10, -3]);
    const peek = executeOperation("stack", model, "peek", "");
    expect(peek.model).toEqual(model);
    expect(peek.frames[0].narration).toMatch(/-3/);
    expectSyncedFrames(peek.frames);
    const popped = executeOperation("stack", model, "pop", "");
    expect((popped.model as StackModel).values).toEqual([10, 10]);
    const empty = executeOperation("stack", { values: [] }, "pop", "");
    expect((empty.model as StackModel).values).toEqual([]);
    expect(empty.frames[empty.frames.length - 1].narration).toMatch(/unchanged|empty/i);
  });

  test("stack/queue reject invalid input without changing state", () => {
    for (const bad of INVALID_INPUTS) {
      const before: StackModel = { values: [1] };
      const result = executeOperation("stack", before, "push", bad);
      expect(result.model).toEqual(before);
      expect(result.frames[result.frames.length - 1].narration).toMatch(/Invalid input/i);
    }
    const queueBefore = { values: [1] };
    const queueResult = executeOperation("queue", queueBefore, "enqueue", "xyz");
    expect(queueResult.model).toEqual(queueBefore);
  });

  test("queue FIFO and peek", () => {
    let model = { values: [] as number[] };
    for (const value of ["4", "8", "15"]) {
      model = executeOperation("queue", model, "enqueue", value).model as typeof model;
    }
    const peek = executeOperation("queue", model, "peek", "");
    expect(peek.model).toEqual(model);
    expect(peek.frames[0].narration).toMatch(/^4\b/);
    const dequeued = executeOperation("queue", model, "dequeue", "");
    expect((dequeued.model as typeof model).values).toEqual([8, 15]);
    expectSyncedFrames(dequeued.frames);
  });
});

test.describe("bst regression", () => {
  function build(values: string[]): TreeModel {
    let model: TreeModel = { root: undefined, nextId: 1 };
    for (const value of values) {
      model = executeOperation("bst", model, "insert", value).model as TreeModel;
    }
    return model;
  }

  test("insert keeps invariant; frames render the full tree", () => {
    const model = build(["8", "3", "10", "1", "6", "14"]);
    expect(isBstOrdered(model.root)).toBe(true);
    expect(inorderValues(model.root)).toEqual([1, 3, 6, 8, 10, 14]);
    const search = executeOperation("bst", model, "search", "6");
    expect(search.model).toEqual(model);
    for (const frame of search.frames) expect(frame.nodes.length).toBe(6);
    expect(search.frames[search.frames.length - 1].narration).toMatch(/present/);
  });

  test("leaf, one-child and two-child deletion preserve order", () => {
    const model = build(["8", "3", "10", "1", "6", "14"]);
    const leaf = executeOperation("bst", model, "delete", "1").model as TreeModel;
    expect(inorderValues(leaf.root)).toEqual([3, 6, 8, 10, 14]);
    expect(isBstOrdered(leaf.root)).toBe(true);
    const twoChild = executeOperation("bst", model, "delete", "3").model as TreeModel;
    expect(inorderValues(twoChild.root)).toEqual([1, 6, 8, 10, 14]);
    expect(isBstOrdered(twoChild.root)).toBe(true);
    const oneChild = executeOperation("bst", leaf, "delete", "3").model as TreeModel;
    expect(inorderValues(oneChild.root)).toEqual([6, 8, 10, 14]);
    expect(isBstOrdered(oneChild.root)).toBe(true);
    const absent = executeOperation("bst", model, "delete", "99");
    expect(absent.model).toEqual(model);
  });

  test("duplicate insert and invalid input hold state", () => {
    const model = build(["8", "3", "10"]);
    const duplicate = executeOperation("bst", model, "insert", "3");
    expect(duplicate.model).toEqual(model);
    expect(duplicate.frames[duplicate.frames.length - 1].narration).toMatch(/unchanged/i);
    const invalid = executeOperation("bst", model, "insert", "oops");
    expect(invalid.model).toEqual(model);
  });

  test("traverse outputs sorted order", () => {
    const model = build(["8", "3", "10", "1", "6", "14"]);
    const traverse = executeOperation("bst", model, "traverse", "");
    expect(traverse.model).toEqual(model);
    expect(traverse.frames[traverse.frames.length - 1].narration).toContain("[1, 3, 6, 8, 10, 14]");
    expectSyncedFrames(traverse.frames);
  });
});

test.describe("avl regression", () => {
  function build(values: number[]): TreeModel {
    let model: TreeModel = { root: undefined, nextId: 1 };
    for (const value of values) {
      model = executeOperation("avl", model, "insert", String(value)).model as TreeModel;
    }
    return model;
  }

  const rotationCases: Array<{ name: string; values: number[] }> = [
    { name: "LL", values: [30, 20, 10] },
    { name: "RR", values: [10, 20, 30] },
    { name: "LR", values: [30, 10, 20] },
    { name: "RL", values: [10, 30, 20] },
  ];
  for (const { name, values } of rotationCases) {
    test(`${name} rotation balances with |bf| <= 1`, () => {
      const model = build(values);
      expect(model.root?.value).toBe(20);
      expect(avlAudit(model.root).ok).toBe(true);
      expect(isBstOrdered(model.root)).toBe(true);
    });
  }

  test("duplicate ends on the duplicate frame with state unchanged", () => {
    const model = build([10, 5, 15, 3, 7, 12, 18]);
    const before = JSON.parse(JSON.stringify(model)) as TreeModel;
    const duplicate = executeOperation("avl", model, "insert", "7");
    expect(duplicate.model).toEqual(before);
    expect(duplicate.frames[duplicate.frames.length - 1].narration).toMatch(/already exists|unchanged/i);
  });

  test("delete rebalances and search is read-only", () => {
    const model = build([10, 5, 15, 3, 7, 12, 18]);
    const before = JSON.parse(JSON.stringify(model)) as TreeModel;
    const deleted = executeOperation("avl", model, "delete", "5");
    expect(avlAudit((deleted.model as TreeModel).root).ok).toBe(true);
    expect(isBstOrdered((deleted.model as TreeModel).root)).toBe(true);
    expectSyncedFrames(deleted.frames);
    const search = executeOperation("avl", model, "search", "12");
    expect(search.model).toEqual(before);
  });

  test("manual rotation without pivot holds; raw rotation reports balance honestly", () => {
    const model = build([10, 5]);
    const held = executeOperation("avl", model, "rotate-left", "");
    expect(held.model).toEqual(model);
    const rotated = executeOperation("avl", model, "rotate-right", "");
    expect((rotated.model as TreeModel).root?.value).toBe(5);
    expect(rotated.frames[rotated.frames.length - 1].narration).toMatch(/worst/);
  });
});

test.describe("heap regression (min-heap)", () => {
  test("inserts keep heap order; extract-all is ascending", () => {
    let model: HeapModel = { values: [] };
    for (const value of ["4", "10", "3", "1", "8"]) {
      model = executeOperation("heap", model, "insert", value).model as HeapModel;
    }
    expect(isMinHeap(model.values)).toBe(true);
    expect(model.values[0]).toBe(1);
    const removed: number[] = [];
    let current = { ...model, values: [...model.values] };
    while (current.values.length > 0) {
      removed.push(current.values[0]);
      current = executeOperation("heap", current, "extract", "").model as HeapModel;
      expect(isMinHeap(current.values)).toBe(true);
    }
    expect(removed).toEqual([...removed].sort((a, b) => a - b));
  });

  test("peek, delete, empty and no-op sifts are honest", () => {
    let model: HeapModel = { values: [] };
    for (const value of ["4", "10", "3", "1", "8"]) {
      model = executeOperation("heap", model, "insert", value).model as HeapModel;
    }
    const before = JSON.parse(JSON.stringify(model)) as HeapModel;
    const peek = executeOperation("heap", model, "peek", "");
    expect(peek.model).toEqual(before);
    const deleted = executeOperation("heap", model, "delete", "10");
    expect(isMinHeap((deleted.model as HeapModel).values)).toBe(true);
    expect((deleted.model as HeapModel).values).not.toContain(10);
    const absent = executeOperation("heap", model, "delete", "999");
    expect(absent.model).toEqual(before);
    const empty = executeOperation("heap", { values: [] }, "extract", "");
    expect((empty.model as HeapModel).values).toEqual([]);
    expect(empty.frames[empty.frames.length - 1].narration).toMatch(/unchanged|empty/i);
    for (const operation of ["sift-up", "sift-down"]) {
      const result = executeOperation("heap", model, operation, "");
      expect(result.model).toEqual(before);
      expect(result.frames[result.frames.length - 1].narration).toMatch(/already valid|unchanged/i);
    }
  });
});

test.describe("graph regression", () => {
  test("default graph: BFS/DFS reach all, Dijkstra uses weights", () => {
    const model = createInitialModel("graph") as GraphModel;
    const bfs = executeOperation("graph", model, "bfs", "0");
    expect(bfs.frames[bfs.frames.length - 1].nodes.filter((node) => node.visited).length).toBe(6);
    expect(bfs.model).toEqual(model);
    const dfs = executeOperation("graph", model, "dfs", "0");
    expect(dfs.frames[dfs.frames.length - 1].nodes.filter((node) => node.visited).length).toBe(6);
    const dijkstra = executeOperation("graph", model, "dijkstra", "0 4");
    const last = dijkstra.frames[dijkstra.frames.length - 1];
    expect(last.narration).toMatch(/distance 6/);
    expect(last.nodes.filter((node) => node.path).map((node) => node.label)).toEqual(["0", "2", "3", "4"]);
    expect(last.edges.every((edge) => typeof edge.weight === "number")).toBe(true);
  });

  test("vertex/edge add and remove with invalid cases held", () => {
    const model = createInitialModel("graph") as GraphModel;
    const added = executeOperation("graph", model, "add-vertex", "").model as GraphModel;
    expect(added.vertices).toContain(6);
    expect(executeOperation("graph", model, "add-vertex", "3").model).toEqual(model);
    expect(executeOperation("graph", model, "add-vertex", "abc").model).toEqual(model);
    expect(executeOperation("graph", model, "add-edge", "0 1 4").model).toEqual(model);
    expect(executeOperation("graph", model, "add-edge", "2 2 5").model).toEqual(model);
    expect(executeOperation("graph", model, "add-edge", "0 1 -4").model).toEqual(model);
    const removedEdge = executeOperation("graph", model, "remove-edge", "0 1").model as GraphModel;
    expect(removedEdge.edges.length).toBe(model.edges.length - 1);
    expect(executeOperation("graph", model, "remove-edge", "0 5").model).toEqual(model);
    const removedVertex = executeOperation("graph", model, "remove-vertex", "1").model as GraphModel;
    expect(removedVertex.vertices).not.toContain(1);
    expect(removedVertex.edges.every((edge) => edge.from !== 1 && edge.to !== 1)).toBe(true);
    expect(executeOperation("graph", model, "remove-vertex", "42").model).toEqual(model);
  });

  test("disconnected graphs are reported", () => {
    const model = createInitialModel("graph") as GraphModel;
    let isolated = executeOperation("graph", model, "remove-edge", "1 5").model as GraphModel;
    isolated = executeOperation("graph", isolated, "remove-edge", "5 4").model as GraphModel;
    const bfs = executeOperation("graph", isolated, "bfs", "5");
    const last = bfs.frames[bfs.frames.length - 1];
    expect(last.nodes.filter((node) => node.visited).length).toBe(1);
    expect(last.narration).toMatch(/disconnected/);
    const dijkstra = executeOperation("graph", isolated, "dijkstra", "0 5");
    expect(dijkstra.frames[dijkstra.frames.length - 1].narration).toMatch(/disconnected/);
  });
});

test.describe("cross-structure frame contract", () => {
  test("every advertised operation yields synced frames", () => {
    const cases: Array<{ kind: "stack" | "queue" | "bst" | "avl" | "heap" | "graph"; operation: string; input: string }> = [
      { kind: "stack", operation: "push", input: "42" },
      { kind: "stack", operation: "pop", input: "" },
      { kind: "stack", operation: "peek", input: "" },
      { kind: "queue", operation: "enqueue", input: "42" },
      { kind: "queue", operation: "dequeue", input: "" },
      { kind: "bst", operation: "traverse", input: "" },
      { kind: "avl", operation: "search", input: "7" },
      { kind: "heap", operation: "sift-down", input: "" },
      { kind: "graph", operation: "bfs", input: "0" },
    ];
    const models: Record<string, StructureModel> = {
      stack: { values: [1, 2] },
      queue: { values: [1, 2] },
      bst: (createInitialModel("bst") as TreeModel),
      avl: (createInitialModel("avl") as TreeModel),
      heap: (createInitialModel("heap") as HeapModel),
      graph: createInitialModel("graph") as GraphModel,
    };
    for (const { kind, operation, input } of cases) {
      const result = executeOperation(kind, models[kind], operation, input);
      expectSyncedFrames(result.frames);
    }
  });
});
