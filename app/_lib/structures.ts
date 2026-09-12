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
    description: 'A complete tree represented by a compact array.',
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
      placeholder: 'unused',
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
      placeholder: 'unused',
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
      placeholder: 'optional',
    },
    {
      value: 'rotate-right',
      label: 'Rotate right',
      description: 'Pivot the root around its left child.',
      inputLabel: 'Value',
      placeholder: 'optional',
    },
  ],
  heap: [
    {
      value: 'insert',
      label: 'Insert',
      description: 'Append, then sift the value upward.',
      inputLabel: 'Value',
      placeholder: '12',
    },
    {
      value: 'extract',
      label: 'Extract',
      description: 'Remove the root, then sift downward.',
      inputLabel: 'Value',
      placeholder: 'unused',
    },
    {
      value: 'sift-up',
      label: 'Sift up',
      description: 'Repair the heap from the last array cell.',
      inputLabel: 'Value',
      placeholder: 'unused',
    },
    {
      value: 'sift-down',
      label: 'Sift down',
      description: 'Repair the heap from the root.',
      inputLabel: 'Value',
      placeholder: 'unused',
    },
  ],
  graph: [
    {
      value: 'add-vertex',
      label: 'Add vertex',
      description: 'Create a new vertex in the network.',
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

function isMinHeap(values: number[]): boolean {
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

export function executeOperation(
  kind: StructureKind,
  model: StructureModel,
  operation: string,
  inputValue?: string,
  randomize = false,
): OperationResult {
  const value = randomize ? Math.floor(Math.random() * 89) + 10 : Number(inputValue);
  switch (kind) {
    case 'stack':
      return executeStack(model as StackModel, operation, Number.isFinite(value) ? value : 42);
    case 'queue':
      return executeQueue(model as QueueModel, operation, Number.isFinite(value) ? value : 42);
    case 'bst':
      return executeBst(model as TreeModel, operation, Number.isFinite(value) ? value : 12);
    case 'avl':
      return executeAvl(model as TreeModel, operation, Number.isFinite(value) ? value : 12);
    case 'heap':
      return executeHeap(model as HeapModel, operation, Number.isFinite(value) ? value : 12);
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
    active: index === activeIndex || (activeIndex === undefined && index === 0),
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
      detail: options.distances?.[id] !== undefined ? `d=${options.distances[id]}` : undefined,
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

function executeStack(model: StackModel, operation: string, value: number): OperationResult {
  if (operation === 'push') {
    const values = [...model.values, value];
    return {
      model: { values },
      frames: [
        makeFrame('stack-push-start', 'Push / approach', `Read ${value} as the incoming value.`, 'newNode.value <- key', 'O(1)', stackNodes(model.values)),
        makeFrame('stack-push-end', 'Push / settle', `${value} becomes the new top; the previous top is now below it.`, 'top <- top + 1', 'O(1)', stackNodes(values, values.length - 1)),
      ],
    };
  }
  if (!model.values.length) {
    return { model, frames: [makeFrame('stack-pop-empty', 'Pop / empty', 'The stack is empty, so there is no top value to remove.', 'if top = -1: return null', 'O(1)', stackNodes([]))] };
  }
  const values = model.values.slice(0, -1);
  return {
    model: { values },
    frames: [
      makeFrame('stack-pop-start', 'Pop / lift', `The top value ${model.values[model.values.length - 1]} is selected for removal.`, 'value <- stack[top]', 'O(1)', stackNodes(model.values, model.values.length - 1)),
      makeFrame('stack-pop-end', 'Pop / close', 'The top block leaves the stage and the new top is exposed.', 'top <- top - 1', 'O(1)', stackNodes(values, values.length - 1)),
    ],
  };
}

function executeQueue(model: QueueModel, operation: string, value: number): OperationResult {
  if (operation === 'enqueue') {
    const values = [...model.values, value];
    return {
      model: { values },
      frames: [
        makeFrame('queue-enqueue-start', 'Enqueue / approach', `${value} enters from the rear of the queue.`, 'rear <- rear + 1', 'O(1)', queueNodes(model.values)),
        makeFrame('queue-enqueue-end', 'Enqueue / settle', `${value} is now the rear value; the front remains ready for service.`, 'queue[rear] <- key', 'O(1)', queueNodes(values, values.length - 1)),
      ],
    };
  }
  if (!model.values.length) {
    return { model, frames: [makeFrame('queue-dequeue-empty', 'Dequeue / empty', 'The queue is empty, so there is no front value to remove.', 'if front > rear: return null', 'O(1)', queueNodes([]))] };
  }
  const values = model.values.slice(1);
  return {
    model: { values },
    frames: [
      makeFrame('queue-dequeue-start', 'Dequeue / release', `The front value ${model.values[0]} leaves the queue.`, 'value <- queue[front]', 'O(1)', queueNodes(model.values, 0)),
      makeFrame('queue-dequeue-end', 'Dequeue / close', 'Every remaining value shifts forward to close the gap.', 'front <- front + 1', 'O(1)', queueNodes(values, 0)),
    ],
  };
}

function executeBst(model: TreeModel, operation: string, value: number): OperationResult {
  if (operation === 'insert') {
    return insertBstModel(model, value);
  }
  if (operation === 'search') {
    return searchBstModel(model, value);
  }
  return deleteBstModel(model, value);
}

function insertBstModel(model: TreeModel, value: number): OperationResult {
  const frames: StepFrame[] = [];
  let sequence = 0;
  const capture = (title: string, narration: string, pseudocode: string, root?: TreeNode, activeId?: number, complexity = 'O(h)') => {
    sequence += 1;
    frames.push(makeFrame(`bst-insert-${sequence}`, title, narration, pseudocode, complexity, ...treeScene(root, { activeId })));
  };
  capture('Insert / begin', `Descend from the root to place ${value}.`, 'node <- root', model.root);
  const insert = (node?: TreeNode): TreeNode => {
    if (!node) {
      const next: TreeNode = { id: model.nextId, value };
      capture('Insert / attach', `${value} attaches as a new leaf.`, 'newNode.parent <- node', next, next.id);
      return next;
    }
    capture('Insert / compare', `${value} is compared with ${node.value}.`, `if key < ${node.value}: go left`, node, node.id);
    if (value < node.value) {
      node.left = insert(node.left);
      capture('Insert / move left', `${value} is smaller, so the search moves left.`, 'node <- node.left', node, node.id);
    } else if (value > node.value) {
      node.right = insert(node.right);
      capture('Insert / move right', `${value} is larger, so the search moves right.`, 'node <- node.right', node, node.id);
    } else {
      capture('Insert / duplicate', `${value} already exists; the tree is unchanged.`, 'return root', node, node.id);
    }
    return node;
  };
  const root = insert(cloneTree(model.root));
  return { model: { root, nextId: model.nextId + (frames.some((frame) => frame.title === 'Insert / attach') ? 1 : 0) }, frames };
}

function searchBstModel(model: TreeModel, value: number): OperationResult {
  const frames: StepFrame[] = [];
  let sequence = 0;
  let current = model.root;
  const capture = (title: string, narration: string, pseudocode: string, node?: TreeNode, found = false) => {
    sequence += 1;
    frames.push(makeFrame(`bst-search-${sequence}`, title, narration, pseudocode, found ? 'O(h)' : 'O(h)', ...treeScene(node ?? model.root, { activeId: node?.id })));
  };
  capture('Search / begin', `Start at the root and compare ${value}.`, 'node <- root', current);
  while (current) {
    if (value === current.value) {
      capture('Search / found', `${value} is present at this node.`, 'return node', current, true);
      return { model, frames };
    }
    const direction = value < current.value ? 'left' : 'right';
    capture('Search / compare', `${value} is compared with ${current.value}; move ${direction}.`, `node <- node.${direction}`, current);
    current = value < current.value ? current.left : current.right;
    if (current) capture('Search / descend', `The ${direction} branch becomes the next comparison.`, `node <- node.${direction}`, current);
  }
  capture('Search / absent', `${value} is not present; the search reached an empty branch.`, 'return null', model.root);
  return { model, frames };
}

function deleteBstModel(model: TreeModel, value: number): OperationResult {
  const frames: StepFrame[] = [];
  let sequence = 0;
  const capture = (title: string, narration: string, pseudocode: string, root?: TreeNode, activeId?: number) => {
    sequence += 1;
    frames.push(makeFrame(`bst-delete-${sequence}`, title, narration, pseudocode, 'O(h)', ...treeScene(root, { activeId })));
  };
  capture('Delete / locate', `Find the node containing ${value}.`, 'node <- root', model.root);
  let current = model.root;
  while (current && current.value !== value) {
    capture('Delete / compare', `${value} is compared with ${current.value}.`, value < current.value ? 'node <- node.left' : 'node <- node.right', current, current.id);
    current = value < current.value ? current.left : current.right;
  }
  if (!current) {
    capture('Delete / absent', `${value} is not in the tree; no links change.`, 'return root', model.root);
    return { model, frames };
  }
  const root = cloneTree(model.root);
  const next = deleteNode(root, value);
  capture('Delete / reconnect', `${value} is removed and child links are reconnected.`, 'splice node; relink children', next);
  return { model: { root: next, nextId: model.nextId }, frames };
}

function deleteNode(node?: TreeNode, value?: number): TreeNode | undefined {
  if (!node) return undefined;
  if (value !== undefined && value < node.value) {
    node.left = deleteNode(node.left, value);
  } else if (value !== undefined && value > node.value) {
    node.right = deleteNode(node.right, value);
  } else {
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    const successor = minValueNode(node.right);
    node.value = successor.value;
    node.right = deleteNodeById(node.right, successor.id);
  }
  return node;
}

function deleteNodeById(node?: TreeNode, id?: number): TreeNode | undefined {
  if (!node || node.id === id) return node?.right;
  node.left = deleteNodeById(node.left, id);
  node.right = deleteNodeById(node.right, id);
  return node;
}

function minValueNode(node?: TreeNode): TreeNode {
  let current = node;
  while (current?.left) current = current.left;
  if (!current) throw new Error('Missing successor');
  return current;
}

function executeAvl(model: TreeModel, operation: string, value: number): OperationResult {
  if (operation === 'insert') return insertAvlModel(model, value);
  if (operation === 'delete') return deleteAvlModel(model, value);
  return rotateAvlModel(model, operation);
}

function insertAvlModel(model: TreeModel, value: number): OperationResult {
  const frames: StepFrame[] = [];
  let sequence = 0;
  let nextId = model.nextId;
  const capture = (title: string, narration: string, pseudocode: string, root?: TreeNode, activeId?: number, camera?: CameraPreset) => {
    sequence += 1;
    frames.push(makeFrame(`avl-insert-${sequence}`, title, narration, pseudocode, 'O(log n)', ...treeScene(root, { avl: true, activeId }), { camera }));
  };
  capture('AVL / begin', `Insert ${value}, then check balance on the return path.`, 'node <- root', model.root);
  const insert = (node?: TreeNode): TreeNode => {
    if (!node) {
      const next: TreeNode = { id: nextId, value, height: 1 };
      nextId += 1;
      capture('AVL / attach', `${value} attaches as a leaf with height 1.`, 'height(node) <- 1', next, next.id);
      return next;
    }
    capture('AVL / compare', `${value} is compared with ${node.value}.`, value < node.value ? 'go left' : 'go right', node, node.id);
    if (value < node.value) node.left = insert(node.left);
    else if (value > node.value) node.right = insert(node.right);
    else {
      capture('AVL / duplicate', `${value} already exists; no rotation is needed.`, 'return root', node, node.id);
      return node;
    }
    node.height = nodeHeight(node);
    const balance = getBalance(node);
    capture('AVL / measure', `Node ${node.value} now has balance factor ${balance}.`, 'balance <- height(left) - height(right)', node, node.id);
    if (balance > 1) {
      if (node.left && value < node.left.value) {
        const rotated = rotateRight(node);
        capture('AVL / rotate right', `A right rotation restores balance at ${node.value}.`, 'rotateRight(node)', rotated, rotated.id, 'rotate-right');
        return rotated;
      }
      if (node.left) {
        node.left = rotateLeft(node.left);
        const rotated = rotateRight(node);
        capture('AVL / double rotation', `A left-right rotation restores balance at ${node.value}.`, 'rotateLeft(left); rotateRight(node)', rotated, rotated.id, 'rotate-right');
        return rotated;
      }
    }
    if (balance < -1) {
      if (node.right && value > node.right.value) {
        const rotated = rotateLeft(node);
        capture('AVL / rotate left', `A left rotation restores balance at ${node.value}.`, 'rotateLeft(node)', rotated, rotated.id, 'rotate-left');
        return rotated;
      }
      if (node.right) {
        node.right = rotateRight(node.right);
        const rotated = rotateLeft(node);
        capture('AVL / double rotation', `A right-left rotation restores balance at ${node.value}.`, 'rotateRight(right); rotateLeft(node)', rotated, rotated.id, 'rotate-left');
        return rotated;
      }
    }
    return node;
  };
  const root = insert(cloneTree(model.root));
  return { model: { root, nextId }, frames };
}

function deleteAvlModel(model: TreeModel, value: number): OperationResult {
  const frames: StepFrame[] = [];
  let sequence = 0;
  const capture = (title: string, narration: string, pseudocode: string, root?: TreeNode, activeId?: number, camera?: CameraPreset) => {
    sequence += 1;
    frames.push(makeFrame(`avl-delete-${sequence}`, title, narration, pseudocode, 'O(log n)', ...treeScene(root, { avl: true, activeId }), { camera }));
  };
  capture('AVL / locate', `Find ${value} before removing it.`, 'node <- root', model.root);
  let current = model.root;
  while (current && current.value !== value) {
    capture('AVL / compare', `${value} is compared with ${current.value}.`, value < current.value ? 'go left' : 'go right', current, current.id);
    current = value < current.value ? current.left : current.right;
  }
  if (!current) {
    capture('AVL / absent', `${value} is not present; the AVL is unchanged.`, 'return root', model.root);
    return { model, frames };
  }
  const root = deleteAvlNode(cloneTree(model.root), value);
  capture('AVL / rebalance', 'The affected path is rebalanced while node identities remain stable.', 'rebalance affected path', root, root?.id);
  return { model: { root, nextId: model.nextId }, frames };
}

function deleteAvlNode(node: TreeNode | undefined, value: number): TreeNode | undefined {
  if (!node) return undefined;
  if (value < node.value) {
    node.left = deleteAvlNode(node.left, value);
  } else if (value > node.value) {
    node.right = deleteAvlNode(node.right, value);
  } else {
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    const successor = minValueNode(node.right);
    node.value = successor.value;
    node.right = deleteAvlNode(node.right, successor.value);
  }
  node.height = nodeHeight(node);
  return rebalanceAvl(node);
}

function rebalanceAvl(node: TreeNode): TreeNode {
  node.height = nodeHeight(node);
  const balance = getBalance(node);
  if (balance > 1) {
    if (getBalance(node.left) >= 0) return rotateRight(node);
    node.left = rotateLeft(node.left as TreeNode);
    return rotateRight(node);
  }
  if (balance < -1) {
    if (getBalance(node.right) <= 0) return rotateLeft(node);
    node.right = rotateRight(node.right as TreeNode);
    return rotateLeft(node);
  }
  return node;
}

function rotateAvlModel(model: TreeModel, operation: string): OperationResult {
  const root = cloneTree(model.root);
  if (!root) return { model, frames: [makeFrame('avl-rotate-empty', 'AVL / empty', 'There is no node to rotate.', 'if node = null: return', 'O(1)', ...treeScene(root, { avl: true }))] };
  if (operation === 'rotate-left' && root.right) {
    const next = rebalanceAvl(rotateLeft(root));
    return {
      model: { root: next, nextId: model.nextId },
      frames: [
        makeFrame('avl-rotate-before', 'AVL / pivot', `Prepare a left rotation around ${root.value}.`, 'pivot <- node.right', 'O(1)', ...treeScene(root, { avl: true, activeId: root.id })),
        makeFrame('avl-rotate-after', 'AVL / rotated', 'The right child becomes the root and the old root becomes its left child; balance is restored along the affected path.', 'pivot.left <- node; rebalance', 'O(1)', ...treeScene(next, { avl: true, activeId: next.id }), { camera: 'rotate-left' }),
      ],
    };
  }
  if (operation === 'rotate-right' && root.left) {
    const next = rebalanceAvl(rotateRight(root));
    return {
      model: { root: next, nextId: model.nextId },
      frames: [
        makeFrame('avl-rotate-before', 'AVL / pivot', `Prepare a right rotation around ${root.value}.`, 'pivot <- node.left', 'O(1)', ...treeScene(root, { avl: true, activeId: root.id })),
        makeFrame('avl-rotate-after', 'AVL / rotated', 'The left child becomes the root and the old root becomes its right child; balance is restored along the affected path.', 'pivot.right <- node; rebalance', 'O(1)', ...treeScene(next, { avl: true, activeId: next.id }), { camera: 'rotate-right' }),
      ],
    };
  }
  return { model, frames: [makeFrame('avl-rotate-invalid', 'AVL / held', 'The root does not have the child required for that rotation.', 'require pivot child', 'O(1)', ...treeScene(root, { avl: true, activeId: root.id }))] };
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

function executeHeap(model: HeapModel, operation: string, value: number): OperationResult {
  const prepared = prepareHeap(model);
  const source: HeapModel = { values: prepared.values };
  const result = operation === 'insert'
    ? heapInsert(source, value)
    : operation === 'extract'
      ? heapExtract(source)
      : operation === 'sift-up'
        ? heapSiftUp(source)
        : heapSiftDown(source);
  if (!prepared.normalized) return result;
  return {
    model: result.model,
    frames: [
      makeFrame('heap-normalize', 'Heap / normalize', 'The input array is normalized before the requested repair begins.', 'heapify(array)', 'O(n)', ...heapScene(prepared.values), { array: prepared.values.map(String) }),
      ...result.frames,
    ],
  };
}

function heapInsert(model: HeapModel, value: number): OperationResult {
  const values = [...model.values, value];
  const frames: StepFrame[] = [makeFrame('heap-insert-start', 'Heap / append', `${value} is appended at the next complete-tree position.`, 'heap[n] <- key', 'O(log n)', ...heapScene(values, [values.length - 1]), { array: values.map(String) })];
  let index = values.length - 1;
  let sequence = 1;
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);
    if (values[parent] <= values[index]) break;
    [values[parent], values[index]] = [values[index], values[parent]];
    sequence += 1;
    frames.push(makeFrame(`heap-insert-swap-${sequence}`, 'Heap / sift up', `${values[index]} swaps with its smaller parent at index ${parent}.`, 'swap(i, parent(i))', 'O(log n)', ...heapScene(values, [index, parent]), { array: values.map(String), activeIndices: [index, parent] }));
    index = parent;
  }
  frames.push(makeFrame('heap-insert-end', 'Heap / settled', 'The parent is no larger than its children; the heap property is restored.', 'while key < parent: swap', 'O(log n)', ...heapScene(values), { array: values.map(String) }));
  return { model: { values }, frames };
}

function heapExtract(model: HeapModel): OperationResult {
  if (!model.values.length) {
    return { model, frames: [makeFrame('heap-extract-empty', 'Heap / empty', 'There is no root value to extract.', 'if n = 0: return null', 'O(1)', ...heapScene([]), { array: [] })] };
  }
  const values = [...model.values];
  const frames: StepFrame[] = [makeFrame('heap-extract-start', 'Heap / release', `${values[0]} is removed from the root.`, 'root <- heap[0]', 'O(log n)', ...heapScene(values, [0]), { array: values.map(String) })];
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
    [values[index], values[smallest]] = [values[smallest], values[index]];
    sequence += 1;
    frames.push(makeFrame(`heap-extract-swap-${sequence}`, 'Heap / sift down', `${values[index]} moves toward its correct child position.`, 'swap(i, smallestChild)', 'O(log n)', ...heapScene(values, [index, smallest]), { array: values.map(String), activeIndices: [index, smallest] }));
    index = smallest;
  }
  frames.push(makeFrame('heap-extract-end', 'Heap / settled', 'The last value has found its ordered place and the complete tree is valid.', 'restore heap property', 'O(log n)', ...heapScene(values), { array: values.map(String) }));
  return { model: { values }, frames };
}

function heapSiftUp(model: HeapModel): OperationResult {
  const values = [...model.values];
  const frames: StepFrame[] = [makeFrame('heap-sift-up-start', 'Heap / inspect', 'Begin at the last array cell and compare with its parent.', 'i <- n - 1', 'O(log n)', ...heapScene(values, [values.length - 1]), { array: values.map(String), activeIndices: [values.length - 1] })];
  let index = values.length - 1;
  let sequence = 1;
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);
    if (values[parent] <= values[index]) break;
    [values[parent], values[index]] = [values[index], values[parent]];
    sequence += 1;
    frames.push(makeFrame(`heap-sift-up-${sequence}`, 'Heap / swap', `The value at index ${index} swaps with index ${parent}.`, 'swap(i, parent(i))', 'O(log n)', ...heapScene(values, [index, parent]), { array: values.map(String), activeIndices: [index, parent] }));
    index = parent;
  }
  frames.push(makeFrame('heap-sift-up-end', 'Heap / repaired', 'No parent is larger than its child.', 'parent(i) <= i', 'O(log n)', ...heapScene(values), { array: values.map(String) }));
  return { model: { values }, frames };
}

function heapSiftDown(model: HeapModel): OperationResult {
  const values = [...model.values];
  const frames: StepFrame[] = [makeFrame('heap-sift-down-start', 'Heap / inspect', 'Begin at the root and compare both children.', 'i <- 0', 'O(log n)', ...heapScene(values, [0]), { array: values.map(String), activeIndices: [0] })];
  let index = 0;
  let sequence = 1;
  while (true) {
    const left = index * 2 + 1;
    const right = left + 1;
    let smallest = index;
    if (left < values.length && values[left] < values[smallest]) smallest = left;
    if (right < values.length && values[right] < values[smallest]) smallest = right;
    if (smallest === index) break;
    [values[index], values[smallest]] = [values[smallest], values[index]];
    sequence += 1;
    frames.push(makeFrame(`heap-sift-down-${sequence}`, 'Heap / swap', `${values[index]} moves down toward the smaller child.`, 'swap(i, smallestChild)', 'O(log n)', ...heapScene(values, [index, smallest]), { array: values.map(String), activeIndices: [index, smallest] }));
    index = smallest;
  }
  frames.push(makeFrame('heap-sift-down-end', 'Heap / repaired', 'Every parent is no larger than its children.', 'heap property restored', 'O(log n)', ...heapScene(values), { array: values.map(String) }));
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

function executeGraph(model: GraphModel, operation: string, input: string): OperationResult {
  if (operation === 'add-vertex') {
    const vertex = nextGraphVertexId(model);
    const vertices = [...model.vertices, vertex];
    const next: GraphModel = { vertices, edges: model.edges, nextId: vertex + 1 };
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
    return {
      model: next,
      frames: [
        makeFrame('graph-add-edge-start', parsed ? 'Graph / connect' : 'Graph / validate', parsed ? `Connect ${parsed.from} to ${parsed.to} with weight ${parsed.weight}.` : 'An edge needs two existing vertices and one non-negative integer weight.', 'E <- E + {(u, v, w)}', 'O(1)', ...graphScene(model)),
        makeFrame(
          'graph-add-edge-end',
          canLink ? 'Graph / linked' : 'Graph / held',
          canLink ? 'The weighted edge is now available to traversal algorithms.' : 'Both vertices must exist, differ, and the undirected edge must be new.',
          canLink ? 'adj[u].append((v, w))' : 'require u, v in V and edge not in E',
          'O(1)',
          ...graphScene(next, { activeEdge: canLink ? requestedEdge : undefined }),
        ),
      ],
    };
  }
  if (operation === 'bfs') {
    const start = parseVertexInput(input);
    return start !== null && model.vertices.includes(start) ? graphBfs(model, start) : { model, frames: [makeFrame('graph-bfs-invalid', 'BFS / held', 'Choose an existing integer vertex.', 'require source in V', 'O(1)', ...graphScene(model))] };
  }
  if (operation === 'dfs') {
    const start = parseVertexInput(input);
    return start !== null && model.vertices.includes(start) ? graphDfs(model, start) : { model, frames: [makeFrame('graph-dfs-invalid', 'DFS / held', 'Choose an existing integer vertex.', 'require source in V', 'O(1)', ...graphScene(model))] };
  }
  const parts = input.trim().split(/\s+/);
  const start = parts.length === 2 ? Number(parts[0]) : Number.NaN;
  const target = parts.length === 2 ? Number(parts[1]) : Number.NaN;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(target) || !model.vertices.includes(start) || !model.vertices.includes(target)) {
    return { model, frames: [makeFrame('graph-dijkstra-invalid', 'Dijkstra / held', 'Start and target must be two existing integer vertices.', 'require source, target in V', 'O(1)', ...graphScene(model))] };
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
  capture('BFS / complete', 'The queue is empty; every reachable vertex has been visited in layers.', 'while queue: visit', undefined, [...visited]);
  return { model, frames };
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
  capture('DFS / complete', 'All reachable branches have returned to the start.', 'for neighbor: visit', undefined, [...visited]);
  return { model, frames };
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
  capture('Dijkstra / path', `The shortest route to ${target} has distance ${distances[target] === Number.POSITIVE_INFINITY ? '∞' : distances[target]}.`, 'reconstruct previous[]', target, [...settled], pathIds, pathEdges);
  return { model, frames };
}
