import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { Button } from "@/components/ui/button";
import type { PairingData } from "@/lib/pairings";

type PairsListSelectionProps<T extends ElementType = "div"> = {
	as?: T;
	pairings: PairingData[];
	onSelectPair: (name: string) => void;
	active: PairingData;
	className?: string;
} & ComponentPropsWithoutRef<T>;

export function PairsListSelection<T extends ElementType = "div">({
	pairings,
	as,
	onSelectPair,
	active,
	className,
}: PairsListSelectionProps<T>) {
	const Comp = as || "div";

	return (
		<Comp
			className={clsx(
				"flex gap-2 overflow-x-auto pb-2 scrollbar-hide",
				className,
			)}
		>
			{pairings.map((p) => (
				<Button
					key={p.name}
					type="button"
					onClick={() => onSelectPair(p.name)}
					className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border cursor-pointer ${
						active.name === p.name
							? "dark:bg-white dark:text-black bg-neutral-900 text-white border-transparent"
							: "dark:bg-neutral-900 dark:text-neutral-400 bg-white text-neutral-600 dark:border-neutral-800 border-neutral-200 dark:hover:text-white hover:text-neutral-900"
					}`}
				>
					{p.name}
				</Button>
			))}
		</Comp>
	);
}
