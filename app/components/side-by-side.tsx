"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { PairingData } from "@/lib/pairings";
import { getAllPairings } from "@/lib/pairings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SideBySideProps {
  current: PairingData;
}

const COMPARE_HEADING = "Beautiful Typography";
const COMPARE_BODY =
  "The quick brown fox jumps over the lazy dog. Typography is the craft of endowing human language with a durable visual form.";
const COMPARE_CODE = `const config = {\n  fonts: ["heading", "body", "mono"],\n  scale: "major-third",\n};`;

export function SideBySide({ current }: SideBySideProps) {
  const allPairings = getAllPairings();
  const others = allPairings.filter((p) => p.name !== current.name);
  const [compareName, setCompareName] = useState(others[0]?.name ?? "");
  const compare = allPairings.find((p) => p.name === compareName);

  const containerRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const dragging = useRef(false);

  const onMouseDown = useCallback(() => {
    dragging.current = true;
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.min(Math.max((x / rect.width) * 100, 15), 85);
      setSplit(pct);
    };
    const onMouseUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  if (!compare) return null;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Compare with</span>
        <Select value={compareName} onValueChange={setCompareName}>
          <SelectTrigger className="w-[200px] text-xs uppercase tracking-wider border-2 border-foreground rounded-none bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            {others.map((p) => (
              <SelectItem key={p.name} value={p.name} className="text-xs uppercase tracking-wider">
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Comparison Container */}
      <div
        ref={containerRef}
        className="relative border-2 border-border overflow-hidden select-none"
        style={{ minHeight: 380 }}
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${split}%` }}
        >
          <PaneContent pairing={current} />
        </div>

        <div
          className="absolute inset-y-0 right-0 overflow-hidden"
          style={{ width: `${100 - split}%` }}
        >
          <PaneContent pairing={compare} />
        </div>

        {/* Drag Handle */}
        <div
          role="slider"
          aria-label="Comparison slider"
          aria-valuenow={Math.round(split)}
          aria-valuemin={15}
          aria-valuemax={85}
          aria-valuetext={`${Math.round(split)}% ${current.name}, ${Math.round(100 - split)}% ${compare?.name ?? ""}`}
          tabIndex={0}
          onMouseDown={onMouseDown}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setSplit((s) => Math.max(15, s - 2));
            if (e.key === "ArrowRight") setSplit((s) => Math.min(85, s + 2));
          }}
          className="drag-handle absolute inset-y-0 z-10 flex items-center justify-center"
          style={{ left: `${split}%`, width: 24, marginLeft: -12 }}
        >
          <div className="w-0.5 h-full bg-border" />
          <div className="absolute w-6 h-12 bg-background border-2 border-foreground flex items-center justify-center">
            <svg
              width="8"
              height="16"
              viewBox="0 0 6 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground"
            >
              <path d="M1 1v12M5 1v12" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-background border-2 border-foreground text-xs uppercase tracking-wider">
          {current.name}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-background border-2 border-foreground text-xs uppercase tracking-wider">
          {compare.name}
        </div>
      </div>
    </div>
  );
}

function PaneContent({ pairing }: { pairing: PairingData }) {
  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;
  const monoFont = `"${pairing.mono}", monospace`;
  const scale = pairing.scale;

  return (
    <div className="p-8 lg:p-10 space-y-5 min-w-[300px]">
      <h2
        style={{
          fontFamily: headingFont,
          fontSize: scale.h2.size,
          fontWeight: scale.h2.weight,
          lineHeight: scale.h2.lineHeight,
          letterSpacing: scale.h2.letterSpacing,
        }}
      >
        {COMPARE_HEADING}
      </h2>
      <p
        style={{
          fontFamily: bodyFont,
          fontSize: scale.body.size,
          lineHeight: scale.body.lineHeight,
          fontWeight: scale.body.weight,
        }}
        className="text-muted-foreground"
      >
        {COMPARE_BODY}
      </p>
      <pre
        className="px-4 py-3 border border-border overflow-x-auto bg-surface"
        style={{ fontFamily: monoFont, fontSize: "0.75rem", lineHeight: "1.55" }}
      >
        <code className="text-muted-foreground">{COMPARE_CODE}</code>
      </pre>
    </div>
  );
}
