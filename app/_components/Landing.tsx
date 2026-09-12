"use client";

import Link from "next/link";
import { useEffect } from "react";
import anime from "animejs";
import type { StructureKind } from "../_lib/structures";

type LandingProps = {
  structures: Record<
    StructureKind,
    { label: string; short: string; description: string; complexity: string }
  >;
};

const STRUCTURE_ORDER: StructureKind[] = ["stack", "queue", "bst", "avl", "heap", "graph"];

export function Landing({ structures }: LandingProps) {
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const motion = anime({
      targets: ".landing-reveal",
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 620,
      delay: anime.stagger(70),
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
    });
    return () => motion.pause();
  }, []);

  return (
    <main className="min-h-[100dvh] bg-void font-sans text-mist">
      <header className="border-b border-graphite bg-carbon/70">
        <div className="mx-auto flex max-w-lab items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center border border-accent bg-accent text-void font-mono text-[11px] font-medium">D</span>
            <div>
              <div className="text-[13px] font-medium tracking-[-0.01em] text-bone">DSA / PLAYGROUND</div>
              <div className="font-mono text-[10px] tracking-[0.16em] text-ash">STATE VISUALIZATION LAB</div>
            </div>
          </div>
          <a href="#structures" className="rounded-lab border border-graphite px-3 py-2 font-mono text-[11px] text-mist transition-all hover:border-mist hover:text-bone">VIEW LAB INDEX</a>
        </div>
      </header>

      <section className="relative mx-auto max-w-lab overflow-hidden px-5 pt-14 pb-16 md:px-8 md:pt-24 md:pb-24">
        <div className="landing-reveal absolute right-0 top-10 hidden h-40 w-40 border border-graphite md:block" aria-hidden="true">
          <div className="absolute inset-3 border border-graphite" />
          <div className="absolute bottom-5 left-5 h-2 w-16 bg-accent" />
          <div className="absolute right-5 top-5 h-2 w-8 bg-obsidian" />
        </div>
        <div className="landing-reveal relative max-w-3xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">COMPUTER SCIENCE / INTERACTIVE 3D</div>
          <h1 className="mt-5 text-5xl font-medium leading-none tracking-[-0.022em] text-bone md:text-7xl">See the state.<br />Understand the step.</h1>
          <p className="mt-6 max-w-[58ch] text-[16px] leading-relaxed text-fog">A precise laboratory for the structures behind your coursework. Run an operation, inspect the active pointer, and read the reasoning in lockstep.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/stack" className="rounded-lab bg-accent px-5 py-3 font-mono text-[11px] font-medium tracking-[0.08em] text-void transition-all hover:brightness-110 active:translate-y-px">OPEN THE LAB</Link>
            <a href="#structures" className="rounded-lab border border-graphite px-5 py-3 font-mono text-[11px] tracking-[0.08em] text-mist transition-all hover:border-mist hover:text-bone active:translate-y-px">BROWSE STRUCTURES</a>
          </div>
        </div>
        <div className="landing-reveal mt-16 grid grid-cols-2 gap-px overflow-hidden border border-graphite bg-graphite md:grid-cols-4">
          {[
            ["01", "6 structures", "One consistent stage"],
            ["02", "frame-synced", "Narration + pseudocode"],
            ["03", "O(1)–O((V+E)logV)", "Live complexity readout"],
            ["04", "zero backend", "Session-local by default"],
          ].map(([index, title, detail]) => (
            <div key={index} className="bg-carbon px-5 py-5">
              <div className="font-mono text-[10px] text-accent">{index}</div>
              <div className="mt-5 text-[13px] text-bone">{title}</div>
              <div className="mt-1 font-mono text-[10px] leading-relaxed text-ash">{detail}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="structures" className="border-t border-graphite bg-carbon/40">
        <div className="mx-auto max-w-lab px-5 py-16 md:px-8 md:py-24">
          <div className="landing-reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-medium tracking-[-0.022em] text-bone md:text-5xl">Lab index</h2>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-fog">Each route uses the same camera, frame, and narration contract so comparisons stay legible.</p>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash">SELECT / TRANSITION</div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {STRUCTURE_ORDER.map((structure, index) => {
              const item = structures[structure];
              return (
                <Link key={structure} href={`/${structure}`} className="landing-reveal group relative block rounded-panel border border-graphite bg-obsidian p-5 transition-all hover:border-mist hover:bg-carbon active:translate-y-px">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] text-ash">{String(index + 1).padStart(2, "0")} / {item.short}</span>
                    <span className="h-2 w-2 rounded-full border border-accent transition-all group-hover:bg-accent" />
                  </div>
                  <h3 className="mt-12 text-2xl font-medium tracking-[-0.022em] text-bone">{item.label}</h3>
                  <p className="mt-3 min-h-[48px] text-[14px] leading-relaxed text-fog">{item.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-graphite pt-4">
                    <span className="font-mono text-[10px] text-accent">{item.complexity}</span>
                    <span className="font-mono text-[11px] text-mist transition-all group-hover:translate-x-1">ENTER →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-graphite bg-void">
        <div className="mx-auto flex max-w-lab flex-wrap items-center justify-between gap-4 px-5 py-6 md:px-8">
          <span className="font-mono text-[10px] tracking-[0.16em] text-ash">DSA / PLAYGROUND</span>
          <span className="font-mono text-[10px] text-ash">BUILT FOR CLEAR THINKING</span>
        </div>
      </footer>
    </main>
  );
}
