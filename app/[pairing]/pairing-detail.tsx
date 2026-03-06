"use client";

import Link from "next/link";
import type { PairingData } from "@/lib/pairings";
import { FontProvider } from "../components/font-provider";
import { ThemeToggle } from "../components/theme-toggle";
import { TypeTester } from "../components/type-tester";
import { ContextPreview } from "../components/context-preview";
import { TypographyCustomizer } from "../components/typography-customizer";
import { InstallCommand } from "../components/install-command";
import { SideBySide } from "../components/side-by-side";
import { getAllPairings } from "@/lib/pairings";
import { useState } from "react";
import type { TypographyScale } from "@/lib/pairings";

interface PairingDetailProps {
  pairing: PairingData;
}

export function PairingDetail({ pairing }: PairingDetailProps) {
  const [isCustomized, setIsCustomized] = useState(false);

  // Load fonts for all pairings (for side-by-side compare)
  const allPairings = getAllPairings();
  const allFontUrls = allPairings
    .map((p) => p.googleFontsUrl)
    .filter(Boolean);

  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;
  const monoFont = `"${pairing.mono}", monospace`;

  const handleScaleChange = (scale: TypographyScale) => {
    const changed = JSON.stringify(scale) !== JSON.stringify(pairing.scale);
    setIsCustomized(changed);
  };

  return (
    <div className="min-h-screen">
      {/* Font Provider */}
      {allFontUrls.map((url) => (
        <FontProvider key={url} fonts={[]} googleFontsUrl={url} />
      ))}

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-sans text-muted hover:text-text flex items-center gap-1.5"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M10 3L5 8l5 5" />
              </svg>
              fonttrio
            </Link>
            <span className="text-muted/30">/</span>
            <span className="text-sm font-mono">{pairing.name}</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Header */}
      <header
        className="max-w-5xl mx-auto px-6"
        style={{
          paddingTop: "clamp(3rem, 6vw, 6rem)",
          paddingBottom: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {pairing.mood.map((m) => (
              <span
                key={m}
                className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium tracking-wide text-muted border border-border"
              >
                {m}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontFamily: headingFont,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: pairing.scale.h1.weight,
              lineHeight: "1.05",
              letterSpacing: pairing.scale.h1.letterSpacing,
            }}
          >
            {pairing.name}
          </h1>

          <p
            style={{
              fontFamily: bodyFont,
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              lineHeight: "1.7",
              fontWeight: pairing.scale.body.weight,
            }}
            className="text-muted max-w-2xl"
          >
            {pairing.description}
          </p>

          <div className="flex items-center gap-6 pt-2">
            <div className="space-y-0.5">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-muted">
                Heading
              </span>
              <span
                className="block text-sm"
                style={{ fontFamily: headingFont, fontWeight: 600 }}
              >
                {pairing.heading}
              </span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="space-y-0.5">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-muted">
                Body
              </span>
              <span
                className="block text-sm"
                style={{ fontFamily: bodyFont }}
              >
                {pairing.body}
              </span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="space-y-0.5">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-muted">
                Mono
              </span>
              <span
                className="block text-sm"
                style={{ fontFamily: monoFont }}
              >
                {pairing.mono}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Sections */}
      <main className="max-w-5xl mx-auto px-6 space-y-0">
        {/* Section 1: Type Tester */}
        <section
          className="border-t border-border"
          style={{ paddingTop: "clamp(2rem, 4vw, 4rem)", paddingBottom: "clamp(2rem, 4vw, 4rem)" }}
        >
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-muted mb-6">
            Type Tester
          </h2>
          <TypeTester pairing={pairing} />
        </section>

        {/* Section 2: Context Preview */}
        <section
          className="border-t border-border"
          style={{ paddingTop: "clamp(2rem, 4vw, 4rem)", paddingBottom: "clamp(2rem, 4vw, 4rem)" }}
        >
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-muted mb-6">
            In Context
          </h2>
          <ContextPreview pairing={pairing} />
        </section>

        {/* Section 3: Typography Customizer */}
        <section
          className="border-t border-border"
          style={{ paddingTop: "clamp(2rem, 4vw, 4rem)", paddingBottom: "clamp(2rem, 4vw, 4rem)" }}
        >
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-muted mb-6">
            Customize Scale
          </h2>
          <TypographyCustomizer
            pairing={pairing}
            onScaleChange={handleScaleChange}
          />
        </section>

        {/* Section 4: Install Command */}
        <section
          className="border-t border-border"
          style={{ paddingTop: "clamp(2rem, 4vw, 4rem)", paddingBottom: "clamp(2rem, 4vw, 4rem)" }}
        >
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-muted mb-6">
            Install
          </h2>
          <InstallCommand
            pairingName={pairing.name}
            isCustomized={isCustomized}
          />
        </section>

        {/* Section 5: Side by Side */}
        <section
          className="border-t border-border"
          style={{ paddingTop: "clamp(2rem, 4vw, 4rem)", paddingBottom: "clamp(3rem, 6vw, 6rem)" }}
        >
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-muted mb-6">
            Compare
          </h2>
          <SideBySide current={pairing} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-mono text-muted hover:text-text"
          >
            fonttrio
          </Link>
          <span className="text-xs font-mono text-muted">
            {pairing.heading} + {pairing.body} + {pairing.mono}
          </span>
        </div>
      </footer>
    </div>
  );
}
