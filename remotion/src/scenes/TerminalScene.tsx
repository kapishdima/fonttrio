import React from "react";
import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

interface Line {
	frame: number;
	text: string;
	color?: string;
	prefix?: string;
	prefixColor?: string;
	indent?: boolean;
}

const LINES: Line[] = [
	{ frame: 5, text: "bunx shadcn@latest add @fonttrio/editorial", prefix: "$", prefixColor: "#666" },
	{ frame: 40, text: "" }, // empty line
	{ frame: 45, text: "You are about to install a new style.", color: "#888" },
	{ frame: 65, text: "Existing CSS variables and components will be overwritten.", color: "#888" },
	{ frame: 85, text: "Continue? (y/N)" },
	{ frame: 100, text: "" }, // empty line
	{ frame: 108, text: "Checking registry.", prefix: "✔" },
	{ frame: 120, text: "Installing dependencies.", prefix: "✔" },
	{ frame: 132, text: "Updating src/styles.css", prefix: "✔" },
];

export const TerminalScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	// Entrance
	const entranceProgress = interpolate(frame, [0, 18], [0, 1], {
		extrapolateRight: "clamp",
		easing: EASE,
	});
	const entranceY = interpolate(entranceProgress, [0, 1], [30, 0]);
	const entranceBlur = interpolate(entranceProgress, [0, 1], [4, 0]);
	const entranceOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

	// "y" appears after Continue prompt
	const showY = frame >= 95;

	return (
		<AbsoluteFill className="bg-white flex items-center justify-center">
			<div
				style={{
					transform: `translateY(${entranceY}px)`,
					filter: entranceBlur > 0.3 ? `blur(${entranceBlur}px)` : undefined,
					opacity: entranceOpacity,
					width: 1100,
				}}
			>
				{/* Terminal window */}
				<div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden"
					style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
				>
					{/* Title bar */}
					<div className="flex items-center gap-2 px-5 h-12 border-b border-neutral-200 bg-neutral-50">
						<div className="size-3 rounded-full bg-neutral-300" />
						<div className="size-3 rounded-full bg-neutral-300" />
						<div className="size-3 rounded-full bg-neutral-300" />
						<div className="flex-1 text-center text-xs text-neutral-400 font-medium">
							Terminal
						</div>
					</div>

					{/* Content */}
					<div className="p-7 font-mono text-sm font-medium leading-8 min-h-[380px]">
						{LINES.map((line, i) => {
							if (frame < line.frame) return null;

							// Empty line
							if (!line.text) return <div key={i} className="h-3" />;

							// Typewriter effect
							const localFrame = frame - line.frame;
							const typeDuration = Math.max(15, line.text.length * 0.6);
							const charsToShow = Math.floor(
								interpolate(localFrame, [0, typeDuration], [0, line.text.length], {
									extrapolateRight: "clamp",
								})
							);
							const displayText = line.text.slice(0, charsToShow);
							const isTyping = charsToShow < line.text.length;

							// Cursor
							const cursorVisible = isTyping && frame % 16 < 10;

							return (
								<div key={i} className="flex items-center gap-2">
									{line.prefix && (
										<span style={{ color: line.prefixColor || "#000" }}>
											{line.prefix}
										</span>
									)}
									<span style={{ color: line.color || "#000" }}>
										{displayText}
										{/* "y" after Continue prompt */}
										{line.text === "Continue? (y/N)" && showY && (
											<span className="font-bold ml-1">y</span>
										)}
									</span>
									{cursorVisible && (
										<span className="text-neutral-400">█</span>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
