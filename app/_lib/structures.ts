export type StructureKind = 'stack' | 'queue' | 'bst' | 'avl' | 'heap' | 'graph';

export type Shape = 'box' | 'sphere';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface SceneNode {
  id: string;
  label: string;
  detail?: string;
  position: Vec3;
  shape: Shape;
  active?: boolean;
  visited?: boolean;
  path?: boolean;
  ghost?: boolean;
  opacity?: number;
}

export interface SceneEdge {
  id: string;
  from: string;
  to: string;
  weight?: number;
  active?: boolean;
  path?: boolean;
}

export type CameraPreset = 'default' | 'graph' | 'rotate-left' | 'rotate-right';

export interface StepFrame {
  id: string;
  title: string;
  narration: string;
  pseudocode: string;
  complexity: string;
  nodes: SceneNode[];
  edges: SceneEdge[];
  activeId?: string | number;
  activeIndices?: number[];
  array?: string[];
  pathEdges?: string[];
  camera?: CameraPreset;
}

export interface TreeNode {
  id: number;
  value: number;
  left?: TreeNode;
  right?: TreeNode;
  height?: number;
}

export interface StackModel {
  values: number[];
}

export interface QueueModel {
  values: number[];
}

export interface TreeModel {
  root?: TreeNode;
  nextId: number;
}

export interface HeapModel {
  values: number[];
}

export interface GraphEdge {
  from: number;
  to: number;
  weight: number;
}

export interface GraphModel {
  vertices: number[];
  edges: GraphEdge[];
  nextId: number;
}

export type StructureModel =
  | StackModel
  | QueueModel
  | TreeModel
  | HeapModel
  | GraphModel;

export interface OperationDefinition {
  value: string;
  label: string;
  description: string;
  inputLabel: string;
  placeholder: string;
}

export interface OperationResult {
  model: StructureModel;
  frames: StepFrame[];
}

export const STRUCTURES: Record<
  StructureKind,
  { label: string; short: string; description: string; complexity: string }
> = {
  stack: {
    label: 'Stack',
    short: 'LIFO',
    description: 'Last in, first out access through one open end.',
    complexity: 'O(1) access',
  },
  queue: {
    label: 'Queue',
    short: 'FIFO',
    description: 'First in, first out flow through two endpoints.',
    complexity: 'O(1) access',
  },
  bst: {
    label: 'Binary search tree',
    short: 'BST',
    description: 'Ordered branching with comparisons guiding every move.',
    complexity: 'O(h) average',
  },
  avl: {
    label: 'AVL tree',
    short: 'AVL',
    description: 'A self-balancing search tree with explicit rotations.',
    complexity: 'O(log n)',
  },
  heap: {
    label: 'Heap',
    short: 'Priority',
    description: 'A min-heap: a complete tree where every parent holds a value no larger than its children.',
    complexity: 'O(log n)',
  },
  graph: {
    label: 'Graph',
    short: 'Network',
    description: 'Vertices and weighted edges for traversal problems.',
    complexity: 'O(V + E)',
  },
};

export const OPERATIONS: Record<StructureKind, OperationDefinition[]> = {
  stack: [
    {
      value: 'push',
      label: 'Push',
      description: 'Place a value on top of the stack.',
      inputLabel: 'Value',
      placeholder: '42',
    },
    {
      value: 'pop',
      label: 'Pop',
      description: 'Remove the most recently added value.',
      inputLabel: 'Value',
      placeholder: 'no input needed',
    },
    {
      value: 'peek',
      label: 'Peek',
      description: 'Inspect the top value without removing it.',
      inputLabel: 'Value',
      placeholder: 'no input needed',
    },
  ],
  queue: [
    {
      value: 'enqueue',
      label: 'Enqueue',
      description: 'Add a value to the rear of the queue.',
      inputLabel: 'Value',
      placeholder: '42',
    },
    {
      value: 'dequeue',
      label: 'Dequeue',
      description: 'Remove the value at the front of the queue.',
      inputLabel: 'Value',
      placeholder: 'no input needed',
    },
    {
      value: 'peek',
      label: 'Peek',
      description: 'Inspect the front value without removing it.',
      inputLabel: 'Value',
      placeholder: 'no input needed',
    },
  ],
  bst: [
    {
      value: 'insert',
      label: 'Insert',
      description: 'Compare, descend, and attach a new node.',
      inputLabel: 'Value',
      placeholder: '12',
    },
    {
      value: 'search',
      label: 'Search',
      description: 'Follow comparisons until the value is found.',
      inputLabel: 'Value',
      placeholder: '12',
    },
    {
      value: 'delete',
      label: 'Delete',
      description: 'Remove a node and reconnect its neighbors.',
      inputLabel: 'Value',
      placeholder: '12',
    },
    {
      value: 'traverse',
      label: 'Traverse',
      description: 'Walk the tree in-order; output must be sorted.',
      inputLabel: 'Value',
      placeholder: 'no input needed',
    },
  ],
  avl: [
    {
      value: 'insert',
      label: 'Insert',
      description: 'Insert, measure balance, and rotate when needed.',
      inputLabel: 'Value',
      placeholder: '12',
    },
    {
      value: 'search',
      label: 'Search',
      description: 'Follow comparisons; report balance along the path.',
      inputLabel: 'Value',
      placeholder: '12',
    },
    {
      value: 'delete',
      label: 'Delete',
      description: 'Remove a value and restore AVL balance.',
      inputLabel: 'Value',
      placeholder: '12',
    },
    {
      value: 'rotate-left',
      label: 'Rotate left',
      description: 'Pivot the root around its right child.',
      inputLabel: 'Value',
      placeholder: 'no input needed',
    },
    {
      value: 'rotate-right',
      label: 'Rotate right',
      description: 'Pivot the root around its left child.',
      inputLabel: 'Value',
      placeholder: 'no input needed',
    },
  ],
  heap: [
    {
      value: 'insert',
      label: 'Insert',
      description: 'Append, then sift the value upward (min-heap).',
      inputLabel: 'Value',
      placeholder: '12',
    },
    {
      value: 'extract',
      label: 'Extract min',
      description: 'Remove the root minimum, then sift downward.',
      inputLabel: 'Value',
      placeholder: 'no input needed',
    },
    {
      value: 'peek',
      label: 'Peek min',
      description: 'Inspect the root minimum without removing it.',
      inputLabel: 'Value',
      placeholder: 'no input needed',
    },
    {
      value: 'delete',
      label: 'Delete value',
      description: 'Remove one occurrence of a value and repair.',
      inputLabel: 'Value',
      placeholder: '12',
    },
    {
      value: 'sift-up',
      label: 'Sift up',
      description: 'Repair the heap from the last array cell.',
      inputLabel: 'Value',
      placeholder: 'no input needed',
    },
    {
      value: 'sift-down',
      label: 'Sift down',
      description: 'Repair the heap from the root.',
      inputLabel: 'Value',
      placeholder: 'no input needed',
    },
  ],
  graph: [
    {
      value: 'add-vertex',
      label: 'Add vertex',
      description: 'Create a new vertex in the network. Labels must be a single integer or left blank for automatic assignment.',
      inputLabel: 'Label',
      placeholder: 'auto',
    },
    {
      value: 'add-edge',
      label: 'Add edge',
      description: 'Connect two vertices with a weighted edge.',
      inputLabel: 'from to weight',
      placeholder: '0 1 4',
    },
    {
      value: 'remove-vertex',
      label: 'Remove vertex',
      description: 'Delete a vertex and its incident edges.',
      inputLabel: 'Vertex',
      placeholder: '0',
    },
    {
      value: 'remove-edge',
      label: 'Remove edge',
      description: 'Delete the edge between two vertices.',
      inputLabel: 'from to',
      placeholder: '0 1',
    },
    {
      value: 'bfs',
      label: 'BFS',
      description: 'Explore outward level by level.',
      inputLabel: 'Start',
      placeholder: '0',
    },
    {
      value: 'dfs',
      label: 'DFS',
      description: 'Explore as far as possible before backtracking.',
      inputLabel: 'Start',
      placeholder: '0',
    },
    {
      value: 'dijkstra',
      label: 'Dijkstra',
      description: 'Settle shortest distances from a source.',
      inputLabel: 'start target',
      placeholder: '0 5',
    },
  ],
};

export function createInitialModel(kind: StructureKind): StructureModel {
  switch (kind) {
    case 'stack':
      return { values: [12, 7, 19] };
    case 'queue':
      return { values: [4, 8, 15] };
    case 'bst': {
      let model: TreeModel = { nextId: 1 };
      [8, 3, 10, 1, 6, 14].forEach((value) => {
        model = insertBstModel(model, value).model as TreeModel;
      });
      return model;
    }
    case 'avl': {
      let model: TreeModel = { nextId: 1 };
      [10, 5, 15, 3, 7, 12, 18].forEach((value) => {
        model = insertAvlModel(model, value).model as TreeModel;
      });
      return model;
    }
    case 'heap':
      return { values: heapify([4, 10, 3, 1, 8]) };
    case 'graph':
      return {
        vertices: [0, 1, 2, 3, 4, 5],
        edges: [
          { from: 0, to: 1, weight: 4 },
          { from: 0, to: 2, weight: 1 },
          { from: 2, to: 3, weight: 2 },
          { from: 1, to: 3, weight: 1 },
          { from: 3, to: 4, weight: 3 },
          { from: 1, to: 5, weight: 2 },
          { from: 5, to: 4, weight: 6 },
        ],
        nextId: 6,
      };
  }
}

function heapify(values: number[]): number[] {
  const result = [...values];
  const siftDown = (index: number) => {
    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let smallest = index;
      if (left < result.length && result[left] < result[smallest]) smallest = left;
      if (right < result.length && result[right] < result[smallest]) smallest = right;
      if (smallest === index) return;
      [result[index], result[smallest]] = [result[smallest], result[index]];
      index = smallest;
    }
  };
  for (let index = Math.floor(result.length / 2) - 1; index >= 0; index -= 1) siftDown(index);
  return result;
}

