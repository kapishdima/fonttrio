import type { ComponentPropsWithoutRef, ElementType } from "react";
import type { PairingData } from "@/lib/pairings";

type FontsRowProps<T extends ElementType = "div"> = {
	as?: T;
	pairing: PairingData;
} & ComponentPropsWithoutRef<T>;

export function FontsRow<T extends ElementType = "div">({
	pairing,
	as,
}: FontsRowProps<T>) {
	const Comp = as || "div";

	return (
		<Comp className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
			{[
				{
					label: "Heading",
					font: pairing.heading,
				},
				{ label: "Body", font: pairing.body },
				{ label: "Mono", font: pairing.mono },
			].map((item) => (
				<div
					key={item.label}
					className="dark:bg-neutral-900/50 bg-neutral-50 rounded-lg p-3"
				>
					<p className="text-xs dark:text-neutral-500 text-neutral-500 font-medium">
						{item.label}
					</p>
					<p
						className="text-base font-semibold dark:text-neutral-200 text-neutral-800 truncate mt-0.5"
						style={{ fontFamily: item.font }}
					>
						{item.font}
					</p>
				</div>
			))}
		</Comp>
	);
}
