# DSA Playground — Interactive 3D Data Structure Visualizer

A precise, interactive 3D laboratory for data structures. Run an operation, inspect the active pointer in 3D, and read frame-synced narration + pseudocode + complexity in lockstep.

Built with **Next.js 15, React Three Fiber, drei, three.js, anime.js, and Tailwind CSS**.

## Features

- **6 structures, one consistent stage:**
  - `Stack` (LIFO) — Push / Pop — `O(1)`
  - `Queue` (FIFO) — Enqueue / Dequeue — `O(1)`
  - `BST` — Insert / Search / Delete — `O(h)`
  - `AVL` — Insert / Delete / Rotate Left / Rotate Right with balance factors — `O(log n)`
  - `Min-Heap` — Insert / Extract / Sift Up / Sift Down with array ↔ tree view — `O(log n)`
  - `Graph` — Add Vertex / Add Edge / BFS / DFS / Dijkstra with distances + path highlight — `O(V + E)`
- **Step-frame engine (`app/_lib/structures.ts`):** every operation returns `StepFrame[]` with `title`, `narration`, `pseudocode`, `complexity`, 3D `nodes`/`edges`, camera preset, and array overlay.
- **Playback bench:** run manual or random values, step back/forward, autoplay with 0.5x–2x speed, frame dots, live complexity readout.
- **3D stage (`StageCanvas.tsx`):** orbit camera, active/visited/path node states, weighted edge labels, heap index labels (`i=n`), AVL balance factors (`bf`), graph distances (`d=`).
- **Session tools:** Randomize structure, Session History (last 12 ops), Copy Scenario sharable URL (`?scenario=...`), reduced-motion support.
- **Lab design system (`design/DESIGN.md`):** dark void/carbon/obsidian surfaces, hairline graphite borders, Inter + JetBrains Mono, acid-lime `#e4f222` active accent, 7/5 asymmetric playground grid.

## Routes

| Route | Structure |
|---|---|
| `/` | Landing + Lab index |
| `/stack` | Stack playground |
| `/queue` | Queue playground |
| `/bst` | Binary Search Tree playground |
| `/avl` | AVL tree playground |
| `/heap` | Heap playground with array strip |
| `/graph` | Graph playground (BFS/DFS/Dijkstra) |

Dynamic route handler lives in `app/[structure]/page.tsx`.

## Project structure

```
app/
  page.tsx                 # Landing
  layout.tsx               # Fonts (Inter + JetBrains Mono), metadata
  globals.css              # Design tokens
  [structure]/page.tsx     # /stack, /queue, /bst, /avl, /heap, /graph
  _components/
    Landing.tsx            # Hero + lab index
    Playground.tsx         # Operation bench + playback + narration + history
    StageCanvas.tsx        # React Three Fiber 3D stage
  _lib/
    structures.ts          # Models, operations, frame generation (~1300 lines)
design/
  DESIGN.md                # Color / type / motion / layout spec
public/                    # Static assets
```

## Getting started

Prerequisites: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Build / production:

```bash
npm run build
npm start
```

Quality gates:

```bash
npm run lint
npm run typecheck
npm run test:e2e
```

## Usage

1. Open any structure, e.g. `/avl`.
2. Pick an operation (e.g. `Insert`), enter a value (e.g. `12`), or toggle `RANDOM`.
3. Click `RUN`.
4. Step through frames with `⟲ / ▶ / ⟋ / ↺`, adjust speed, read narration + pseudocode per frame.
5. Use `RANDOMIZE` for a fresh dataset, `COPY SCENARIO` to share the exact state via URL.

Graph input formats:
- Add edge: `from to weight`, e.g. `0 1 4`
- BFS / DFS: `start`, e.g. `0`
- Dijkstra: `start target`, e.g. `0 5`

## Tech stack

- `next@15.5.24`, `react@18`, `react-dom@18`
- `@react-three/fiber@8`, `@react-three/drei@9`, `three@0.173`
- `animejs@3` (2D UI motion only — 3D motion is R3F frame interpolation)
- `tailwindcss@3`, `typescript@5`, `eslint@9`
- `@playwright/test` for e2e

## Design tokens (summary)

See `design/DESIGN.md` for full spec.

- Canvas `#08090a`, panels `#0f1011`, elevated `#161718`, borders `#23252a`
- Text: `#d0d6e0` primary, `#e5e5e6` high-contrast, `#8a8f98` secondary, `#62666d` muted
- Accent: acid-lime `#e4f222` (active only)
- Max width `1200px`, panel radius `12px`, controls `6px`

## Deployment

Any Next.js host works. Vercel example:

```bash
vercel --prod
```

No backend / env vars required — session state is local by default.

## License

No license specified. Add a `LICENSE` file if you plan to publish.
