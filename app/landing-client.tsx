"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import type { PairingData, FontCategory } from "@/lib/pairings";
import { FontProvider } from "./components/font-provider";
import { ThemeToggle } from "./components/theme-toggle";
import { Check, Copy, ArrowRight } from "lucide-react";

interface LandingClientProps {
  featured: PairingData;
  pairings: PairingData[];
  allPairings: PairingData[];
  moods: string[];
}

type CategoryFilter = "all" | FontCategory;

export function LandingClient({
  featured,
  pairings,
  allPairings,
  moods,
}: LandingClientProps) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [moodFilter, setMoodFilter] = useState<string | null>(null);

  const allFontUrls = allPairings
    .map((p) => p.googleFontsUrl)
    .filter(Boolean);

  const allDisplayed = useMemo(() => {
    return allPairings.filter((p) => {
      if (categoryFilter !== "all" && p.headingCategory !== categoryFilter) return false;
      if (moodFilter && !p.mood.includes(moodFilter)) return false;
      return true;
    });
  }, [allPairings, categoryFilter, moodFilter]);

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "serif", label: "Serif" },
    { key: "sans-serif", label: "Sans" },
  ];

  const featuredHeadingFont = `"${featured.heading}", ${featured.headingCategory}`;
  const featuredBodyFont = `"${featured.body}", ${featured.bodyCategory}`;

  return (
    <div className="min-h-screen bg-background">
      {allFontUrls.map((url) => (
        <FontProvider key={url} fonts={[]} googleFontsUrl={url} />
      ))}

      {/* Navigation - Swiss Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="px-6 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-display text-2xl tracking-wider text-foreground">
              FONTTRIO
            </span>
            <span className="hidden sm:block text-xs text-muted-foreground uppercase tracking-widest">
              Font Pairings for shadcn/ui
            </span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section - Swiss Grid */}
      <section id="main-content" className="pt-16">
        {/* Large Title Block */}
        <div className="border-b border-border">
          <div className="px-6 lg:px-12 py-12 lg:py-20">
            <div className="max-w-[1600px] mx-auto">
              <div className="grid grid-cols-12 gap-4">
                {/* Section Number */}
                <div className="col-span-12 lg:col-span-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">01</span>
                </div>
                
                {/* Main Content */}
                <div className="col-span-12 lg:col-span-11">
                  {/* Oversized Display Title */}
                  <h1 className="font-display text-[clamp(4rem,15vw,12rem)] leading-[0.85] tracking-tight text-foreground mb-8">
                    THREE FONTS
                    <br />
                    <span className="text-[#e30613]">ONE COMMAND</span>
                  </h1>
                  
                  {/* Description + CTA Grid */}
                  <div className="grid grid-cols-12 gap-8 mt-12">
                    <div className="col-span-12 lg:col-span-5">
                      <p 
                        className="text-base lg:text-lg leading-relaxed text-muted-foreground"
                        style={{ fontFamily: featuredBodyFont }}
                      >
                        Curated font pairings for shadcn/ui. Each trio combines heading, 
                        body, and monospace fonts with a complete typography scale.
                      </p>
                    </div>
                    
                    <div className="col-span-12 lg:col-span-4 lg:col-start-8">
                      <HeroCopyCommand pairingName={featured.name} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar - Swiss Style */}
        <div className="border-b border-border">
          <div className="px-6 lg:px-12 py-4">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex items-center gap-1 text-xs uppercase tracking-widest">
                <span className="text-muted-foreground mr-4">Filter:</span>
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setCategoryFilter(cat.key)}
                    className={`px-4 py-2 transition-colors ${
                      categoryFilter === cat.key
                        ? "bg-foreground text-background"
                        : "text-foreground hover:bg-surface"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
                
                <span className="w-px h-4 bg-border mx-4" />
                
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setMoodFilter(moodFilter === mood ? null : mood)}
                    className={`px-4 py-2 transition-colors ${
                      moodFilter === mood
                        ? "bg-[#e30613] text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {mood}
                  </button>
                ))}

                {(categoryFilter !== "all" || moodFilter) && (
                  <>
                    <span className="w-px h-4 bg-border mx-4" />
                    <button
                      onClick={() => { setCategoryFilter("all"); setMoodFilter(null); }}
                      className="px-4 py-2 text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specimen List - Swiss Style */}
      <section>
        <div className="px-6 lg:px-12 py-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-12 gap-4 mb-8">
              <div className="col-span-1">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">02</span>
              </div>
              <div className="col-span-11">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  {allDisplayed.length} Pairings
                </span>
              </div>
            </div>
          </div>
        </div>

        {allDisplayed.length === 0 ? (
          <div className="px-6 lg:px-12 py-24">
            <div className="max-w-[1600px] mx-auto text-center">
              <p className="text-muted-foreground uppercase tracking-widest text-sm">
                No pairings match the current filters
              </p>
            </div>
          </div>
        ) : (
          allDisplayed.map((p) => (
            <SpecimenStrip key={p.name} pairing={p} />
          ))
        )}
      </section>

      {/* Footer - Swiss Style */}
      <footer className="border-t border-border mt-20">
        <div className="px-6 lg:px-12 py-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-6">
                <span className="font-display text-xl tracking-wider">FONTTRIO</span>
                <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">
                  Curated for shadcn/ui
                </p>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  © 2026 Fonttrio
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SpecimenStrip({ pairing }: { pairing: PairingData }) {
  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;

  return (
    <Link href={`/${pairing.name}`} className="block specimen-card">
      <div className="px-6 lg:px-12 py-8 lg:py-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-12 gap-4 items-end">
            {/* Number */}
            <div className="hidden lg:block col-span-1">
              <span className="text-xs text-muted-foreground font-mono">
                {pairing.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            
            {/* Main Specimen */}
            <div className="col-span-12 lg:col-span-6">
              <h2
                style={{
                  fontFamily: headingFont,
                  fontWeight: pairing.scale.h1.weight,
                  lineHeight: "0.95",
                  letterSpacing: pairing.scale.h1.letterSpacing,
                }}
                className="text-[clamp(2.5rem,8vw,6rem)] truncate"
              >
                {pairing.name}
              </h2>
              
              <p
                style={{
                  fontFamily: bodyFont,
                  fontSize: "1rem",
                  lineHeight: "1.6",
                }}
                className="text-muted-foreground mt-4 max-w-xl"
              >
                {pairing.description}
              </p>
            </div>
            
            {/* Meta */}
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <div className="space-y-2 text-right">
                <p className="text-sm text-foreground">
                  {pairing.heading} / {pairing.body} / {pairing.mono}
                </p>
                <div className="flex items-center justify-end gap-2">
                  {pairing.mood.map((m) => (
                    <span
                      key={m}
                      className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-1 border border-border"
                    >
                      {m}
                    </span>
                  ))}
                  <ArrowRight className="specimen-arrow size-4 text-[#e30613] ml-2" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function HeroCopyCommand({ pairingName }: { pairingName: string }) {
  const [copied, setCopied] = useState(false);
  const command = `npx shadcn@latest add https://fonttrio.dev/r/${pairingName}.json`;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [command]);

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground uppercase tracking-widest">
        Install
      </p>
      <button
        onClick={copy}
        className="group w-full flex items-center gap-4 px-4 py-4 border-2 border-foreground text-left hover:bg-foreground hover:text-background transition-colors"
        aria-label="Copy install command"
      >
        <span className="text-muted-foreground group-hover:text-background/70 select-none text-xs uppercase tracking-wider" aria-hidden="true">$</span>
        <code className="text-sm flex-1 break-all font-mono">
          shadcn add .../{pairingName}.json
        </code>
        {copied ? (
          <Check className="size-4 text-[#e30613] shrink-0" aria-hidden="true" />
        ) : (
          <Copy className="size-4 text-muted-foreground group-hover:text-background shrink-0" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
