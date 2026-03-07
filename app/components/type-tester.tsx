"use client";

import { useState } from "react";
import type { PairingData } from "@/lib/pairings";

interface TypeTesterProps {
  pairing: PairingData;
}

type FontTarget = "heading" | "body" | "mono";

const DEFAULT_TEXT = "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.";

const WEIGHTS = [
  { value: 300, label: "Light" },
  { value: 400, label: "Regular" },
  { value: 500, label: "Medium" },
  { value: 600, label: "SemiBold" },
  { value: 700, label: "Bold" },
];

const SIZES = [
  { value: 14, label: "14" },
  { value: 18, label: "18" },
  { value: 24, label: "24" },
  { value: 32, label: "32" },
  { value: 48, label: "48" },
  { value: 64, label: "64" },
  { value: 96, label: "96" },
  { value: 128, label: "128" },
];

export function TypeTester({ pairing }: TypeTesterProps) {
  const [target, setTarget] = useState<FontTarget>("heading");
  const [weight, setWeight] = useState(400);
  const [size, setSize] = useState(64);

  const fontMap: Record<FontTarget, { family: string; category: string; name: string }> = {
    heading: { family: pairing.heading, category: pairing.headingCategory, name: pairing.heading },
    body: { family: pairing.body, category: pairing.bodyCategory, name: pairing.body },
    mono: { family: pairing.mono, category: "monospace", name: pairing.mono },
  };

  const current = fontMap[target];

  return (
    <div className="space-y-0">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 pb-6 border-b border-border">
        {/* Font Selector */}
        <div className="flex items-center gap-0">
          {(["heading", "body", "mono"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setTarget(key)}
              aria-pressed={target === key}
              className={`px-4 py-2 text-xs uppercase tracking-wider border-b-2 transition-[color,border-color] ${
                target === key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {fontMap[key].name}
            </button>
          ))}
        </div>

        {/* Size Selector */}
        <div className="flex items-center gap-4 lg:ml-auto">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Size</span>
          <div className="flex items-center gap-1">
            {SIZES.map((s) => (
              <button
                key={s.value}
                onClick={() => setSize(s.value)}
                aria-pressed={size === s.value}
                className={`px-2 py-1 text-[11px] font-mono transition-[background-color,color,border-color] border ${
                  size === s.value
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Weight Specimens — FontShare style: each weight as its own row */}
      <div className="divide-y divide-border">
        {WEIGHTS.map((w) => (
          <button
            key={w.value}
            onClick={() => setWeight(w.value)}
            className={`w-full text-left py-6 px-2 group transition-[background-color] ${
              weight === w.value ? "bg-surface" : "hover:bg-surface/50"
            }`}
          >
            {/* Weight Label */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {w.label}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                {w.value}
              </span>
            </div>

            {/* Specimen Text */}
            <div
              style={{
                fontFamily: `"${current.family}", ${current.category}`,
                fontSize: `${size}px`,
                fontWeight: w.value,
                lineHeight: "1.2",
                wordBreak: "break-word",
              }}
              className="truncate"
            >
              {DEFAULT_TEXT}
            </div>
          </button>
        ))}
      </div>

      {/* Editable Specimen */}
      <div className="pt-8 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Custom Text
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            {current.family} {weight} / {size}px
          </span>
        </div>

        <div
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-label="Type specimen preview"
          className="min-h-[120px] p-4 border border-border cursor-text focus-visible:outline-2 focus-visible:outline-ring resize-none"
          style={{
            fontFamily: `"${current.family}", ${current.category}`,
            fontSize: `${size}px`,
            fontWeight: weight,
            lineHeight: "1.2",
            wordBreak: "break-word",
          }}
        >
          {DEFAULT_TEXT}
        </div>

        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-3">
          Click to edit text
        </p>
      </div>
    </div>
  );
}
