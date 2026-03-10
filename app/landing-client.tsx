"use client";

import { useState } from "react";
import { usePairingFilters } from "@/lib/hooks/use-pairing-filters";
import type { PairingData } from "@/lib/pairings";
import type { Sponsor } from "@/lib/sponsors";
import { AnimatedLayout } from "./components/animated-layout";
import { AnimatedSubtitle, FontSwitcher } from "./components/font-switcher";
import { GridBackground } from "./components/grid-background";
import { InstallCommand } from "./components/install-command";
import { MetricLines } from "./components/metric-lines";
import { PairingCard } from "./components/pairing-card";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { SponsorLogo } from "./components/sponsor-logo";

interface LandingClientProps {
	featured: PairingData;
	pairings: PairingData[];
	allPairings: PairingData[];
	moods: string[];
	sponsors: Sponsor[];
}

export function LandingClient({
	featured,
	pairings,
	allPairings,
	moods,
	sponsors,
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
			<section
				id="main-content"
				className="pt-20 sm:pt-16 relative min-h-[85vh] sm:min-h-screen flex flex-col"
			>
				<GridBackground />

				<div className="relative flex-1 flex flex-col justify-start sm:justify-center px-4 lg:px-8 xl:px-12 pb-8 sm:pb-12 lg:pb-16">
					<AnimatedLayout>
						{/* Heading with metric lines */}
						<div className="relative mt-8 sm:mt-12 lg:mt-20">
							<div className="hidden sm:block">
								<MetricLines
									lines={[
										{ position: "15%", label: "710" },
										{ position: "42%", label: "530" },
										{ position: "68%", label: "0" },
										{ position: "90%", label: "-150" },
									]}
								/>
							</div>

							{/* Text — above lines */}
							<div className="relative z-10 h-[clamp(3.5rem,12vw,10rem)] sm:h-[clamp(4rem,16vw,13rem)] flex items-center">
								<h1 className="text-[clamp(2.5rem,11vw,8rem)] sm:text-[clamp(3.5rem,15vw,12rem)] leading-[1.05] sm:leading-[1.1] tracking-tight w-full">
									<FontSwitcher
										pairings={allPairings}
										onIndexChange={setCurrentFontIndex}
									/>
								</h1>
							</div>
						</div>

						{/* Supporting content — tight vertical rhythm */}
						<div className="mt-3 sm:mt-4 ml-0 sm:ml-5">
							<p className="text-base sm:text-[clamp(1.125rem,2.5vw,1.75rem)] leading-snug sm:leading-normal tracking-[-0.01em] text-muted-foreground max-w-4xl">
								<AnimatedSubtitle
									pairings={allPairings}
									currentIndex={currentFontIndex}
									text="Ready-made font combinations for shadcn/ui projects. Each includes heading, body, and mono fonts with a complete scale."
								/>
							</p>
						</div>

						<div className="mt-8 sm:mt-16 lg:mt-24 ml-0 sm:ml-5 max-w-full sm:max-w-2xl">
							<InstallCommand.Full pairingName={featured.name}>
								<InstallCommand.Features />
							</InstallCommand.Full>
						</div>

						{sponsors.length > 0 && (
							<div className="mt-8 sm:mt-12 ml-0 sm:ml-5 flex items-center gap-3">
								<span className="text-[11px] uppercase tracking-wider text-muted-foreground">
									Backed by
								</span>
								<span className="w-px h-3 bg-border" />
								<div className="flex items-center gap-4">
									{sponsors.map((sponsor) => (
										<a
											key={sponsor.id}
											href={sponsor.url}
											target="_blank"
											rel="noopener noreferrer"
											className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
										>
											<SponsorLogo
												sponsor={sponsor}
												className="w-auto h-10 object-cover "
											/>
											<span className="text-xs font-medium">
												{sponsor.name}
											</span>
										</a>
									))}
								</div>
							</div>
						)}
					</AnimatedLayout>
				</div>
			</section>

			{/* Sticky Filters */}
			<div className="sticky top-16 z-40 bg-background/95 border-b border-border backdrop-blur-sm">
				<div className="px-4 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
					{/* Type filter + Style groups row on mobile */}
					<div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
						{/* Type filter */}
						<div className="flex items-center gap-0 shrink-0">
							{categoryOptions.map((cat) => (
								<button
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

						{/* Style groups — horizontal scroll */}
						<div className="flex items-center gap-0">
							{styleGroups.map((group) => (
								<button
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
								onClick={clearFilters}
								className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors px-2 py-1 min-h-[44px] flex items-center"
							>
								Clear
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Pairing Cards */}
			<section className="px-4 sm:px-6 lg:px-8">
				{filteredPairings.length === 0 ? (
					<div className="py-24 text-center">
						<p className="text-muted-foreground">
							No pairings match the current filters.
						</p>
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
