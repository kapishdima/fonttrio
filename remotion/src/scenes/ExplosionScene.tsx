import React from "react";
import {
	AbsoluteFill,
	Easing,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
// --- Transition variants: uncomment ONE at a time to preview ---
// import { FreezeGlitchIntro as TransitionIntro } from "../components/transitions/FreezeGlitchIntro";
// import { SmashZoomIntro as TransitionIntro } from "../components/transitions/SmashZoomIntro";
import { SlamShakeIntro as TransitionIntro } from "../components/transitions/SlamShakeIntro";
import { CameraMove } from "../components/CameraMove";
import { COLORS } from "../constants";

// import { InvertCutIntro as TransitionIntro } from "../components/transitions/InvertCutIntro";

const StopContent: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// --- "STOP" — instant appear, no bounce ---
	const stopScale = frame < 1 ? 0 : 1;
	const stopOpacity = frame < 1 ? 0 : 1;
	// STOP fades out when message appears
	const stopFadeOut = interpolate(frame, [25, 35], [1, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	// --- Message words: appear one by one from below (same anim as TextInterlude) ---
	const MSG_WORDS = ["Stop", "wasting", "time", "on", "fonts"];
	const WORD_BASE_DELAY = 30;
	const WORD_STAGGER = 10;
	const WORD_ANIM_DURATION = 14;

	// --- Message line 2: "Use fonttrio" — spring "toss" ---
	const msg2Spring = spring({
		frame,
		fps,
		delay: 45,
		config: { damping: 14, stiffness: 50, mass: 0.2 },
	});
	const msg2Y = interpolate(msg2Spring, [0, 1], [50, 0]);
	const msg2Scale = interpolate(msg2Spring, [0, 1], [0.75, 1]);
	const msg2Opacity = interpolate(msg2Spring, [0, 0.3], [0, 1], {
		extrapolateRight: "clamp",
	});

	// --- White flash on STOP impact ---
	const flashOpacity = interpolate(frame, [0, 2, 6], [0.6, 0.3, 0], {
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bg,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{/* White flash */}
			<AbsoluteFill
				style={{
					backgroundColor: COLORS.black,
					opacity: flashOpacity,
				}}
			/>

			{/* STOP */}
			<div
				style={{
					position: "absolute",
					transform: `scale(${stopScale})`,
					opacity: stopOpacity * stopFadeOut,
					fontFamily: "'Manrope', sans-serif",
					fontSize: 200,
					fontWeight: 900,
					color: COLORS.text,
					letterSpacing: 12,
					textTransform: "uppercase",
				}}
			>
				FONTTRIO
			</div>

			{/* Message — word by word from below */}
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: "0 16px",
					maxWidth: 1000,
				}}
			>
				{MSG_WORDS.map((word, i) => {
					const enterFrame = WORD_BASE_DELAY + i * WORD_STAGGER;
					const localFrame = frame - enterFrame;

					if (localFrame < 0) return null;

					const progress = interpolate(
						localFrame,
						[0, WORD_ANIM_DURATION],
						[0, 1],
						{
							extrapolateRight: "clamp",
							easing: Easing.out(Easing.exp),
						},
					);

					const wordY = interpolate(progress, [0, 1], [40, 0]);
					const wordBlur = interpolate(progress, [0, 1], [10, 0]);
					const wordOpacity = interpolate(
						localFrame,
						[0, 3],
						[0, 1],
						{ extrapolateRight: "clamp" },
					);

					return (
						<div
							key={i}
							style={{
								transform: `translateY(${wordY}px)`,
								filter: wordBlur > 0.5 ? `blur(${wordBlur}px)` : undefined,
								opacity: wordOpacity,
								fontFamily: "'Manrope', sans-serif",
								fontSize: 64,
								fontWeight: 500,
								color: COLORS.textMuted,
								lineHeight: 1.4,
							}}
						>
							{word}
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

export const ExplosionScene: React.FC = () => {
	return (
		<CameraMove fromScale={1.1} toScale={1} fromY={-15} toY={15}>
		<TransitionIntro>
			<StopContent />
		</TransitionIntro>
		</CameraMove>
	);
};
