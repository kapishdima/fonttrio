import type { PairingData } from "@/lib/pairings";
import { filterPairings } from "@/lib/filters";

export interface SearchPairingsInput {
	query?: string;
	mood?: string;
	useCase?: string;
	category?: string;
	limit?: number;
}

export interface SearchPairingsResult {
	pairings: Array<{
		name: string;
		description: string;
		mood: string[];
		useCase: string[];
		installCommand: string;
	}>;
	total: number;
}

export function searchPairings(
	allPairings: PairingData[],
	input: SearchPairingsInput,
): SearchPairingsResult {
	const { query, mood, useCase, category, limit = 10 } = input;

	const results = filterPairings(allPairings, { query, mood, useCase, category });

	const total = results.length;
	const limited = results.slice(0, limit);

	return {
		pairings: limited.map((p) => ({
			name: p.name,
			description: p.description,
			mood: p.mood,
			useCase: p.useCase,
			installCommand: `bunx shadcn@latest add https://www.fonttrio.xyz/r/${p.name}.json`,
		})),
		total,
	};
}
