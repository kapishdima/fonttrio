import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../../constants";

/**
 * Slam cut + shake: Hard cut, STOP появляется мгновенно,
 * экран трясётся 5-6 кадров как от удара. Белая вспышка.
 * Это обёртка вокруг children — добавляет shake + flash.
 */
export const SlamShakeIntro: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const frame = useCurrentFrame();

	const SHAKE_END = 6;

	// Screen shake — random-looking but deterministic offsets
	const shakeOffsets = [
		{ x: 12, y: -8 },
		{ x: -10, y: 6 },
		{ x: 8, y: -4 },
		{ x: -6, y: 3 },
		{ x: 4, y: -2 },
		{ x: -2, y: 1 },
	];

	const shakeX =
		frame < SHAKE_END ? shakeOffsets[frame]?.x ?? 0 : 0;
	const shakeY =
		frame < SHAKE_END ? shakeOffsets[frame]?.y ?? 0 : 0;

	// White flash
	const flashOpacity = interpolate(frame, [0, 1, 4], [0.7, 0.4, 0], {
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill>
			<div
				style={{
					width: "100%",
					height: "100%",
					transform: `translate(${shakeX}px, ${shakeY}px)`,
				}}
			>
				{children}
			</div>
			{/* White flash overlay */}
			<AbsoluteFill
				style={{
					backgroundColor: COLORS.white,
					opacity: flashOpacity,
					pointerEvents: "none",
				}}
			/>
		</AbsoluteFill>
	);
};
