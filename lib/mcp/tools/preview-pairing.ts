import type { PairingItem } from "@/lib/registry";

export interface PreviewPairingInput {
	name: string;
}

export interface PreviewPairingResult {
	found: boolean;
	name: string;
	title?: string;
	description?: string;
	headingFont?: string;
	bodyFont?: string;
	monoFont?: string;
	mood?: string[];
	useCase?: string[];
	categories?: string[];
	typographyScale?: Record<string, Record<string, string>>;
	installCommand?: string;
	error?: string;
}

export function previewPairing(
	getPairing: (name: string) => PairingItem | null,
	input: PreviewPairingInput,
): PreviewPairingResult {
	const { name } = input;

	const pairing = getPairing(`pairing-${name}`) || getPairing(name);

	if (!pairing) {
		return {
			found: false,
			name,
			error: `Pairing "${name}" not found. Use search_pairings to find available pairings.`,
		};
	}

	const pairingSlug = pairing.name.replace("pairing-", "");
	const theme = pairing.cssVars?.theme || {};

	return {
		found: true,
		name: pairingSlug,
		title: pairing.title,
		description: pairing.description,
		headingFont: theme["--font-heading"],
		bodyFont: theme["--font-body"],
		monoFont: theme["--font-mono"],
		mood: pairing.meta?.mood,
		useCase: pairing.meta?.useCase,
		categories: pairing.categories,
		typographyScale: pairing.css?.["@layer base"],
		installCommand: `bunx shadcn@latest add https://www.fonttrio.xyz/r/${pairingSlug}.json`,
	};
}
