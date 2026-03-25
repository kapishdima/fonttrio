import React from "react";
import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { COLORS } from "../constants";

interface WordEntry {
	text: string;
	/** Frame when this word starts animating in */
	enterFrame: number;
}

interface TextInterludeProps {
	words: WordEntry[];
	/** Font size, default 90 */
	fontSize?: number;
	/** Whether words flow inline (wrap) or stack vertically */
	layout?: "inline" | "stack";
}

/**
 * Text interlude matching the shadcncraft reference:
 * - Words appear one by one
 * - Each word slides up from below + deblurs (blur → clear)
 * - Smooth ease-out deceleration (no bounce)
 * - Words accumulate on screen
 */
export const TextInterlude: React.FC<TextInterludeProps> = ({
	words,
	fontSize = 90,
	layout = "inline",
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const ANIM_DURATION = 14; // frames for each word entrance

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bg,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					flexWrap: layout === "inline" ? "wrap" : "nowrap",
					flexDirection: layout === "stack" ? "column" : "row",
					alignItems: "center",
					justifyContent: "center",
					gap: layout === "inline" ? "0 20px" : "0",
					maxWidth: 1400,
					textAlign: "center",
				}}
			>
				{words.map((word, i) => {
					const localFrame = frame - word.enterFrame;

					// Not yet visible
					if (localFrame < 0) return null;

					const progress = interpolate(
						localFrame,
						[0, ANIM_DURATION],
						[0, 1],
						{
							extrapolateRight: "clamp",
							easing: Easing.out(Easing.exp),
						},
					);

					const y = interpolate(progress, [0, 1], [40, 0]);
					const blur = interpolate(progress, [0, 1], [10, 0]);
					const opacity = interpolate(
						localFrame,
						[0, 3],
						[0, 1],
						{ extrapolateRight: "clamp" },
					);

					return (
						<div
							key={i}
							style={{
								transform: `translateY(${y}px)`,
								filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
								opacity,
								fontFamily: "'Manrope', sans-serif",
								fontSize,
								fontWeight: 500,
								color: COLORS.text,
								lineHeight: 1.2,
								whiteSpace: "nowrap",
							}}
						>
							{word.text}
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
