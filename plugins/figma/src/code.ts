import { applyPairingToMappedStyles } from "./lib/figma-styles";
import { createOrUpdateVariables } from "./lib/figma-variables";
import type {
	SandboxToUIMessage,
	StyleMapping,
	TextStyleInfo,
	UIToSandboxMessage,
} from "./types";

const PLUGIN_DATA_KEY = "fonttrio-mapping";

figma.showUI(__html__, {
	width: 420,
	height: 620,
	themeColors: true,
});

function postToUI(msg: SandboxToUIMessage) {
	figma.ui.postMessage(msg);
}

function saveMapping(mapping: StyleMapping) {
	figma.root.setPluginData(PLUGIN_DATA_KEY, JSON.stringify(mapping));
}

function loadMapping(): StyleMapping | null {
	const data = figma.root.getPluginData(PLUGIN_DATA_KEY);
	if (!data) return null;
	try {
		return JSON.parse(data) as StyleMapping;
	} catch (_e) {
		return null;
	}
}

async function getTextStyleInfos(): Promise<TextStyleInfo[]> {
	const styles = await figma.getLocalTextStylesAsync();
	return styles.map((s) => ({
		id: s.id,
		name: s.name,
		fontFamily: s.fontName.family,
		fontSize: s.fontSize as number,
	}));
}

figma.ui.onmessage = async (msg: UIToSandboxMessage) => {
	switch (msg.type) {
		case "request-styles": {
			const styles = await getTextStyleInfos();
			postToUI({ type: "text-styles", styles });
			break;
		}

		case "request-mapping": {
			const mapping = loadMapping();
			postToUI({ type: "mapping-loaded", mapping });
			break;
		}

		case "save-mapping": {
			saveMapping(msg.mapping);
			postToUI({ type: "mapping-saved" });
			break;
		}

		case "clear-mapping": {
			figma.root.setPluginData(PLUGIN_DATA_KEY, "");
			postToUI({ type: "mapping-loaded", mapping: null });
			break;
		}

		case "apply-pairing": {
			const mapping = loadMapping();
			if (!mapping || Object.keys(mapping).length === 0) {
				postToUI({
					type: "apply-error",
					error:
						"No style mapping configured. Go to Settings to map your text styles.",
				});
				return;
			}

			try {
				const stylesUpdated = await applyPairingToMappedStyles(
					msg.pairing,
					mapping,
				);
				const variablesCreated = await createOrUpdateVariables(msg.pairing);

				postToUI({
					type: "apply-success",
					pairingName: msg.pairing.name,
					stylesUpdated,
					variablesCreated,
				});

				figma.notify(
					`Applied "${msg.pairing.name}" — ${stylesUpdated} styles updated${variablesCreated > 0 ? `, ${variablesCreated} variables` : ""}`,
				);
			} catch (err) {
				console.error("[Fonttrio] applyPairing error:", err);
				postToUI({
					type: "apply-error",
					error: err instanceof Error ? err.message : "Unknown error",
				});
			}
			break;
		}
	}
};
