"use client";

import { AnimatedLayout } from "@/app/components/animated-layout";
import { PairingCard } from "@/app/components/pairing-card";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { usePairingFilters } from "@/lib/hooks/use-pairing-filters";
import type { PairingData } from "@/lib/pairings";

interface PairingsClientInnerProps {
	pairings: PairingData[];
}

function PairingsClientInner({ pairings }: PairingsClientInnerProps) {
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
	} = usePairingFilters(pairings);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<SiteHeader />

			{/* Page Header */}
			<section className="pt-24 sm:pt-[100px] border-b border-border">
				<div className="px-4 lg:px-8 py-12 lg:py-20">
					<AnimatedLayout>
						<div className="flex flex-col gap-3">
							<p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
								02 — PAIRINGS
							</p>
							<h1
								className="text-[clamp(3rem,10vw,8rem)] leading-none uppercase font-black tracking-tight"
								style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
							>
								Pairings
							</h1>
							<p className="text-sm text-muted-foreground leading-relaxed max-w-md">
								Browse {pairings.length}+ curated font pairings. Three fonts,
								one command.
							</p>
						</div>
					</AnimatedLayout>
				</div>
			</section>

			{/* Sticky Filters */}
			<div className="sticky top-16 z-40 bg-background/95 border-b border-border backdrop-blur-sm">
				<div className="px-4 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
					<div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
						{/* Category filter */}
						<div className="flex items-center gap-0 shrink-0">
							{categoryOptions.map((cat) => (
								<button
									type="button"
									key={cat.key}
									onClick={() => setCategoryFilter(cat.key)}
									aria-pressed={categoryFilter === cat.key}
									className={`px-3 py-2 text-xs uppercase tracking-wider border-b-2 transition-[color,border-color] min-h-[44px] flex items-center ${
										categoryFilter === cat.key
											? "border-foreground text-foreground"
											: "border-transparent text-muted-foreground hover:text-foreground"
									}`}
								>
									{cat.label}
								</button>
							))}
						</div>

						<span className="w-px h-6 bg-border shrink-0 hidden sm:block" />

						{/* Style groups */}
						<div className="flex items-center gap-0">
							{styleGroups.map((group) => (
								<button
									type="button"
									key={group.key}
									onClick={() => toggleStyleFilter(group.key)}
									aria-pressed={styleFilter === group.key}
									className={`px-3 py-2 text-[11px] uppercase tracking-wider border-b-2 transition-[color,border-color] min-h-[44px] flex items-center whitespace-nowrap ${
										styleFilter === group.key
											? "border-foreground text-foreground"
											: "border-transparent text-muted-foreground hover:text-foreground"
									}`}
								>
									{group.label}
								</button>
							))}
						</div>
					</div>

					{/* Count + Clear */}
					<div className="flex items-center gap-3 sm:ml-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
						<span className="text-xs font-mono text-muted-foreground tabular-nums">
							{filteredPairings.length} pairings
						</span>
						{hasActiveFilters && (
							<button
								type="button"
								onClick={clearFilters}
								className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors px-2 py-1 min-h-[44px] flex items-center"
							>
								Clear
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Pairing Grid */}
			<main className="px-0">
				{filteredPairings.length === 0 ? (
					<div className="px-4 lg:px-8 py-24 text-center">
						<p className="text-muted-foreground text-sm">
							No pairings match the current filters.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
						{filteredPairings.map((pairing, i) => (
							<AnimatedLayout key={pairing.name} delay={Math.min(i * 30, 300)}>
								<PairingCard pairing={pairing} />
							</AnimatedLayout>
						))}
					</div>
				)}
			</main>

			<SiteFooter />
		</div>
	);
}

interface PairingsClientProps {
	pairings: PairingData[];
}

export function PairingsClient({ pairings }: PairingsClientProps) {
	return <PairingsClientInner pairings={pairings} />;
}
