"use client";

import { useState, useMemo } from "react";
import type { PairingData, FontCategory } from "@/lib/pairings";
import { FontProvider } from "./components/font-provider";
import { ThemeToggle } from "./components/theme-toggle";
import { PairingCard } from "./components/pairing-card";
import { InstallCommand } from "./components/install-command";

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

  // Collect all Google Fonts URLs for preloading
  const allFontUrls = allPairings
    .map((p) => p.googleFontsUrl)
    .filter(Boolean);

  const filteredPairings = useMemo(() => {
    return pairings.filter((p) => {
      if (categoryFilter !== "all" && p.headingCategory !== categoryFilter) {
        return false;
      }
      if (moodFilter && !p.mood.includes(moodFilter)) {
        return false;
      }
      return true;
    });
  }, [pairings, categoryFilter, moodFilter]);

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "serif", label: "Serif" },
    { key: "sans-serif", label: "Sans-serif" },
  ];

  // Card size assignments for editorial layout
  const getCardSize = (
    index: number
  ): "large" | "medium" | "compact" => {
    const pattern = [
      "large",
      "medium",
      "compact",
      "medium",
      "large",
      "compact",
    ] as const;
    return pattern[index % pattern.length];
  };

  // Grid span classes for asymmetric masonry
  const getGridSpan = (index: number): string => {
    const spans = [
      "col-span-1 sm:col-span-2", // large — full width
      "col-span-1",               // medium — single
      "col-span-1",               // compact — single
      "col-span-1",               // medium — single
      "col-span-1 sm:col-span-2", // large — full width
      "col-span-1",               // compact — single
    ];
    return spans[index % spans.length];
  };

  const featuredHeadingFont = `"${featured.heading}", ${featured.headingCategory}`;
  const featuredBodyFont = `"${featured.body}", ${featured.bodyCategory}`;
  const featuredMonoFont = `"${featured.mono}", monospace`;

  return (
    <div className="min-h-screen">
      {/* Font Provider */}
      {allFontUrls.map((url) => (
        <FontProvider key={url} fonts={[]} googleFontsUrl={url} />
      ))}

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-base font-sans font-semibold tracking-tight">
            fonttrio
          </a>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6" style={{ paddingTop: "clamp(3rem, 8vw, 8rem)", paddingBottom: "clamp(3rem, 8vw, 6rem)" }}>
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted">
            {featured.heading} + {featured.body} + {featured.mono}
          </p>

          <h1
            style={{
              fontFamily: featuredHeadingFont,
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: featured.scale.h1.weight,
              lineHeight: "1.05",
              letterSpacing: featured.scale.h1.letterSpacing,
            }}
          >
            Three fonts.
            <br />
            One command.
          </h1>

          <p
            style={{
              fontFamily: featuredBodyFont,
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              lineHeight: "1.7",
              fontWeight: featured.scale.body.weight,
            }}
            className="text-muted max-w-xl mx-auto"
          >
            Curated font pairings for shadcn. Each trio includes heading,
            body, and monospace fonts with a complete typography scale.
            Install in seconds.
          </p>

          <pre
            className="inline-block px-5 py-3 rounded-lg bg-accent-soft/40 border border-border overflow-x-auto text-left"
            style={{
              fontFamily: featuredMonoFont,
              fontSize: "0.8125rem",
              lineHeight: "1.6",
            }}
          >
            <code className="text-muted">
              {`npx shadcn@latest add https://fonttrio.dev/r/${featured.name}.json`}
            </code>
          </pre>

          <div className="pt-2">
            <InstallCommand pairingName={featured.name} compact />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-border" />
      </div>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-6" style={{ paddingTop: "clamp(2rem, 4vw, 4rem)" }}>
        <div className="space-y-3">
          {/* Category filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategoryFilter(cat.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-colors ${
                  categoryFilter === cat.key
                    ? "bg-text text-bg"
                    : "border border-border text-muted hover:text-text hover:border-text/30"
                }`}
              >
                {cat.label}
              </button>
            ))}

            <span className="w-px h-4 bg-border mx-1" />

            {/* Mood filters */}
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() =>
                  setMoodFilter(moodFilter === mood ? null : mood)
                }
                className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-colors ${
                  moodFilter === mood
                    ? "bg-accent text-bg"
                    : "border border-border text-muted hover:text-text hover:border-text/30"
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section
        className="max-w-6xl mx-auto px-6"
        style={{
          paddingTop: "clamp(2rem, 4vw, 3rem)",
          paddingBottom: "clamp(4rem, 8vw, 8rem)",
        }}
      >
        {filteredPairings.length === 0 ? (
          <p className="text-center text-muted font-sans py-20">
            No pairings match the current filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {filteredPairings.map((p, i) => (
              <div key={p.name} className={getGridSpan(i)}>
                <PairingCard pairing={p} size={getCardSize(i)} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="text-xs font-mono text-muted">
            fonttrio
          </span>
          <span className="text-xs font-mono text-muted">
            Curated font pairings for shadcn
          </span>
        </div>
      </footer>
    </div>
  );
}
