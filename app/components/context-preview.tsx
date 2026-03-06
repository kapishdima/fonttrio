"use client";

import { useState } from "react";
import type { PairingData } from "@/lib/pairings";

interface ContextPreviewProps {
  pairing: PairingData;
}

type Tab = "blog" | "landing" | "docs";

export function ContextPreview({ pairing }: ContextPreviewProps) {
  const [tab, setTab] = useState<Tab>("blog");

  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;
  const monoFont = `"${pairing.mono}", monospace`;
  const scale = pairing.scale;

  const tabs: { key: Tab; label: string }[] = [
    { key: "blog", label: "Blog" },
    { key: "landing", label: "Landing" },
    { key: "docs", label: "Docs" },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-sans font-medium transition-colors relative ${
              tab === t.key ? "text-text" : "text-muted hover:text-text"
            }`}
          >
            {t.label}
            {tab === t.key && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-text" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="border border-border rounded-lg overflow-hidden bg-bg">
        <div key={tab} className="tab-content-enter">
          {tab === "blog" && (
            <BlogPreview
              headingFont={headingFont}
              bodyFont={bodyFont}
              monoFont={monoFont}
              scale={scale}
            />
          )}
          {tab === "landing" && (
            <LandingPreview
              headingFont={headingFont}
              bodyFont={bodyFont}
              monoFont={monoFont}
              scale={scale}
            />
          )}
          {tab === "docs" && (
            <DocsPreview
              headingFont={headingFont}
              bodyFont={bodyFont}
              monoFont={monoFont}
              scale={scale}
            />
          )}
        </div>
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
    <div className="p-6 sm:p-10 max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <span
          className="text-[11px] font-mono tracking-widest uppercase text-muted"
          style={{ fontFamily: monoFont }}
        >
          March 6, 2026
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
      </div>

      <p
        style={{
          fontFamily: bodyFont,
          fontSize: scale.body.size,
          lineHeight: scale.body.lineHeight,
          fontWeight: scale.body.weight,
        }}
        className="text-muted"
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
        className="text-muted"
      >
        Good typography is invisible. Bad typography is everywhere. The
        reader should never have to fight against the presentation to get
        to the content. Every choice -- from the width of the measure to
        the rhythm of the baseline grid -- serves the text.
      </p>

      <blockquote
        className="border-l-2 border-accent pl-6 py-1"
        style={{
          fontFamily: bodyFont,
          fontSize: scale.body.size,
          lineHeight: scale.body.lineHeight,
          fontStyle: "italic",
        }}
      >
        &ldquo;Typography exists to honor content.&rdquo;
        <span className="block text-sm text-muted mt-1 not-italic">
          -- Robert Bringhurst
        </span>
      </blockquote>

      <pre
        className="px-4 py-3 rounded bg-accent-soft/40 border border-border overflow-x-auto"
        style={{
          fontFamily: monoFont,
          fontSize: "0.8125rem",
          lineHeight: "1.6",
        }}
      >
        <code className="text-muted">{`// Typography scale configuration
const scale = {
  h1: { size: "${scale.h1.size}", weight: ${scale.h1.weight} },
  body: { size: "${scale.body.size}", lineHeight: "${scale.body.lineHeight}" },
};`}</code>
      </pre>
    </div>
  );
}

function LandingPreview({
  headingFont,
  bodyFont,
  monoFont,
  scale,
}: PreviewProps) {
  return (
    <div className="p-6 sm:p-10 space-y-10">
      {/* Hero */}
      <div className="text-center space-y-5 py-8">
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
          className="text-muted max-w-lg mx-auto"
        >
          The modern toolkit for creators who care about every pixel and
          every word. Ship faster, look better.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            className="px-5 py-2.5 rounded-lg bg-text text-bg font-sans text-sm font-medium hover:opacity-90"
          >
            Get Started
          </button>
          <button
            className="px-5 py-2.5 rounded-lg border border-border font-sans text-sm font-medium hover:bg-accent-soft/50"
            style={{ fontFamily: monoFont }}
          >
            View Docs
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            title: "Type Scale",
            desc: "Consistent hierarchy from h1 to body text.",
          },
          {
            title: "Three Fonts",
            desc: "Heading, body, and mono -- perfectly matched.",
          },
          {
            title: "One Command",
            desc: "Install with shadcn CLI. No config needed.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="p-4 rounded-lg border border-border space-y-2"
          >
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
              style={{
                fontFamily: bodyFont,
                fontSize: "0.9375rem",
                lineHeight: "1.5",
              }}
              className="text-muted"
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
      {/* Sidebar */}
      <aside className="hidden sm:block w-48 shrink-0 border-r border-border p-4 space-y-4">
        <span
          className="block text-[11px] font-mono uppercase tracking-widest text-muted"
          style={{ fontFamily: monoFont }}
        >
          Getting Started
        </span>
        <nav className="space-y-1">
          {["Installation", "Configuration", "Typography", "Theming"].map(
            (item, i) => (
              <a
                key={item}
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`block px-2 py-1.5 rounded text-sm font-sans ${
                  i === 0
                    ? "bg-accent-soft text-accent font-medium"
                    : "text-muted hover:text-text"
                }`}
              >
                {item}
              </a>
            )
          )}
        </nav>
        <span
          className="block text-[11px] font-mono uppercase tracking-widest text-muted pt-2"
          style={{ fontFamily: monoFont }}
        >
          API Reference
        </span>
        <nav className="space-y-1">
          {["Components", "Hooks", "Utilities"].map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="block px-2 py-1.5 rounded text-sm font-sans text-muted hover:text-text"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 p-6 sm:p-8 space-y-5 max-w-2xl">
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
          className="text-muted"
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
          className="pt-2"
        >
          Quick Start
        </h2>

        <pre
          className="px-4 py-3 rounded bg-accent-soft/40 border border-border overflow-x-auto"
          style={{
            fontFamily: monoFont,
            fontSize: "0.8125rem",
            lineHeight: "1.6",
          }}
        >
          <code className="text-muted">{`npx shadcn@latest add https://fonttrio.dev/r/editorial.json`}</code>
        </pre>

        <p
          style={{
            fontFamily: bodyFont,
            fontSize: scale.body.size,
            lineHeight: scale.body.lineHeight,
          }}
          className="text-muted"
        >
          This will add the following to your project:
        </p>

        <ul className="space-y-1.5 pl-5" style={{ fontFamily: bodyFont, fontSize: scale.body.size, lineHeight: scale.body.lineHeight }}>
          <li className="text-muted list-disc">Font imports via <code className="px-1.5 py-0.5 rounded bg-accent-soft/40 text-xs" style={{ fontFamily: monoFont }}>next/font/google</code></li>
          <li className="text-muted list-disc">CSS variables for heading, body, and mono fonts</li>
          <li className="text-muted list-disc">A typography scale with sizes, weights, and line heights</li>
        </ul>
      </div>
    </div>
  );
}
