"use client";

import { useState } from "react";
import type { FontItem } from "@/lib/fonts";
import { parseFontCategory } from "@/lib/fonts";
import type { PairingData } from "@/lib/pairings";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { StickyDetailHeader } from "@/app/components/sticky-detail-header";
import { DetailHero } from "@/app/components/sections/detail-hero";
import { SectionWrapper } from "@/app/components/sections/section-wrapper";
import { SectionLabel } from "@/app/components/section-label";
import { AnimatedLayout } from "@/app/components/animated-layout";
import { InstallCommand } from "@/app/components/install-command";
import { PairingCard } from "@/app/components/pairing-card";

const DEFAULT_TEXT =
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.";

const WEIGHTS = [
  { value: 100, label: "Thin" },
  { value: 200, label: "ExtraLight" },
  { value: 300, label: "Light" },
  { value: 400, label: "Regular" },
  { value: 500, label: "Medium" },
  { value: 600, label: "SemiBold" },
  { value: 700, label: "Bold" },
  { value: 800, label: "ExtraBold" },
  { value: 900, label: "Black" },
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

interface FontDetailProps {
  font: FontItem;
  relatedPairings: PairingData[];
  allWeightsUrl: string;
}

export function FontDetail({ font, relatedPairings, allWeightsUrl }: FontDetailProps) {
  const [size, setSize] = useState(64);
  const category = parseFontCategory(font);
  const fontFamily = `"${font.font.family}", ${category}`;
  const availableWeights = font.font.weight.map(Number);

  return (
    <>
      {/* Load all weights for this font */}
      {allWeightsUrl && <link rel="stylesheet" href={allWeightsUrl} />}

      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <StickyDetailHeader
          title={font.title}
          titleStyle={{ fontFamily, fontWeight: 400 }}
          backHref="/fonts"
          backLabel="Back to fonts"
        />

        {/* Hero */}
        <DetailHero
          title={font.title}
          titleStyle={{ fontFamily, fontWeight: 700 }}
        >
          {/* Metadata + Install Block */}
          <AnimatedLayout delay={100}>
            <div className="mt-6 sm:mt-8 border border-border max-w-2xl">
              {/* Metadata row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border border-b border-border">
                <div className="p-4">
                  <SectionLabel className="mb-1 text-[10px]">Category</SectionLabel>
                  <p className="text-sm font-medium uppercase tracking-wider">{category}</p>
                </div>
                <div className="p-4">
                  <SectionLabel className="mb-1 text-[10px]">Weights</SectionLabel>
                  <p className="text-sm font-medium font-mono">{font.font.weight.length}</p>
                </div>
                <div className="p-4">
                  <SectionLabel className="mb-1 text-[10px]">Provider</SectionLabel>
                  <p className="text-sm font-medium uppercase tracking-wider">
                    {font.font.provider === "npm" ? "npm" : "Google"}
                  </p>
                </div>
                <div className="p-4">
                  <SectionLabel className="mb-1 text-[10px]">Subsets</SectionLabel>
                  <p className="text-[11px] text-muted-foreground">
                    {font.font.subsets.slice(0, 3).join(", ")}
                    {font.font.subsets.length > 3 && ` +${font.font.subsets.length - 3}`}
                  </p>
                </div>
              </div>

              {/* Install Command */}
              <div className="p-4">
                <InstallCommand.Full pairingName={font.name} />
              </div>

            </div>
          </AnimatedLayout>
        </DetailHero>

        {/* Weight Specimens */}
        <SectionWrapper label="Type Specimens">
          {/* Size Selector */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs uppercase tracking-wider text-muted-foreground shrink-0">
              Size
            </span>
            <div className="flex items-center gap-1 flex-wrap">
              {SIZES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSize(s.value)}
                  aria-pressed={size === s.value}
                  className={`px-2 py-1 text-[11px] font-mono border transition-[background-color,color,border-color] ${
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

          {/* Weights */}
          <div className="divide-y divide-border border-t border-border">
            {WEIGHTS.filter((w) => availableWeights.includes(w.value)).map((w) => (
              <div key={w.value} className="py-6 px-2">
                <div className="flex items-center justify-between mb-3">
                  <SectionLabel>{w.label}</SectionLabel>
                  <span className="text-[10px] font-mono text-muted-foreground">{w.value}</span>
                </div>
                <div
                  style={{
                    fontFamily,
                    fontSize: `${size}px`,
                    fontWeight: w.value,
                    lineHeight: "1.2",
                    wordBreak: "break-word",
                  }}
                  className="truncate"
                >
                  {DEFAULT_TEXT}
                </div>
              </div>
            ))}
          </div>

          {/* Editable Specimen */}
          <div className="pt-8 border-t border-border mt-4">
            <div className="flex items-center justify-between mb-4">
              <SectionLabel>Custom Text</SectionLabel>
              <span className="text-[10px] font-mono text-muted-foreground">
                {font.font.family} / {size}px
              </span>
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              role="textbox"
              aria-label="Type specimen preview"
              className="min-h-[120px] p-4 border border-border cursor-text focus-visible:outline-2 focus-visible:outline-ring"
              style={{
                fontFamily,
                fontSize: `${size}px`,
                fontWeight: 400,
                lineHeight: "1.2",
                wordBreak: "break-word",
              }}
            >
              {DEFAULT_TEXT}
            </div>
            <SectionLabel className="mt-3">Click to edit text</SectionLabel>
          </div>
          {/* Related Pairings */}
          {relatedPairings.length > 0 && (
            <SectionWrapper label={`Used in ${relatedPairings.length} pairing${relatedPairings.length !== 1 ? "s" : ""}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border -mx-4 lg:-mx-8 xl:-mx-12">
                {relatedPairings.map((pairing) => (
                  <PairingCard key={pairing.name} pairing={pairing} />
                ))}
              </div>
            </SectionWrapper>
          )}
        </SectionWrapper>

        

        <SiteFooter subtitle={`${font.font.family} — ${category}`} />
      </div>
    </>
  );
}
