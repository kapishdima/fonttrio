import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../../constants";
import { ROULETTE_FONTS } from "../../data/pairings";

/**
 * Freeze + Glitch: показывает последний шрифт из рулетки,
 * затем 2-3 горизонтальных glitch-сдвига, затем children (STOP сцена).
 * Занимает первые ~12 кадров, потом передаёт управление children.
 */
export const FreezeGlitchIntro: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const frame = useCurrentFrame();

	const GLITCH_END = 10;

	if (frame >= GLITCH_END) {
		return <>{children}</>;
	}

	const lastFont = ROULETTE_FONTS[ROULETTE_FONTS.length - 1];

	// Horizontal glitch shifts
	const glitch1 = frame >= 2 && frame < 4;
	const glitch2 = frame >= 5 && frame < 7;
	const glitch3 = frame >= 8 && frame < 10;

	const shiftX = glitch1 ? -30 : glitch2 ? 20 : glitch3 ? -15 : 0;

	// Color channel split (red/cyan offset)
	const channelOffset = glitch1 ? 4 : glitch2 ? -3 : glitch3 ? 2 : 0;

	// Flash on glitch frames
	const isGlitch = glitch1 || glitch2 || glitch3;
	const noiseOpacity = isGlitch ? 0.08 : 0;

	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
			{/* Frozen last font */}
			<AbsoluteFill
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					transform: `translateX(${shiftX}px)`,
				}}
			>
				{/* Red channel */}
				{channelOffset !== 0 && (
					<div
						style={{
							position: "absolute",
							fontFamily: lastFont.family,
							fontSize: 110,
							fontWeight: 700,
							color: "rgba(255, 0, 0, 0.3)",
							transform: `translateX(${channelOffset}px)`,
							whiteSpace: "nowrap",
						}}
					>
						{lastFont.name}
					</div>
				)}
				{/* Cyan channel */}
				{channelOffset !== 0 && (
					<div
						style={{
							position: "absolute",
							fontFamily: lastFont.family,
							fontSize: 110,
							fontWeight: 700,
							color: "rgba(0, 255, 255, 0.3)",
							transform: `translateX(${-channelOffset}px)`,
							whiteSpace: "nowrap",
						}}
					>
						{lastFont.name}
					</div>
				)}
				{/* Main text */}
				<div
					style={{
						fontFamily: lastFont.family,
						fontSize: 110,
						fontWeight: 700,
						color: COLORS.text,
						whiteSpace: "nowrap",
					}}
				>
					{lastFont.name}
				</div>
			</AbsoluteFill>

			{/* Noise overlay on glitch */}
			<AbsoluteFill
				style={{
					backgroundColor: COLORS.white,
					opacity: noiseOpacity,
					mixBlendMode: "overlay",
				}}
			/>
		</AbsoluteFill>
	);
};