export function isMinHeap(values: number[]): boolean {
  for (let index = 1; index < values.length; index += 1) {
    if (values[Math.floor((index - 1) / 2)] > values[index]) return false;
  }
  return true;
}

function prepareHeap(model: HeapModel): { values: number[]; normalized: boolean } {
  const values = [...model.values];
  return isMinHeap(values) ? { values, normalized: false } : { values: heapify(values), normalized: true };
}

export function randomizeModel(kind: StructureKind): StructureModel {
  const pick = () => Math.floor(Math.random() * 89) + 10;
  switch (kind) {
    case 'stack':
      return { values: Array.from({ length: 4 }, pick) };
    case 'queue':
      return { values: Array.from({ length: 5 }, pick) };
    case 'bst': {
      let model: TreeModel = { nextId: 1 };
      Array.from({ length: 6 }, pick).forEach((value) => {
        model = insertBstModel(model, value).model as TreeModel;
      });
      return model;
    }
    case 'avl': {
      let model: TreeModel = { nextId: 1 };
      Array.from({ length: 7 }, pick).forEach((value) => {
        model = insertAvlModel(model, value).model as TreeModel;
      });
      return model;
    }
    case 'heap':
      return { values: heapify(Array.from({ length: 7 }, pick)) };
    case 'graph': {
      const vertices = [0, 1, 2, 3, 4, 5];
      const edges: GraphEdge[] = [];
      for (let from = 0; from < vertices.length; from += 1) {
        for (let to = from + 1; to < vertices.length; to += 1) {
          if (Math.random() > 0.62) {
            edges.push({ from, to, weight: Math.floor(Math.random() * 9) + 1 });
          }
        }
      }
      return { vertices, edges, nextId: vertices.length };
    }
  }
}

export function initialFrames(kind: StructureKind, model: StructureModel): StepFrame[] {
  switch (kind) {
    case 'stack': {
      const values = (model as StackModel).values;
      return [
        makeFrame(
          'stack-overview',
          'Stack / ready',
          'The top of the stack is the only end that accepts a push or pop.',
          'top <- n - 1',
          'O(1)',
          stackNodes(values),
          [],
          { activeId: nodeId(values.length - 1), camera: 'default' },
        ),
      ];
    }
    case 'queue': {
      const values = (model as QueueModel).values;
      return [
        makeFrame(
          'queue-overview',
          'Queue / ready',
          'New values enter at rear; service begins at front.',
          'front -> 0    rear -> n - 1',
          'O(1)',
          queueNodes(values),
          [],
          { activeId: nodeId(0), camera: 'default' },
        ),
      ];
    }
    case 'bst': {
      const root = (model as TreeModel).root;
      return [
        makeFrame(
          'bst-overview',
          'BST / ready',
          'Left branches hold smaller values; right branches hold larger values.',
          'if key < node: go left',
          'O(h)',
          ...treeScene(root),
        ),
      ];
    }
    case 'avl': {
      const root = (model as TreeModel).root;
      return [
        makeFrame(
          'avl-overview',
          'AVL / ready',
          'Every node carries a balance factor between -1 and 1.',
          'balance = height(left) - height(right)',
          'O(log n)',
          ...treeScene(root, { avl: true }),
        ),
      ];
    }
    case 'heap': {
      const values = (model as HeapModel).values;
      return [
        makeFrame(
          'heap-overview',
          'Heap / ready',
          'The array order is the tree order; parent and child indices stay in lockstep.',
          'parent(i) = floor((i - 1) / 2)',
          'O(1) root',
          ...heapScene(values),
          { array: values.map(String), camera: 'default' },
        ),
      ];
    }
    case 'graph': {
      const graph = model as GraphModel;
      return [
        makeFrame(
          'graph-overview',
          'Graph / ready',
          'Vertices store state; weighted edges define the cost of movement.',
          'dist[source] = 0',
          'O(V + E)',
          ...graphScene(graph),
        ),
      ];
    }
  }
}

export const MAX_INPUT_VALUE = 100000;

export type ParsedInt = { ok: true; value: number } | { ok: false; reason: string };

export function parseStrictInt(raw: string | undefined): ParsedInt {
  if (raw === undefined || raw === null) return { ok: false, reason: 'No value was entered. Type an integer or pick RANDOM.' };
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false, reason: 'The input is empty. Type an integer before running the operation.' };
  if (!/^-?\d+$/.test(trimmed)) {
    return { ok: false, reason: `"${trimmed}" is not an integer. Use digits only (optional leading "-").` };
  }
  const value = Number(trimmed);
  if (!Number.isSafeInteger(value)) {
    return { ok: false, reason: `"${trimmed}" is not a safe integer. Keep values within ±${MAX_INPUT_VALUE}.` };
  }
  if (Math.abs(value) > MAX_INPUT_VALUE) {
    return { ok: false, reason: `${value} is too large. Keep values within ±${MAX_INPUT_VALUE} so the stage stays legible.` };
  }
  return { ok: true, value };
}

function randomValue(): number {
  return Math.floor(Math.random() * 89) + 10;
}

function heldFrame(
  id: string,
  title: string,
  narration: string,
  pseudocode: string,
  nodes: SceneNode[],
  edges: SceneEdge[] = [],
  extra: Partial<StepFrame> = {},
): StepFrame {
  return makeFrame(id, title, `${narration} The structure is unchanged.`, pseudocode, 'O(1)', nodes, edges, extra);
}

export function executeOperation(
  kind: StructureKind,
  model: StructureModel,
  operation: string,
  inputValue?: string,
  randomize = false,
): OperationResult {
  switch (kind) {
    case 'stack':
      return executeStack(model as StackModel, operation, inputValue, randomize);
    case 'queue':
      return executeQueue(model as QueueModel, operation, inputValue, randomize);
    case 'bst':
      return executeBst(model as TreeModel, operation, inputValue, randomize);
    case 'avl':
      return executeAvl(model as TreeModel, operation, inputValue, randomize);
    case 'heap':
      return executeHeap(model as HeapModel, operation, inputValue, randomize);
    case 'graph':
      return executeGraph(model as GraphModel, operation, inputValue ?? '0 1 4');
  }
}

function makeFrame(
  id: string,
  title: string,
  narration: string,
  pseudocode: string,
  complexity: string,
  nodes: SceneNode[],
  edges?: SceneEdge[],
  options: Partial<StepFrame> = {},
): StepFrame {
  return {
    id,
    title,
    narration,
    pseudocode,
    complexity,
    nodes,
    edges: edges ?? [],
    ...options,
  };
}

function nodeId(index: number): string {
  return `item-${index}`;
}

function stackNodes(values: number[], activeIndex?: number): SceneNode[] {
  return values.map((value, index) => ({
    id: nodeId(index),
    label: String(value),
    position: { x: 0, y: (values.length - 1 - index) * 1.55, z: 0 },
    shape: 'box' as const,
    active: index === activeIndex || (activeIndex === undefined && index === values.length - 1),
  }));
}

function queueNodes(values: number[], activeIndex?: number): SceneNode[] {
  const center = (values.length - 1) / 2;
  return values.map((value, index) => ({
    id: nodeId(index),
    label: String(value),
    position: { x: (index - center) * 2.25, y: 0, z: 0 },
    shape: 'box' as const,
    active: activeIndex !== undefined ? index === activeIndex : index === 0,
  }));
}

function heapScene(values: number[], activeIndices: number[] = []): [SceneNode[], SceneEdge[]] {
  const nodes: SceneNode[] = [];
  const edges: SceneEdge[] = [];
  values.forEach((value, index) => {
    const depth = Math.floor(Math.log2(index + 1));
    const levelStart = 2 ** depth;
    const levelCount = 2 ** depth;
    const spacing = 6.8 / levelCount;
    const x = (index - (levelStart - 1) - (levelCount - 1) / 2) * spacing;
    nodes.push({
      id: nodeId(index),
      label: String(value),
      detail: `i=${index}`,
      position: { x, y: -depth * 2.15, z: 0 },
      shape: index === 0 ? 'sphere' : 'box',
      active: activeIndices.includes(index),
    });
    if (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      edges.push({ id: `edge-${parent}-${index}`, from: nodeId(parent), to: nodeId(index) });
    }
  });
  return [nodes, edges];
}

function treeScene(
  root?: TreeNode,
  options: { avl?: boolean; activeId?: string | number; visitedIds?: number[]; pathIds?: number[] } = {},
): [SceneNode[], SceneEdge[]] {
  const points: Array<{ node: TreeNode; depth: number; parent?: TreeNode }> = [];
  const walk = (node?: TreeNode, depth = 0, parent?: TreeNode) => {
    if (!node) return;
    walk(node.left, depth + 1, node);
    points.push({ node, depth, parent });
    walk(node.right, depth + 1, node);
  };
  walk(root);
  const nodes: SceneNode[] = points.map(({ node, depth }, index) => ({
    id: `node-${node.id}`,
    label: String(node.value),
    detail: options.avl ? `bf ${getBalance(node)}` : undefined,
    position: {
      x: (index - (points.length - 1) / 2) * 2.65,
      y: -depth * 2.35,
      z: 0,
    },
    shape: 'sphere' as const,
    active: node.id === options.activeId,
    visited: options.visitedIds?.includes(node.id),
    path: options.pathIds?.includes(node.id),
  }));
  const edges: SceneEdge[] = points.flatMap(({ node, parent }) =>
    parent ? [{ id: `edge-${parent.id}-${node.id}`, from: `node-${parent.id}`, to: `node-${node.id}` }] : [],
  );
  return [nodes, edges];
}

