import type { EnrichedPairing, FontRole, StyleMapping } from "../types";

function getFontFamily(pairing: EnrichedPairing, role: FontRole): string {
	switch (role) {
		case "heading":
			return pairing.heading.family;
		case "body":
			return pairing.body.family;
		case "mono":
			return pairing.mono.family;
	}
}

export async function applyPairingToMappedStyles(
	pairing: EnrichedPairing,
	mapping: StyleMapping,
): Promise<number> {
	// Step 1: Resolve all styles and their target fonts
	const tasks: { style: TextStyle; family: string; currentStyle: string }[] =
		[];

	await Promise.all(
		Object.entries(mapping).map(async ([styleId, role]) => {
			const style = (await figma.getStyleByIdAsync(
				styleId,
			)) as TextStyle | null;
			if (!style) return;
			tasks.push({
				style,
				family: getFontFamily(pairing, role),
				currentStyle: (style.fontName as FontName).style,
			});
		}),
	);

	// Step 2: Collect unique font+style combos to load
	const fontsToLoad = new Set<string>();
	for (const t of tasks) {
		fontsToLoad.add(`${t.family}::${t.currentStyle}`);
		fontsToLoad.add(`${t.family}::Regular`);
	}

	// Step 3: Load all fonts in parallel
	const loadResults = new Map<string, boolean>();
	await Promise.all(
		Array.from(fontsToLoad).map(async (key) => {
			const [family, style] = key.split("::");
			try {
				await figma.loadFontAsync({ family, style });
				loadResults.set(key, true);
			} catch (_e) {
				loadResults.set(key, false);
			}
		}),
	);

	// Step 4: Apply all font changes (synchronous, fast)
	let updated = 0;
	for (const t of tasks) {
		const preferredKey = `${t.family}::${t.currentStyle}`;
		const fallbackKey = `${t.family}::Regular`;

		if (loadResults.get(preferredKey)) {
			t.style.fontName = { family: t.family, style: t.currentStyle };
			updated++;
		} else if (loadResults.get(fallbackKey)) {
			t.style.fontName = { family: t.family, style: "Regular" };
			updated++;
		} else {
			console.error(`Failed to load font: ${t.family} ${t.currentStyle}`);
		}
	}

	return updated;
}
