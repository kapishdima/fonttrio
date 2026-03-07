"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import type { PairingData, FontCategory } from "@/lib/pairings";
import { FontProvider } from "./components/font-provider";
import { ThemeToggle } from "./components/theme-toggle";
import { FontSwitcher, AnimatedSubtitle } from "./components/font-switcher";
import { AnimatedLayout } from "./components/animated-layout";
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
  const [styleFilter, setStyleFilter] = useState<string | null>(null);
  const [currentFontIndex, setCurrentFontIndex] = useState(0);

  const allFontUrls = allPairings
    .map((p) => p.googleFontsUrl)
    .filter(Boolean);

  /**
   * Style groups — curated buckets that map multiple moods.
   * Each group matches if ANY of its moods appear in the pairing.
   */
  const STYLE_GROUPS: { key: string; label: string; moods: string[] }[] = [
    { key: "editorial", label: "Editorial", moods: ["editorial", "literary", "narrative", "dramatic", "sophisticated"] },
    { key: "clean", label: "Clean", moods: ["clean", "neutral", "minimal", "modern", "Vercel-style"] },
    { key: "bold", label: "Bold", moods: ["bold", "impactful", "commanding", "raw", "brutalist"] },
    { key: "friendly", label: "Friendly", moods: ["friendly", "approachable", "warm", "playful", "startup"] },
    { key: "corporate", label: "Corporate", moods: ["professional", "corporate", "trustworthy", "systematic"] },
    { key: "creative", label: "Creative", moods: ["creative", "distinctive", "geometric", "curated", "nordic"] },
    { key: "academic", label: "Academic", moods: ["academic", "scholarly", "refined", "readable", "universal"] },
  ];

  const allDisplayed = useMemo(() => {
    return allPairings.filter((p) => {
      if (categoryFilter !== "all" && p.headingCategory !== categoryFilter) return false;
      if (styleFilter) {
        const group = STYLE_GROUPS.find((g) => g.key === styleFilter);
        if (group && !p.mood.some((m) => group.moods.includes(m))) return false;
      }
      return true;
    });
  }, [allPairings, categoryFilter, styleFilter]);

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "serif", label: "Serif" },
    { key: "sans-serif", label: "Sans" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {allFontUrls.map((url) => (
        <FontProvider key={url} fonts={[]} googleFontsUrl={url} />
      ))}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border backdrop-blur-sm">
        <div className="px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <span className="font-display text-2xl tracking-tight">Font</span>
            <span className="font-display text-2xl tracking-tight text-muted-foreground">trio</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-muted-foreground">
              Font pairings for shadcn/ui
            </span>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="main-content" className="pt-16 relative min-h-[93vh] flex flex-col">
        {/* Grid Background */}
        <div className="absolute inset-0 cross-grid pointer-events-none opacity-40" />

        <div className="relative flex-1 flex flex-col justify-center px-4 lg:px-8 xl:px-12 pb-12 lg:pb-16">
          <AnimatedLayout>
            {/* Heading with metric lines */}
            <div className="relative">
              {/* Metric lines + labels — behind text */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[15%] left-0 right-0 flex items-center gap-2">
                  <div className="flex-1 border-t border-dashed border-border" />
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">710</span>
                </div>
                <div className="absolute top-[42%] left-0 right-0 flex items-center gap-2">
                  <div className="flex-1 border-t border-dashed border-border" />
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">530</span>
                </div>
                <div className="absolute top-[68%] left-0 right-0 flex items-center gap-2">
                  <div className="flex-1 border-t border-dashed border-border" />
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">0</span>
                </div>
                <div className="absolute top-[90%] left-0 right-0 flex items-center gap-2">
                  <div className="flex-1 border-t border-dashed border-border" />
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">-150</span>
                </div>
              </div>

              {/* Text — above lines */}
              <div className="relative z-10 min-h-[1.2em]">
                <div className="text-[clamp(3.5rem,15vw,12rem)] leading-[1.1] tracking-tight">
                  <FontSwitcher 
                    pairings={allPairings} 
                    onIndexChange={setCurrentFontIndex}
                  />
                </div>
              </div>
            </div>

            {/* Supporting content — tight vertical rhythm */}
            <div className="mt-8 ml-5 min-h-[4.5em]">
              <p className="text-[clamp(1.125rem,2.5vw,1.75rem)] leading-[1.5] tracking-[-0.01em] text-muted-foreground max-w-3xl">
                <AnimatedSubtitle 
                  pairings={allPairings}
                  currentIndex={currentFontIndex}
                  text="Ready-made font combinations for shadcn/ui projects. Each includes heading, body, and mono fonts with a complete scale."
                />
              </p>
            </div>

            {/* How it works — minimal inline */}
            <div className="mt-20 ml-5 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="font-mono text-[10px]">1</span>
                Choose
              </span>
              <span className="text-border">→</span>
              <span className="flex items-center gap-1.5">
                <span className="font-mono text-[10px]">2</span>
                Install
              </span>
              <span className="text-border">→</span>
              <span className="flex items-center gap-1.5">
                <span className="font-mono text-[10px]">3</span>
                Ship
              </span>
            </div>

            <div className="mt-5 ml-5 max-w-sm">
              <CopyCommand pairingName={featured.name} />
            </div>
          </AnimatedLayout>
        </div>
      </section>

      {/* Sticky Filters */}
      <div className="sticky top-16 z-40 bg-background/95 border-b border-border backdrop-blur-sm">
        <div className="px-4 lg:px-8 py-3 flex items-center gap-6">
          {/* Type filter */}
          <div className="flex items-center gap-0 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategoryFilter(cat.key)}
                aria-pressed={categoryFilter === cat.key}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider border-b-2 transition-[color,border-color] ${
                  categoryFilter === cat.key
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="w-px h-4 bg-border shrink-0" />

          {/* Style groups — horizontal scroll on mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {STYLE_GROUPS.map((group) => (
              <button
                key={group.key}
                onClick={() => setStyleFilter(styleFilter === group.key ? null : group.key)}
                aria-pressed={styleFilter === group.key}
                className={`px-2.5 py-1 text-[11px] uppercase tracking-wider whitespace-nowrap transition-[background-color,color,border-color] border shrink-0 ${
                  styleFilter === group.key
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>

          {/* Count + Clear */}
          <div className="flex items-center gap-3 ml-auto shrink-0">
            <span className="text-[11px] font-mono text-muted-foreground tabular-nums">
              {allDisplayed.length}
            </span>
            {(categoryFilter !== "all" || styleFilter) && (
              <button
                onClick={() => { setCategoryFilter("all"); setStyleFilter(null); }}
                className="text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pairing Cards */}
      <section>
        {allDisplayed.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground">No pairings match the current filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
            {allDisplayed.map((pairing, i) => (
              <AnimatedLayout key={pairing.name} delay={Math.min(i, 8) * 40}>
                <PairingCard pairing={pairing} />
              </AnimatedLayout>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="px-4 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="font-display text-lg tracking-tight">Font</span>
              <span className="font-display text-lg tracking-tight text-muted-foreground">trio</span>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Curated font pairings for shadcn/ui
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Pairing Card ─── */

function PairingCard({ pairing }: { pairing: PairingData }) {
  const [copied, setCopied] = useState(false);
  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;
  const monoFont = `"${pairing.mono}", monospace`;
  const command = `npx shadcn@latest add https://fonttrio.dev/r/${pairing.name}.json`;

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [command]);

  return (
    <Link
      href={`/${pairing.name}`}
      className="group flex flex-col border-r border-b border-border hover:bg-surface/40 transition-[background-color] bg-background"
    >
      {/* Preview Area — fixed height */}
      <div className="h-48 px-4 py-4 flex flex-col justify-between overflow-hidden">
        {/* Heading Preview */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Heading</p>
          <p
            style={{
              fontFamily: headingFont,
              fontSize: "1.75rem",
              fontWeight: pairing.scale.h1.weight,
              lineHeight: "1.1",
            }}
            className="truncate"
          >
            {pairing.heading}
          </p>
        </div>

        {/* Body Preview */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Body</p>
          <p
            style={{
              fontFamily: bodyFont,
              fontSize: "0.8125rem",
              lineHeight: "1.5",
            }}
            className="text-muted-foreground line-clamp-2"
          >
            {pairing.description}
          </p>
        </div>
      </div>

      {/* Install Command — copyable mono specimen */}
      <button
        onClick={handleCopy}
        className="w-full flex items-center gap-2 px-4 py-2 border-t border-border bg-surface/30 hover:bg-surface text-left transition-[background-color]"
        aria-label={`Copy install command for ${pairing.name}`}
      >
        <span
          className="text-muted-foreground/50 select-none text-[11px]"
          style={{ fontFamily: monoFont }}
          aria-hidden="true"
        >$</span>
        <code
          className="flex-1 truncate text-muted-foreground text-[11px]"
          style={{ fontFamily: monoFont }}
        >
          npx shadcn add {pairing.name}
        </code>
        {copied ? (
          <Check className="size-3 shrink-0 text-foreground" aria-hidden="true" />
        ) : (
          <Copy className="size-3 shrink-0 text-muted-foreground/50" aria-hidden="true" />
        )}
      </button>

      {/* Info Area */}
      <div className="px-4 py-2.5 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{pairing.name}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {pairing.heading} + {pairing.body} + {pairing.mono}
            </p>
          </div>
          <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>
    </Link>
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
