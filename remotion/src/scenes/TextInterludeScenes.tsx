import React from "react";
import { TextInterlude } from "../components/TextInterlude";

/** "Curated font pairings" — words accumulate */
export const Interlude0: React.FC = () => (
	<TextInterlude
		words={[
			{ text: "Stop", enterFrame: 0 },
			{ text: "wasting", enterFrame: 10 },
			{ text: "time", enterFrame: 20 },
			{ text: "on", enterFrame: 30 },
			{ text: "fonts", enterFrame: 40 },
		]}
	/>
);

export const Interlude1: React.FC = () => (
	<TextInterlude
		words={[
			{ text: "Curated", enterFrame: 0 },
			{ text: "font", enterFrame: 10 },
			{ text: "pairings", enterFrame: 20 },
		]}
	/>
);

/** "for shadcn/ui" */
export const Interlude2: React.FC = () => (
	<TextInterlude
		words={[
			{ text: "for", enterFrame: 0 },
			{ text: "shadcn/ui", enterFrame: 8 },
		]}
	/>
);

/** "Three fonts." / "One command." — stacked */
export const Interlude3: React.FC = () => (
	<TextInterlude
		layout="stack"
		words={[
			{ text: "Three fonts", enterFrame: 0 },
			{ text: "One command", enterFrame: 12 },
		]}
	/>
);

/** "How it works" — section title interlude */
export const InterludeHowItWorks: React.FC = () => (
	<TextInterlude
		fontSize={110}
		words={[
			{ text: "How", enterFrame: 0 },
			{ text: "it", enterFrame: 8 },
			{ text: "works", enterFrame: 16 },
		]}
	/>
);

/** "Best pairs" — section title interlude */
export const InterludeBestPairs: React.FC = () => (
	<TextInterlude
		fontSize={110}
		words={[
			{ text: "Best", enterFrame: 0 },
			{ text: "pairs", enterFrame: 10 },
		]}
	/>
);

/** "See it live" — before playground */
export const InterludePlayground: React.FC = () => (
	<TextInterlude
		fontSize={110}
		words={[
			{ text: "See", enterFrame: 0 },
			{ text: "it", enterFrame: 8 },
			{ text: "live", enterFrame: 16 },
		]}
	/>
);

/** "AI-powered" */
export const InterludeAI1: React.FC = () => (
	<TextInterlude
		fontSize={110}
		words={[{ text: "AI-powered", enterFrame: 0 }]}
	/>
);

/** "Skills. MCP. Automation." */
export const InterludeAI2: React.FC = () => (
	<TextInterlude
		fontSize={100}
		words={[
			{ text: "Skills.", enterFrame: 0 },
			{ text: "MCP.", enterFrame: 10 },
			{ text: "Automation", enterFrame: 20 },
		]}
	/>
);
