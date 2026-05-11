"use client";

import { useOpenPanel } from "@openpanel/nextjs";
import { useCallback } from "react";
import type { PackageManager } from "@/hooks/use-package-manager";

type AnalyticsEvents = {
	pair_detail_viewed: { name: string };
	pair_card_opened: { name: string };
	font_detail_viewed: { name: string };
	font_card_opened: { name: string };
	playground_pair_selected: { name: string };
	install_copied: { name: string; package_manager: PackageManager };
};

export function useTrackEvent() {
	const op = useOpenPanel();
	return useCallback(
		<E extends keyof AnalyticsEvents>(
			event: E,
			...args: AnalyticsEvents[E] extends Record<string, never>
				? []
				: [AnalyticsEvents[E]]
		) => {
			op.track(event, args[0] as Record<string, unknown> | undefined);
		},
		[op],
	);
}
