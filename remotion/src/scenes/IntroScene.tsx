import { Audio } from "@remotion/media";
import React from "react";
import {
	AbsoluteFill,
	Easing,
	interpolate,
	Sequence,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { COLORS } from "../constants";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

const SEARCH_TEXT = "fonts.google.com";
const TYPE_START = 15;
const TYPE_DURATION = 30;
const CLICK_FRAME = 55;

export const IntroScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	// Entrance — whole page fades in
	const pageOpacity = interpolate(frame, [0, 10], [0, 1], {
		extrapolateRight: "clamp",
	});

	// Typewriter in search bar
	const charsToShow = Math.floor(
		interpolate(frame, [TYPE_START, TYPE_START + TYPE_DURATION], [0, SEARCH_TEXT.length], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		}),
	);
	const displayText = SEARCH_TEXT.slice(0, charsToShow);
	const isTyping = frame >= TYPE_START && charsToShow < SEARCH_TEXT.length;
	const cursorVisible = frame >= TYPE_START && (isTyping ? frame % 16 < 10 : frame % 30 < 15);

	// Search button highlight on click
	const isClicked = frame >= CLICK_FRAME;
	const clickScale = isClicked
		? interpolate(frame, [CLICK_FRAME, CLICK_FRAME + 3, CLICK_FRAME + 6], [1, 0.95, 1], {
				extrapolateRight: "clamp",
		  })
		: 1;

	// After click — zoom into search bar, blur, fade to white
	const afterClick = frame - CLICK_FRAME;
	const zoomProgress = isClicked
		? interpolate(afterClick, [8, 25], [0, 1], {
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
				easing: Easing.in(Easing.exp),
		  })
		: 0;
	const zoomScale = interpolate(zoomProgress, [0, 1], [1, 3]);
	const zoomBlur = interpolate(zoomProgress, [0, 1], [0, 15]);
	const zoomOpacity = interpolate(zoomProgress, [0.5, 1], [1, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bg,
				opacity: pageOpacity,
			}}
			className="flex items-center justify-center"
		>
			<div
				style={{
					transform: `scale(${zoomScale})`,
					filter: zoomBlur > 0.5 ? `blur(${zoomBlur}px)` : undefined,
					opacity: zoomOpacity,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 32,
				}}
			>
				{/* Google logo */}
				<div style={{ display: "flex", gap: 2, fontSize: 92, fontWeight: 500, letterSpacing: -2 }}>
					<span style={{ color: "#4285F4", fontFamily: "'Manrope', sans-serif" }}>G</span>
					<span style={{ color: "#EA4335", fontFamily: "'Manrope', sans-serif" }}>o</span>
					<span style={{ color: "#FBBC05", fontFamily: "'Manrope', sans-serif" }}>o</span>
					<span style={{ color: "#4285F4", fontFamily: "'Manrope', sans-serif" }}>g</span>
					<span style={{ color: "#34A853", fontFamily: "'Manrope', sans-serif" }}>l</span>
					<span style={{ color: "#EA4335", fontFamily: "'Manrope', sans-serif" }}>e</span>
				</div>

				{/* Search bar */}
				<div
					style={{
						width: 680,
						display: "flex",
						alignItems: "center",
						border: "1px solid #dfe1e5",
						borderRadius: 24,
						padding: "12px 20px",
						backgroundColor: COLORS.white,
						boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
					}}
				>
					{/* Search icon */}
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						style={{ marginRight: 14, flexShrink: 0 }}
					>
						<path
							d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
							stroke="#9aa0a6"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>

					{/* Typed text */}
					<span
						style={{
							flex: 1,
							fontFamily: "'Manrope', sans-serif",
							fontSize: 18,
							color: COLORS.text,
							fontWeight: 400,
						}}
					>
						{displayText}
						{cursorVisible && (
							<span style={{ color: COLORS.text, fontWeight: 300 }}>|</span>
						)}
					</span>
				</div>

				{/* Buttons */}
				<div style={{ display: "flex", gap: 12, marginTop: 4 }}>
					<div
						style={{
							padding: "10px 20px",
							borderRadius: 4,
							backgroundColor: isClicked ? "#e8e8e8" : "#f8f9fa",
							border: "1px solid #f8f9fa",
							fontFamily: "'Manrope', sans-serif",
							fontSize: 14,
							fontWeight: 500,
							color: "#3c4043",
							transform: `scale(${clickScale})`,
						}}
					>
						Google Search
					</div>
					<div
						style={{
							padding: "10px 20px",
							borderRadius: 4,
							backgroundColor: "#f8f9fa",
							border: "1px solid #f8f9fa",
							fontFamily: "'Manrope', sans-serif",
							fontSize: 14,
							fontWeight: 500,
							color: "#3c4043",
						}}
					>
						I&apos;m Feeling Lucky
					</div>
				</div>
			</div>

			{/* Keyboard typing sound — synced with typewriter start */}
			<Sequence from={TYPE_START} durationInFrames={TYPE_DURATION} layout="none">
				<Audio src={staticFile("key.wav")} volume={0.6} />
			</Sequence>

			{/* Mouse click sound — synced with search button click */}
			<Sequence from={CLICK_FRAME} durationInFrames={15} layout="none">
				<Audio src={staticFile("mouse.wav")} volume={0.8} />
			</Sequence>
		</AbsoluteFill>
	);
};
