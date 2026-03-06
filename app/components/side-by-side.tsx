"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { PairingData } from "@/lib/pairings";
import { getAllPairings } from "@/lib/pairings";

interface SideBySideProps {
  current: PairingData;
}

const COMPARE_TEXT_HEADING = "Beautiful Typography";
const COMPARE_TEXT_BODY =
  "The quick brown fox jumps over the lazy dog. Typography is the craft of endowing human language with a durable visual form, and thus with an independent existence.";
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
    <div className="space-y-4">
      {/* Dropdown */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-sans text-muted">Compare with</span>
        <select
          value={compareName}
          onChange={(e) => setCompareName(e.target.value)}
          className="bg-transparent border border-border rounded-lg px-3 py-1.5 text-sm font-mono text-text focus:outline-none focus:border-accent"
        >
          {others.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Split View */}
      <div
        ref={containerRef}
        className="relative border border-border rounded-lg overflow-hidden select-none"
        style={{ minHeight: 320 }}
      >
        {/* Left */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${split}%` }}
        >
          <PaneContent pairing={current} />
        </div>

        {/* Right */}
        <div
          className="absolute inset-y-0 right-0 overflow-hidden"
          style={{ width: `${100 - split}%` }}
        >
          <PaneContent pairing={compare} />
        </div>

        {/* Divider */}
        <div
          onMouseDown={onMouseDown}
          className="drag-handle absolute inset-y-0 z-10 flex items-center justify-center"
          style={{ left: `${split}%`, width: 20, marginLeft: -10 }}
        >
          <div className="w-px h-full bg-border" />
          <div className="absolute w-6 h-8 rounded bg-bg border border-border flex items-center justify-center">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-muted"
            >
              <path d="M2 1v12M6 1v12" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div
          className="absolute top-3 left-3 px-2 py-0.5 rounded bg-bg/80 backdrop-blur-sm text-[10px] font-mono text-muted border border-border"
        >
          {current.name}
        </div>
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded bg-bg/80 backdrop-blur-sm text-[10px] font-mono text-muted border border-border"
        >
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
    <div className="p-6 space-y-4 min-w-[280px]">
      <h2
        style={{
          fontFamily: headingFont,
          fontSize: scale.h2.size,
          fontWeight: scale.h2.weight,
          lineHeight: scale.h2.lineHeight,
          letterSpacing: scale.h2.letterSpacing,
        }}
      >
        {COMPARE_TEXT_HEADING}
      </h2>
      <p
        style={{
          fontFamily: bodyFont,
          fontSize: scale.body.size,
          lineHeight: scale.body.lineHeight,
          fontWeight: scale.body.weight,
        }}
        className="text-muted"
      >
        {COMPARE_TEXT_BODY}
      </p>
      <pre
        className="px-3 py-2 rounded bg-accent-soft/40 border border-border overflow-x-auto"
        style={{
          fontFamily: monoFont,
          fontSize: "0.75rem",
          lineHeight: "1.5",
        }}
      >
        <code className="text-muted">{COMPARE_CODE}</code>
      </pre>
    </div>
  );
}
