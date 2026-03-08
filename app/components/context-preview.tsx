"use client";

import { useState } from "react";
import type { PairingData } from "@/lib/pairings";
import { UnderlineTabs } from "./underline-tabs";

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

  return (
    <div className="space-y-8">
      <UnderlineTabs
        items={[
          { key: "blog", label: "Blog" },
          { key: "landing", label: "Landing" },
          { key: "docs", label: "Docs" },
        ]}
        value={mode}
        onChange={(value) => setMode(value as PreviewMode)}
      />

      {/* Preview */}
      <div className="border border-border overflow-hidden">
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

const LANDING_FEATURES = [
  { title: "Type Scale", desc: "Consistent hierarchy from h1 to body text." },
  { title: "Three Fonts", desc: "Heading, body, and mono — perfectly matched." },
  { title: "One Command", desc: "Install with shadcn CLI. No config needed." },
];

const DOCS_NAV_ITEMS = ["Installation", "Configuration", "Typography", "Theming"];
const DOCS_API_ITEMS = ["Components", "Hooks", "Utilities"];

function BlogPreview({ headingFont, bodyFont, monoFont, scale }: PreviewProps) {
  return (
    <div className="px-8 lg:px-16 py-12 lg:py-16 max-w-3xl mx-auto space-y-8">
      <span
        className="text-xs text-muted-foreground"
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
        className="border-l-2 border-border pl-6 py-2"
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
        className="px-5 py-4 border border-border rounded-lg overflow-x-auto bg-muted"
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
        <div className="flex items-center justify-center gap-3 pt-4">
          <span
            className="inline-block px-5 py-2.5 bg-foreground text-background text-sm rounded-lg"
            style={{ fontFamily: bodyFont }}
          >
            Get Started
          </span>
          <span
            className="inline-block px-5 py-2.5 border border-border text-sm rounded-lg"
            style={{ fontFamily: bodyFont }}
          >
            View Docs
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {LANDING_FEATURES.map((f) => (
          <div key={f.title} className="p-6 border border-border rounded-lg space-y-3">
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
          className="block text-xs text-muted-foreground"
          style={{ fontFamily: monoFont }}
        >
          Getting Started
        </span>
        <nav className="space-y-1">
          {DOCS_NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`block px-3 py-2 text-sm rounded-md ${
                i === 0
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: bodyFont }}
            >
              {item}
            </a>
          ))}
        </nav>
        <span
          className="block text-xs text-muted-foreground pt-4"
          style={{ fontFamily: monoFont }}
        >
          API
        </span>
        <nav className="space-y-1">
          {DOCS_API_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md"
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
          className="px-5 py-4 border border-border rounded-lg overflow-x-auto bg-muted"
          style={{ fontFamily: monoFont, fontSize: "0.8125rem", lineHeight: "1.65" }}
        >
          <code className="text-muted-foreground">{`npx shadcn@latest add https://www.fonttrio.xyz/r/editorial.json`}</code>
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
          {[
            <>Font imports via <code className="px-1.5 py-0.5 border border-border text-xs rounded bg-muted" style={{ fontFamily: monoFont }}>next/font/google</code></>,
            "CSS variables for heading, body, and mono fonts",
            "A typography scale with sizes, weights, and line heights",
          ].map((item, i) => (
            <li key={i} className="text-muted-foreground flex gap-3">
              <span className="text-muted-foreground/50">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
