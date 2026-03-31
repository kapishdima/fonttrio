import { useCallback, useEffect, useState } from "react";
import type {
	EnrichedPairing,
	SandboxToUIMessage,
	StyleMapping,
	TextStyleInfo,
	UIToSandboxMessage,
} from "../../types";

function postMessage(msg: UIToSandboxMessage) {
	parent.postMessage({ pluginMessage: msg }, "*");
}

interface ApplyState {
	applying: boolean;
	status: string | null;
}

export function useFigmaMessaging() {
	const [mapping, setMapping] = useState<StyleMapping | null>(null);
	const [textStyles, setTextStyles] = useState<TextStyleInfo[]>([]);
	const [mappingReady, setMappingReady] = useState(false);
	const [applyState, setApplyState] = useState<ApplyState>({
		applying: false,
		status: null,
	});

	useEffect(() => {
		postMessage({ type: "request-mapping" });
		postMessage({ type: "request-styles" });
	}, []);

	useEffect(() => {
		const handler = (event: MessageEvent) => {
			const msg = event.data.pluginMessage as SandboxToUIMessage;
			if (!msg) return;

			switch (msg.type) {
				case "mapping-loaded":
					setMapping(msg.mapping);
					setMappingReady(true);
					break;
				case "text-styles":
					setTextStyles(msg.styles);
					break;
				case "mapping-saved":
					break;
				case "apply-success":
					setApplyState({
						applying: false,
						status: `Applied "${msg.pairingName}" — ${msg.stylesUpdated} styles updated`,
					});
					break;
				case "apply-error":
					setApplyState({
						applying: false,
						status: `Error: ${msg.error}`,
					});
					break;
			}
		};
		window.addEventListener("message", handler);
		return () => window.removeEventListener("message", handler);
	}, []);

	const clearStatus = useCallback(() => {
		setApplyState((prev) => ({ ...prev, status: null }));
	}, []);

	const saveMapping = useCallback((newMapping: StyleMapping) => {
		setMapping(newMapping);
		postMessage({ type: "save-mapping", mapping: newMapping });
	}, []);

	const requestStyles = useCallback(() => {
		postMessage({ type: "request-styles" });
	}, []);

	const applyPairing = useCallback((pairing: EnrichedPairing) => {
		setApplyState({ applying: true, status: null });
		postMessage({ type: "apply-pairing", pairing });
	}, []);

	const hasMapping = mapping !== null && Object.keys(mapping).length > 0;

	return {
		mapping,
		textStyles,
		mappingReady,
		hasMapping,
		applyState,
		saveMapping,
		requestStyles,
		applyPairing,
		clearStatus,
	};
}