function edgeId(from: number, to: number): string {
  const [left, right] = from <= to ? [from, to] : [to, from];
  return `edge-${left}-${right}`;
}

function graphAdjacency(graph: GraphModel): Map<number, Array<{ to: number; edge: GraphEdge }>> {
  const adjacency = new Map<number, Array<{ to: number; edge: GraphEdge }>>(
    graph.vertices.map((vertex) => [vertex, []]),
  );
  graph.edges.forEach((edge) => {
    if (!adjacency.has(edge.from) || !adjacency.has(edge.to) || edge.from === edge.to) return;
    adjacency.get(edge.from)?.push({ to: edge.to, edge });
    adjacency.get(edge.to)?.push({ to: edge.from, edge });
  });
  // Sort neighbors for deterministic traversal order across runs.
  adjacency.forEach((list) => list.sort((a, b) => a.to - b.to));
  return adjacency;
}

function graphScene(
  graph: GraphModel,
  options: {
    activeId?: number;
    visitedIds?: number[];
    pathIds?: number[];
    pathEdges?: string[];
    activeEdge?: string;
    distances?: Record<number, number>;
  } = {},
): [SceneNode[], SceneEdge[]] {
  const radius = graph.vertices.length > 1 ? 4.2 : 0;
  const nodes: SceneNode[] = graph.vertices.map((id, index) => {
    const angle = (Math.PI * 2 * index) / graph.vertices.length - Math.PI / 2;
    return {
      id: `vertex-${id}`,
      label: String(id),
      detail: options.distances?.[id] !== undefined ? (options.distances[id] === Number.POSITIVE_INFINITY ? 'd=∞' : `d=${options.distances[id]}`) : undefined,
      position: { x: Math.cos(angle) * radius, y: 0, z: Math.sin(angle) * radius },
      shape: 'sphere' as const,
      active: id === options.activeId,
      visited: options.visitedIds?.includes(id),
      path: options.pathIds?.includes(id),
    };
  });
  const edges: SceneEdge[] = graph.edges.map((edge) => ({
    id: edgeId(edge.from, edge.to),
    from: `vertex-${edge.from}`,
    to: `vertex-${edge.to}`,
    weight: edge.weight,
    active: options.activeEdge === edgeId(edge.from, edge.to),
    path: options.pathEdges?.includes(edgeId(edge.from, edge.to)) ?? false,
  }));
  return [nodes, edges];
}

function executeStack(model: StackModel, operation: string, rawInput?: string, randomize = false): OperationResult {
  if (operation === 'peek') {
    if (!model.values.length) {
      return { model, frames: [heldFrame('stack-peek-empty', 'Peek / empty', 'The stack is empty, so there is no top value to inspect.', 'if top = -1: return null', stackNodes([]))] };
    }
    const top = model.values[model.values.length - 1];
    return {
      model,
      frames: [
        makeFrame('stack-peek', 'Peek / inspect', `${top} is the top value. Peek only reads it; nothing is added or removed.`, 'value <- stack[top]', 'O(1)', stackNodes(model.values, model.values.length - 1)),
      ],
    };
  }
  if (operation === 'push') {
    const parsed: ParsedInt = randomize ? { ok: true, value: randomValue() } : parseStrictInt(rawInput);
    if (!parsed.ok) {
      return { model, frames: [heldFrame('stack-push-invalid', 'Push / held', `Invalid input. ${parsed.reason}`, 'require integer in ±100000', stackNodes(model.values))] };
    }
    const numeric = parsed.value;
    const values = [...model.values, numeric];
    return {
      model: { values },
      frames: [
        makeFrame('stack-push-start', 'Push / approach', `Read ${numeric} as the incoming value.`, 'newNode.value <- key', 'O(1)', stackNodes(model.values)),
        makeFrame('stack-push-end', 'Push / settle', `${numeric} becomes the new top (LIFO); the previous top is now below it.`, 'top <- top + 1', 'O(1)', stackNodes(values, values.length - 1)),
      ],
    };
  }
  if (!model.values.length) {
    return { model, frames: [heldFrame('stack-pop-empty', 'Pop / empty', 'The stack is empty, so there is no top value to remove (underflow).', 'if top = -1: return null', stackNodes([]))] };
  }
  const values = model.values.slice(0, -1);
  return {
    model: { values },
    frames: [
      makeFrame('stack-pop-start', 'Pop / lift', `The top value ${model.values[model.values.length - 1]} is selected for removal (LIFO).`, 'value <- stack[top]', 'O(1)', stackNodes(model.values, model.values.length - 1)),
      makeFrame('stack-pop-end', 'Pop / close', 'The top block leaves the stage and the new top is exposed.', 'top <- top - 1', 'O(1)', stackNodes(values, values.length - 1)),
    ],
  };
}

function executeQueue(model: QueueModel, operation: string, rawInput?: string, randomize = false): OperationResult {
  if (operation === 'peek') {
    if (!model.values.length) {
      return { model, frames: [heldFrame('queue-peek-empty', 'Peek / empty', 'The queue is empty, so there is no front value to inspect.', 'if front > rear: return null', queueNodes([]))] };
    }
    return {
      model,
      frames: [
        makeFrame('queue-peek', 'Peek / inspect', `${model.values[0]} is the front value. Peek only reads it; the queue order is unchanged.`, 'value <- queue[front]', 'O(1)', queueNodes(model.values, 0)),
      ],
    };
  }
  if (operation === 'enqueue') {
    const parsed: ParsedInt = randomize ? { ok: true, value: randomValue() } : parseStrictInt(rawInput);
    if (!parsed.ok) {
      return { model, frames: [heldFrame('queue-enqueue-invalid', 'Enqueue / held', `Invalid input. ${parsed.reason}`, 'require integer in ±100000', queueNodes(model.values))] };
    }
    const numeric = parsed.value;
    const values = [...model.values, numeric];
    return {
      model: { values },
      frames: [
        makeFrame('queue-enqueue-start', 'Enqueue / approach', `Prepare to add ${numeric} at the rear of the queue.`, 'rear <- rear + 1', 'O(1)', queueNodes(model.values, -1)),
        makeFrame('queue-enqueue-end', 'Enqueue / settle', `${numeric} is now the rear value (FIFO); the front remains ready for service.`, 'queue[rear] <- key', 'O(1)', queueNodes(values, values.length - 1)),
      ],
    };
  }
  if (!model.values.length) {
    return { model, frames: [heldFrame('queue-dequeue-empty', 'Dequeue / empty', 'The queue is empty, so there is no front value to remove (underflow).', 'if front > rear: return null', queueNodes([]))] };
  }
  const values = model.values.slice(1);
  return {
    model: { values },
    frames: [
      makeFrame('queue-dequeue-start', 'Dequeue / release', `The front value ${model.values[0]} leaves the queue (FIFO).`, 'value <- queue[front]', 'O(1)', queueNodes(model.values, 0)),
      makeFrame('queue-dequeue-end', 'Dequeue / close', 'Every remaining value shifts forward to close the gap.', 'front <- front + 1', 'O(1)', queueNodes(values, 0)),
    ],
  };
}

function executeBst(model: TreeModel, operation: string, rawInput?: string, randomize = false): OperationResult {
  if (operation === 'traverse') {
    return traverseBstModel(model);
  }
  const parsed: ParsedInt = randomize ? { ok: true, value: randomValue() } : parseStrictInt(rawInput);
  if (!parsed.ok) {
    const [nodes, edges] = treeScene(model.root);
    return { model, frames: [heldFrame(`bst-${operation}-invalid`, 'BST / held', `Invalid input. ${parsed.reason}`, 'require integer in ±100000', nodes, edges)] };
  }
  if (operation === 'insert') {
    return insertBstModel(model, parsed.value);
  }
  if (operation === 'search') {
    return searchBstModel(model, parsed.value);
  }
  return deleteBstModel(model, parsed.value);
}

export function isBstOrdered(root?: TreeNode): boolean {
  let prev = -Number.MAX_SAFE_INTEGER;
  let ordered = true;
  const walk = (node?: TreeNode) => {
    if (!node || !ordered) return;
    walk(node.left);
    if (node.value <= prev) ordered = false;
    prev = node.value;
    walk(node.right);
  };
  walk(root);
  return ordered;
}

function insertBstModel(model: TreeModel, value: number): OperationResult {
  const frames: StepFrame[] = [];
  let sequence = 0;
  let liveRoot = cloneTree(model.root);
  let nextId = model.nextId;
  let attachedId: number | undefined;
  let duplicate = false;
  const snapshot = (title: string, narration: string, pseudocode: string, activeId?: number) => {
    sequence += 1;
    frames.push(makeFrame(`bst-insert-${sequence}`, title, narration, pseudocode, 'O(h)', ...treeScene(liveRoot, { activeId })));
  };
  snapshot('Insert / begin', `Descend from the root to place ${value}. Duplicates are rejected.`, 'node <- root');
  const rec = (node?: TreeNode): TreeNode => {
    if (!node) {
      const created: TreeNode = { id: nextId, value };
      nextId += 1;
      attachedId = created.id;
      return created;
    }
    snapshot('Insert / compare', `${value} is compared with ${node.value}.`, `if key < ${node.value}: go left`, node.id);
    if (value < node.value) {
      node.left = rec(node.left);
    } else if (value > node.value) {
      node.right = rec(node.right);
    } else {
      duplicate = true;
      snapshot('Insert / duplicate', `${value} already exists; the tree is unchanged.`, 'return root (no change)', node.id);
    }
    return node;
  };
  if (!liveRoot) {
    liveRoot = rec(undefined);
  } else {
    rec(liveRoot);
  }
  if (duplicate) {
    return { model, frames };
  }
  snapshot('Insert / attach', `${value} attaches as a new leaf. In-order order is preserved.`, 'attach leaf; ancestors unchanged', attachedId);
  return { model: { root: liveRoot, nextId }, frames };
}

