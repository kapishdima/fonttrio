import { Audio } from "@remotion/media";
import React from "react";
import {
	AbsoluteFill,
	Easing,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { CameraMove } from "../components/CameraMove";
import { DotPattern } from "../components/DotPattern";
import { COLORS } from "../constants";
import { ROULETTE_FONTS } from "../data/pairings";
import { CHIP_LAY_1_SOUND } from "../data/sounds";

/**
 * Build a schedule of ~50 fonts with accelerating display durations.
 */
function buildSchedule(totalFonts: number) {
	const schedule: {
		startFrame: number;
		duration: number;
		fontIndex: number;
	}[] = [];
	let frame = 0;

	for (let i = 0; i < totalFonts; i++) {
		const progress = i / (totalFonts - 1);
		const duration = Math.max(
			2,
			Math.round(7 * Math.pow(1 - progress, 0.9) + 2),
		);
		schedule.push({ startFrame: frame, duration, fontIndex: i });
		frame += duration;
	}

	return schedule;
}

const SCHEDULE = buildSchedule(ROULETTE_FONTS.length);
const ROULETTE_END =
	SCHEDULE[SCHEDULE.length - 1].startFrame +
	SCHEDULE[SCHEDULE.length - 1].duration;

// Slot config
const SLOT_GAP = 120;
const VISIBLE_SLOTS = 5;

// Per-slot visual config (offset from center)
const SLOT_STYLES: Record<
	number,
	{ opacity: number; scale: number; blur: number; fontSize: number }
> = {
	[-2]: { opacity: 0.1, scale: 0.7, blur: 5, fontSize: 60 },
	[-1]: { opacity: 0.25, scale: 0.85, blur: 2, fontSize: 80 },
	[0]: { opacity: 1, scale: 1, blur: 0, fontSize: 110 },
	[1]: { opacity: 0.25, scale: 0.85, blur: 2, fontSize: 80 },
	[2]: { opacity: 0.1, scale: 0.7, blur: 5, fontSize: 60 },
};

export const FontRouletteScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Find current font index based on schedule
	let currentIdx = 0;
	let localFrame = 0;
	for (let i = SCHEDULE.length - 1; i >= 0; i--) {
		if (frame >= SCHEDULE[i].startFrame) {
			currentIdx = SCHEDULE[i].fontIndex;
			localFrame = frame - SCHEDULE[i].startFrame;
			break;
		}
	}

	// Spring for the slot transition (vertical slide)
	const slideProgress = spring({
		frame: localFrame,
		fps,
		config: {
			damping: 18,
			stiffness: 300,
			mass: 0.5,
		},
	});

	// Residual Y from spring (slight overshoot then settle)
	const springY = interpolate(slideProgress, [0, 1], [-SLOT_GAP * 0.3, 0]);

	// After roulette ends: slot machine fades out, "Fonttrio" appears
	const isFinale = frame >= ROULETTE_END;
	const finaleFrame = frame - ROULETTE_END;

	// Slot machine exit
	const slotExitProgress = interpolate(
		frame,
		[ROULETTE_END, ROULETTE_END + 8],
		[0, 1],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing: Easing.out(Easing.quad),
		},
	);
	const exitY = interpolate(slotExitProgress, [0, 1], [0, 40]);
	const exitBlur = interpolate(slotExitProgress, [0, 1], [0, 8]);
	const exitOpacity = interpolate(slotExitProgress, [0, 1], [1, 0]);

	// "Fonttrio" entrance
	const fProgress = interpolate(
		frame,
		[ROULETTE_END + 4, ROULETTE_END + 18],
		[0, 1],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing: Easing.bezier(0.16, 1, 0.3, 1),
		},
	);
	const fEntranceBlur = interpolate(fProgress, [0, 1], [10, 0]);
	const fEntranceY = interpolate(fProgress, [0, 1], [30, 0]);
	const fEntranceOpacity = interpolate(
		frame,
		[ROULETTE_END + 4, ROULETTE_END + 10],
		[0, 1],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		},
	);

	// "Fonttrio" exit — last 10 frames: goes down + blur + fade out
	const fExitStart = durationInFrames - 10;
	const fExitProgress = interpolate(
		frame,
		[fExitStart, durationInFrames],
		[0, 1],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			easing: Easing.in(Easing.quad),
		},
	);
	const fExitY = interpolate(fExitProgress, [0, 1], [0, 40]);
	const fExitBlur = interpolate(fExitProgress, [0, 1], [0, 10]);
	const fExitOpacity = interpolate(fExitProgress, [0, 1], [1, 0]);

	// Combined
	const fY = fEntranceY + fExitY;
	const fBlur = fEntranceBlur + fExitBlur;
	const fOpacity = fEntranceOpacity * fExitOpacity;

	// Render 5 visible slots around currentIdx
	const slots: { offset: number; fontIndex: number }[] = [];
	for (let offset = -2; offset <= 2; offset++) {
		const idx = currentIdx + offset;
		if (idx >= 0 && idx < ROULETTE_FONTS.length) {
			slots.push({ offset, fontIndex: idx });
		}
	}

	return (
		<CameraMove
			fromScale={1}
			toScale={1.12}
			fromX={0}
			toX={-15}
			fromY={10}
			toY={-10}
		>
			<AbsoluteFill
				style={{
					backgroundColor: COLORS.bg,
				}}
			>
				<DotPattern />

				{/* Click sound on each font switch */}
				{/* {SCHEDULE.map((entry) => (
				<Sequence
					key={entry.fontIndex}
					from={entry.startFrame}
					durationInFrames={Math.max(entry.duration, 6)}
					layout="none"
				>
					<Audio src={CHIP_LAY_1_SOUND} volume={1} />
				</Sequence>
			))} */}

				{/* Slot machine container — centered, clipped */}
				<AbsoluteFill
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						overflow: "hidden",
						transform: `translateY(${exitY}px)`,
						filter: exitBlur > 0.5 ? `blur(${exitBlur}px)` : undefined,
						opacity: exitOpacity,
					}}
				>
					<div
						style={{
							position: "relative",
							width: 1400,
							height: SLOT_GAP * VISIBLE_SLOTS,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{slots.map(({ offset, fontIndex }) => {
							const font = ROULETTE_FONTS[fontIndex];
							const style = SLOT_STYLES[offset] ?? SLOT_STYLES[0];

							const y = offset * SLOT_GAP + springY;

							return (
								<div
									key={fontIndex}
									style={{
										position: "absolute",
										transform: `translateY(${y}px) scale(${style.scale})`,
										opacity: style.opacity,
										filter:
											style.blur > 0 ? `blur(${style.blur}px)` : undefined,
										fontFamily: font.family,
										fontSize: style.fontSize,
										fontWeight: 700,
										color: COLORS.text,
										textAlign: "center",
										whiteSpace: "nowrap",
										lineHeight: 1.1,
									}}
								>
									{font.name}
								</div>
							);
						})}
					</div>
				</AbsoluteFill>
				{/* "Fonttrio" reveal after roulette ends */}
				{isFinale && (
					<AbsoluteFill
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div
							style={{
								transform: `translateY(${fY}px)`,
								filter: fBlur > 0.5 ? `blur(${fBlur}px)` : undefined,
								opacity: fOpacity,
								fontFamily: "'Manrope', sans-serif",
								fontSize: 130,
								fontWeight: 800,
								color: COLORS.text,
								letterSpacing: -3,
							}}
						>
							Fonttrio
						</div>
					</AbsoluteFill>
				)}
			</AbsoluteFill>
		</CameraMove>
	);
};
