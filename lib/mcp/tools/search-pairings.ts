import type { PairingItem } from "@/lib/registry";

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
		title: string;
		description: string;
		mood: string[];
		useCase: string[];
		categories: string[];
		installCommand: string;
	}>;
	total: number;
}

export function searchPairings(
	allPairings: PairingItem[],
	input: SearchPairingsInput,
): SearchPairingsResult {
	const { query, mood, useCase, category, limit = 10 } = input;

	let results = allPairings;

	if (query) {
		const q = query.toLowerCase();
		results = results.filter(
			(p) =>
				p.title.toLowerCase().includes(q) ||
				p.description.toLowerCase().includes(q) ||
				p.name.toLowerCase().includes(q) ||
				p.meta?.mood?.some((m) => m.toLowerCase().includes(q)) ||
				p.meta?.useCase?.some((u) => u.toLowerCase().includes(q)),
		);
	}

	if (mood) {
		const m = mood.toLowerCase();
		results = results.filter((p) =>
			p.meta?.mood?.some((pm) => pm.toLowerCase().includes(m)),
		);
	}

	if (useCase) {
		const u = useCase.toLowerCase();
		results = results.filter((p) =>
			p.meta?.useCase?.some((pu) => pu.toLowerCase().includes(u)),
		);
	}

	if (category) {
		const c = category.toLowerCase();
		results = results.filter((p) =>
			p.categories?.some((pc) => pc.toLowerCase().includes(c)),
		);
	}

	const total = results.length;
	const limited = results.slice(0, limit);

	return {
		pairings: limited.map((p) => {
			const pairingSlug = p.name.replace("pairing-", "");
			return {
				name: pairingSlug,
				title: p.title,
				description: p.description,
				mood: p.meta?.mood || [],
				useCase: p.meta?.useCase || [],
				categories: p.categories || [],
				installCommand: `bunx shadcn@latest add https://www.fonttrio.xyz/r/${pairingSlug}.json`,
			};
		}),
		total,
	};
}