function searchBstModel(model: TreeModel, value: number): OperationResult {
  const frames: StepFrame[] = [];
  let sequence = 0;
  const snapshot = (title: string, narration: string, pseudocode: string, activeId?: number) => {
    sequence += 1;
    frames.push(makeFrame(`bst-search-${sequence}`, title, narration, pseudocode, 'O(h)', ...treeScene(model.root, { activeId })));
  };
  let current = model.root;
  snapshot('Search / begin', `Start at the root and compare ${value}. The tree is not modified.`, 'node <- root', current?.id);
  while (current) {
    if (value === current.value) {
      snapshot('Search / found', `${value} is present at this node. The tree is unchanged.`, 'return node', current.id);
      return { model, frames };
    }
    const direction = value < current.value ? 'left' : 'right';
    snapshot('Search / compare', `${value} is compared with ${current.value}; move ${direction}.`, `node <- node.${direction}`, current.id);
    current = value < current.value ? current.left : current.right;
  }
  snapshot('Search / absent', `${value} is not present; the search reached an empty branch. The tree is unchanged.`, 'return null', undefined);
  return { model, frames };
}

function deleteBstModel(model: TreeModel, value: number): OperationResult {
  const frames: StepFrame[] = [];
  let sequence = 0;
  let liveRoot = cloneTree(model.root);
  const snapshot = (title: string, narration: string, pseudocode: string, activeId?: number) => {
    sequence += 1;
    frames.push(makeFrame(`bst-delete-${sequence}`, title, narration, pseudocode, 'O(h)', ...treeScene(liveRoot, { activeId })));
  };
  snapshot('Delete / locate', `Find the node containing ${value}.`, 'node <- root');
  let current = liveRoot;
  let found = false;
  while (current) {
    if (current.value === value) {
      found = true;
      break;
    }
    snapshot('Delete / compare', `${value} is compared with ${current.value}.`, value < current.value ? 'node <- node.left' : 'node <- node.right', current.id);
    current = value < current.value ? current.left : current.right;
  }
  if (!found) {
    snapshot('Delete / absent', `${value} is not in the tree; no links change.`, 'return root (no change)');
    return { model, frames };
  }
  const childCount = (current?.left ? 1 : 0) + (current?.right ? 1 : 0);
  const caseName = childCount === 0 ? 'leaf: remove the link from its parent' : childCount === 1 ? 'one child: splice the child into place' : 'two children: copy the in-order successor, then delete the successor';
  snapshot('Delete / case', `Node ${value} has ${childCount === 0 ? 'no children' : childCount === 1 ? 'one child' : 'two children'} — ${caseName}.`, 'classify case', current?.id);
  liveRoot = deleteNode(liveRoot, value);
  snapshot('Delete / reconnect', `${value} is removed and links are reconnected. In-order order is preserved.`, 'splice node; relink children');
  return { model: { root: liveRoot, nextId: model.nextId }, frames };
}

function traverseBstModel(model: TreeModel): OperationResult {
  const frames: StepFrame[] = [];
  if (!model.root) {
    return { model, frames: [heldFrame('bst-traverse-empty', 'Traverse / empty', 'The tree is empty, so in-order traversal yields nothing.', 'if root = null: return []', ...treeScene(undefined))] };
  }
  const order: TreeNode[] = [];
  const walk = (node?: TreeNode) => {
    if (!node) return;
    walk(node.left);
    order.push(node);
    walk(node.right);
  };
  walk(model.root);
  const seen: number[] = [];
  order.forEach((node, index) => {
    seen.push(node.id);
    frames.push(
      makeFrame(
        `bst-traverse-${index + 1}`,
        'Traverse / visit',
        `In-order visit ${index + 1}/${order.length}: ${node.value}. Output so far: [${order.slice(0, index + 1).map((item) => item.value).join(', ')}].`,
        'visit left; emit; visit right',
        'O(n)',
        ...treeScene(model.root, { activeId: node.id, visitedIds: seen.slice(0, -1), pathIds: seen }),
      ),
    );
  });
  const values = order.map((node) => node.value);
  const sorted = values.every((item, index) => index === 0 || values[index - 1] < item);
  frames.push(
    makeFrame(
      'bst-traverse-done',
      'Traverse / complete',
      `In-order output [${values.join(', ')}] ${sorted ? 'is sorted, confirming the BST invariant' : 'is NOT sorted — the BST invariant is violated'}. The tree is unchanged.`,
      'in-order = sorted <=> BST valid',
      'O(n)',
      ...treeScene(model.root, { visitedIds: seen }),
    ),
  );
  return { model, frames };
}

function deleteNode(node: TreeNode | undefined, value: number): TreeNode | undefined {
  if (!node) return undefined;
  if (value < node.value) {
    node.left = deleteNode(node.left, value);
  } else if (value > node.value) {
    node.right = deleteNode(node.right, value);
  } else {
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    const successor = minValueNode(node.right);
    node.value = successor.value;
    node.right = deleteMinNode(node.right);
  }
  return node;
}

function deleteMinNode(node: TreeNode): TreeNode | undefined {
  if (!node.left) return node.right;
  node.left = deleteMinNode(node.left as TreeNode);
  return node;
}

function minValueNode(node?: TreeNode): TreeNode {
  let current = node;
  while (current?.left) current = current.left;
  if (!current) throw new Error('Missing successor');
  return current;
}

export function avlAudit(root?: TreeNode): { ok: boolean; worst: number; violations: number[] } {
  let worst = 0;
  const violations: number[] = [];
  const walk = (node?: TreeNode) => {
    if (!node) return;
    const balance = getBalance(node);
    if (Math.abs(balance) > worst) worst = Math.abs(balance);
    if (Math.abs(balance) > 1) violations.push(node.value);
    walk(node.left);
    walk(node.right);
  };
  walk(root);
  return { ok: violations.length === 0, worst, violations };
}

function executeAvl(model: TreeModel, operation: string, rawInput?: string, randomize = false): OperationResult {
  if (operation === 'rotate-left' || operation === 'rotate-right') return rotateAvlModel(model, operation);
  const parsed: ParsedInt = randomize ? { ok: true, value: randomValue() } : parseStrictInt(rawInput);
  if (!parsed.ok) {
    const [nodes, edges] = treeScene(model.root, { avl: true });
    return { model, frames: [heldFrame(`avl-${operation}-invalid`, 'AVL / held', `Invalid input. ${parsed.reason}`, 'require integer in ±100000', nodes, edges)] };
  }
  if (operation === 'insert') return insertAvlModel(model, parsed.value);
  if (operation === 'search') return searchAvlModel(model, parsed.value);
  return deleteAvlModel(model, parsed.value);
}

function insertAvlModel(model: TreeModel, value: number): OperationResult {
  const frames: StepFrame[] = [];
  let sequence = 0;
  let liveRoot = cloneTree(model.root);
  let nextId = model.nextId;
  let attachedId: number | undefined;
  let duplicate = false;
  const rotations: Array<{ kind: string; at: number; caseName: string; camera: CameraPreset }> = [];
  const snapshot = (title: string, narration: string, pseudocode: string, activeId?: number, camera?: CameraPreset) => {
    sequence += 1;
    frames.push(makeFrame(`avl-insert-${sequence}`, title, narration, pseudocode, 'O(log n)', ...treeScene(liveRoot, { avl: true, activeId }), { camera }));
  };
  snapshot('AVL / begin', `Insert ${value}, then check balance factors on the return path. Duplicates are rejected.`, 'node <- root');
  const insert = (node?: TreeNode): TreeNode => {
    if (!node) {
      const created: TreeNode = { id: nextId, value, height: 1 };
      nextId += 1;
      attachedId = created.id;
      return created;
    }
    snapshot('AVL / compare', `${value} is compared with ${node.value}.`, value < node.value ? 'go left' : 'go right', node.id);
    if (value < node.value) node.left = insert(node.left);
    else if (value > node.value) node.right = insert(node.right);
    else {
      duplicate = true;
      snapshot('AVL / duplicate', `${value} already exists; no rotation is needed and nothing changes.`, 'return root (no change)', node.id);
      return node;
    }
    if (duplicate) return node; // subtree reported a duplicate: heights below are untouched, unwind without new frames
    node.height = nodeHeight(node);
    const balance = getBalance(node);
    snapshot('AVL / measure', `Node ${node.value} now has balance factor ${balance} (left height minus right height).`, 'balance <- height(left) - height(right)', node.id);
    if (balance > 1) {
      if (getBalance(node.left) >= 0) {
        snapshot('AVL / case LL', `Left-left heavy at ${node.value}: a single right rotation fixes it.`, 'case LL: rotateRight(node)', node.id);
        rotations.push({ kind: 'rotate right', at: node.value, caseName: 'LL', camera: 'rotate-right' });
        return rotateRight(node);
      }
      snapshot('AVL / case LR', `Left-right heavy at ${node.value}: rotate the left child left first, then rotate right.`, 'case LR: rotateLeft(left); rotateRight(node)', node.id);
      node.left = rotateLeft(node.left as TreeNode);
      rotations.push({ kind: 'left-right double rotation', at: node.value, caseName: 'LR', camera: 'rotate-right' });
      return rotateRight(node);
    }
    if (balance < -1) {
      if (getBalance(node.right) <= 0) {
        snapshot('AVL / case RR', `Right-right heavy at ${node.value}: a single left rotation fixes it.`, 'case RR: rotateLeft(node)', node.id);
        rotations.push({ kind: 'rotate left', at: node.value, caseName: 'RR', camera: 'rotate-left' });
        return rotateLeft(node);
      }
      snapshot('AVL / case RL', `Right-left heavy at ${node.value}: rotate the right child right first, then rotate left.`, 'case RL: rotateRight(right); rotateLeft(node)', node.id);
      node.right = rotateRight(node.right as TreeNode);
      rotations.push({ kind: 'right-left double rotation', at: node.value, caseName: 'RL', camera: 'rotate-left' });
      return rotateLeft(node);
    }
    return node;
  };
  if (!liveRoot) {
    liveRoot = insert(undefined);
    snapshot('AVL / attach', `${value} becomes the root with height 1.`, 'root <- newNode', attachedId);
  } else {
    liveRoot = insert(liveRoot);
    if (duplicate) {
      return { model, frames };
    }
    snapshot('AVL / attach', `${value} attaches as a new leaf with height 1.`, 'height(node) <- 1', attachedId);
  }
  rotations.forEach((rotation) => {
    snapshot(
      `AVL / ${rotation.kind}`,
      `A ${rotation.kind} at ${rotation.at} restores balance (${rotation.caseName} case).`,
      rotation.caseName === 'LL' || rotation.caseName === 'LR' ? 'rotateRight(node)' : 'rotateLeft(node)',
      undefined,
      rotation.camera,
    );
  });
  const audit = avlAudit(liveRoot);
  snapshot(
    'AVL / settled',
    audit.ok
      ? `Insertion complete: every balance factor satisfies |bf| ≤ 1 (worst ${audit.worst}).`
      : `Imbalance remains at [${audit.violations.join(', ')}]; the invariant is violated.`,
    'verify |balance| <= 1 everywhere',
    attachedId,
  );
  return { model: { root: liveRoot, nextId }, frames };
}

