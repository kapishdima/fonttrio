import type { EnrichedPairing } from "../types";

const COLLECTION_NAME = "Fonttrio Typography";
const BASE_PX = 16;

function parseToNumber(value: string): number {
	if (value.endsWith("rem")) return parseFloat(value) * BASE_PX;
	if (value.endsWith("px")) return parseFloat(value);
	if (value.endsWith("em")) return parseFloat(value) * 100;
	if (value.endsWith("%")) return parseFloat(value);
	return parseFloat(value);
}

async function getOrCreateCollection(): Promise<{
	collection: VariableCollection;
	modeId: string;
	existingVars: Map<string, Variable>;
}> {
	const collections = await figma.variables.getLocalVariableCollectionsAsync();
	let collection = collections.find((c) => c.name === COLLECTION_NAME);

	const existingVars = new Map<string, Variable>();

	if (collection) {
		// Load existing variables into a map by name
		for (const varId of collection.variableIds) {
			const v = await figma.variables.getVariableByIdAsync(varId);
			if (v) existingVars.set(v.name, v);
		}
	} else {
		collection = figma.variables.createVariableCollection(COLLECTION_NAME);
	}

	const modeId = collection.modes[0].modeId;
	return { collection, modeId, existingVars };
}

interface VariableDef {
	name: string;
	type: "FLOAT" | "STRING";
	value: number | string;
}

function buildVariableDefs(pairing: EnrichedPairing): VariableDef[] {
	const { heading, body, mono, scale } = pairing;
	const defs: VariableDef[] = [];

	defs.push({ name: "font-heading", type: "STRING", value: heading.family });
	defs.push({ name: "font-body", type: "STRING", value: body.family });
	defs.push({ name: "font-mono", type: "STRING", value: mono.family });

	const levels = ["h1", "h2", "h3", "h4", "h5", "h6", "body", "code"] as const;

	for (const level of levels) {
		const entry = scale[level];
		defs.push({
			name: `${level}-font-size`,
			type: "FLOAT",
			value: parseToNumber(entry.size),
		});
		defs.push({
			name: `${level}-line-height`,
			type: "FLOAT",
			value: parseToNumber(entry.lineHeight),
		});
		defs.push({
			name: `${level}-font-weight`,
			type: "FLOAT",
			value: entry.weight,
		});

		if ("letterSpacing" in entry && entry.letterSpacing) {
			defs.push({
				name: `${level}-letter-spacing`,
				type: "FLOAT",
				value: parseToNumber(entry.letterSpacing),
			});
		}
	}

	return defs;
}

export async function createOrUpdateVariables(
	pairing: EnrichedPairing,
): Promise<number> {
	if (!figma.variables) return 0;

	const { collection, modeId, existingVars } = await getOrCreateCollection();
	const defs = buildVariableDefs(pairing);
	let count = 0;

	for (const def of defs) {
		const resolvedType = def.type === "STRING" ? "STRING" : "FLOAT";
		// Reuse existing variable or create new one
		const variable =
			existingVars.get(def.name) ||
			figma.variables.createVariable(def.name, collection, resolvedType);
		variable.setValueForMode(modeId, def.value);
		count++;
	}

	return count;
}
