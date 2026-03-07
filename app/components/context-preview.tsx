"use client";

import { useState } from "react";
import type { PairingData } from "@/lib/pairings";

interface ContextPreviewProps {
  pairing: PairingData;
}

type PreviewMode = "blog" | "landing" | "docs";

export function ContextPreview({ pairing }: ContextPreviewProps) {
  const [mode, setMode] = useState<PreviewMode>("blog");

  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;
  const monoFont = `"${pairing.mono}", monospace`;
  const scale = pairing.scale;

  const modes: PreviewMode[] = ["blog", "landing", "docs"];

  return (
    <div className="space-y-6">
      {/* Tabs - Swiss Style */}
      <div className="border-b border-border">
        <div className="flex items-center gap-0" role="tablist">
          {modes.map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`px-4 py-3 text-xs uppercase tracking-widest border-b-2 transition-colors capitalize ${
                mode === m
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Container */}
      <div className="border-2 border-border">
        {mode === "blog" && (
          <BlogPreview headingFont={headingFont} bodyFont={bodyFont} monoFont={monoFont} scale={scale} />
        )}
        {mode === "landing" && (
          <LandingPreview headingFont={headingFont} bodyFont={bodyFont} monoFont={monoFont} scale={scale} />
        )}
        {mode === "docs" && (
          <DocsPreview headingFont={headingFont} bodyFont={bodyFont} monoFont={monoFont} scale={scale} />
        )}
      </div>
    </div>
  );
}

interface PreviewProps {
  headingFont: string;
  bodyFont: string;
  monoFont: string;
  scale: PairingData["scale"];
}

function BlogPreview({ headingFont, bodyFont, monoFont, scale }: PreviewProps) {
  return (
    <div className="px-8 lg:px-16 py-12 lg:py-16 max-w-3xl mx-auto space-y-8">
      <span
        className="text-xs uppercase tracking-widest text-muted-foreground"
        style={{ fontFamily: monoFont }}
      >
        March 7, 2026
      </span>

      <h1
        style={{
          fontFamily: headingFont,
          fontSize: scale.h1.size,
          fontWeight: scale.h1.weight,
          lineHeight: scale.h1.lineHeight,
          letterSpacing: scale.h1.letterSpacing,
        }}
      >
        On the Craft of Typography
      </h1>

      <p
        style={{
          fontFamily: bodyFont,
          fontSize: scale.body.size,
          lineHeight: scale.body.lineHeight,
          fontWeight: scale.body.weight,
        }}
        className="text-muted-foreground"
      >
        Typography is the art of arranging type to make written language
        legible, readable, and appealing when displayed. It involves
        selecting typefaces, point sizes, line lengths, line-spacing, and
        letter-spacing.
      </p>

      <h2
        style={{
          fontFamily: headingFont,
          fontSize: scale.h2.size,
          fontWeight: scale.h2.weight,
          lineHeight: scale.h2.lineHeight,
          letterSpacing: scale.h2.letterSpacing,
        }}
      >
        The Details Matter
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
        Good typography is invisible. Bad typography is everywhere. The
        reader should never have to fight against the presentation to get
        to the content. Every choice serves the text.
      </p>

      <blockquote
        className="border-l-4 border-[#e30613] pl-6 py-2"
        style={{
          fontFamily: bodyFont,
          fontSize: scale.body.size,
          lineHeight: scale.body.lineHeight,
          fontStyle: "italic",
        }}
      >
        Typography exists to honor content.
        <span className="block text-sm text-muted-foreground mt-2 not-italic">
          — Robert Bringhurst
        </span>
      </blockquote>

      <pre
        className="px-5 py-4 border border-border overflow-x-auto bg-surface"
        style={{
          fontFamily: monoFont,
          fontSize: "0.8125rem",
          lineHeight: "1.65",
        }}
      >
        <code className="text-muted-foreground">{`// Typography scale configuration
const scale = {
  h1: { size: "${scale.h1.size}", weight: ${scale.h1.weight} },
  body: { size: "${scale.body.size}", lineHeight: "${scale.body.lineHeight}" },
};`}</code>
      </pre>
    </div>
  );
}

function LandingPreview({ headingFont, bodyFont, monoFont, scale }: PreviewProps) {
  return (
    <div className="px-8 lg:px-16 py-12 lg:py-16 space-y-12">
      <div className="text-center space-y-6 py-8">
        <h1
          style={{
            fontFamily: headingFont,
            fontSize: `clamp(2rem, 5vw, ${scale.h1.size})`,
            fontWeight: scale.h1.weight,
            lineHeight: scale.h1.lineHeight,
            letterSpacing: scale.h1.letterSpacing,
          }}
        >
          Build something
          <br />
          beautiful today
        </h1>
        <p
          style={{
            fontFamily: bodyFont,
            fontSize: "1.125rem",
            lineHeight: "1.6",
          }}
          className="text-muted-foreground max-w-lg mx-auto"
        >
          The modern toolkit for creators who care about every pixel and
          every word. Ship faster, look better.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <span
            className="inline-block px-6 py-3 bg-foreground text-background text-sm uppercase tracking-wider"
            style={{ fontFamily: bodyFont }}
          >
            Get Started
          </span>
          <span
            className="inline-block px-6 py-3 border-2 border-foreground text-sm uppercase tracking-wider"
            style={{ fontFamily: monoFont }}
          >
            View Docs
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
        {[
          { title: "Type Scale", desc: "Consistent hierarchy from h1 to body text." },
          { title: "Three Fonts", desc: "Heading, body, and mono — perfectly matched." },
          { title: "One Command", desc: "Install with shadcn CLI. No config needed." },
        ].map((f) => (
          <div key={f.title} className="p-6 bg-background space-y-3">
            <h3
              style={{
                fontFamily: headingFont,
                fontSize: scale.h4.size,
                fontWeight: scale.h4.weight,
                lineHeight: scale.h4.lineHeight,
              }}
            >
              {f.title}
            </h3>
            <p
              style={{ fontFamily: bodyFont, fontSize: "0.9375rem", lineHeight: "1.5" }}
              className="text-muted-foreground"
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocsPreview({ headingFont, bodyFont, monoFont, scale }: PreviewProps) {
  return (
    <div className="flex min-h-[400px]">
      <aside className="hidden lg:block w-56 shrink-0 border-r border-border p-6 space-y-6">
        <span
          className="block text-xs uppercase tracking-widest text-muted-foreground"
          style={{ fontFamily: monoFont }}
        >
          Getting Started
        </span>
        <nav className="space-y-1">
          {["Installation", "Configuration", "Typography", "Theming"].map((item, i) => (
            <a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`block px-3 py-2 text-sm ${
                i === 0
                  ? "text-[#e30613] font-medium border-l-2 border-[#e30613]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: bodyFont }}
            >
              {item}
            </a>
          ))}
        </nav>
        <span
          className="block text-xs uppercase tracking-widest text-muted-foreground pt-4"
          style={{ fontFamily: monoFont }}
        >
          API
        </span>
        <nav className="space-y-1">
          {["Components", "Hooks", "Utilities"].map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
              style={{ fontFamily: bodyFont }}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <div className="flex-1 px-8 lg:px-12 py-8 space-y-6 max-w-2xl">
        <h1
          style={{
            fontFamily: headingFont,
            fontSize: scale.h2.size,
            fontWeight: scale.h2.weight,
            lineHeight: scale.h2.lineHeight,
            letterSpacing: scale.h2.letterSpacing,
          }}
        >
          Installation
        </h1>

        <p
          style={{
            fontFamily: bodyFont,
            fontSize: scale.body.size,
            lineHeight: scale.body.lineHeight,
          }}
          className="text-muted-foreground"
        >
          Get started by installing the font pairing into your project. This
          will add the necessary font imports and CSS variables.
        </p>

        <h2
          style={{
            fontFamily: headingFont,
            fontSize: scale.h3.size,
            fontWeight: scale.h3.weight,
            lineHeight: scale.h3.lineHeight,
            letterSpacing: scale.h3.letterSpacing,
          }}
          className="pt-4"
        >
          Quick Start
        </h2>

        <pre
          className="px-5 py-4 border border-border overflow-x-auto bg-surface"
          style={{ fontFamily: monoFont, fontSize: "0.8125rem", lineHeight: "1.65" }}
        >
          <code className="text-muted-foreground">{`npx shadcn@latest add https://fonttrio.dev/r/editorial.json`}</code>
        </pre>

        <p
          style={{
            fontFamily: bodyFont,
            fontSize: scale.body.size,
            lineHeight: scale.body.lineHeight,
          }}
          className="text-muted-foreground"
        >
          This will add the following to your project:
        </p>

        <ul className="space-y-2" style={{ fontFamily: bodyFont, fontSize: scale.body.size, lineHeight: scale.body.lineHeight }}>
          <li className="text-muted-foreground flex gap-3">
            <span className="text-[#e30613]">—</span>
            Font imports via <code className="px-2 py-0.5 border border-border text-xs bg-surface" style={{ fontFamily: monoFont }}>next/font/google</code>
          </li>
          <li className="text-muted-foreground flex gap-3">
            <span className="text-[#e30613]">—</span>
            CSS variables for heading, body, and mono fonts
          </li>
          <li className="text-muted-foreground flex gap-3">
            <span className="text-[#e30613]">—</span>
            A typography scale with sizes, weights, and line heights
          </li>
        </ul>
      </div>
    </div>
  );
}
