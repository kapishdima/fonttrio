import React from "react";
import {
	AbsoluteFill,
	Easing,
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { COLORS } from "../constants";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

export const OutroScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	// Background gradient appears first — deblurs from heavy blur
	const bgBlur = interpolate(frame, [0, 25], [30, 0], {
		extrapolateRight: "clamp",
		easing: EASE,
	});
	const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
		extrapolateRight: "clamp",
	});

	// "Fonttrio" appears after background settles
	const textProgress = interpolate(frame, [18, 36], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: EASE,
	});
	const textY = interpolate(textProgress, [0, 1], [30, 0]);
	const textBlur = interpolate(textProgress, [0, 1], [10, 0]);
	const textOpacity = interpolate(frame, [18, 26], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	// Fade out at the very end
	const endOpacity = interpolate(
		frame,
		[durationInFrames - 20, durationInFrames],
		[1, 0],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
	);

	return (
		<AbsoluteFill style={{ backgroundColor: "#d8d8d8" }}>
			{/* Silk-like gradient background */}
			<AbsoluteFill
				style={{
					filter: bgBlur > 0.5 ? `blur(${bgBlur}px)` : undefined,
					opacity: bgOpacity * endOpacity,
				}}
			>
				<div
					style={{
						position: "absolute",
						inset: 0,
						background: `
							radial-gradient(ellipse 80% 60% at 15% 25%, rgba(255,255,255,0.9) 0%, transparent 60%),
							radial-gradient(ellipse 60% 80% at 80% 15%, rgba(180,180,180,0.7) 0%, transparent 55%),
							radial-gradient(ellipse 70% 50% at 50% 85%, rgba(140,140,140,0.5) 0%, transparent 55%),
							radial-gradient(ellipse 50% 70% at 90% 65%, rgba(70,70,70,0.5) 0%, transparent 50%),
							radial-gradient(ellipse 90% 40% at 5% 75%, rgba(200,200,200,0.6) 0%, transparent 60%)
						`,
					}}
				/>
				<div
					style={{
						position: "absolute",
						inset: 0,
						background: `
							radial-gradient(circle 700px at 25% 35%, rgba(255,255,255,0.5) 0%, transparent 45%),
							radial-gradient(circle 600px at 75% 55%, rgba(60,60,60,0.35) 0%, transparent 45%),
							radial-gradient(circle 500px at 50% 15%, rgba(160,160,160,0.3) 0%, transparent 40%)
						`,
					}}
				/>
			</AbsoluteFill>

			{/* Fonttrio text */}
			<AbsoluteFill className="flex items-center justify-center">
				<div
					style={{
						transform: `translateY(${textY}px)`,
						filter: textBlur > 0.5 ? `blur(${textBlur}px)` : undefined,
						opacity: textOpacity * endOpacity,
						fontFamily: "'Manrope', sans-serif",
						fontSize: 160,
						fontWeight: 800,
						color: COLORS.text,
						letterSpacing: -4,
					}}
				>
					Fonttrio
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
