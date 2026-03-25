import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { COLORS } from "../constants";

export const FontsShowcase: React.FC = () => {
	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
			<Video
				src={staticFile("fonts.mov")}
				style={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
				}}
			/>
		</AbsoluteFill>
	);
};
