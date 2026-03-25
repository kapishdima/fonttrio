import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS } from "../constants";

export const HowItWorksShowcase: React.FC = () => {
	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
			<Img
				src={staticFile("howitswork.png")}
				style={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
				}}
			/>
		</AbsoluteFill>
	);
};
