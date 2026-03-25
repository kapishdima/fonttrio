import React from "react";
import {
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import type { ChaosLabel } from "../data/chaos-labels";

interface FontLabelProps {
	label: ChaosLabel;
	index: number;
	mode: "explode" | "scatter-in";
	fadeOutStart?: number;
	fadeOutEnd?: number;
	/** Dark text on light background */
	darkOnLight?: boolean;
}

export const FontLabel: React.FC<FontLabelProps> = ({
	label,
	index,
	mode,
	fadeOutStart,
	fadeOutEnd,
	darkOnLight = false,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const centerX = 960;
	const centerY = 540;

	// Stagger delay based on index
	const delay = index * 0.4;

	let x: number;
	let y: number;
	let scale: number;
	let opacity: number;

	if (mode === "explode") {
		// Start from center, explode outward
		const progress = spring({
			frame,
			fps,
			delay,
			config: { damping: 12, stiffness: 80 },
		});

		x = interpolate(progress, [0, 1], [centerX, label.x]);
		y = interpolate(progress, [0, 1], [centerY, label.y]);
		scale = interpolate(progress, [0, 0.3, 1], [0, 1.2, 1]);
		opacity = interpolate(progress, [0, 0.2, 1], [0, 0.6, 0.4]);
	} else {
		// scatter-in: appear at final position
		const progress = spring({
			frame,
			fps,
			delay,
			config: { damping: 15, stiffness: 120 },
		});

		x = label.x;
		y = label.y;
		scale = interpolate(progress, [0, 1], [0, 1]);
		opacity = interpolate(progress, [0, 1], [0, 0.4]);
	}

	// Float animation
	const floatY = Math.sin(frame * 0.04 + label.phase) * 6;

	// Fade out
	if (fadeOutStart !== undefined && fadeOutEnd !== undefined) {
		const fadeOut = interpolate(
			frame,
			[fadeOutStart, fadeOutEnd],
			[1, 0],
			{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
		);
		opacity *= fadeOut;
	}

	if (opacity < 0.01) return null;

	const textColor = darkOnLight
		? "rgba(0, 0, 0, 0.4)"
		: "rgba(255, 255, 255, 0.4)";

	return (
		<div
			style={{
				position: "absolute",
				left: x,
				top: y + floatY,
				transform: `translate(-50%, -50%) rotate(${label.rotation}deg) scale(${scale})`,
				opacity,
				fontSize: 14,
				color: textColor,
				whiteSpace: "nowrap",
				fontFamily: "'Inter', sans-serif",
			}}
		>
			{label.label}
		</div>
	);
};
