"use client";

import { useState } from "react";
import type { PairingData } from "@/lib/pairings";

interface TypeTesterProps {
  pairing: PairingData;
}

type FontTarget = "heading" | "body" | "mono";

const DEFAULT_TEXT = "The quick brown fox jumps over the lazy dog";

export function TypeTester({ pairing }: TypeTesterProps) {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [target, setTarget] = useState<FontTarget>("heading");
  const [fontSize, setFontSize] = useState(48);

  const fontMap: Record<FontTarget, { family: string; category: string }> = {
    heading: { family: pairing.heading, category: pairing.headingCategory },
    body: { family: pairing.body, category: pairing.bodyCategory },
    mono: { family: pairing.mono, category: "monospace" },
  };

  const current = fontMap[target];

  const tabs: { key: FontTarget; label: string; font: string }[] = [
    { key: "heading", label: "Heading", font: pairing.heading },
    { key: "body", label: "Body", font: pairing.body },
    { key: "mono", label: "Mono", font: pairing.mono },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setTarget(tab.key)}
            className={`px-4 py-2.5 text-sm font-sans font-medium transition-colors relative ${
              target === tab.key
                ? "text-text"
                : "text-muted hover:text-text"
            }`}
          >
            {tab.label}
            <span className="block text-[10px] font-mono font-normal text-muted mt-0.5">
              {tab.font}
            </span>
            {target === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-text" />
            )}
          </button>
        ))}

        {/* Font size slider */}
        <div className="ml-auto flex items-center gap-3 pb-2">
          <span className="text-[11px] font-mono text-muted">{fontSize}px</span>
          <input
            type="range"
            min="12"
            max="120"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-24 sm:w-32"
          />
        </div>
      </div>

      {/* Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        rows={1}
        className="w-full bg-transparent border-none outline-none resize-none font-sans text-sm text-muted placeholder:text-muted/40"
      />

      {/* Preview */}
      <div
        className="min-h-[120px] py-4 transition-all duration-200"
        style={{
          fontFamily: `"${current.family}", ${current.category}`,
          fontSize: `${fontSize}px`,
          lineHeight: "1.2",
          wordBreak: "break-word",
        }}
      >
        {text || DEFAULT_TEXT}
      </div>
    </div>
  );
}
