import React from "react";
import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { PAIRINGS } from "../data/pairings";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

// 4 rows, each offset so cards don't align vertically
const ROW_COUNT = 4;
const CARDS_PER_ROW = 8;
const CARD_WIDTH = 340;
const CARD_HEIGHT = 160;
const CARD_GAP = 14;
const ROW_GAP = 14;

// Build rows with different starting offsets for variety
function buildRow(rowIndex: number) {
	const offset = rowIndex * 2; // shift which pairing starts the row
	const cards = [];
	for (let i = 0; i < CARDS_PER_ROW; i++) {
		cards.push(PAIRINGS[(i + offset) % PAIRINGS.length]);
	}
	return cards;
}

const ROWS = Array.from({ length: ROW_COUNT }, (_, i) => buildRow(i));

export const BestPairsScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	// Exit: camera goes down + blur + fade — last 20 frames
	const exitStart = durationInFrames - 20;
	const exitProgress = interpolate(
		frame,
		[exitStart, durationInFrames],
		[0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) },
	);
	const exitY = interpolate(exitProgress, [0, 1], [0, 120]);
	const exitBlur = interpolate(exitProgress, [0, 1], [0, 12]);
	const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

	// Total strip width
	const stripWidth = CARDS_PER_ROW * (CARD_WIDTH + CARD_GAP);

	return (
		<AbsoluteFill
			className="bg-white overflow-hidden"
			style={{
				transform: `scale(1.6) translateY(${exitY}px)`,
				transformOrigin: "center center",
				filter: exitBlur > 0.5 ? `blur(${exitBlur}px)` : undefined,
				opacity: exitOpacity,
			}}
		>
			{/* 4 rows stacked vertically, each scrolling at different speeds */}
			<div
				className="absolute inset-0 flex flex-col justify-center"
				style={{ gap: ROW_GAP }}
			>
				{ROWS.map((row, rowIdx) => {
					// Alternate direction: even rows scroll left, odd scroll right
					const direction = rowIdx % 2 === 0 ? -1 : 1;
					// Different speeds per row — accelerating
					const speed = 0.6 + rowIdx * 0.15;
					const scrollProgress = interpolate(
						frame,
						[0, durationInFrames],
						[0, 1],
						{ extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) },
					);
					const scrollX = direction * scrollProgress * stripWidth * speed * 0.3;
					// Start offset so rows don't all start at same position
					const startOffset = rowIdx % 2 === 0 ? 0 : -(CARD_WIDTH * 0.5);

					return (
						<div
							key={rowIdx}
							className="flex shrink-0"
							style={{
								gap: CARD_GAP,
								transform: `translateX(${startOffset + scrollX}px)`,
							}}
						>
							{row.map((pairing, i) => {
								const delay = 2 + rowIdx * 3 + i * 2;
								const progress = interpolate(
									frame,
									[delay, delay + 10],
									[0, 1],
									{ extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
								);
								const cardY = interpolate(progress, [0, 1], [20, 0]);
								const cardOpacity = interpolate(frame, [delay, delay + 4], [0, 1], {
									extrapolateLeft: "clamp",
									extrapolateRight: "clamp",
								});

								return (
									<div
										key={`${pairing.name}-${rowIdx}-${i}`}
										className="flex flex-col rounded-xl border border-neutral-200 bg-white overflow-hidden shrink-0"
										style={{
											width: CARD_WIDTH,
											minHeight: CARD_HEIGHT,
											transform: `translateY(${cardY}px)`,
											opacity: cardOpacity,
										}}
									>
										<div className="flex-1 px-5 py-4 flex flex-col gap-1.5">
											<p
												className="text-xl text-neutral-800 truncate font-extrabold"
												style={{ fontFamily: pairing.headingFamily }}
											>
												{pairing.heading}
											</p>
											<p
												className="text-xs text-neutral-600 line-clamp-2 font-medium leading-normal"
												style={{ fontFamily: pairing.bodyFamily }}
											>
												{pairing.mood}
											</p>
										</div>
										<div className="w-full flex items-center px-5 py-2.5 border-t border-neutral-200 bg-neutral-50">
											<code
												className="flex-1 truncate text-neutral-500 font-medium text-[10px]"
												style={{ fontFamily: pairing.monoFamily }}
											>
												pnpm dlx shadcn@latest add @fonttrio/{pairing.name}
											</code>
										</div>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
