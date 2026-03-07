"use client";

import { useState } from "react";
import type { PairingData } from "@/lib/pairings";
import { Slider } from "@/components/ui/slider";

interface TypeTesterProps {
  pairing: PairingData;
}

type FontTarget = "heading" | "body" | "mono";

const DEFAULT_TEXT = "The quick brown fox jumps over the lazy dog";

export function TypeTester({ pairing }: TypeTesterProps) {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [target, setTarget] = useState<FontTarget>("heading");
  const [fontSize, setFontSize] = useState(64);

  const fontMap: Record<FontTarget, { family: string; category: string; name: string }> = {
    heading: { family: pairing.heading, category: pairing.headingCategory, name: pairing.heading },
    body: { family: pairing.body, category: pairing.bodyCategory, name: pairing.body },
    mono: { family: pairing.mono, category: "monospace", name: pairing.mono },
  };

  const current = fontMap[target];

  return (
    <div className="space-y-8">
      {/* Controls - Swiss Style */}
      <div className="border-b border-border pb-6">
        <div className="grid grid-cols-12 gap-4 items-end">
          {/* Font Target Tabs */}
          <div className="col-span-12 lg:col-span-6" role="tablist">
            <div className="flex items-center gap-0">
              {(["heading", "body", "mono"] as const).map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={target === key}
                  onClick={() => setTarget(key)}
                  className={`px-4 py-3 text-xs uppercase tracking-widest border-b-2 transition-colors ${
                    target === key
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {fontMap[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Size Slider */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-muted-foreground w-16">
                Size
              </span>
              <Slider
                value={[fontSize]}
                onValueChange={([v]) => setFontSize(v)}
                min={12}
                max={160}
                step={1}
                className="flex-1"
              />
              <span className="text-xs font-mono text-muted-foreground w-12 text-right">
                {fontSize}px
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editable Specimen */}
      <div className="border-2 border-border p-8 lg:p-12">
        <div
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-label="Type specimen preview"
          aria-describedby="type-tester-hint"
          onInput={(e) => setText(e.currentTarget.textContent || "")}
          className="min-h-[200px] cursor-text focus-visible:outline-none"
          style={{
            fontFamily: `"${current.family}", ${current.category}`,
            fontSize: `${fontSize}px`,
            lineHeight: "1.15",
            wordBreak: "break-word",
          }}
        >
          {DEFAULT_TEXT}
        </div>
        <p id="type-tester-hint" className="text-xs text-muted-foreground uppercase tracking-widest mt-6 pt-6 border-t border-border">
          Click text to edit
        </p>
      </div>
    </div>
  );
}
