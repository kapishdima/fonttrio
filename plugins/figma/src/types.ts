// --- API response types ---

export interface PairingSummary {
	name: string;
	description: string;
	mood: string[];
	useCase: string[];
	heading: string;
	headingCategory: string;
	body: string;
	bodyCategory: string;
	mono: string;
	googleFontsUrl: string;
}

export interface FontDetail {
	family: string;
	import: string;
	weights: string[];
	category: string;
	variable: string;
}

export interface ScaleEntry {
	size: string;
	weight: number;
	lineHeight: string;
	letterSpacing?: string;
}

export interface EnrichedPairing {
	name: string;
	description: string;
	mood: string[];
	useCase: string[];
	heading: FontDetail;
	body: FontDetail;
	mono: FontDetail;
	scale: {
		h1: ScaleEntry;
		h2: ScaleEntry;
		h3: ScaleEntry;
		h4: ScaleEntry;
		h5: ScaleEntry;
		h6: ScaleEntry;
		body: ScaleEntry;
		code: ScaleEntry;
	};
	googleFontsUrl: string;
}

export interface PairingListResponse {
	pairings: PairingSummary[];
	total: number;
	limit: number;
	offset: number;
}

// --- Style mapping ---

export type FontRole = "heading" | "body" | "mono";

export interface StyleMapping {
	// Maps Figma TextStyle IDs to font roles
	[styleId: string]: FontRole;
}

export interface TextStyleInfo {
	id: string;
	name: string;
	fontFamily: string;
	fontSize: number;
}

// --- Plugin message types ---

export type UIToSandboxMessage =
	| { type: "apply-pairing"; pairing: EnrichedPairing }
	| { type: "save-mapping"; mapping: StyleMapping }
	| { type: "request-styles" }
	| { type: "request-mapping" }
	| { type: "clear-mapping" };

export type SandboxToUIMessage =
	| {
			type: "apply-success";
			pairingName: string;
			stylesUpdated: number;
			variablesCreated: number;
	  }
	| { type: "apply-error"; error: string }
	| { type: "text-styles"; styles: TextStyleInfo[] }
	| { type: "mapping-loaded"; mapping: StyleMapping | null }
	| { type: "mapping-saved" };
