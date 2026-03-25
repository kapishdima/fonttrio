import "./index.css";
import { Composition } from "remotion";
import { FonttrioPromo } from "./Composition";
import { FPS, TOTAL_DURATION } from "./constants";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="FonttrioPromo"
				component={FonttrioPromo}
				durationInFrames={TOTAL_DURATION}
				fps={FPS}
				width={1920}
				height={1080}
			/>
		</>
	);
};
