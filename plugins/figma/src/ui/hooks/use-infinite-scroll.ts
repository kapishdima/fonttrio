import { useEffect, useRef } from "react";

export function useInfiniteScroll(onLoadMore: () => void, enabled: boolean) {
	const sentinelRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!enabled) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) onLoadMore();
			},
			{ threshold: 0.1 },
		);

		if (sentinelRef.current) observer.observe(sentinelRef.current);
		return () => observer.disconnect();
	}, [enabled, onLoadMore]);

	return sentinelRef;
}
