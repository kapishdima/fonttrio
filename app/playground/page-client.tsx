"use client";

import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import { Playground } from "@/app/components/playground";
import type { PairingData } from "@/lib/pairings";

export function PlaygroundPageClient({
	pairings,
}: {
	pairings: PairingData[];
}) {
	return (
		<main className="bg-black min-h-screen flex flex-col">
			<InnerHeader />

			<div className="p-3 pt-20">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12">
					<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight dark:text-white text-neutral-800 mb-3">
						Playground
					</h1>
					<p className="text-base dark:text-neutral-400 text-neutral-500 mb-6 max-w-xl">
						See how font pairings look on real shadcn/ui components. Pick a
						pairing and watch every element update.
					</p>
				</section>
			</div>

			<Playground pairings={pairings} showHeader={false} />
			<Footer />
		</main>
	);
}
