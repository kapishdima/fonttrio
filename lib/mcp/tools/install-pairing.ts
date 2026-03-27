import type { PairingItem } from "@/lib/registry";

export interface InstallPairingInput {
	name: string;
}

export interface InstallPairingResult {
	found: boolean;
	name: string;
	command?: string;
	title?: string;
	error?: string;
}

export function installPairing(
	getPairing: (name: string) => PairingItem | null,
	input: InstallPairingInput,
): InstallPairingResult {
	const { name } = input;

	// Try both with and without "pairing-" prefix
	const pairing = getPairing(`pairing-${name}`) || getPairing(name);

	if (!pairing) {
		return {
			found: false,
			name,
			error: `Pairing "${name}" not found. Use search_pairings to find available pairings.`,
		};
	}

	const pairingSlug = pairing.name.replace("pairing-", "");

	return {
		found: true,
		name: pairingSlug,
		title: pairing.title,
		command: `bunx shadcn@latest add https://www.fonttrio.xyz/r/${pairingSlug}.json`,
	};
}
