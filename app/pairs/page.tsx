"use client";

import { FilterPill } from "@/app/components/filters/filter-pill";
import { InnerHeader } from "@/app/components/header";
import { PairsHero } from "@/app/components/hero/pairs-hero";
import { PairCard } from "@/app/components/pair-card";

import { PAIR_FILTERS } from "@/lib/pairs-filter-config";
import { getAllPairings } from "@/lib/pairings";

const emptyValues = {};
const noop = () => {};

export default function Redesign04Pairs() {
	return (
		<main className="bg-black">
			<InnerHeader
				extraWhenScroll={
					<FilterPill
						filters={PAIR_FILTERS}
						values={emptyValues}
						onValueChange={noop}
						onClear={noop}
						searchPlaceholder="Search pairings..."
					/>
				}
			/>
			<PairsHero
				filters={PAIR_FILTERS}
				filterValues={emptyValues}
				onFilterChange={noop}
			/>
			<PairsList />
		</main>
	);
}

function PairsList() {
	const pairings = getAllPairings();

	return (
		<div className="p-3">
			<section className="w-full h-full dark:bg-neutral-950 bg-white rounded-4xl py-16 px-4 sm:px-6 md:px-12 lg:px-24">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
					{pairings.map((pairing) => (
						<PairCard key={pairing.name} pairing={pairing} />
					))}
				</div>
			</section>
		</div>
	);
}
