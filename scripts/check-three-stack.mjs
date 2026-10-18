// Build-time guard for the 3D rendering stack.
//
// @react-three/fiber v8 pulled in react-reconciler 0.27, which depended on
// React-18-internal fields (__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).
// Next.js 15 renders with React 19, which replaced those fields, so the app
// carried a hand-written bridge (app/_lib/react-polyfill.ts) that mutated
// React internals on every load. @react-three/fiber v9 targets React 19
// natively and no longer ships react-reconciler, so the bridge was removed.
//
// This script fails the build loudly if that assumption ever drifts: if a
// future install brings back React 18 internals plus react-reconciler, the
// removed polyfill would be needed again and the app would break at runtime
// instead of at build time.

import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function readVersion(pkg) {
  try {
    return require(`${pkg}/package.json`).version;
  } catch {
    return null;
  }
}

function major(version) {
  return version ? Number(version.split(".")[0]) : null;
}

const failures = [];
const react = readVersion("react");
const fiber = readVersion("@react-three/fiber");
const reconciler = readVersion("react-reconciler");
const polyfill = join(root, "app", "_lib", "react-polyfill.ts");

if (react === null) failures.push("react is not installed");
if (fiber === null) failures.push("@react-three/fiber is not installed");

if (major(react) !== 19) {
  failures.push(
    `react is ${react ?? "missing"}; this app relies on React 19 internals removal (React 19 required).`,
  );
}
if (major(fiber) !== 9) {
  failures.push(
    `@react-three/fiber is ${fiber ?? "missing"}; fiber v8 needs react-reconciler 0.27 and the removed React-18 internals bridge.`,
  );
}

if (reconciler !== null && existsSync(polyfill) === false) {
  failures.push(
    `react-reconciler ${reconciler} is installed but app/_lib/react-polyfill.ts is absent. ` +
      "The reconciler depends on React-18 internal fields that React 19 no longer exposes; restore the bridge or upgrade @react-three/fiber.",
  );
}

if (failures.length > 0) {
  console.error("\n[check-three-stack] Incompatible 3D stack — refusing to build:\n");
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error(
    "\nExpected: react@19.x, @react-three/fiber@9.x, no react-reconciler, no react-polyfill.\n",
  );
  process.exit(1);
}

console.log(
  `[check-three-stack] OK — react ${react}, @react-three/fiber ${fiber}, react-reconciler ${reconciler ?? "absent"}.`,
);
