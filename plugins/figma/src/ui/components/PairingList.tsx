import { useMemo } from "react";
import type { PairingSummary } from "../../types";
import { useGoogleFonts } from "../hooks/use-google-fonts";
import { useInfiniteScroll } from "../hooks/use-infinite-scroll";

interface Props {
	pairings: PairingSummary[];
	loading: boolean;
	hasMore: boolean;
	onSelect: (name: string) => void;
	onLoadMore: () => void;
}

export function PairingList({
	pairings,
	loading,
	hasMore,
	onSelect,
	onLoadMore,
}: Props) {
	const fontUrls = useMemo(
		() => pairings.map((p) => p.googleFontsUrl),
		[pairings],
	);
	useGoogleFonts(fontUrls);

	const sentinelRef = useInfiniteScroll(onLoadMore, hasMore && !loading);

	if (loading && pairings.length === 0) {
		return (
			<div className="pairing-list__empty">
				<div className="pairing-list__loading">Loading pairings...</div>
			</div>
		);
	}

	if (pairings.length === 0) {
		return (
			<div className="pairing-list__empty">
				<div>
					<div className="pairing-list__empty-title">No pairings found</div>
					<div className="pairing-list__empty-sub">
						Try adjusting your filters
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="pairing-list">
			<div className="pairing-list__grid">
				{pairings.map((p) => (
					<PairingCard key={p.name} pairing={p} onSelect={onSelect} />
				))}
			</div>
			{hasMore && <div ref={sentinelRef} className="pairing-list__sentinel" />}
			{loading && pairings.length > 0 && (
				<div className="pairing-list__loading">Loading more...</div>
			)}
		</div>
	);
}

function PairingCard({
	pairing,
	onSelect,
}: {
	pairing: PairingSummary;
	onSelect: (name: string) => void;
}) {
	return (
		<button
			type="button"
			className="pairing-card"
			onClick={() => onSelect(pairing.name)}
		>
			<div className="pairing-card__preview">
				<div
					className="pairing-card__heading"
					style={{ fontFamily: `"${pairing.heading}", serif` }}
				>
					{pairing.heading}
				</div>
				<div
					className="pairing-card__sub"
					style={{ fontFamily: `"${pairing.body}", sans-serif` }}
				>
					{pairing.body} · {pairing.mono}
				</div>
			</div>
			{pairing.mood.length > 0 && (
				<div className="pairing-card__tags">
					{pairing.mood.slice(0, 3).map((m) => (
						<span key={m} className="tag">
							{m}
						</span>
					))}
				</div>
			)}
		</button>
	);
}
