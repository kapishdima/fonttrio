"use client";

import { Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { FontItem } from "@/lib/fonts";
import { useFontFilters } from "@/lib/hooks/use-font-filters";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { FontCard } from "@/app/components/font-card";
import { AnimatedLayout } from "@/app/components/animated-layout";

interface FontsClientInnerProps {
  fonts: FontItem[];
}

function FontsClientInner({ fonts }: FontsClientInnerProps) {
  const {
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    filteredFonts,
    hasActiveFilters,
    clearFilters,
    categoryOptions,
  } = useFontFilters(fonts);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Page Header */}
      <section className="pt-24 sm:pt-[100px] border-b border-border">
        <div className="px-4 lg:px-8 py-12 lg:py-20">
          <AnimatedLayout>
            <div className="flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                01 — FONTS
              </p>
              <h1
                className="text-[clamp(3rem,10vw,8rem)] leading-none uppercase font-black tracking-tight"
                style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
              >
                Fonts
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Browse {fonts.length}+ fonts. Install any with a single command.
              </p>
            </div>
          </AnimatedLayout>
        </div>
      </section>

      {/* Sticky Filters */}
      <div className="sticky top-16 z-40 bg-background/95 border-b border-border backdrop-blur-sm">
        <div className="px-4 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          {/* Search */}
          <div className="relative shrink-0 w-full sm:w-64">
            <input
              type="search"
              value={searchQuery ?? ""}
              onChange={(e) => setSearchQuery(e.target.value || null)}
              placeholder="Search fonts..."
              className="w-full font-mono text-xs px-3 py-2 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground h-9"
              aria-label="Search fonts"
            />
          </div>

          <span className="w-px h-6 bg-border shrink-0 hidden sm:block" />

          {/* Category filter */}
          <div className="flex items-center gap-0 overflow-x-auto no-scrollbar">
            {categoryOptions.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategoryFilter(cat.key)}
                aria-pressed={categoryFilter === cat.key}
                className={`px-3 py-2 text-xs uppercase tracking-wider border-b-2 transition-[color,border-color] min-h-[44px] flex items-center whitespace-nowrap ${
                  categoryFilter === cat.key
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Count + Clear */}
          <div className="flex items-center gap-3 sm:ml-auto shrink-0">
            <span className="text-xs font-mono text-muted-foreground tabular-nums">
              {filteredFonts.length} fonts
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Font Grid */}
      <main className="px-0">
        {filteredFonts.length === 0 ? (
          <div className="px-4 lg:px-8 py-24 text-center">
            <p className="text-muted-foreground text-sm">No fonts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-border">
            {filteredFonts.map((font, i) => (
              <AnimatedLayout key={font.name} delay={Math.min(i * 20, 300)}>
                <FontCard font={font} />
              </AnimatedLayout>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

interface FontsClientProps {
  fonts: FontItem[];
}

export function FontsClient({ fonts }: FontsClientProps) {
  return (
    <NuqsAdapter>
      <Suspense fallback={null}>
        <FontsClientInner fonts={fonts} />
      </Suspense>
    </NuqsAdapter>
  );
}
