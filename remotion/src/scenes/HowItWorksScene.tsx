import React from "react";
import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
} from "remotion";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const EASE2 = Easing.bezier(0.23, 1, 0.32, 1);

const CARD_DURATION = 40;
const SLIDE_DURATION = 12;
const CARD_WIDTH = 520;
const CARD_GAP = 24;
const CARD_HEIGHT = 530;

function lineAnim(frame: number, delay: number) {
	const progress = interpolate(frame, [delay, delay + 12], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: EASE2,
	});
	return {
		y: interpolate(progress, [0, 1], [8, 0]),
		opacity: interpolate(frame, [delay, delay + 4], [0, 1], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		}),
	};
}

function termLineAnim(frame: number, delay: number) {
	const progress = interpolate(frame, [delay, delay + 10], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: EASE2,
	});
	return {
		x: interpolate(progress, [0, 1], [-6, 0]),
		opacity: interpolate(frame, [delay, delay + 4], [0, 1], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		}),
	};
}

export const HowItWorksScene: React.FC = () => {
	const frame = useCurrentFrame();

	// Title entrance
	const titleProgress = interpolate(frame, [0, 18], [0, 1], {
		extrapolateRight: "clamp",
		easing: EASE,
	});
	const titleY = interpolate(titleProgress, [0, 1], [20, 0]);
	const titleBlur = interpolate(titleProgress, [0, 1], [4, 0]);
	const titleOpacity = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

	// Camera: pan right + zoom in toward cards
	const step = CARD_WIDTH + CARD_GAP;
	const scrollX = interpolate(
		frame,
		[
			0,
			CARD_DURATION - SLIDE_DURATION,
			CARD_DURATION,
			CARD_DURATION * 2 - SLIDE_DURATION,
			CARD_DURATION * 2,
		],
		[0, 0, -step, -step, -step * 2],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
	);

	const zoom = 1.3;

	return (
		<AbsoluteFill
			className="bg-white overflow-hidden"
			style={{
				transform: `scale(${zoom})`,
				transformOrigin: "center center",
			}}
		>
			{/* Cards strip — 3 cards side by side, camera pans + zooms */}
			<div
				className="absolute flex items-start gap-6"
				style={{
					left: "50%",
					top: "50%",
					marginLeft: -(CARD_WIDTH / 2),
					marginTop: -(CARD_HEIGHT / 2) + 20,
					transform: `translateX(${scrollX}px)`,
				}}
			>
				<Card1 frame={frame} />
				<Card2 frame={Math.max(0, frame - CARD_DURATION + SLIDE_DURATION)} />
				<Card3 frame={Math.max(0, frame - CARD_DURATION * 2 + SLIDE_DURATION)} />
			</div>
		</AbsoluteFill>
	);
};

/** Card 1 — Browse curated pairs */
const Card1: React.FC<{ frame: number }> = ({ frame }) => {
	const entrance = interpolate(frame, [5, 20], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: EASE,
	});
	const y = interpolate(entrance, [0, 1], [40, 0]);
	const blur = interpolate(entrance, [0, 1], [4, 0]);
	const opacity = interpolate(frame, [5, 10], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<div
			className="flex flex-col items-start gap-y-5 rounded-2xl bg-white border border-neutral-200 px-7 py-7 overflow-hidden shrink-0"
			style={{
				width: CARD_WIDTH,
				height: CARD_HEIGHT,
				transform: `translateY(${y}px)`,
				filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
				opacity,
			}}
		>
			<span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
				01
			</span>
			<div className="w-full flex-1 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center">
				<span
					className="text-8xl text-neutral-900"
					style={{ fontFamily: "'Playfair Display', serif" }}
				>
					Aa
				</span>
			</div>
			<h3 className="text-2xl text-neutral-900 font-semibold tracking-tight leading-snug">
				Browse curated pairs
			</h3>
			<p className="text-sm text-neutral-500 leading-relaxed -mt-3">
				Hand-picked heading, body, and mono combinations tested for
				contrast, rhythm, and legibility across every size.
			</p>
		</div>
	);
};