function searchAvlModel(model: TreeModel, value: number): OperationResult {
  const frames: StepFrame[] = [];
  let sequence = 0;
  const snapshot = (title: string, narration: string, pseudocode: string, activeId?: number) => {
    sequence += 1;
    frames.push(makeFrame(`avl-search-${sequence}`, title, narration, pseudocode, 'O(log n)', ...treeScene(model.root, { avl: true, activeId })));
  };
  let current = model.root;
  snapshot('AVL / begin', `Search for ${value}; balance factors are shown at every node. The tree is not modified.`, 'node <- root', current?.id);
  while (current) {
    if (value === current.value) {
      snapshot('AVL / found', `${value} is present with balance factor ${getBalance(current)}. The tree is unchanged.`, 'return node', current.id);
      return { model, frames };
    }
    const direction = value < current.value ? 'left' : 'right';
    snapshot('AVL / compare', `${value} is compared with ${current.value} (bf ${getBalance(current)}); move ${direction}.`, `node <- node.${direction}`, current.id);
    current = value < current.value ? current.left : current.right;
  }
  snapshot('AVL / absent', `${value} is not present. The tree is unchanged.`, 'return null');
  return { model, frames };
}

function deleteAvlModel(model: TreeModel, value: number): OperationResult {
  const frames: StepFrame[] = [];
  let sequence = 0;
  let liveRoot = cloneTree(model.root);
  const rotations: Array<{ kind: string; at: number; caseName: string; camera: CameraPreset }> = [];
  const snapshot = (title: string, narration: string, pseudocode: string, activeId?: number, camera?: CameraPreset) => {
    sequence += 1;
    frames.push(makeFrame(`avl-delete-${sequence}`, title, narration, pseudocode, 'O(log n)', ...treeScene(liveRoot, { avl: true, activeId }), { camera }));
  };
  snapshot('AVL / locate', `Find ${value} before removing it.`, 'node <- root');
  let current = liveRoot;
  while (current && current.value !== value) {
    snapshot('AVL / compare', `${value} is compared with ${current.value} (bf ${getBalance(current)}).`, value < current.value ? 'go left' : 'go right', current.id);
    current = value < current.value ? current.left : current.right;
  }
  if (!current) {
    snapshot('AVL / absent', `${value} is not present; the AVL is unchanged.`, 'return root (no change)');
    return { model, frames };
  }
  const childCount = (current.left ? 1 : 0) + (current.right ? 1 : 0);
  const caseName = childCount === 0 ? 'leaf' : childCount === 1 ? 'one child' : 'two children';
  snapshot('AVL / case', `Node ${value} has ${caseName} — ${caseName === 'leaf' ? 'remove the link from its parent' : caseName === 'one child' ? 'splice the child into place' : 'copy in-order successor, then delete successor'}.`, 'classify case', current.id);
  liveRoot = deleteAvlNodeWithFrames(liveRoot, value, snapshot, rotations);
  rotations.forEach((rotation) => {
    snapshot(
      `AVL / ${rotation.kind}`,
      `A ${rotation.kind} at ${rotation.at} restores balance (${rotation.caseName} case).`,
      rotation.caseName === 'LL' || rotation.caseName === 'LR' ? 'rotateRight(node)' : 'rotateLeft(node)',
      undefined,
      rotation.camera,
    );
  });
  const audit = avlAudit(liveRoot);
  snapshot(
    'AVL / settled',
    audit.ok
      ? `Deletion complete: ${value} removed and the affected path is rebalanced; every balance factor satisfies |bf| ≤ 1 (worst ${audit.worst}).`
      : `${value} is removed but imbalance remains at [${audit.violations.join(', ')}]; the invariant is violated.`,
    'verify |balance| <= 1 everywhere',
    liveRoot?.id,
  );
  return { model: { root: liveRoot, nextId: model.nextId }, frames };
}

function deleteAvlNodeWithFrames(node: TreeNode | undefined, value: number, snapshot: (title: string, narration: string, pseudocode: string, activeId?: number, camera?: CameraPreset) => void, rotations: Array<{ kind: string; at: number; caseName: string; camera: CameraPreset }>): TreeNode | undefined {
  if (!node) return undefined;
  if (value < node.value) {
    node.left = deleteAvlNodeWithFrames(node.left, value, snapshot, rotations);
  } else if (value > node.value) {
    node.right = deleteAvlNodeWithFrames(node.right, value, snapshot, rotations);
  } else {
    if (!node.left) {
      snapshot('AVL / remove leaf', `Node ${value} is a leaf; removing its link from parent.`, 'return right (which is null)', node.id);
      return node.right;
    }
    if (!node.right) {
      snapshot('AVL / splice', `Node ${value} has one child; splicing the child into place.`, 'return left', node.id);
      return node.left;
    }
    const successor = minValueNode(node.right);
    snapshot('AVL / successor', `Node ${value} has two children; copying in-order successor ${successor.value}.`, 'node.value <- successor.value', node.id);
    node.value = successor.value;
    node.right = deleteAvlNodeWithFrames(node.right, successor.value, snapshot, rotations);
  }
  node.height = nodeHeight(node);
  return rebalanceAvlWithFrames(node, snapshot, rotations);
}

function rebalanceAvlWithFrames(node: TreeNode, snapshot: (title: string, narration: string, pseudocode: string, activeId?: number, camera?: CameraPreset) => void, rotations: Array<{ kind: string; at: number; caseName: string; camera: CameraPreset }>): TreeNode {
  node.height = nodeHeight(node);
  const balance = getBalance(node);
  if (balance > 1) {
    if (getBalance(node.left) >= 0) {
      rotations.push({ kind: 'rotate right', at: node.value, caseName: 'LL', camera: 'rotate-right' });
      return rotateRight(node);
    }
    rotations.push({ kind: 'left-right double rotation', at: node.value, caseName: 'LR', camera: 'rotate-right' });
    node.left = rotateLeft(node.left as TreeNode);
    return rotateRight(node);
  }
  if (balance < -1) {
    if (getBalance(node.right) <= 0) {
      rotations.push({ kind: 'rotate left', at: node.value, caseName: 'RR', camera: 'rotate-left' });
      return rotateLeft(node);
    }
    rotations.push({ kind: 'right-left double rotation', at: node.value, caseName: 'RL', camera: 'rotate-left' });
    node.right = rotateRight(node.right as TreeNode);
    return rotateLeft(node);
  }
  return node;
}

function rotateAvlModel(model: TreeModel, operation: string): OperationResult {
  const root = cloneTree(model.root);
  if (!root) return { model, frames: [heldFrame('avl-rotate-empty', 'AVL / empty', 'There is no node to rotate.', 'if node = null: return', ...treeScene(root, { avl: true }))] };
  if (operation === 'rotate-left' && root.right) {
    const pivotValue = root.right.value;
    const next = rotateLeft(root);
    const audit = avlAudit(next);
    return {
      model: { root: next, nextId: model.nextId },
      frames: [
        makeFrame('avl-rotate-before', 'AVL / pivot', `Prepare a manual left rotation around ${root.value} with pivot ${pivotValue}.`, 'pivot <- node.right', 'O(1)', ...treeScene(root, { avl: true, activeId: root.id })),
        makeFrame(
          'avl-rotate-after',
          'AVL / rotated',
          `The right child becomes the subtree root and ${root.value} becomes its left child. This is a raw single rotation (no automatic rebalancing): worst |bf| is now ${audit.worst}${audit.ok ? ', within AVL limits' : ' — outside AVL limits, insert/delete path would rebalance further'}.`,
          'pivot.left <- node; update heights',
          'O(1)',
          ...treeScene(next, { avl: true, activeId: next.id }),
          { camera: 'rotate-left' },
        ),
      ],
    };
  }
  if (operation === 'rotate-right' && root.left) {
    const pivotValue = root.left.value;
    const next = rotateRight(root);
    const audit = avlAudit(next);
    return {
      model: { root: next, nextId: model.nextId },
      frames: [
        makeFrame('avl-rotate-before', 'AVL / pivot', `Prepare a manual right rotation around ${root.value} with pivot ${pivotValue}.`, 'pivot <- node.left', 'O(1)', ...treeScene(root, { avl: true, activeId: root.id })),
        makeFrame(
          'avl-rotate-after',
          'AVL / rotated',
          `The left child becomes the subtree root and ${root.value} becomes its right child. This is a raw single rotation (no automatic rebalancing): worst |bf| is now ${audit.worst}${audit.ok ? ', within AVL limits' : ' — outside AVL limits, insert/delete path would rebalance further'}.`,
          'pivot.right <- node; update heights',
          'O(1)',
          ...treeScene(next, { avl: true, activeId: next.id }),
          { camera: 'rotate-right' },
        ),
      ],
    };
  }
  return { model, frames: [heldFrame('avl-rotate-held', 'AVL / held', 'The root does not have the child required for that rotation.', 'require pivot child', ...treeScene(root, { avl: true, activeId: root.id }))] };
}

