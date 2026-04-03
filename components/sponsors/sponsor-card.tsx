import clsx from "clsx";
import type { Sponsor } from "@/lib/sponsors";

export function SponsorCard({
	sponsor,
	cellPy,
}: {
	sponsor: Sponsor;
	cellPy: string;
}) {
	return (
		<a
			key={sponsor.id}
			href={sponsor.url}
			target="_blank"
			aria-label={sponsor.name}
			className={`group flex items-center justify-center px-6 ${cellPy}  border-r dark:border-neutral-800 border-b  border-neutral-200  dark:hover:bg-neutral-900/60 hover:bg-neutral-50 transition-colors`}
		>
			{/** biome-ignore lint/performance/noImgElement: <fallback invert for dark> */}
			<img
				src={sponsor.logo}
				alt={sponsor.name}
				className={clsx(
					"h-8 w-auto max-w-35 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 dark:invert",
					sponsor.classNames,
				)}
				draggable={false}
			/>
		</a>
	);
}

export function SponsorEmptyCard({ cellPy }: { cellPy: string }) {
	return (
		<a
			href="#tiers"
			className={`group flex items-center justify-center px-6 ${cellPy} border-b border-r dark:border-neutral-800 border-neutral-200  dark:hover:bg-neutral-900/60 hover:bg-neutral-50 transition-colors`}
		>
			<span className="text-sm font-medium dark:text-neutral-700 text-neutral-300 group-hover:dark:text-neutral-500 group-hover:text-neutral-400 transition-colors">
				Your logo
			</span>
		</a>
	);
}
