import clsx from "clsx";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import {
	type ComponentPropsWithoutRef,
	type ElementType,
	useMemo,
	useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { filterPairingsByFont } from "@/lib/filters";
import type { PairingData } from "@/lib/pairings";

type PairsListSelectionProps<T extends ElementType = "div"> = {
	as?: T;
	pairings: PairingData[];
	onSelectPair: (name: string) => void;
	active: PairingData;
	className?: string;
	searchable?: boolean;
} & ComponentPropsWithoutRef<T>;

export function PairsListSelection<T extends ElementType = "div">({
	pairings,
	as,
	onSelectPair,
	active,
	className,
	searchable = false,
}: PairsListSelectionProps<T>) {
	const Comp = as || "div";
	const [query, setQuery] = useQueryState("query", { defaultValue: "" });

	const filtered = useMemo(
		() => (searchable ? filterPairingsByFont(pairings, query) : pairings),
		[pairings, query, searchable],
	);

	return (
		<div className="relative flex items-center gap-2 py-2 px-1">
			{searchable && (
				<div className="sticky left-0 z-10 shrink-0 flex items-center">
					<div className="relative">
						<InputGroup className="h-9 w-64  text-sm rounded-full dark:bg-neutral-900 bg-white dark:border-neutral-800 border-neutral-200">
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
				</div>
			)}
			<Comp
				className={clsx(
					"relative flex items-center gap-2 overflow-x-auto scrollbar-hide ",
					className,
				)}
			>
				{filtered.map((p) => (
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
				{searchable && query && filtered.length === 0 && (
					<span className="shrink-0 self-center text-xs dark:text-neutral-600 text-neutral-400 px-2">
						No pairings found
					</span>
				)}
			</Comp>
		</div>
	);
}