function rotateLeft(node: TreeNode): TreeNode {
  const pivot = node.right;
  if (!pivot) return node;
  node.right = pivot.left;
  pivot.left = node;
  node.height = nodeHeight(node);
  pivot.height = nodeHeight(pivot);
  return pivot;
}

function rotateRight(node: TreeNode): TreeNode {
  const pivot = node.left;
  if (!pivot) return node;
  node.left = pivot.right;
  pivot.right = node;
  node.height = nodeHeight(node);
  pivot.height = nodeHeight(pivot);
  return pivot;
}

function nodeHeight(node?: TreeNode): number {
  return node ? 1 + Math.max(nodeHeight(node.left), nodeHeight(node.right)) : 0;
}

function getBalance(node?: TreeNode): number {
  return node ? nodeHeight(node.left) - nodeHeight(node.right) : 0;
}

function cloneTree(node?: TreeNode): TreeNode | undefined {
  if (!node) return undefined;
  return {
    id: node.id,
    value: node.value,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
    height: node.height,
  };
}

function executeHeap(model: HeapModel, operation: string, rawInput?: string, randomize = false): OperationResult {
  const prepared = prepareHeap(model);
  const source: HeapModel = { values: prepared.values };
  let result: OperationResult;
  if (operation === 'insert') {
    const parsed: ParsedInt = randomize ? { ok: true, value: randomValue() } : parseStrictInt(rawInput);
    if (!parsed.ok) {
      const [nodes, edges] = heapScene(source.values);
      return { model, frames: [heldFrame('heap-insert-invalid', 'Heap / held', `Invalid input. ${parsed.reason}`, 'require integer in ±100000', nodes, edges, { array: source.values.map(String) })] };
    }
    result = heapInsert(source, parsed.value);
  } else if (operation === 'extract') {
    result = heapExtract(source);
  } else if (operation === 'peek') {
    result = heapPeek(source);
  } else if (operation === 'delete') {
    const parsed: ParsedInt = randomize ? { ok: true, value: randomValue() } : parseStrictInt(rawInput);
    if (!parsed.ok) {
      const [nodes, edges] = heapScene(source.values);
      return { model, frames: [heldFrame('heap-delete-invalid', 'Heap / held', `Invalid input. ${parsed.reason}`, 'require integer in ±100000', nodes, edges, { array: source.values.map(String) })] };
    }
    result = heapDeleteValue(source, parsed.value);
  } else if (operation === 'sift-up') {
    result = heapSiftUp(source);
  } else {
    result = heapSiftDown(source);
  }
  if (!prepared.normalized) return result;
  return {
    model: result.model,
    frames: [
      makeFrame('heap-normalize', 'Heap / normalize', 'The loaded array violated the min-heap property, so it is heapified first. Later steps run on the repaired heap.', 'heapify(array)', 'O(n)', ...heapScene(prepared.values), { array: prepared.values.map(String) }),
      ...result.frames,
    ],
  };
}

function heapInsert(model: HeapModel, value: number): OperationResult {
  const values = [...model.values, value];
  const frames: StepFrame[] = [makeFrame('heap-insert-start', 'Heap / append', `${value} is appended at the next complete-tree position (duplicates are allowed).`, 'heap[n] <- key', 'O(log n)', ...heapScene(values, [values.length - 1]), { array: values.map(String) })];
  let index = values.length - 1;
  let sequence = 1;
  let moved = value;
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);
    if (values[parent] <= values[index]) break;
    moved = values[index];
    [values[parent], values[index]] = [values[index], values[parent]];
    sequence += 1;
    frames.push(makeFrame(`heap-insert-swap-${sequence}`, 'Heap / sift up', `${moved} is smaller than its parent ${values[index]}, so they swap.`, 'swap(i, parent(i))', 'O(log n)', ...heapScene(values, [index, parent]), { array: values.map(String), activeIndices: [index, parent] }));
    index = parent;
  }
  frames.push(makeFrame('heap-insert-end', 'Heap / settled', `The min-heap property holds: every parent is ≤ its children. Minimum is ${values[0]}.`, 'while key < parent: swap', 'O(log n)', ...heapScene(values), { array: values.map(String) }));
  return { model: { values }, frames };
}

function heapExtract(model: HeapModel): OperationResult {
  if (!model.values.length) {
    return { model, frames: [heldFrame('heap-extract-empty', 'Heap / empty', 'There is no minimum to extract; the heap is empty.', 'if n = 0: return null', ...heapScene([]), { array: [] })] };
  }
  const values = [...model.values];
  const minimum = values[0];
  const frames: StepFrame[] = [makeFrame('heap-extract-start', 'Heap / release', `${minimum} (the minimum) is removed from the root.`, 'min <- heap[0]', 'O(log n)', ...heapScene(values, [0]), { array: values.map(String) })];
  const last = values.pop();
  if (last !== undefined && values.length) values[0] = last;
  let index = 0;
  let sequence = 1;
  while (true) {
    const left = index * 2 + 1;
    const right = left + 1;
    let smallest = index;
    if (left < values.length && values[left] < values[smallest]) smallest = left;
    if (right < values.length && values[right] < values[smallest]) smallest = right;
    if (smallest === index) break;
    const moving = values[index];
    [values[index], values[smallest]] = [values[smallest], values[index]];
    sequence += 1;
    frames.push(makeFrame(`heap-extract-swap-${sequence}`, 'Heap / sift down', `${moving} is larger than child ${values[smallest]}, so they swap.`, 'swap(i, smallestChild)', 'O(log n)', ...heapScene(values, [index, smallest]), { array: values.map(String), activeIndices: [index, smallest] }));
    index = smallest;
  }
  frames.push(makeFrame('heap-extract-end', 'Heap / settled', values.length ? `Extraction complete: ${minimum} removed; new minimum is ${values[0]} and the min-heap property holds.` : `Extraction complete: ${minimum} removed; the heap is now empty.`, 'restore heap property', 'O(log n)', ...heapScene(values), { array: values.map(String) }));
  return { model: { values }, frames };
}

function heapPeek(model: HeapModel): OperationResult {
  if (!model.values.length) {
    return { model, frames: [heldFrame('heap-peek-empty', 'Heap / empty', 'There is no minimum to inspect; the heap is empty.', 'if n = 0: return null', ...heapScene([]), { array: [] })] };
  }
  return {
    model,
    frames: [
      makeFrame('heap-peek', 'Heap / inspect', `${model.values[0]} is the minimum at the root. Peek only reads it; the heap is unchanged.`, 'return heap[0]', 'O(1)', ...heapScene(model.values, [0]), { array: model.values.map(String), activeIndices: [0] }),
    ],
  };
}

function heapDeleteValue(model: HeapModel, value: number): OperationResult {
  const target = model.values.indexOf(value);
  if (target === -1) {
    const [nodes, edges] = heapScene(model.values);
    return { model, frames: [heldFrame('heap-delete-absent', 'Heap / absent', `${value} is not in the heap; nothing is removed.`, 'if key not in heap: return', nodes, edges, { array: model.values.map(String) })] };
  }
  const values = [...model.values];
  const frames: StepFrame[] = [
    makeFrame('heap-delete-start', 'Heap / locate', `One occurrence of ${value} is at index ${target}; it is replaced by the last element.`, 'heap[i] <- heap[n-1]; n <- n-1', 'O(log n)', ...heapScene(values, [target]), { array: values.map(String), activeIndices: [target] }),
  ];
  const last = values.pop() as number;
  let swapped = false;
  let sequence = 1;
  const removedLast = target >= values.length;
  if (target < values.length) {
    values[target] = last;
    // Sift up first (in case last is smaller than the parent), then sift down.
    let index = target;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (values[parent] <= values[index]) break;
      const moving = values[index];
      [values[parent], values[index]] = [values[index], values[parent]];
      swapped = true;
      sequence += 1;
      frames.push(makeFrame(`heap-delete-swap-${sequence}`, 'Heap / repair', `${moving} moves up past its larger parent.`, 'swap(i, parent(i))', 'O(log n)', ...heapScene(values, [index, parent]), { array: values.map(String), activeIndices: [index, parent] }));
      index = parent;
    }
    let down = index;
    while (true) {
      const left = down * 2 + 1;
      const right = left + 1;
      let smallest = down;
      if (left < values.length && values[left] < values[smallest]) smallest = left;
      if (right < values.length && values[right] < values[smallest]) smallest = right;
      if (smallest === down) break;
      const moving = values[down];
      [values[down], values[smallest]] = [values[smallest], values[down]];
      swapped = true;
      sequence += 1;
      frames.push(makeFrame(`heap-delete-swap-${sequence}`, 'Heap / repair', `${moving} moves down past its smaller child.`, 'swap(i, smallestChild)', 'O(log n)', ...heapScene(values, [down, smallest]), { array: values.map(String), activeIndices: [down, smallest] }));
      down = smallest;
    }
  } else {
    swapped = true; // removed the last element; shape changed
  }
  frames.push(
    makeFrame(
      'heap-delete-end',
      'Heap / settled',
      swapped
        ? `One occurrence of ${value} is gone and swaps restored the min-heap property${values.length ? `; minimum is ${values[0]}` : '; the heap is now empty'}.`
        : removedLast
          ? `The last element held ${value}; removing it needs no repair and the heap is unchanged otherwise.`
          : `One occurrence of ${value} is removed; the replacement already satisfied the min-heap property, so no swaps were needed.`,
      'restore heap property',
      'O(log n)',
      ...heapScene(values),
      { array: values.map(String) },
    ),
  );
  return { model: { values }, frames };
}

