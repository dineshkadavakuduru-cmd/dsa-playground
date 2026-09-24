// Next.js 15 App Router uses an internal React 19 compilation where
// __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED was replaced by
// __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.
// Libraries relying on react-reconciler (such as @react-three/fiber v8)
// access React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentBatchConfig.
// This bridge maps the internal references so that react-reconciler executes seamlessly.

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
const React = require("react");

function attachInternals(target: any) {
  if (!target) return;
  const clientInternals =
    target.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

  if (!target.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
    // Minimal debug frame stub - React 19 doesn't expose these but reconciler expects them
    let currentExtraStackFrame: string | null = null;
    const debugFrame = {
      getStackAddendum() {
        return currentExtraStackFrame ?? "";
      },
      setExtraStackFrame(stack: string | null) {
        currentExtraStackFrame = stack;
      },
      getCurrentStack: clientInternals?.getCurrentStack ?? null,
    };

    const internals = {
      ReactCurrentBatchConfig: {
        get transition() {
          return clientInternals ? clientInternals.T : null;
        },
        set transition(val: unknown) {
          if (clientInternals) clientInternals.T = val;
        },
      },
      ReactCurrentDispatcher: {
        get current() {
          return clientInternals ? clientInternals.H : null;
        },
        set current(val: unknown) {
          if (clientInternals) clientInternals.H = val;
        },
      },
      ReactCurrentOwner: {
        get current() {
          return clientInternals ? clientInternals.A : null;
        },
        set current(val: unknown) {
          if (clientInternals) clientInternals.A = val;
        },
      },
      ReactCurrentActQueue: {
        get current() {
          return clientInternals ? clientInternals.actQueue : null;
        },
        set current(val: unknown) {
          if (clientInternals) clientInternals.actQueue = val;
        },
        get isBatchingLegacy() {
          return clientInternals ? clientInternals.isBatchingLegacy : false;
        },
        set isBatchingLegacy(val: unknown) {
          if (clientInternals) clientInternals.isBatchingLegacy = val;
        },
        get didScheduleLegacyUpdate() {
          return clientInternals ? clientInternals.didScheduleLegacyUpdate : false;
        },
        set didScheduleLegacyUpdate(val: unknown) {
          if (clientInternals) clientInternals.didScheduleLegacyUpdate = val;
        },
      },
      ReactDebugCurrentFrame: debugFrame,
    };

    try {
      Object.defineProperty(target, "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", {
        value: internals,
        writable: true,
        enumerable: false,
        configurable: true,
      });
    } catch {
      target.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = internals;
    }
  }
}

attachInternals(React);
if (React && React.default) {
  attachInternals(React.default);
}

export {};