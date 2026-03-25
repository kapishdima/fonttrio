import { Audio } from "@remotion/media";
import {
	linearTiming,
	springTiming,
	TransitionSeries,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile } from "remotion";
import { COLORS, SCENES, TOTAL_DURATION } from "./constants";

// Import all fonts (side-effect: loads them)
import "./fonts";

import { BestPairsScene } from "./scenes/BestPairsScene";
// Scenes
import { FontRouletteScene } from "./scenes/FontRouletteScene";
import { IntroScene } from "./scenes/IntroScene";
import { HowItWorksScene } from "./scenes/HowItWorksScene";
import { OutroScene } from "./scenes/OutroScene";
import { PlaygroundScene2 } from "./scenes/PlaygroundScene2";
import { TerminalScene } from "./scenes/TerminalScene";
import {
	Interlude1,
	Interlude2,
	Interlude3,
	InterludeAI1,
	InterludeAI2,
	InterludeBestPairs,
	InterludeHowItWorks,
	InterludePlayground,
} from "./scenes/TextInterludeScenes";

const CUT = 2;

export const FonttrioPromo: React.FC = () => {
	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
			{/* Background music — starts after search click (frame 55 of intro) */}
			<Sequence from={55} layout="none">
				<Audio
					src={staticFile("sound.mp3")}
					trimBefore={10 * 30}
					volume={(f) =>
						interpolate(
							f,
							[0, 75, TOTAL_DURATION - 55 - 150, TOTAL_DURATION - 55],
							[0, 0.5, 0.5, 0],
							{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
						)
					}
				/>
			</Sequence>

			<TransitionSeries>
				{/* === ACT 0: Intro === */}

				<TransitionSeries.Sequence durationInFrames={SCENES.intro}>
					<IntroScene />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: CUT })}
				/>

				{/* === ACT 1: Font Roulette → Interludes === */}

				<TransitionSeries.Sequence durationInFrames={SCENES.fontRoulette}>
					<FontRouletteScene />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: 1 })}
				/>

				<TransitionSeries.Sequence durationInFrames={SCENES.interlude1}>
					<Interlude1 />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: 3 })}
				/>

				<TransitionSeries.Sequence durationInFrames={SCENES.interlude2}>
					<Interlude2 />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: 3 })}
				/>

				<TransitionSeries.Sequence durationInFrames={SCENES.interlude3}>
					<Interlude3 />
				</TransitionSeries.Sequence>

				{/* === ACT 2: How it works === */}

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: CUT })}
				/>

				{/* "How it works" title interlude */}
				<TransitionSeries.Sequence
					durationInFrames={SCENES.interludeHowItWorks}
				>
					<InterludeHowItWorks />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: CUT })}
				/>

				{/* How it works cards */}
				<TransitionSeries.Sequence durationInFrames={SCENES.howItWorks}>
					<HowItWorksScene />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: CUT })}
				/>

				{/* "Best pairs" title interlude */}
				<TransitionSeries.Sequence durationInFrames={SCENES.interludeBestPairs}>
					<InterludeBestPairs />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: CUT })}
				/>

				{/* Best pairs cards */}
				<TransitionSeries.Sequence durationInFrames={SCENES.bestPairs}>
					<BestPairsScene />
				</TransitionSeries.Sequence>

				{/* === ACT 3: Playground === */}

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: CUT })}
				/>

				<TransitionSeries.Sequence
					durationInFrames={SCENES.interludePlayground}
				>
					<InterludePlayground />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: CUT })}
				/>

				<TransitionSeries.Sequence durationInFrames={SCENES.playground}>
					<PlaygroundScene2 />
				</TransitionSeries.Sequence>

				{/* === ACT 4: AI interludes === */}

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: CUT })}
				/>

				<TransitionSeries.Sequence durationInFrames={SCENES.interludeAI1}>
					<InterludeAI1 />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: 3 })}
				/>

				<TransitionSeries.Sequence durationInFrames={SCENES.interludeAI2}>
					<InterludeAI2 />
				</TransitionSeries.Sequence>

				{/* === ACT 5: Terminal + Outro === */}

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: CUT })}
				/>

				<TransitionSeries.Sequence durationInFrames={SCENES.terminal}>
					<TerminalScene />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					presentation={fade()}
					timing={linearTiming({ durationInFrames: CUT })}
				/>

				<TransitionSeries.Sequence durationInFrames={SCENES.outro}>
					<OutroScene />
				</TransitionSeries.Sequence>
			</TransitionSeries>
		</AbsoluteFill>
	);
};