function heapSiftUp(model: HeapModel): OperationResult {
  if (!model.values.length) {
    return { model, frames: [heldFrame('heap-sift-up-empty', 'Heap / empty', 'The heap is empty; there is nothing to sift.', 'if n = 0: return', ...heapScene([]), { array: [] })] };
  }
  const values = [...model.values];
  const frames: StepFrame[] = [makeFrame('heap-sift-up-start', 'Heap / inspect', 'Begin at the last array cell and compare with its parent.', 'i <- n - 1', 'O(log n)', ...heapScene(values, [values.length - 1]), { array: values.map(String), activeIndices: [values.length - 1] })];
  let index = values.length - 1;
  let sequence = 1;
  let swapped = false;
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);
    if (values[parent] <= values[index]) break;
    const moving = values[index];
    [values[parent], values[index]] = [values[index], values[parent]];
    swapped = true;
    sequence += 1;
    frames.push(makeFrame(`heap-sift-up-${sequence}`, 'Heap / swap', `${moving} is smaller than parent ${values[index]}, so they swap.`, 'swap(i, parent(i))', 'O(log n)', ...heapScene(values, [index, parent]), { array: values.map(String), activeIndices: [index, parent] }));
    index = parent;
  }
  frames.push(makeFrame('heap-sift-up-end', swapped ? 'Heap / repaired' : 'Heap / already valid', swapped ? 'No parent is larger than its child.' : 'No swaps were needed; the min-heap property already held and the array is unchanged.', 'parent(i) <= i', 'O(log n)', ...heapScene(values), { array: values.map(String) }));
  return { model: { values }, frames };
}

function heapSiftDown(model: HeapModel): OperationResult {
  if (!model.values.length) {
    return { model, frames: [heldFrame('heap-sift-down-empty', 'Heap / empty', 'The heap is empty; there is nothing to sift.', 'if n = 0: return', ...heapScene([]), { array: [] })] };
  }
  const values = [...model.values];
  const frames: StepFrame[] = [makeFrame('heap-sift-down-start', 'Heap / inspect', 'Begin at the root and compare both children.', 'i <- 0', 'O(log n)', ...heapScene(values, [0]), { array: values.map(String), activeIndices: [0] })];
  let index = 0;
  let sequence = 1;
  let swapped = false;
  while (true) {
    const left = index * 2 + 1;
    const right = left + 1;
    let smallest = index;
    if (left < values.length && values[left] < values[smallest]) smallest = left;
    if (right < values.length && values[right] < values[smallest]) smallest = right;
    if (smallest === index) break;
    const moving = values[index];
    [values[index], values[smallest]] = [values[smallest], values[index]];
    swapped = true;
    sequence += 1;
    frames.push(makeFrame(`heap-sift-down-${sequence}`, 'Heap / swap', `${moving} is larger than child ${values[smallest]}, so they swap.`, 'swap(i, smallestChild)', 'O(log n)', ...heapScene(values, [index, smallest]), { array: values.map(String), activeIndices: [index, smallest] }));
    index = smallest;
  }
  frames.push(makeFrame('heap-sift-down-end', swapped ? 'Heap / repaired' : 'Heap / already valid', swapped ? 'Every parent is no larger than its children.' : 'No swaps were needed; the min-heap property already held and the array is unchanged.', 'heap property restored', 'O(log n)', ...heapScene(values), { array: values.map(String) }));
  return { model: { values }, frames };
}

function parseVertexInput(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed || trimmed.split(/\s+/).length !== 1) return null;
  const value = Number(trimmed);
  return Number.isSafeInteger(value) ? value : null;
}

function parseEdgeInput(input: string): { from: number; to: number; weight: number } | null {
  const parts = input.trim().split(/\s+/);
  if (parts.length !== 3) return null;
  const values = parts.map(Number);
  if (!values.every((value) => Number.isSafeInteger(value))) return null;
  if (values[2] < 0) return null;
  return { from: values[0], to: values[1], weight: values[2] };
}

function nextGraphVertexId(model: GraphModel): number {
  const highest = model.vertices.reduce((max, vertex) => (Number.isSafeInteger(vertex) && vertex > max ? vertex : max), -1);
  let nextId = Math.max(highest + 1, Number.isSafeInteger(model.nextId) ? model.nextId : highest + 1);
  while (model.vertices.includes(nextId)) nextId += 1;
  return nextId;
}

function parseEdgePairInput(input: string): { from: number; to: number } | null {
  const parts = input.trim().split(/\s+/);
  if (parts.length !== 2) return null;
  const values = parts.map(Number);
  if (!values.every((value) => Number.isSafeInteger(value))) return null;
  if (Math.abs(values[0]) > MAX_INPUT_VALUE || Math.abs(values[1]) > MAX_INPUT_VALUE) return null;
  return { from: values[0], to: values[1] };
}

function executeGraph(model: GraphModel, operation: string, input: string): OperationResult {
  if (operation === 'add-vertex') {
    const trimmed = input.trim().toLowerCase();
    let vertex: number;
    if (!trimmed || trimmed === 'auto') {
      vertex = nextGraphVertexId(model);
    } else {
      const parsed = parseVertexInput(input);
      if (parsed === null || Math.abs(parsed) > MAX_INPUT_VALUE) {
        const [nodes, edges] = graphScene(model);
        return { model, frames: [heldFrame('graph-add-vertex-invalid', 'Graph / held', 'A vertex label must be a single integer (or empty for auto).', 'require integer label or auto', nodes, edges)] };
      }
      if (model.vertices.includes(parsed)) {
        const [nodes, edges] = graphScene(model, { activeId: parsed });
        return { model, frames: [heldFrame('graph-add-vertex-duplicate', 'Graph / held', `Vertex ${parsed} already exists; nothing is added.`, 'require v not in V', nodes, edges)] };
      }
      vertex = parsed;
    }
    const vertices = [...model.vertices, vertex].sort((a, b) => a - b);
    const nextId = Math.max(nextGraphVertexId(model), vertex + 1);
    const next: GraphModel = { vertices, edges: model.edges, nextId };
    return {
      model: next,
      frames: [
        makeFrame('graph-add-vertex-start', 'Graph / allocate', `Vertex ${vertex} is allocated at the next open position.`, 'V <- V + {v}', 'O(1)', ...graphScene(model, { activeId: vertex })),
        makeFrame('graph-add-vertex-end', 'Graph / ready', `${vertex} joins the network with no edges yet.`, 'adj[v] <- empty', 'O(1)', ...graphScene(next, { activeId: vertex })),
      ],
    };
  }
  if (operation === 'add-edge') {
    const parsed = parseEdgeInput(input);
    const canLink = parsed !== null && model.vertices.includes(parsed.from) && model.vertices.includes(parsed.to) && parsed.from !== parsed.to && !model.edges.some((edge) => (edge.from === parsed.from && edge.to === parsed.to) || (edge.from === parsed.to && edge.to === parsed.from));
    const edges = canLink && parsed ? [...model.edges, parsed] : model.edges;
    const next: GraphModel = { ...model, edges };
    const requestedEdge = parsed ? edgeId(parsed.from, parsed.to) : undefined;
    if (!parsed || !canLink) {
      const [nodes, edges] = graphScene(model);
      const reason = !parsed
        ? 'An edge needs two existing vertices and one non-negative integer weight ("from to weight").'
        : 'Both vertices must exist, differ, and the undirected edge must be new.';
      return {
        model: next,
        frames: [
          makeFrame('graph-add-edge-start', 'Graph / validate', parsed ? `Connect ${parsed.from} to ${parsed.to} with weight ${parsed.weight}.` : reason, 'E <- E + {(u, v, w)}', 'O(1)', nodes, edges),
          heldFrame('graph-add-edge-held', 'Graph / held', reason, 'require u, v in V and edge not in E', nodes, edges),
        ],
      };
    }
    return {
      model: next,
      frames: [
        makeFrame('graph-add-edge-start', 'Graph / connect', `Connect ${parsed.from} to ${parsed.to} with weight ${parsed.weight}.`, 'E <- E + {(u, v, w)}', 'O(1)', ...graphScene(model)),
        makeFrame(
          'graph-add-edge-end',
          'Graph / linked',
          'The weighted edge is now available to traversal algorithms.',
          'adj[u].append((v, w))',
          'O(1)',
          ...graphScene(next, { activeEdge: requestedEdge }),
        ),
      ],
    };
  }
  if (operation === 'remove-vertex') {
    const target = parseVertexInput(input);
    if (target === null || !model.vertices.includes(target)) {
      const [nodes, edges] = graphScene(model);
      return { model, frames: [heldFrame('graph-remove-vertex-invalid', 'Graph / held', 'Choose an existing integer vertex to remove.', 'require v in V', nodes, edges)] };
    }
    const before = model.edges.filter((edge) => edge.from === target || edge.to === target).length;
    const next: GraphModel = {
      vertices: model.vertices.filter((vertex) => vertex !== target),
      edges: model.edges.filter((edge) => edge.from !== target && edge.to !== target),
      nextId: model.nextId,
    };
    return {
      model: next,
      frames: [
        makeFrame('graph-remove-vertex-start', 'Graph / isolate', `Vertex ${target} has ${before} incident edge${before === 1 ? '' : 's'} to detach.`, 'for e incident to v: remove e', 'O(E)', ...graphScene(model, { activeId: target })),
        makeFrame('graph-remove-vertex-end', 'Graph / removed', `${target} and its incident edges are gone; remaining vertices are unchanged.`, 'V <- V - {v}', 'O(V + E)', ...graphScene(next)),
      ],
    };
  }
  if (operation === 'remove-edge') {
    const pair = parseEdgePairInput(input);
    const index = pair ? model.edges.findIndex((edge) => (edge.from === pair.from && edge.to === pair.to) || (edge.from === pair.to && edge.to === pair.from)) : -1;
    if (!pair || index === -1) {
      const [nodes, edges] = graphScene(model);
      return { model, frames: [heldFrame('graph-remove-edge-invalid', 'Graph / held', 'Give two connected vertices as "from to"; that edge was not found, so nothing changes.', 'require (u, v) in E', nodes, edges)] };
    }
    const removed = model.edges[index];
    const next: GraphModel = { ...model, edges: model.edges.filter((_, item) => item !== index) };
    return {
      model: next,
      frames: [
        makeFrame('graph-remove-edge-start', 'Graph / detach', `Edge ${removed.from}–${removed.to} (weight ${removed.weight}) is selected.`, 'e <- (u, v)', 'O(E)', ...graphScene(model, { activeEdge: edgeId(removed.from, removed.to) })),
        makeFrame('graph-remove-edge-end', 'Graph / removed', `The edge between ${removed.from} and ${removed.to} is gone; vertices remain.`, 'E <- E - {(u, v)}', 'O(E)', ...graphScene(next)),
      ],
    };
  }
  if (operation === 'bfs') {
    const start = parseVertexInput(input);
    if (start === null || !model.vertices.includes(start)) {
      const [nodes, edges] = graphScene(model);
      return { model, frames: [heldFrame('graph-bfs-invalid', 'BFS / held', 'Choose an existing integer vertex as the source.', 'require source in V', nodes, edges)] };
    }
    return graphBfs(model, start);
  }
  if (operation === 'dfs') {
    const start = parseVertexInput(input);
    if (start === null || !model.vertices.includes(start)) {
      const [nodes, edges] = graphScene(model);
      return { model, frames: [heldFrame('graph-dfs-invalid', 'DFS / held', 'Choose an existing integer vertex as the source.', 'require source in V', nodes, edges)] };
    }
    return graphDfs(model, start);
  }
  const parts = input.trim().split(/\s+/);
  const start = parts.length === 2 ? Number(parts[0]) : Number.NaN;
  const target = parts.length === 2 ? Number(parts[1]) : Number.NaN;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(target) || !model.vertices.includes(start) || !model.vertices.includes(target)) {
    const [nodes, edges] = graphScene(model);
    return { model, frames: [heldFrame('graph-dijkstra-invalid', 'Dijkstra / held', 'Start and target must be two existing integer vertices ("start target").', 'require source, target in V', nodes, edges)] };
  }
  return graphDijkstra(model, start, target);
}

