"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import anime from "animejs";
import {
  OPERATIONS,
  STRUCTURES,
  createInitialModel,
  executeOperation,
  initialFrames,
  randomizeModel,
  type StepFrame,
  type StructureKind,
  type StructureModel,
} from "../_lib/structures";

const StageCanvas = dynamic(() => import("./StageCanvas").then((module) => module.StageCanvas), {
  ssr: false,
  loading: () => <div className="stage-loading">CALIBRATING STAGE</div>,
});

type Scenario = {
  kind: StructureKind;
  model: StructureModel;
  operation: string;
  input: string;
  history: Array<{ operation: string; input: string }>;
};

type PlaygroundProps = {
  kind: StructureKind;
};

const DEFAULT_INPUTS: Record<string, string> = {
  stack: "42",
  queue: "42",
  bst: "12",
  avl: "12",
  heap: "12",
  graph: "0",
};

export function Playground({ kind }: PlaygroundProps) {
  const initialModel = useMemo(() => createInitialModel(kind), [kind]);
  const [model, setModel] = useState<StructureModel>(() => initialModel);
  const [frames, setFrames] = useState<StepFrame[]>(() => initialFrames(kind, initialModel));
  const [stepIndex, setStepIndex] = useState(0);
  const [operation, setOperation] = useState(() => OPERATIONS[kind][0].value);
  const [input, setInput] = useState(() => DEFAULT_INPUTS[kind]);
  const [mode, setMode] = useState<"manual" | "random">("manual");
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [history, setHistory] = useState<Scenario["history"]>([]);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const next = createInitialModel(kind);
      const scenario = readScenario();
      const scenarioModel = scenario?.kind === kind ? scenario.model : next;
      const scenarioOperation = scenario?.kind === kind ? scenario.operation : OPERATIONS[kind][0].value;
      setModel(scenarioModel);
      setFrames(initialFrames(kind, scenarioModel));
      setStepIndex(0);
      setOperation(scenarioOperation);
      setInput(scenario?.kind === kind ? scenario.input : DEFAULT_INPUTS[kind]);
      setHistory(scenario?.kind === kind ? scenario.history ?? [] : []);
      setPlaying(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [kind]);

  const frameIndex = Math.min(stepIndex, Math.max(frames.length - 1, 0));
  const frame = frames[frameIndex] ?? frames[0];
  const operationDefinition = useMemo(
    () => OPERATIONS[kind].find((item) => item.value === operation) ?? OPERATIONS[kind][0],
    [kind, operation],
  );

  useEffect(() => {
    if (!playing || frameIndex >= frames.length - 1) return;
    const timer = window.setTimeout(() => {
      const nextIndex = Math.min(frameIndex + 1, frames.length - 1);
      setStepIndex(nextIndex);
      if (nextIndex >= frames.length - 1) setPlaying(false);
    }, Math.max(260, 980 / speed));
    return () => window.clearTimeout(timer);
  }, [playing, frameIndex, frames.length, speed]);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = anime({
      targets: ".playground-panel",
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 520,
      delay: anime.stagger(55),
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
    });
    return () => controls.pause();
  }, [kind]);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const motion = anime({
      targets: [".current-narration", ".complexity-readout", ".array-strip"],
      opacity: [0.42, 1],
      translateX: [8, 0],
      duration: 240,
      easing: "easeOutQuad",
    });
    return () => motion.pause();
  }, [frame?.id, stepIndex]);

  useEffect(() => () => {
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
  }, []);

  const runOperation = () => {
    const result = executeOperation(kind, model, operation, input, mode === "random");
    setModel(result.model);
    setFrames(result.frames);
    setStepIndex(0);
    setPlaying(false);
    setHistory((current) => [
      ...current.slice(-11),
      { operation: operationDefinition.label, input: mode === "random" ? "random" : input || operationDefinition.placeholder },
    ]);
  };

  const randomizeStructure = () => {
    const next = randomizeModel(kind);
    setModel(next);
    setFrames(initialFrames(kind, next));
    setStepIndex(0);
    setPlaying(false);
    setHistory([]);
  };

  const shareScenario = async () => {
    const scenario: Scenario = { kind, model, operation, input, history };
    const encoded = typeof window === "undefined" ? "" : encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(scenario)))));
    const url = `${window.location.origin}${window.location.pathname}?scenario=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const stepBack = () => {
    setPlaying(false);
    setStepIndex((current) => Math.max(0, current - 1));
  };

  const stepForward = () => {
    setPlaying(false);
    setStepIndex((current) => Math.min(frames.length - 1, current + 1));
  };

  return (
    <main className="min-h-[100dvh] bg-void font-sans text-mist">
      <div className="border-b border-graphite bg-carbon/70">
        <div className="mx-auto flex max-w-lab items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center border border-accent bg-accent text-void font-mono text-[11px] font-medium transition-transform group-hover:rotate-90">D</span>
            <span>
              <span className="block text-[13px] font-medium tracking-[-0.01em] text-bone">DSA / PLAYGROUND</span>
              <span className="block font-mono text-[10px] tracking-[0.16em] text-ash">STATE VISUALIZATION LAB</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Structures">
            {(Object.keys(STRUCTURES) as StructureKind[]).map((item) => (
              <Link key={item} href={`/${item}`} data-testid={`nav-${item}`} className={`rounded-lab px-3 py-2 text-[12px] transition-all ${item === kind ? "bg-accent font-medium text-void" : "text-fog hover:bg-obsidian hover:text-bone"}`}>
                {STRUCTURES[item].short}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-lab px-5 py-6 md:px-8 md:py-10">
        <div className="mb-6 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end">
          <div className="playground-panel">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{STRUCTURES[kind].short} / LIVE SCENE</div>
            <h1 className="mt-2 text-3xl font-medium tracking-[-0.022em] text-bone md:text-5xl">{STRUCTURES[kind].label}</h1>
            <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-fog">{STRUCTURES[kind].description}</p>
          </div>
          <div className="playground-panel flex flex-wrap items-center gap-2 md:justify-end">
            <button type="button" onClick={shareScenario} data-testid="copy-scenario" className="rounded-lab border border-graphite bg-obsidian px-3 py-2 font-mono text-[11px] text-mist transition-all hover:border-mist hover:text-bone active:translate-y-px">
              {copied ? "LINK COPIED" : "COPY SCENARIO"}
            </button>
            <button type="button" onClick={randomizeStructure} data-testid="randomize-structure" className="rounded-lab border border-graphite bg-obsidian px-3 py-2 font-mono text-[11px] text-mist transition-all hover:border-mist hover:text-bone active:translate-y-px">
              RANDOMIZE
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(320px,5fr)]">
          <section className="playground-panel rounded-panel border border-graphite bg-carbon shadow-hairline">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-graphite px-5 py-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash">3D STAGE / {STRUCTURES[kind].short}</div>
                <div className="mt-1 text-[13px] text-mist">Frame {stepIndex + 1} <span className="text-ash">/ {frames.length}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">active</span>
              </div>
            </div>
            <div className="relative h-[390px] overflow-hidden bg-void md:h-[520px]">
              <StageCanvas frame={frame} kind={kind} />
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-sm border border-graphite bg-void/80 px-2 py-1 font-mono text-[10px] text-fog">
                <span className="text-accent">▣</span> CAMERA / ORBIT
              </div>
            </div>
            {kind === "heap" && frame.array && <ArrayStrip values={frame.array} activeIndices={frame.activeIndices ?? []} />}
          </section>

          <aside className="flex flex-col gap-4">
            <section className="playground-panel rounded-panel border border-graphite bg-carbon p-5 shadow-hairline">
              <div className="flex items-center justify-between">
                <h2 className="text-[13px] font-medium tracking-[-0.01em] text-bone">Operation bench</h2>
                <span className="font-mono text-[10px] text-ash">{operationDefinition.value}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <label className="col-span-2">
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-ash">Operation</span>
<select value={operation} onChange={(event) => { setOperation(event.target.value); setInput(DEFAULT_INPUTS[kind]); }} data-testid="operation-select" className="h-9 w-full rounded-lab border border-graphite bg-obsidian px-3 font-mono text-[12px] text-mist outline-none transition-colors focus:border-mist">
                      {OPERATIONS[kind].map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                    </select>
                </label>
                <label className="col-span-2">
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-ash">{operationDefinition.inputLabel}</span>
                  <input value={input} onChange={(event) => setInput(event.target.value)} disabled={mode === "random"} placeholder={operationDefinition.placeholder} data-testid="operation-input" className="h-9 w-full rounded-lab border border-graphite bg-obsidian px-3 font-mono text-[12px] text-bone outline-none transition-colors placeholder:text-ash focus:border-mist disabled:cursor-not-allowed disabled:text-ash" />
                </label>
                <div className="col-span-2 flex rounded-lab border border-graphite bg-obsidian p-1">
                  {([
                    ["manual", "MANUAL"],
                    ["random", "RANDOM"],
                  ] as const).map(([value, label]) => (
                    <button key={value} type="button" onClick={() => setMode(value)} data-testid={`mode-${value}`} className={`flex-1 rounded-[4px] px-2 py-1.5 font-mono text-[10px] transition-all ${mode === value ? "bg-accent text-void" : "text-fog hover:text-bone"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" onClick={runOperation} data-testid="run-operation" className="mt-4 flex h-10 w-full items-center justify-center rounded-lab bg-accent px-4 font-mono text-[11px] font-medium tracking-[0.08em] text-void transition-all hover:brightness-110 active:translate-y-px">
                RUN {operationDefinition.label.toUpperCase()}
              </button>
              <div className="mt-5 border-t border-graphite pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">Playback</span>
                  <span className="font-mono text-[10px] text-fog">{speed.toFixed(1)}x</span>
                </div>
                <input aria-label="Playback speed" type="range" min="0.5" max="2" step="0.1" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="mt-3 h-1 w-full cursor-pointer accent-accent" />
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <ControlButton label="⟲" onClick={stepBack} disabled={stepIndex === 0} data-testid="step-back" />
                  <ControlButton label={playing ? "Ⅱ" : "▶"} onClick={() => setPlaying((current) => !current)} data-testid="play-pause" />
                  <ControlButton label="⟋" onClick={stepForward} disabled={stepIndex >= frames.length - 1} data-testid="step-forward" />
                  <ControlButton label="↺" onClick={() => { setStepIndex(0); setPlaying(false); }} data-testid="reset-playback" />
                </div>
              </div>
            </section>

            <section className="playground-panel rounded-panel border border-graphite bg-carbon p-5 shadow-hairline">
              <div className="flex items-center justify-between">
                <h2 className="text-[13px] font-medium tracking-[-0.01em] text-bone">Live narration</h2>
                <span className="font-mono text-[10px] text-ash">SYNCED</span>
              </div>
              <div className="current-narration mt-4 rounded-[4px] border-l-2 border-accent bg-obsidian/70 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{frame.title}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-bone">{frame.narration}</p>
                <code className="mt-3 block font-mono text-[11px] leading-relaxed text-fog">{frame.pseudocode}</code>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {frames.slice(0, stepIndex + 1).slice(-4).map((item, index) => (
                  <button key={item.id} type="button" onClick={() => { setPlaying(false); setStepIndex(frames.indexOf(item)); }} data-testid={`step-${frames.indexOf(item) + 1}`} className={`rounded-[4px] border px-2 py-1.5 font-mono text-[10px] transition-all ${index === stepIndex ? "border-accent bg-accent/10 text-accent" : "border-graphite text-fog hover:border-mist hover:text-bone"}`}>
                    {String(frames.indexOf(item) + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>
              <div className="complexity-readout mt-5 flex items-center justify-between border-t border-graphite pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">Complexity</span>
                <span className="font-mono text-[13px] text-accent">{frame.complexity}</span>
              </div>
            </section>

            <section className="playground-panel rounded-panel border border-graphite bg-carbon p-5 shadow-hairline">
              <div className="flex items-center justify-between">
                <h2 className="text-[13px] font-medium tracking-[-0.01em] text-bone">Session history</h2>
                <span className="font-mono text-[10px] text-ash">{history.length}</span>
              </div>
              <div className="mt-4 flex max-h-40 flex-col divide-y divide-graphite overflow-y-auto">
                {history.length === 0 ? (
                  <p className="py-4 font-mono text-[11px] text-ash">No operations executed yet.</p>
                ) : history.slice().reverse().map((item, index) => (
                  <div key={`${item.operation}-${index}`} className="flex items-center justify-between py-2.5">
                    <span className="font-mono text-[11px] text-mist">{item.operation}</span>
                    <span className="font-mono text-[10px] text-ash">{item.input}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ControlButton({ label, onClick, disabled = false, "data-testid": testId }: { label: string; onClick: () => void; disabled?: boolean; "data-testid"?: string }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} data-testid={testId} className="h-9 rounded-lab border border-graphite bg-obsidian font-mono text-[13px] text-mist transition-all hover:border-mist hover:text-bone active:translate-y-px disabled:cursor-not-allowed disabled:opacity-35">
      {label}
    </button>
  );
}

function ArrayStrip({ values, activeIndices }: { values: string[]; activeIndices: number[] }) {
  return (
    <div className="array-strip border-t border-graphite bg-obsidian/60 px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">Heap array</span>
        <span className="font-mono text-[10px] text-fog">index-addressable</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((value, index) => (
          <div key={`${index}-${value}`} className={`flex min-w-[54px] flex-col items-center rounded-[4px] border px-2 py-2 transition-all ${activeIndices.includes(index) ? "border-accent bg-accent/10" : "border-graphite bg-void"}`}>
            <span className="font-mono text-[10px] text-ash">[{index}]</span>
            <span className={`font-mono text-[13px] ${activeIndices.includes(index) ? "text-accent" : "text-bone"}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function readScenario(): Scenario | null {
  if (typeof window === "undefined") return null;
  const encoded = new URLSearchParams(window.location.search).get("scenario");
  if (!encoded) return null;
  try {
    return JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(encoded))))) as Scenario;
  } catch {
    return null;
  }
}
