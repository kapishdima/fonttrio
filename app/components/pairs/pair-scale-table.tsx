import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import type { PairingData } from "@/lib/pairings";

type PairScaleTable<T extends ElementType = "div"> = {
	as?: T;
	pair: PairingData;
	className?: string;
} & ComponentPropsWithoutRef<T>;

export function PairScaleTable<T extends ElementType = "div">({
	as,
	pair,
	className,
}: PairScaleTable<T>) {
	const Comp = as || "div";
	return (
		<Comp
			className={clsx(
				"mt-4 dark:bg-neutral-900/50 bg-neutral-50 rounded-lg p-3",
				className,
			)}
		>
			{/* Column headers */}
			<div className="grid grid-cols-4 gap-x-2 mb-1.5 pb-1.5 border-b dark:border-neutral-800 border-neutral-200">
				<span className="text-xs tracking-wider dark:text-neutral-600 text-neutral-700 font-medium">
					Level
				</span>
				<span className="text-xs tracking-wider dark:text-neutral-600 text-neutral-700 font-medium">
					Size
				</span>
				<span className="text-xs tracking-wider dark:text-neutral-600 text-neutral-700 font-medium">
					Weight
				</span>
				<span className="text-xs tracking-wider dark:text-neutral-600 text-neutral-700 font-medium">
					LH
				</span>
			</div>
			<div className="space-y-1">
				{(["h1", "h2", "h3", "h4", "body"] as const).map((level) => {
					const s = pair.scale[level];
					return (
						<div key={level} className="grid grid-cols-4 gap-x-2 text-xs py-2">
							<span className="font-mono uppercase dark:text-neutral-300 text-neutral-800 font-medium">
								{level}
							</span>
							<span className="tabular-nums dark:text-neutral-400 text-neutral-500">
								{s.size}
							</span>
							<span className="tabular-nums dark:text-neutral-400 text-neutral-500">
								{s.weight}
							</span>
							<span className="tabular-nums dark:text-neutral-400 text-neutral-500">
								{s.lineHeight}
							</span>
						</div>
					);
				})}
			</div>
		</Comp>
	);
}
