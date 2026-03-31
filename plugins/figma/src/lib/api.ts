import type { EnrichedPairing, PairingListResponse } from "../types";

const BASE_URL = "https://www.fonttrio.xyz";

export async function fetchPairings(params: {
	query?: string;
	mood?: string;
	useCase?: string;
	category?: string;
	limit?: number;
	offset?: number;
}): Promise<PairingListResponse> {
	const searchParams = new URLSearchParams();

	if (params.query) searchParams.set("query", params.query);
	if (params.mood) searchParams.set("mood", params.mood);
	if (params.useCase) searchParams.set("useCase", params.useCase);
	if (params.category) searchParams.set("category", params.category);
	if (params.limit) searchParams.set("limit", String(params.limit));
	if (params.offset) searchParams.set("offset", String(params.offset));

	const res = await fetch(`${BASE_URL}/api/pairing?${searchParams.toString()}`);

	if (!res.ok) {
		throw new Error(`Failed to fetch pairings: ${res.status}`);
	}

	return res.json();
}

export async function fetchPairingDetail(
	name: string,
): Promise<EnrichedPairing> {
	const res = await fetch(`${BASE_URL}/api/pairing/${name}`);

	if (!res.ok) {
		throw new Error(`Failed to fetch pairing "${name}": ${res.status}`);
	}

	return res.json();
}
