# Changelog

## [Unreleased]

### Fixed

- **Cross-stage legend leak (BST).** The "bf N — balance factor" legend entry is now rendered only on the AVL stage. It previously appeared on the BST stage too, even though BST frames never emit a balance factor.
- **Rapid-click data loss.** Five RUN clicks dispatched in a single task previously collapsed to one operation: each handler read a stale `model` from its render closure, so later clicks overwrote earlier ones. The live model now lives in a ref updated synchronously, so every click commits. Verified by ablation — pre-fix code produced 6 heap cells for 5 inserts; post-fix produces 10.
- **Mobile navigation.** The structure nav was `hidden md:flex`, so at 375px there was no way to switch structures. It now wraps to its own scrollable row and remains reachable.

### Changed

- **React 19 / @react-three/fiber v9 upgrade (removes the React-internals bridge).** Upgraded `react`/`react-dom` 18.2 → 19.3.1, `@react-three/fiber` 8.17.11 → 9.8.2, `@react-three/drei` 9.122 → 10.7.9, `three` 0.173 → 0.180. Since fiber v9 drops `react-reconciler` and targets React 19 natively, the hand-written `app/_lib/react-polyfill.ts` bridge (which mutated `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED`, `ReactCurrentActQueue`, `ReactDebugCurrentFrame`, etc.) was deleted along with its imports.
- **Exact version pins** for the rendering stack: `react`, `react-dom`, `@react-three/fiber`, `@react-three/drei`, `three`, `@types/react`, `@types/react-dom`, and `@playwright/test`.
- **Build-time guard** `scripts/check-three-stack.mjs` runs on `prebuild` and fails loudly if React is not 19.x, fiber is not 9.x, or `react-reconciler` reappears without the bridge (i.e. if the conditions requiring the polyfill ever return).
- Removed the obsolete `@types/drei.d.ts` augmentation; drei v10 ships correct types.

### Added

- **WebGL resilience in `StageCanvas`:** a one-shot WebGL capability probe with a "WEBGL UNAVAILABLE / STAGE OFFLINE" fallback, a `webglcontextlost` handler → "WEBGL CONTEXT LOST / STAGE OFFLINE", a "CALIBRATING STAGE" loader until the first frame is ready, device pixel ratio capped at `[1, 2]`, and explicit geometry/material disposal on stage unmount.
- **Tests (56 total):**
  - `tests/edge-cases-logic.spec.ts` — empty, single-element, duplicate-value, `±MAX_INPUT_VALUE`, and max-size (200 stack pushes, 200-node heap, 100-node AVL, 60-vertex graph) matrices for all six structures.
  - `tests/stage-isolation.spec.ts` — frame-layer guarantee that AVL balance-factor detail, heap array/index detail, and graph weights/distances never bleed onto other stages.
  - `tests/stages.spec.ts` — browser checks for legend leakage per stage, 375px layout (no horizontal overflow + nav reachable), the no-WebGL fallback, rapid-click integrity, sequential playback, and reset-mid-animation ghost-node check.
- npm script `test:logic` for the server-free algorithm suite.

### Test infrastructure

- `playwright.config.ts` now runs single-worker and retries once locally, fixing intermittent `page` setup timeouts caused by headless Chromium sharing one SwiftShader GL context pool across parallel WebGL pages.
- `playwright.logic.config.ts` matches the three pure-logic specs.
