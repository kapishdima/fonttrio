import { CheckmarkBadge02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import type { BillingOption, SponsorTier } from "@/lib/sponsors";

type TierCardProps = {
	tier: SponsorTier;
	billing: BillingOption;
	suffix: string;
	index: number;
};

export function TierCard({ tier, billing, suffix, index }: TierCardProps) {
	const isGold = tier.key === "gold";

	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{
				duration: 0.5,
				ease: [0.16, 1, 0.3, 1],
				delay: index * 0.08,
			}}
			className={`flex flex-col rounded-2xl border p-6 md:p-8 transition-colors ${
				isGold
					? "dark:border-neutral-700 border-neutral-300 dark:bg-neutral-900/50 bg-neutral-50"
					: "dark:border-neutral-800 border-neutral-200"
			}`}
		>
			<div className="mb-6">
				<span className="text-xs font-medium tracking-wider dark:text-neutral-500 text-neutral-400">
					{tier.name}
				</span>
				<div className="mt-2 flex items-baseline gap-1">
					<span className="text-sm font-normal dark:text-neutral-500 text-neutral-400"></span>
					<AnimatePresence mode="wait">
						<motion.span
							key={`${tier.price}-${billing.key}`}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.2 }}
							className="text-3xl md:text-5xl font-semibold tracking-tighter dark:text-white text-neutral-900 tabular-nums"
						>
							${tier.price}
						</motion.span>
					</AnimatePresence>
					{suffix && (
						<span className="text-base dark:text-neutral-500 text-neutral-400">
							{suffix}
						</span>
					)}
				</div>
			</div>

			<p className="text-sm dark:text-neutral-400 text-neutral-600 mb-6">
				{tier.description}
			</p>

			<ul className="space-y-3 mb-8 flex-1">
				{tier.benefits.map((benefit) => (
					<li key={benefit} className="flex items-center gap-2.5 text-sm">
						<HugeiconsIcon
							icon={CheckmarkBadge02Icon}
							size={16}
							color="currentColor"
							strokeWidth={1.5}
						/>
						<span className="dark:text-neutral-300 text-neutral-700">
							{benefit}
						</span>
					</li>
				))}
			</ul>

			<Button
				asChild
				variant={isGold ? "default" : "outline"}
				className="w-full h-10"
			>
				<a
					href={tier.paymentUrls[billing.key]}
					target="_blank"
					rel="noopener noreferrer"
				>
					Become a {tier.name} Sponsor
				</a>
			</Button>
		</motion.div>
	);
}
