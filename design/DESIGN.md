# DSA Playground — Design System

Reading: technical education product for CS learners and recruiters. The visual language is a dark computer-science lab: near-black surfaces, hairline borders, compact monospace metadata, and one acid-lime active-state accent.

## Source references

- Refero: Linear, “midnight precision instrument” — https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1
- Motion references: MotionSites `Reveal Hero`, `AI Workflow Hero`, and `Tech-Forward` prompt families. Use their staggered reveals, confident ease-out motion, and controlled state transitions only; do not copy literal components.
- Taste dials: `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 5`, `VISUAL_DENSITY: 5`.

## Tokens

### Colors

| Token | Value | Use |
| --- | --- | --- |
| `--color-void` | `#08090a` | Page canvas |
| `--color-carbon` | `#0f1011` | Panels and stage frames |
| `--color-obsidian` | `#161718` | Elevated surfaces |
| `--color-graphite` | `#23252a` | Hairline borders |
| `--color-smoke` | `#383b3f` | Separators |
| `--color-ash` | `#62666d` | Muted metadata |
| `--color-fog` | `#8a8f98` | Secondary text |
| `--color-mist` | `#d0d6e0` | Primary UI text |
| `--color-bone` | `#e5e5e6` | High contrast text |
| `--color-paper` | `#ffffff` | Maximum contrast |
| `--color-acid` | `#e4f222` | Active node, pointer, primary action |
| `--color-pulse` | `#27a644` | Supporting validation outline only |
| `--color-coral` | `#eb5757` | Supporting destructive outline only |
| `--color-signal` | `#02b8cc` | Informational edge detail only |
| `--color-iris` | `#6366f1` | Non-action tag detail only |

The acid-lime color is reserved for the active operation state. Supporting colors are never used as additional action colors.

### Typography

- UI: Inter Variable fallback to system sans-serif.
- Technical values, indices, pseudocode, and narration metadata: JetBrains Mono fallback to ui-monospace.
- Display tracking: `-0.022em` at 48px and above.
- Body tracking: `-0.011em` at 15px and 13–16px.
- Weights stay between 400 and 590.

### Spacing and shape

- Base unit: 4px.
- Element gap: 8px.
- Card padding: 24px.
- Section gap: 96px.
- Buttons and inputs: 6px radius.
- Panels: 12px radius.
- Pills: 9999px radius.
- Use hairline borders and surface contrast instead of decorative shadows.

## Motion language

- Landing and route transitions: 480–640ms cubic-bezier(0.16, 1, 0.3, 1), small stagger, opacity + 8–16px transform.
- Operation UI: 180–260ms ease-out for state changes.
- 3D motion is driven by React Three Fiber frame interpolation; anime.js is limited to the 2D interface.
- Honor `prefers-reduced-motion` by disabling decorative transitions.

## Layout

- Max width: 1200px.
- Desktop playground: 3D stage and telemetry panel in an asymmetric 7/5 grid.
- Mobile playground: single column with stage first and narration below.
- Stage proportions remain consistent across all structures.
- Keep visible nodes and edges under 40.

## Anti-slop checks

- No rainbow node palettes.
- No Bootstrap defaults.
- No decorative gradients on controls.
- No generic card grids without a functional reason.
- No motion that hides the active node or narration.
- Every visible state has a readable label and an accessible control.
