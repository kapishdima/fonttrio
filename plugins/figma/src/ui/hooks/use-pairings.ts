import { useCallback, useState } from "react";
import { fetchPairingDetail, fetchPairings } from "../../lib/api";
import type { EnrichedPairing, PairingSummary } from "../../types";

export interface FilterState {
	query: string;
	mood: string;
	useCase: string;
	category: string;
}

const INITIAL_FILTERS: FilterState = {
	query: "",
	mood: "",
	useCase: "",
	category: "",
};
const LIMIT = 20;

export function usePairings() {
	const [pairings, setPairings] = useState<PairingSummary[]>([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
	const [offset, setOffset] = useState(0);
	const [selectedPairing, setSelectedPairing] =
		useState<EnrichedPairing | null>(null);

	const loadPairings = useCallback(
		async (newOffset = 0, currentFilters = filters) => {
			setLoading(true);
			try {
				const data = await fetchPairings({
					query: currentFilters.query || undefined,
					mood: currentFilters.mood || undefined,
					useCase: currentFilters.useCase || undefined,
					category: currentFilters.category || undefined,
					limit: LIMIT,
					offset: newOffset,
				});
				if (newOffset === 0) {
					setPairings(data.pairings);
				} else {
					setPairings((prev) => [...prev, ...data.pairings]);
				}
				setTotal(data.total);
				setOffset(newOffset);
			} catch (err) {
				console.error("Failed to load pairings:", err);
			} finally {
				setLoading(false);
			}
		},
		[filters],
	);

	const loadMore = useCallback(() => {
		if (pairings.length < total) {
			loadPairings(offset + LIMIT);
		}
	}, [pairings.length, total, offset, loadPairings]);

	const selectPairing = useCallback(async (name: string) => {
		try {
			const detail = await fetchPairingDetail(name);
			setSelectedPairing(detail);
		} catch (err) {
			console.error("Failed to load detail:", err);
		}
	}, []);

	const clearSelection = useCallback(() => {
		setSelectedPairing(null);
	}, []);

	const hasMore = pairings.length < total;

	return {
		pairings,
		total,
		loading,
		hasMore,
		filters,
		setFilters,
		selectedPairing,
		loadPairings,
		loadMore,
		selectPairing,
		clearSelection,
	};
}
