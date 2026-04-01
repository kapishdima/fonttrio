import { PairInstallationCode } from "@/app/components/pairs/pair-installation-code";
import { BackLink } from "@/components/ui/back-link";
import { Badge } from "@/components/ui/badge";
import type { PairingData } from "@/lib/pairings";
import { kebabToTitle } from "@/lib/utils";

export function PairHero({ pairing }: { pairing: PairingData }) {
	const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
	const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;
	const monoFont = `"${pairing.mono}", monospace`;

	return (
		<div className="p-3">
			<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24">
				<BackLink href="/pairs" text="All pairings" />

				<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
					<div className="flex-1 min-w-0">
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight dark:text-white text-neutral-900 font-[Outfit] text-balance">
							{kebabToTitle(pairing.name)}
						</h1>

						<p
							className="mt-4 text-base sm:text-lg dark:text-neutral-400 text-neutral-600 leading-relaxed max-w-xl text-pretty"
							style={{ fontFamily: bodyFont }}
						>
							{pairing.description}
						</p>

						<div className="flex flex-wrap gap-1.5 mt-6">
							{pairing.mood.map((m) => (
								<Badge
									key={m}
									variant="secondary"
									className="text-xs rounded-md font-medium tracking-tighter"
								>
									{m}
								</Badge>
							))}
							{pairing.useCase.map((u) => (
								<Badge
									key={u}
									variant="secondary"
									className="text-xs rounded-md font-medium tracking-tighter"
								>
									{u}
								</Badge>
							))}
						</div>

						<div className="mt-8 max-w-xl">
							<p className="text-sm font-medium dark:text-neutral-500 text-neutral-400 mb-2 tracking-tighter ">
								Installation
							</p>
							<PairInstallationCode pairing={pairing} />
						</div>
					</div>

					{/* Right: Font Trio Cards */}
					<div className="flex flex-col gap-3 lg:w-80 shrink-0">
						{[
							{
								role: "Heading",
								font: pairing.heading,
								category: pairing.headingCategory,
								fontFamily: headingFont,
								weight: pairing.scale.h1.weight,
								sample: "The quick brown fox",
							},
							{
								role: "Body",
								font: pairing.body,
								category: pairing.bodyCategory,
								fontFamily: bodyFont,
								weight: pairing.scale.body.weight,
								sample: "Jumps over the lazy dog and runs across the meadow",
							},
							{
								role: "Mono",
								font: pairing.mono,
								category: "monospace" as const,
								fontFamily: monoFont,
								weight: 400,
								sample: "const x = fn(42);",
							},
						].map((item) => (
							<div
								key={item.role}
								className="dark:bg-neutral-900/50 bg-neutral-50 rounded-xl p-4"
							>
								<div className="flex items-center justify-between mb-3">
									<span className="text-xs font-medium dark:text-neutral-500 text-neutral-400 tracking-wider uppercase">
										{item.role}
									</span>
									<span className="text-xs dark:text-neutral-600 text-neutral-400">
										{item.category}
									</span>
								</div>
								<p
									className="text-lg dark:text-neutral-200 text-neutral-800 font-semibold truncate"
									style={{ fontFamily: item.fontFamily }}
								>
									{item.font}
								</p>
								<p
									className="text-sm dark:text-neutral-400 text-neutral-500 mt-1 truncate"
									style={{
										fontFamily: item.fontFamily,
										fontWeight: item.weight,
									}}
								>
									{item.sample}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
