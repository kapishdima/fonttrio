import React from "react";
import { AbsoluteFill } from "remotion";
import { CHAOS_LABELS } from "../data/chaos-labels";
import { FontLabel } from "./FontLabel";

interface ChaosFontsProps {
	mode: "explode" | "scatter-in";
	count?: number;
	fadeOutStart?: number;
	fadeOutEnd?: number;
	/** Dark text on light background (like app hero) */
	darkOnLight?: boolean;
}

export const ChaosFonts: React.FC<ChaosFontsProps> = ({
	mode,
	count = 80,
	fadeOutStart,
	fadeOutEnd,
	darkOnLight = false,
}) => {
	const labels = CHAOS_LABELS.slice(0, count);

	return (
		<AbsoluteFill>
			{labels.map((label, i) => (
				<FontLabel
					key={i}
					label={label}
					index={i}
					mode={mode}
					fadeOutStart={fadeOutStart}
					fadeOutEnd={fadeOutEnd}
					darkOnLight={darkOnLight}
				/>
			))}
		</AbsoluteFill>
	);
};
