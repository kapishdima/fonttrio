import React from "react";
import {
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

interface CameraMoveProps {
	children: React.ReactNode;
	/** Start scale, default 1 */
	fromScale?: number;
	/** End scale, default 1.1 */
	toScale?: number;
	/** Start X offset in px, default 0 */
	fromX?: number;
	/** End X offset in px, default 0 */
	toX?: number;
	/** Start Y offset in px, default 0 */
	fromY?: number;
	/** End Y offset in px, default 0 */
	toY?: number;
	/** Start rotation in deg, default 0 */
	fromRotate?: number;
	/** End rotation in deg, default 0 */
	toRotate?: number;
}

/**
 * Simulates smooth camera movement over the scene duration.
 * Wraps children and applies animated transform.
 */
export const CameraMove: React.FC<CameraMoveProps> = ({
	children,
	fromScale = 1,
	toScale = 1.1,
	fromX = 0,
	toX = 0,
	fromY = 0,
	toY = 0,
	fromRotate = 0,
	toRotate = 0,
}) => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
		easing: Easing.inOut(Easing.quad),
	});

	const scale = interpolate(progress, [0, 1], [fromScale, toScale]);
	const x = interpolate(progress, [0, 1], [fromX, toX]);
	const y = interpolate(progress, [0, 1], [fromY, toY]);
	const rotate = interpolate(progress, [0, 1], [fromRotate, toRotate]);

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				position: "absolute",
				top: 0,
				left: 0,
				overflow: "hidden",
				transform: `scale(${scale}) translate(${x}px, ${y}px) rotate(${rotate}deg)`,
				transformOrigin: "center center",
			}}
		>
			{children}
		</div>
	);
};
