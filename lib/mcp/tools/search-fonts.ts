import type { FontItem } from "@/lib/registry";

export interface SearchFontsInput {
	query?: string;
	category?: string;
	limit?: number;
}

export interface SearchFontsResult {
	fonts: Array<{
		name: string;
		title: string;
		family: string;
		category: string;
		description: string;
		weights: string[];
		installCommand: string;
	}>;
	total: number;
}

export function searchFonts(
	allFonts: FontItem[],
	input: SearchFontsInput,
): SearchFontsResult {
	const { query, category, limit = 10 } = input;

	let results = allFonts;

	if (query) {
		const q = query.toLowerCase();
		results = results.filter(
			(f) =>
				f.title.toLowerCase().includes(q) ||
				f.name.toLowerCase().includes(q) ||
				f.font?.family?.toLowerCase().includes(q),
		);
	}

	if (category) {
		const c = category.toLowerCase();
		results = results.filter(
			(f) => f.category?.toLowerCase().includes(c),
		);
	}

	const total = results.length;
	const limited = results.slice(0, limit);

	return {
		fonts: limited.map((f) => ({
			name: f.name,
			title: f.title,
			family: f.font?.family || f.title,
			category: f.category || "Unknown",
			description: f.description,
			weights: f.font?.weight || [],
			installCommand: `bunx shadcn@latest add https://www.fonttrio.xyz/r/${f.name}.json`,
		})),
		total,
	};
}
