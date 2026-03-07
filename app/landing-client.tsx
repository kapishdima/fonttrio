"use client";

import { useState } from "react";
import type { PairingData } from "@/lib/pairings";
import { usePairingFilters } from "@/lib/hooks/use-pairing-filters";
import { FontSwitcher, AnimatedSubtitle } from "./components/font-switcher";
import { AnimatedLayout } from "./components/animated-layout";
import { InstallCommand } from "./components/install-command";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { GridBackground } from "./components/grid-background";
import { MetricLines } from "./components/metric-lines";
import { PairingCard } from "./components/pairing-card";

interface LandingClientProps {
  featured: PairingData;
  pairings: PairingData[];
  allPairings: PairingData[];
  moods: string[];
}

export function LandingClient({
  featured,
  pairings,
  allPairings,
  moods,
}: LandingClientProps) {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  
  const {
    categoryFilter,
    styleFilter,
    setCategoryFilter,
    toggleStyleFilter,
    clearFilters,
    filteredPairings,
    hasActiveFilters,
    styleGroups,
    categoryOptions,
  } = usePairingFilters(allPairings);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section id="main-content" className="pt-16 relative min-h-screen flex flex-col">
        <GridBackground />

        <div className="relative flex-1 flex flex-col justify-center px-4 lg:px-8 xl:px-12 pb-12 lg:pb-16">
          <AnimatedLayout>
            {/* Heading with metric lines */}
            <div className="relative mt-20">
              <MetricLines lines={[
                { position: "15%", label: "710" },
                { position: "42%", label: "530" },
                { position: "68%", label: "0" },
                { position: "90%", label: "-150" },
              ]} />

              {/* Text — above lines */}
              <div className="relative z-10 h-[clamp(4rem,16vw,13rem)] flex items-center">
                <div className="text-[clamp(3.5rem,15vw,12rem)] leading-[1.1] tracking-tight w-full">
                  <FontSwitcher 
                    pairings={allPairings} 
                    onIndexChange={setCurrentFontIndex}
                  />
                </div>
              </div>
            </div>

            {/* Supporting content — tight vertical rhythm */}
            <div className="mt-4 ml-5 h-[3em]">
              <p className="text-[clamp(1.125rem,2.5vw,1.75rem)] leading-normal tracking-[-0.01em] text-muted-foreground max-w-4xl line-clamp-2">
                <AnimatedSubtitle 
                  pairings={allPairings}
                  currentIndex={currentFontIndex}
                  text="Ready-made font combinations for shadcn/ui projects. Each includes heading, body, and mono fonts with a complete scale."
                />
              </p>
            </div>

            <div className="pt-40 ml-5 max-w-2xl">
              <InstallCommand pairingName={featured.name} showPackageManagerSelector showFeatures />
            </div>

          </AnimatedLayout>
        </div>
      </section>

      {/* Sticky Filters */}
      <div className="sticky top-16 z-40 bg-background/95 border-b border-border backdrop-blur-sm">
        <div className="px-4 lg:px-8 py-3 flex items-center gap-6">
          {/* Type filter */}
          <div className="flex items-center gap-0 shrink-0">
            {categoryOptions.map((cat) => (
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
            {styleGroups.map((group) => (
              <button
                key={group.key}
                onClick={() => toggleStyleFilter(group.key)}
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
              {filteredPairings.length}
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
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
        {filteredPairings.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground">No pairings match the current filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
            {filteredPairings.map((pairing: PairingData, i: number) => (
              <AnimatedLayout key={pairing.name} delay={Math.min(i, 8) * 40}>
                <PairingCard pairing={pairing} />
              </AnimatedLayout>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
