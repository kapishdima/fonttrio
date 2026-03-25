import React from "react";
import {
	AbsoluteFill,
	Easing,
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";

export const PlaygroundScene2: React.FC = () => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	// Entrance
	const entranceOpacity = interpolate(frame, [0, 8], [0, 1], {
		extrapolateRight: "clamp",
	});

	// Exit: blur + fade + down
	const exitStart = durationInFrames - 15;
	const exitProgress = interpolate(
		frame,
		[exitStart, durationInFrames],
		[0, 1],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) },
	);
	const exitY = interpolate(exitProgress, [0, 1], [0, 60]);
	const exitBlur = interpolate(exitProgress, [0, 1], [0, 10]);
	const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

	return (
		<AbsoluteFill
			className="bg-black overflow-hidden"
			style={{
				transform: `translateY(${exitY}px)`,
				filter: exitBlur > 0.5 ? `blur(${exitBlur}px)` : undefined,
				opacity: entranceOpacity * exitOpacity,
			}}
		>
			<Video
				src={staticFile("live.mov")}
				style={{
					width: "100%",
					height: "100%",
					objectFit: "contain",
					objectPosition: "center top",
				}}
			/>
		</AbsoluteFill>
	);
};
