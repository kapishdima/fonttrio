import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../../constants";
import { ROULETTE_FONTS } from "../../data/pairings";

/**
 * Invert + cut: Экран на 3 кадра инвертируется
 * (белый фон, чёрный текст последнего шрифта),
 * затем hard cut на children (STOP сцена). Минималистично.
 */
export const InvertCutIntro: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const frame = useCurrentFrame();

	const INVERT_END = 3;

	if (frame >= INVERT_END) {
		return <>{children}</>;
	}

	const lastFont = ROULETTE_FONTS[ROULETTE_FONTS.length - 1];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.white,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					fontFamily: lastFont.family,
					fontSize: 110,
					fontWeight: 700,
					color: COLORS.bg,
					whiteSpace: "nowrap",
				}}
			>
				{lastFont.name}
			</div>
		</AbsoluteFill>
	);
};