/** Card 2 — Preview with your content */
const Card2: React.FC<{ frame: number }> = ({ frame }) => {
	const entrance = interpolate(frame, [0, 15], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: EASE,
	});
	const y = interpolate(entrance, [0, 1], [40, 0]);
	const blur = interpolate(entrance, [0, 1], [4, 0]);
	const opacity = interpolate(frame, [0, 5], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<div
			className="flex flex-col items-start gap-y-5 rounded-2xl bg-white border border-neutral-200 px-7 py-7 overflow-hidden shrink-0"
			style={{
				width: CARD_WIDTH,
				height: CARD_HEIGHT,
				transform: `translateY(${y}px)`,
				filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
				opacity,
			}}
		>
			<span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
				02
			</span>
			<h3 className="text-2xl text-neutral-900 font-semibold tracking-tight leading-snug">
				Preview with your content
			</h3>
			<p className="text-sm text-neutral-500 leading-relaxed -mt-3">
				See headings, body copy, and code blocks rendered side by side
				before committing to a pair.
			</p>
			<div className="w-full flex-1 rounded-xl bg-neutral-50 border border-neutral-200 overflow-hidden">
				<div className="flex items-center gap-1.5 px-4 h-9 border-b border-neutral-200 bg-neutral-100/80">
					<div className="size-2 rounded-full bg-red-400" />
					<div className="size-2 rounded-full bg-yellow-400" />
					<div className="size-2 rounded-full bg-green-400" />
					<div className="flex-1 mx-3 h-4 rounded-full bg-neutral-200" />
				</div>
				<div className="p-4">
					{(() => {
						const l1 = lineAnim(frame, 4);
						const l2 = lineAnim(frame, 9);
						const l3 = lineAnim(frame, 14);
						return (
							<>
								<p
									className="text-2xl font-bold text-neutral-900 tracking-tight"
									style={{ transform: `translateY(${l1.y}px)`, opacity: l1.opacity }}
								>
									The quick fox
								</p>
								<p
									className="text-xs text-neutral-500 mt-1 leading-relaxed"
									style={{ transform: `translateY(${l2.y}px)`, opacity: l2.opacity }}
								>
									Typography defines the voice of your content. Choose a pair that speaks for your brand.
								</p>
								<p
									className="text-xs font-medium p-2 rounded-md mt-2 bg-neutral-200/50 text-neutral-800"
									style={{ transform: `translateY(${l3.y}px)`, opacity: l3.opacity }}
								>
									bun shadcn@latest add @fonttrio/editorial
								</p>
							</>
						);
					})()}
				</div>
			</div>
		</div>
	);
};

/** Card 3 — Install with one command */
const Card3: React.FC<{ frame: number }> = ({ frame }) => {
	const entrance = interpolate(frame, [0, 15], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: EASE,
	});
	const y = interpolate(entrance, [0, 1], [40, 0]);
	const blur = interpolate(entrance, [0, 1], [4, 0]);
	const opacity = interpolate(frame, [0, 5], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<div
			className="flex flex-col items-start gap-y-5 rounded-2xl bg-white border border-neutral-200 px-7 py-7 overflow-hidden shrink-0"
			style={{
				width: CARD_WIDTH,
				height: CARD_HEIGHT,
				transform: `translateY(${y}px)`,
				filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
				opacity,
			}}
		>
			<span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
				03
			</span>
			<div className="w-full flex-1 rounded-xl bg-neutral-50 border border-neutral-200 overflow-hidden">
				<div className="flex items-center gap-1.5 px-4 h-9 border-b border-neutral-200 bg-neutral-100/80">
					<div className="size-2 rounded-full bg-red-400" />
					<div className="size-2 rounded-full bg-yellow-400" />
					<div className="size-2 rounded-full bg-green-400" />
				</div>
				<div className="p-4 text-xs font-semibold tracking-tight space-y-1.5">
					{(() => {
						const lines = [
							{ delay: 4, content: <><span className="text-emerald-700">$</span> bunx shadcn@latest add @fonttrio/editorial</> },
							{ delay: 11, content: <span className="text-amber-700 leading-relaxed">You are about to install a new style. Continue? <span className="text-neutral-400">(y/N)</span></span> },
							{ delay: 18, content: <><span className="text-emerald-700 mr-1">✔</span>Checking registry.</> },
							{ delay: 25, content: <><span className="text-emerald-700 mr-1">✔</span>Installing dependencies.</> },
							{ delay: 32, content: <><span className="text-emerald-700 mr-1">✔</span>Updating <span className="text-blue-600">src/styles.css</span></> },
						];
						return lines.map((line, j) => {
							const a = termLineAnim(frame, line.delay);
							return (
								<p
									key={j}
									className="text-neutral-700"
									style={{ transform: `translateX(${a.x}px)`, opacity: a.opacity }}
								>
									{line.content}
								</p>
							);
						});
					})()}
				</div>
			</div>
			<h3 className="text-2xl text-neutral-900 font-semibold tracking-tight leading-snug">
				Install with one command
			</h3>
			<p className="text-sm text-neutral-500 leading-relaxed -mt-3">
				One shadcn command adds fonts, CSS variables, and a full typography
				scale. Nothing manual — everything configured.
			</p>
		</div>
	);
};
