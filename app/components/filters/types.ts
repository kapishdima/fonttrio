export type FilterOption = { value: string; label: string };

export type FilterDefinition = {
	id: string;
	icon: unknown; // HugeiconsIcon type
	label: string;
	options: FilterOption[];
};

export type FilterValues = Record<string, string | undefined>;
