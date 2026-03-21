"use client";

import { InnerHeader } from "@/app/components/v2/header";
import { PairsHero } from "@/app/components/v2/hero/pairs-hero";
import { PairFullCard } from "@/app/components/v2/pair-card";
import { FilterPill } from "@/app/components/v2/pairs/pairs-filter";

import { getAllPairings } from "@/lib/pairings";

export default function Redesign04Pairs() {
	return (
		<main className="bg-black">
			<InnerHeader extraWhenScroll={<FilterPill />} />
			<PairsHero />
			<PairsList />
		</main>
	);
}

function PairsList() {
	const pairings = getAllPairings();

	return (
		<div className="p-3">
			<section className="w-full h-full dark:bg-neutral-950 bg-white rounded-4xl py-16 px-6 md:px-12 lg:px-24">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
					{pairings.map((pairing) => (
						<PairFullCard key={pairing.name} pairing={pairing} />
					))}
				</div>
			</section>
		</div>
	);
}
