"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { FilterDefinition, FilterValues } from "./types";

export function FilterGrid({
	filters,
	values,
	onValueChange,
	className,
}: {
	filters: FilterDefinition[];
	values: FilterValues;
	onValueChange: (filterId: string, value: string) => void;
	className?: string;
}) {
	return (
		<div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl ${className ?? ""}`}>
			{filters.map((filter) => (
				<Field key={filter.id}>
					<FieldLabel>
						<FieldTitle className="text-default">
							<HugeiconsIcon
								icon={filter.icon}
								size={18}
								color="currentColor"
								strokeWidth={1.5}
							/>
							{filter.label}
						</FieldTitle>
					</FieldLabel>
					<Select
						value={values[filter.id] || undefined}
						onValueChange={(v) => onValueChange(filter.id, v)}
					>
						<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
							<SelectValue placeholder={filter.label} />
						</SelectTrigger>
						<SelectContent>
							{filter.options.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>
			))}
		</div>
	);
}
