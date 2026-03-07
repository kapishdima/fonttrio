"use client";

import Link from "next/link";
import type { PairingData } from "@/lib/pairings";
import { FontProvider } from "../components/font-provider";
import { ThemeToggle } from "../components/theme-toggle";
import { TypeTester } from "../components/type-tester";
import { ContextPreview } from "../components/context-preview";
import { AnimatedLayout } from "../components/animated-layout";
import { getAllPairings } from "@/lib/pairings";
import { useState, useCallback } from "react";
import { ArrowLeft, Check, Copy } from "lucide-react";

interface PairingDetailProps {
  pairing: PairingData;
}

export function PairingDetail({ pairing }: PairingDetailProps) {
  const allPairings = getAllPairings();
  const allFontUrls = allPairings
    .map((p) => p.googleFontsUrl)
    .filter(Boolean);

  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;
  const monoFont = `"${pairing.mono}", monospace`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {allFontUrls.map((url) => (
        <FontProvider key={url} fonts={[]} googleFontsUrl={url} />
      ))}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border backdrop-blur-sm">
        <div className="px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 hover:opacity-70 transition-opacity">
            <span className="font-display text-2xl tracking-tight">Font</span>
            <span className="font-display text-2xl tracking-tight text-muted-foreground">trio</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <header id="main-content" className="pt-16 relative min-h-[70vh] flex flex-col">
        {/* Grid Background */}
        <div className="absolute inset-0 cross-grid pointer-events-none opacity-40" />

        {/* Back Button */}
        <div className="relative px-4 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to pairings</span>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative flex-1 flex flex-col justify-center px-4 lg:px-8 xl:px-12 pb-12">
          <AnimatedLayout>
            <div className="max-w-none">
              {/* Pairing Name with Metric Lines */}
              <div className="relative h-[clamp(3rem,15vw,12rem)]">
                {/* Metric lines + labels — behind text */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <div className="absolute top-[20%] left-0 right-0 flex items-center gap-2">
                    <div className="flex-1 border-t border-dashed border-border" />
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">Ascender</span>
                  </div>
                  <div className="absolute top-[50%] left-0 right-0 flex items-center gap-2">
                    <div className="flex-1 border-t border-dashed border-border" />
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">Baseline</span>
                  </div>
                  <div className="absolute top-[80%] left-0 right-0 flex items-center gap-2">
                    <div className="flex-1 border-t border-dashed border-border" />
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">Descender</span>
                  </div>
                </div>

                {/* Text — above lines */}
                <div className="h-full flex items-center relative z-10">
                  <h1
                    style={{
                      fontFamily: headingFont,
                      fontWeight: pairing.scale.h1.weight,
                      lineHeight: "0.9",
                      letterSpacing: pairing.scale.h1.letterSpacing,
                    }}
                    className="text-[clamp(2.5rem,14vw,12rem)]"
                  >
                    {pairing.name}
                  </h1>
                </div>
              </div>

              {/* Font Trio Preview — show how they look together */}
              <AnimatedLayout delay={100}>
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Heading Font</p>
                    <p style={{ fontFamily: headingFont, fontSize: "1.5rem", fontWeight: pairing.scale.h1.weight }}>{pairing.heading}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Body Font</p>
                    <p style={{ fontFamily: bodyFont, fontSize: "1.25rem" }}>{pairing.body}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Mono Font</p>
                    <p style={{ fontFamily: monoFont, fontSize: "1rem" }}>{pairing.mono}</p>
                  </div>
                </div>
              </AnimatedLayout>

              {/* Description */}
              <AnimatedLayout delay={150}>
                <p
                  className="mt-10 text-lg text-muted-foreground leading-relaxed max-w-2xl"
                  style={{ fontFamily: bodyFont }}
                >
                  {pairing.description}
                </p>
              </AnimatedLayout>

              {/* Install Command — immediately in hero */}
              <AnimatedLayout delay={200}>
                <div className="mt-8 max-w-md">
                  <CopyCommand pairingName={pairing.name} />
                </div>
              </AnimatedLayout>
            </div>
          </AnimatedLayout>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-b border-border" />
      </header>

      {/* Pairing Preview — How it looks together */}
      <section className="border-b border-border">
        <div className="px-4 lg:px-8 xl:px-12 py-16 lg:py-24">
          <AnimatedLayout>
            <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-8">Preview</h2>

            <div className="space-y-8">
              {/* Heading Preview */}
              <div>
                <h3
                  style={{
                    fontFamily: headingFont,
                    fontSize: pairing.scale.h1.size,
                    fontWeight: pairing.scale.h1.weight,
                    lineHeight: pairing.scale.h1.lineHeight,
                    letterSpacing: pairing.scale.h1.letterSpacing,
                  }}
                >
                  The quick brown fox jumps over the lazy dog
                </h3>
              </div>

              {/* Body Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
                <p
                  style={{
                    fontFamily: bodyFont,
                    fontSize: pairing.scale.body.size,
                    lineHeight: pairing.scale.body.lineHeight,
                    fontWeight: pairing.scale.body.weight,
                  }}
                  className="text-muted-foreground"
                >
                  Typography is the art and technique of arranging type to make written language
                  legible, readable, and appealing when displayed. The arrangement of type involves
                  selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.
                </p>
                <p
                  style={{
                    fontFamily: bodyFont,
                    fontSize: pairing.scale.body.size,
                    lineHeight: pairing.scale.body.lineHeight,
                    fontWeight: pairing.scale.body.weight,
                  }}
                  className="text-muted-foreground"
                >
                  Good typography is measured by how well it reinforces the meaning of the text,
                  not by some abstract scale of merit. Typographic subtlety can be just as important
                  as typographic boldness.
                </p>
              </div>

              {/* Mixed Preview */}
              <div className="pt-8 border-t border-border max-w-3xl">
                <h4
                  style={{
                    fontFamily: headingFont,
                    fontSize: pairing.scale.h3.size,
                    fontWeight: pairing.scale.h3.weight,
                    lineHeight: pairing.scale.h3.lineHeight,
                    letterSpacing: pairing.scale.h3.letterSpacing,
                  }}
                  className="mb-4"
                >
                  A beautiful pairing
                </h4>
                <p
                  style={{
                    fontFamily: bodyFont,
                    fontSize: pairing.scale.body.size,
                    lineHeight: pairing.scale.body.lineHeight,
                    fontWeight: pairing.scale.body.weight,
                  }}
                  className="text-muted-foreground mb-4"
                >
                  When <span style={{ fontFamily: headingFont }}>{pairing.heading}</span> meets{" "}
                  <span style={{ fontFamily: bodyFont }}>{pairing.body}</span>, magic happens.
                  This combination creates a perfect balance between impact and readability.
                </p>
                <code
                  className="block p-4 bg-surface border border-border text-sm max-w-xl"
                  style={{ fontFamily: monoFont }}
                >
                  <span className="text-muted-foreground">// Install this pairing</span><br />
                  npx shadcn add https://fonttrio.dev/r/{pairing.name}.json
                </code>
              </div>
            </div>
          </AnimatedLayout>
        </div>
      </section>

      {/* Type Tester */}
      <section className="border-b border-border">
        <div className="px-4 lg:px-8 xl:px-12 py-16 lg:py-24">
          <AnimatedLayout>
            <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-8">Type Tester</h2>
            <TypeTester pairing={pairing} />
          </AnimatedLayout>
        </div>
      </section>

      {/* In Context */}
      <section className="border-b border-border">
        <div className="px-4 lg:px-8 xl:px-12 py-16 lg:py-24">
          <AnimatedLayout>
            <h2 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-8">In Context</h2>
            <ContextPreview pairing={pairing} />
          </AnimatedLayout>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="px-4 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1 hover:opacity-70 transition-opacity">
              <span className="font-display text-lg tracking-tight">Font</span>
              <span className="font-display text-lg tracking-tight text-muted-foreground">trio</span>
            </Link>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {pairing.heading} / {pairing.body} / {pairing.mono}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Copy Command ─── */

function CopyCommand({ pairingName }: { pairingName: string }) {
  const [copied, setCopied] = useState(false);
  const command = `npx shadcn@latest add https://fonttrio.dev/r/${pairingName}.json`;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [command]);

  return (
    <button
      onClick={copy}
      className="group w-full flex items-center gap-3 px-4 py-3 bg-surface border border-border text-left hover:bg-surface-hover transition-[background-color] rounded-sm"
      aria-label="Copy install command"
    >
      <span className="text-muted-foreground select-none text-xs uppercase tracking-wider font-mono" aria-hidden="true">$</span>
      <code className="text-sm flex-1 break-all font-mono">
        shadcn add {pairingName}
      </code>
      {copied ? (
        <Check className="size-4 shrink-0" aria-hidden="true" />
      ) : (
        <Copy className="size-4 text-muted-foreground shrink-0" aria-hidden="true" />
      )}
    </button>
  );
}
