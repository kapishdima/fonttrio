"use client";

import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import { useState } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ClearFiltersButton } from "./clear-filters-button";
import type { FilterDefinition, FilterValues } from "./types";

export function FilterPill({
	filters,
	values,
	onValueChange,
	onClear,
	searchParam = "q",
	searchPlaceholder = "Search...",
}: {
	filters: FilterDefinition[];
	values: FilterValues;
	onValueChange: (filterId: string, value: string) => void;
	onClear: () => void;
	searchParam?: string;
	searchPlaceholder?: string;
}) {
	const [searchQuery, setSearchQuery] = useQueryState(
		searchParam,
		parseAsString.withDefault(""),
	);
	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	const hasActiveFilters =
		!!searchQuery ||
		Object.values(values).some((v) => v !== undefined && v !== "");

	return (
		<>
			<motion.div
				layout
				className="bg-neutral-950 backdrop-blur-md border border-white/10 flex flex-col overflow-hidden rounded-full z-0 px-2 py-1.5 min-w-32 w-40 sm:w-48 md:w-56 lg:w-64 shrink"
				transition={{
					layout: { duration: 0.3, type: "spring", bounce: 0 },
				}}
			>
				<InputGroup className="border-none text-white rounded-full">
					<InputGroupAddon>
						<HugeiconsIcon
							icon={Search01Icon}
							size={24}
							color="currentColor"
							strokeWidth={1.5}
						/>
					</InputGroupAddon>
					<InputGroupInput
						value={searchQuery ?? ""}
						onChange={(e) => setSearchQuery(e.target.value || null)}
						placeholder={searchPlaceholder}
					/>
				</InputGroup>
			</motion.div>
			<motion.div
				layout
				className="bg-neutral-950 backdrop-blur-md border border-white/10 flex flex-col overflow-hidden rounded-full z-0 shrink-0"
				transition={{
					layout: { duration: 0.3, type: "spring", bounce: 0 },
				}}
			>
				<div className="flex items-center gap-1 px-2 py-1.5 overflow-x-auto scrollbar-hide">
					{filters.map((filter) => (
						<FilterPillItem
							key={filter.id}
							filter={filter}
							isActive={activeFilter === filter.id}
							value={values[filter.id]}
							onToggle={() =>
								setActiveFilter((f) =>
									f === filter.id ? null : filter.id,
								)
							}
							onValueChange={(v) => onValueChange(filter.id, v)}
						/>
					))}
					{hasActiveFilters && (
						<ClearFiltersButton onClear={onClear} variant="pill" />
					)}
				</div>
			</motion.div>
		</>
	);
}

function FilterPillItem({
	filter,
	isActive,
	value,
	onToggle,
	onValueChange,
}: {
	filter: FilterDefinition;
	isActive: boolean;
	value: string | undefined;
	onToggle: () => void;
	onValueChange: (value: string) => void;
}) {
	return (
		<>
			<Button
				size="icon"
				variant="ghost"
				className={`h-8 w-8 rounded-full p-0 text-white ${isActive ? "bg-white text-neutral-950" : "bg-transparent"}`}
				onClick={onToggle}
			>
				<HugeiconsIcon
					icon={filter.icon}
					size={12}
					strokeWidth={1.5}
					color="currentColor"
				/>
			</Button>
			{isActive ? (
				<motion.div
					layout
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Select
						value={value}
						onValueChange={onValueChange}
					>
						<SelectTrigger className="w-28 sm:w-40 bg-neutral-800 border-neutral-700 text-white text-xs h-8">
							<SelectValue placeholder={filter.label} />
						</SelectTrigger>
						<SelectContent className="fixed z-200">
							{filter.options.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</motion.div>
			) : null}
		</>
	);
}
