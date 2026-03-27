import {
	SponsorCard,
	SponsorEmptyCard,
} from "@/components/sponsors/sponsor-card";
import type { SPONSORS } from "@/lib/sponsors";

export const GRID_COLS: Record<string, { classes: string; count: number }> = {
	lg: { classes: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3", count: 3 },
	md: { classes: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4", count: 4 },
	sm: { classes: "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6", count: 6 },
};

export function SponsorSection({
	label,
	size,
	sponsors,
}: {
	label: string;
	size: "lg" | "md" | "sm";
	sponsors: typeof SPONSORS;
}) {
	const cellPy = size === "lg" ? "py-8" : size === "md" ? "py-6" : "py-5";
	const { classes, count } = GRID_COLS[size];
	const remainder = sponsors.length % count;
	const placeholders = remainder === 0 ? 0 : count - remainder;

	return (
		<div>
			<h4 className="text-lg font-medium tracking-tighter dark:text-neutral-500 text-neutral-400 mb-4">
				{label}
			</h4>
			<div
				className={`grid ${classes} border dark:border-neutral-800 border-b-0 border-r-0 border-neutral-200 rounded-2xl overflow-hidden`}
			>
				{sponsors.map((sponsor) => (
					<SponsorCard key={sponsor.id} sponsor={sponsor} cellPy={cellPy} />
				))}

				{Array.from({ length: placeholders }).map((_, i) => (
					<SponsorEmptyCard key={`placeholder-${i}`} cellPy={cellPy} />
				))}
			</div>
		</div>
	);
}
