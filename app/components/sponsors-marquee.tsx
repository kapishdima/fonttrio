"use client";

import { SPONSORS } from "@/lib/sponsors";

const sponsors = SPONSORS.filter(
	(s) => s.tier === "gold" || s.tier === "silver",
);

const gridCard =
	"flex items-center justify-center border-b border-neutral-200 bg-white px-6 py-6 sm:px-8 sm:py-8 dark:bg-neutral-950 hover:dark:bg-neutral-900 transition-bg last:border-b-0 dark:border-neutral-800 sm:border-r sm:nth-[2n]:border-r-0 md:nth-[2n]:border-r md:border-r md:nth-[3n]:border-r-0 md:nth-last-[-n+3]:border-b-0 lg:nth-[3n]:border-r lg:nth-[6n]:border-r-0 lg:[&:nth-last-child(-n+6)]:border-b-0";

function LogoList() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 border border-neutral-200 dark:border-neutral-800 md:grid-cols-3 lg:grid-cols-6 mt-10 rounded-4xl overflow-hidden">
			{sponsors.map((sponsor) => (
				<a href={sponsor.url} key={sponsor.id} className={gridCard}>
					{/** biome-ignore lint/performance/noImgElement: <bad url> */}
					<img
						alt={sponsor.name}
						src={sponsor.logo ?? ""}
						className="h-8 w-auto object-contain dark:grayscale dark:invert grayscale dark:opacity-100 opacity-80"
					/>
				</a>
			))}
			<div className={gridCard}>
				<a
					href="/sponsors"
					className="text-md font-bold tracking-tight darkLtext-white hover:text-white/80"
				>
					Become a sponsor
				</a>
			</div>
		</div>
	);
}

export function SponsorsMarquee() {
	return (
		<section
			aria-label="Sponsors"
			className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden dark:bg-black bg-white"
		>
			<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl dark:text-white text-neutral-800 font-medium tracking-tight text-balance">
				Huge thanks to <br /> my amazing sponsors!
			</h2>
			<LogoList />
		</section>
	);
}
