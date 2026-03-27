"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import { SponsorHero } from "@/app/components/hero/sponsor-hero";

import { SponsorSection } from "@/components/sponsors/sponsors-grid";
import { TierCard } from "@/components/sponsors/tier-card";
import {
	BILLING_OPTIONS,
	type BillingOption,
	SPONSOR_TIERS,
	SPONSORS,
	SPONSORS_PAGE,
} from "@/lib/sponsors";

export default function SponsorsPage() {
	const [billing, setBilling] = useState<BillingOption>(BILLING_OPTIONS[0]);

	const goldSponsors = SPONSORS.filter((s) => s.tier === "gold");
	const silverSponsors = SPONSORS.filter((s) => s.tier === "silver");
	const bronzeSponsors = SPONSORS.filter((s) => s.tier === "bronze");

	return (
		<main className="bg-black">
			<InnerHeader />
			<SponsorHero />

			{/* Tier Cards */}
			<div id="tiers" className="p-3 pt-0 scroll-mt-24">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<div className="flex items-center justify-between mb-12 flex-wrap gap-4">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900">
							Choose your tier
						</h2>

						{/* Billing toggle */}
						<div className="inline-flex rounded-full border dark:border-neutral-800 border-neutral-200 p-0.5">
							{BILLING_OPTIONS.map((option) => (
								<button
									key={option.key}
									type="button"
									onClick={() => setBilling(option)}
									className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer min-h-[36px] ${
										billing.key === option.key
											? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
											: "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
									}`}
								>
									{option.label}
								</button>
							))}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{SPONSOR_TIERS.map((tier, i) => (
							<TierCard
								key={tier.key}
								tier={tier}
								billing={billing}
								suffix={billing.suffix}
								index={i}
							/>
						))}
					</div>
				</section>
			</div>

			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-12">
						{SPONSORS_PAGE.sectionTitles.sponsors}
					</h2>

					{SPONSORS.length === 0 ? (
						<div className="text-center py-16 rounded-2xl border dark:border-neutral-800 border-neutral-200 border-dashed">
							<Heart className="size-10 dark:text-neutral-600 text-neutral-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium dark:text-white text-neutral-900 mb-2">
								{SPONSORS_PAGE.emptyState.title}
							</h3>
							<p className="text-sm dark:text-neutral-400 text-neutral-600 max-w-md mx-auto">
								{SPONSORS_PAGE.emptyState.description}
							</p>
						</div>
					) : (
						<div className="space-y-16">
							{/* Gold */}
							{goldSponsors.length > 0 && (
<<<<<<< HEAD
								<div>
									<h3 className="text-sm uppercase tracking-wider text-muted-foreground text-center mb-8">
										Gold Sponsors
									</h3>
									<div className="flex flex-wrap justify-center gap-8">
										{goldSponsors.map((sponsor) => (
											<a
												key={sponsor.id}
												href={sponsor.url}
												target="_blank"
												className="group flex items-center justify-center gap-6 p-6 border border-border bg-surface transition-colors w-full sm:w-[calc(30%-1rem)] max-w-xl"
											>
												<div className="max-w-40 flex items-center justify-center shrink-0 overflow-hidden">
													{sponsor.logo ? (
														<SponsorLogo
															sponsor={sponsor}
															className="size-full object-contain"
														/>
													) : (
														<span className="text-2xl font-bold">
															{sponsor.name.charAt(0)}
														</span>
													)}
												</div>
												{sponsor.name && sponsor.name.length > 0 && (
													<div className="flex-1 min-w-0">
														<div className="text-xl font-medium truncate">
															{sponsor.name}
														</div>
													</div>
												)}
												{/* <ExternalLink className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" /> */}
											</a>
										))}
									</div>
								</div>
=======
								<SponsorSection
									label="Gold"
									size="lg"
									sponsors={goldSponsors}
								/>
>>>>>>> feat/redesign-02
							)}

							{/* Silver */}
							{silverSponsors.length > 0 && (
<<<<<<< HEAD
								<div>
									<h3 className="text-sm uppercase tracking-wider text-muted-foreground text-center mb-6">
										Silver Sponsors
									</h3>
									<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
										{silverSponsors.map((sponsor) => (
											<a
												key={sponsor.id}
												href={sponsor.url}
												target="_blank"
												className="group flex items-center justify-center gap-3 p-4 border border-border bg-surface/50 hover:bg-surface transition-colors"
											>
												<div className="max-w-40  rounded flex items-center justify-center shrink-0">
													{sponsor.logo ? (
														<SponsorLogo
															sponsor={sponsor}
															className="size-full object-contain mt-1"
														/>
													) : (
														<span className="text-base font-bold">
															{sponsor.name.charAt(0)}
														</span>
													)}
												</div>
												{/* <div className="flex-1 min-w-0">
													<div className="text-sm font-medium truncate">
														{sponsor.name}
													</div>
												</div> */}
											</a>
										))}
									</div>
								</div>
=======
								<SponsorSection
									label="Silver"
									size="md"
									sponsors={silverSponsors}
								/>
>>>>>>> feat/redesign-02
							)}

							{/* Bronze */}
							{bronzeSponsors.length > 0 && (
<<<<<<< HEAD
								<div>
									<h3 className="text-sm uppercase tracking-wider text-muted-foreground text-center mb-6">
										Bronze Sponsors
									</h3>
									<div className="flex flex-wrap justify-center gap-2">
										{bronzeSponsors.map((sponsor) => (
											<a
												key={sponsor.id}
												href={sponsor.url}
												target="_blank"
												className="px-3 py-1.5 border border-border bg-surface/30 hover:bg-surface transition-colors text-xs"
											>
												{sponsor.name}
											</a>
										))}
									</div>
								</div>
=======
								<SponsorSection
									label="Bronze"
									size="sm"
									sponsors={bronzeSponsors}
								/>
>>>>>>> feat/redesign-02
							)}
						</div>
					)}
				</section>
			</div>

			{/* Why Sponsor */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-12">
						{SPONSORS_PAGE.sectionTitles.whySponsor}
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{Object.values(SPONSORS_PAGE.whySponsor).map((item) => (
							<div
								key={item.title}
								className="rounded-2xl border dark:border-neutral-800 border-neutral-200 p-6"
							>
								<h3 className="font-medium dark:text-white text-neutral-900 mb-2">
									{item.title}
								</h3>
								<p className="text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</section>
			</div>

			<Footer />
		</main>
	);
}