function graphBfs(model: GraphModel, start: number): OperationResult {
  const frames: StepFrame[] = [];
  const visited = new Set<number>();
  const adjacency = graphAdjacency(model);
  const queue = [start];
  let queueIndex = 0;
  let sequence = 0;
  const capture = (title: string, narration: string, pseudocode: string, activeId?: number, visitedIds: number[] = [], activeEdge?: string) => {
    sequence += 1;
    frames.push(makeFrame(`graph-bfs-${sequence}`, title, narration, pseudocode, 'O(V + E)', ...graphScene(model, { activeId, visitedIds, activeEdge })));
  };
  capture('BFS / initialize', `Mark ${start} as the first frontier vertex.`, 'visited[source] <- true', start, [start]);
  while (queueIndex < queue.length) {
    const current = queue[queueIndex];
    queueIndex += 1;
    visited.add(current);
    capture('BFS / visit', `Visit ${current} and inspect its neighbors.`, 'u <- dequeue()', current, [...visited]);
    (adjacency.get(current) ?? []).forEach(({ to: neighbor }) => {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        capture('BFS / discover', `${neighbor} is discovered from ${current} and joins the queue.`, 'enqueue(neighbor)', neighbor, [...visited], edgeId(current, neighbor));
      }
    });
  }
  capture('BFS / complete', disconnectedBfsNarration(model, visited), 'while queue: visit', undefined, [...visited]);
  return { model, frames };
}

function disconnectedBfsNarration(model: GraphModel, visited: Set<number>): string {
  const missed = model.vertices.filter((vertex) => !visited.has(vertex));
  return missed.length
    ? `The queue is empty; visited [${[...visited].join(', ')}] in layers. Unreached [${missed.join(', ')}] ${missed.length === 1 ? 'is' : 'are'} disconnected from the start.`
    : 'The queue is empty; every vertex was reached in layers.';
}

function graphDfs(model: GraphModel, start: number): OperationResult {
  const frames: StepFrame[] = [];
  const visited = new Set<number>();
  const adjacency = graphAdjacency(model);
  let sequence = 0;
  const capture = (title: string, narration: string, pseudocode: string, activeId?: number, visitedIds: number[] = [], activeEdge?: string) => {
    sequence += 1;
    frames.push(makeFrame(`graph-dfs-${sequence}`, title, narration, pseudocode, 'O(V + E)', ...graphScene(model, { activeId, visitedIds, activeEdge })));
  };
  visited.add(start);
  capture('DFS / initialize', `Start a depth-first walk at ${start}.`, 'visit(source)', start, [start]);
  const stack: Array<{ current: number; neighbors: Array<{ to: number; edge: GraphEdge }>; index: number }> = [
    { current: start, neighbors: adjacency.get(start) ?? [], index: 0 },
  ];
  while (stack.length) {
    const frame = stack[stack.length - 1];
    if (frame.index < frame.neighbors.length) {
      const { to: neighbor } = frame.neighbors[frame.index];
      frame.index += 1;
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        capture('DFS / descend', `Follow the edge from ${frame.current} to ${neighbor}.`, 'visit(neighbor)', neighbor, [...visited], edgeId(frame.current, neighbor));
        stack.push({ current: neighbor, neighbors: adjacency.get(neighbor) ?? [], index: 0 });
      }
    } else {
      capture('DFS / backtrack', `Backtrack from ${frame.current} after its branch is complete.`, 'return', frame.current, [...visited]);
      stack.pop();
    }
  }
  capture('DFS / complete', disconnectedDfsNarration(model, visited), 'for neighbor: visit', undefined, [...visited]);
  return { model, frames };
}

function disconnectedDfsNarration(model: GraphModel, visited: Set<number>): string {
  const missed = model.vertices.filter((vertex) => !visited.has(vertex));
  return missed.length
    ? `All branches from the start returned. Visited [${[...visited].join(', ')}]; unreached [${missed.join(', ')}] ${missed.length === 1 ? 'is' : 'are'} disconnected.`
    : 'All branches returned to the start; every vertex was reached.';
}

function graphDijkstra(model: GraphModel, start: number, target: number): OperationResult {
  const frames: StepFrame[] = [];
  const distances: Record<number, number> = Object.fromEntries(model.vertices.map((id) => [id, id === start ? 0 : Number.POSITIVE_INFINITY]));
  const previous = new Map<number, number>();
  const previousEdge = new Map<number, string>();
  const settled = new Set<number>();
  const adjacency = graphAdjacency(model);
  let sequence = 0;
  const capture = (title: string, narration: string, pseudocode: string, activeId?: number, settledIds: number[] = [], pathIds: number[] = [], pathEdges: string[] = [], activeEdge?: string) => {
    sequence += 1;
    frames.push(makeFrame(`graph-dijkstra-${sequence}`, title, narration, pseudocode, 'O(V^2 + E)', ...graphScene(model, { activeId, visitedIds: settledIds, pathIds, pathEdges, activeEdge, distances }), { array: model.vertices.map((id) => distances[id] === Number.POSITIVE_INFINITY ? '∞' : String(distances[id])) }));
  };
  capture('Dijkstra / initialize', `Set distance zero at ${start} and infinity elsewhere.`, 'dist[source] <- 0', start, [start]);
  while (settled.size < model.vertices.length) {
    let current = -1;
    let best = Number.POSITIVE_INFINITY;
    model.vertices.forEach((id) => {
      if (!settled.has(id) && distances[id] < best) {
        current = id;
        best = distances[id];
      }
    });
    if (current < 0 || best === Number.POSITIVE_INFINITY) break;
    settled.add(current);
    capture('Dijkstra / settle', `${current} now has its final shortest distance ${best}.`, 'u <- extractMin()', current, [...settled]);
    (adjacency.get(current) ?? []).forEach(({ to: neighbor, edge }) => {
      const candidate = best + edge.weight;
      if (candidate < distances[neighbor]) {
        distances[neighbor] = candidate;
        previous.set(neighbor, current);
        previousEdge.set(neighbor, edgeId(current, neighbor));
        capture('Dijkstra / relax', `${neighbor} improves to distance ${candidate} through ${current}.`, 'if dist[u] + w < dist[v]: update', neighbor, [...settled], [], [], edgeId(current, neighbor));
      }
    });
  }
  const pathIds: number[] = [];
  const pathEdges: string[] = [];
  let cursor: number | undefined = target;
  while (cursor !== undefined && cursor !== start) {
    const edge = previousEdge.get(cursor);
    if (edge === undefined) {
      pathIds.length = 0;
      pathEdges.length = 0;
      break;
    }
    pathIds.unshift(cursor);
    pathEdges.unshift(edge);
    cursor = previous.get(cursor);
  }
  if (cursor === start) pathIds.unshift(start);
  else {
    pathIds.length = 0;
    pathEdges.length = 0;
  }
  capture('Dijkstra / path', distances[target] === Number.POSITIVE_INFINITY ? `No path reaches ${target} from ${start}; it is disconnected (distance ∞). The graph is unchanged.` : `The shortest route to ${target} has distance ${distances[target]}. The graph is unchanged.`, 'reconstruct previous[]', target, [...settled], pathIds, pathEdges);
  return { model, frames };
}
