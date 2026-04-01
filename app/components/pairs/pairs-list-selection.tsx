import clsx from "clsx";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import {
	type ComponentPropsWithoutRef,
	type ElementType,
	useMemo,
} from "react";
import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { filterPairings } from "@/lib/filters";
import type { PairingData } from "@/lib/pairings";

type PairsListSelectionProps<T extends ElementType = "div"> = {
	as?: T;
	pairings: PairingData[];
	onSelectPair: (name: string) => void;
	active: PairingData;
	className?: string;
	searchable?: boolean;
	direction?: "horizontal" | "vertical";
} & ComponentPropsWithoutRef<T>;

function normalizePairingName(name: string): string {
	return name
		.toLowerCase()
		.replace("-", " ")
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function PairsListSelection<T extends ElementType = "div">({
	pairings,
	as,
	onSelectPair,
	active,
	className,
	searchable = false,
	direction = "horizontal",
}: PairsListSelectionProps<T>) {
	const Comp = as || "div";
	const [query, setQuery] = useQueryState("query", { defaultValue: "" });

	const filtered = useMemo(
		() => (searchable ? filterPairings(pairings, { query }) : pairings),
		[pairings, query, searchable],
	);

	const isVertical = direction === "vertical";

	return (
		<div
			className={clsx(
				"relative flex gap-2",
				isVertical ? "flex-col" : "items-center py-2 px-1",
				className,
			)}
		>
			{searchable && (
				<div className="shrink-0">
					<InputGroup className="h-9 w-full text-sm rounded-lg dark:bg-neutral-900 bg-white dark:border-neutral-800 border-neutral-200">
						<InputGroupAddon>
							<Search className="size-3.5 dark:text-neutral-500 text-neutral-400 pointer-events-none" />
						</InputGroupAddon>
						<InputGroupInput
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Font…"
							autoComplete="one-time-code"
						/>
					</InputGroup>
				</div>
			)}
			<Comp
				className={clsx(
					"relative flex gap-2 scrollbar-hide",
					isVertical
						? "flex-col overflow-y-auto scroll-fade-effect-y"
						: "items-center overflow-x-auto scroll-fade-effect-x",
				)}
			>
				{filtered.map((p) => (
					<Button
						key={p.name}
						type="button"
						onClick={() => onSelectPair(p.name)}
						className={clsx(
							"shrink-0  py-2 rounded-lg text-sm font-mediumcursor-pointer ",
							isVertical && "w-full justify-start",
							active.name === p.name
								? "dark:bg-white dark:text-black bg-neutral-900 text-white border-transparent"
								: "dark:bg-neutral-900 dark:text-neutral-400 bg-white text-neutral-600 dark:border-neutral-800 border-neutral-200 dark:hover:text-white hover:text-neutral-900",
						)}
					>
						{normalizePairingName(p.name)}
					</Button>
				))}
				{searchable && query && filtered.length === 0 && (
					<span className="shrink-0 self-center text-xs dark:text-neutral-600 text-neutral-400 px-2">
						No pairings found
					</span>
				)}
			</Comp>
		</div>
	);
}
