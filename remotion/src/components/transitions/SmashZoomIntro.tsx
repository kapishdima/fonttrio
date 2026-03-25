import React from "react";
import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
} from "remotion";
import { COLORS } from "../../constants";
import { ROULETTE_FONTS } from "../../data/pairings";

/**
 * Smash zoom: последний шрифт стремительно увеличивается (scale 1→20),
 * заполняя экран белым, затем из белого появляется STOP.
 * Первые ~10 кадров — zoom, затем children.
 */
export const SmashZoomIntro: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const frame = useCurrentFrame();

	const ZOOM_END = 8;
	const WHITE_END = 12;

	if (frame >= WHITE_END) {
		return <>{children}</>;
	}

	const lastFont = ROULETTE_FONTS[ROULETTE_FONTS.length - 1];

	if (frame < ZOOM_END) {
		// Zoom phase
		const zoomProgress = interpolate(frame, [0, ZOOM_END], [0, 1], {
			extrapolateRight: "clamp",
			easing: Easing.in(Easing.exp),
		});
		const scale = interpolate(zoomProgress, [0, 1], [1, 25]);
		const opacity = interpolate(zoomProgress, [0, 0.7, 1], [1, 1, 0]);

		return (
			<AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
				<AbsoluteFill
					style={{
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
							color: COLORS.text,
							whiteSpace: "nowrap",
							transform: `scale(${scale})`,
							opacity,
						}}
					>
						{lastFont.name}
					</div>
				</AbsoluteFill>
				{/* White overlay growing */}
				<AbsoluteFill
					style={{
						backgroundColor: COLORS.white,
						opacity: interpolate(zoomProgress, [0.5, 1], [0, 1], {
							extrapolateLeft: "clamp",
						}),
					}}
				/>
			</AbsoluteFill>
		);
	}

	// White → children crossfade
	const fadeOut = interpolate(frame, [ZOOM_END, WHITE_END], [1, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill>
			{children}
			<AbsoluteFill
				style={{ backgroundColor: COLORS.white, opacity: fadeOut }}
			/>
		</AbsoluteFill>
	);
};
