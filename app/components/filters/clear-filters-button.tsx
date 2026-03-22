"use client";

import { Trash2 } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";

export function ClearFiltersButton({
	onClear,
	variant = "pill",
}: {
	onClear: () => void;
	variant?: "pill" | "inline";
}) {
	if (variant === "pill") {
		return (
			<Button
				size="icon"
				variant="destructive"
				className="h-8 w-8 rounded-full p-0"
				onClick={onClear}
			>
				<HugeiconsIcon
					icon={Trash2}
					size={12}
					strokeWidth={1.5}
					color="currentColor"
				/>
			</Button>
		);
	}

	return (
		<Button variant="destructive" onClick={onClear}>
			<HugeiconsIcon
				icon={Trash2}
				size={14}
				strokeWidth={1.5}
				color="currentColor"
			/>
			Clear filters
		</Button>
	);
}
