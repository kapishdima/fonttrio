import { useEffect, useState } from "react";
import type { EnrichedPairing } from "../types";
import { Filters } from "./components/Filters";
import { PairingDetail } from "./components/PairingDetail";
import { PairingList } from "./components/PairingList";
import { SetupScreen } from "./components/SetupScreen";
import { useFigmaMessaging } from "./hooks/use-figma-messaging";
import { usePairings } from "./hooks/use-pairings";

type View = "loading" | "setup" | "browse" | "detail" | "settings";

export function App() {
	const [view, setView] = useState<View>("loading");
	const figma = useFigmaMessaging();
	const pairings = usePairings();

	// Determine initial view from mapping state
	useEffect(() => {
		if (figma.mappingReady && view === "loading") {
			setView(figma.hasMapping ? "browse" : "setup");
		}
	}, [figma.mappingReady, figma.hasMapping, view]);

	// Load pairings when entering browse
	useEffect(() => {
		if (view === "browse") pairings.loadPairings(0);
	}, [view, pairings.loadPairings]);

	// Auto-clear status
	useEffect(() => {
		if (!figma.applyState.status) return;
		const timer = setTimeout(figma.clearStatus, 4000);
		return () => clearTimeout(timer);
	}, [figma.applyState.status, figma.clearStatus]);

	const handleSelect = (name: string) => {
		pairings.selectPairing(name);
		setView("detail");
	};

	const handleApply = (pairing: EnrichedPairing) => {
		figma.applyPairing(pairing);
	};

	const handleOpenSettings = () => {
		figma.requestStyles();
		setView("settings");
	};

	const handleSaveMapping = (mapping: Record<string, string>) => {
		figma.saveMapping(mapping as Record<string, "heading" | "body" | "mono">);
		setView("browse");
	};

	if (view === "loading") {
		return (
			<div className="app-root">
				<div className="pairing-list__empty">
					<div className="pairing-list__loading">Loading...</div>
				</div>
			</div>
		);
	}

	if (view === "setup" || view === "settings") {
		return (
			<div className="app-root">
				<SetupScreen
					styles={figma.textStyles}
					existingMapping={figma.mapping}
					onSave={handleSaveMapping}
					onSkip={view === "setup" ? () => setView("browse") : undefined}
					onBack={view === "settings" ? () => setView("browse") : undefined}
					isSettings={view === "settings"}
				/>
			</div>
		);
	}

	if (view === "detail" && pairings.selectedPairing) {
		return (
			<div className="app-root">
				{figma.applyState.status && (
					<StatusBar message={figma.applyState.status} />
				)}
				<PairingDetail
					pairing={pairings.selectedPairing}
					applying={figma.applyState.applying}
					onBack={() => {
						pairings.clearSelection();
						setView("browse");
					}}
					onApply={handleApply}
				/>
			</div>
		);
	}

	return (
		<div className="app-root">
			{figma.applyState.status && (
				<StatusBar message={figma.applyState.status} />
			)}
			<div className="header-bar">
				<span className="header-bar__title">Fonttrio</span>
				<button
					type="button"
					className="header-bar__btn"
					onClick={handleOpenSettings}
				>
					Settings
				</button>
			</div>
			<Filters filters={pairings.filters} onChange={pairings.setFilters} />
			<PairingList
				pairings={pairings.pairings}
				loading={pairings.loading}
				hasMore={pairings.hasMore}
				onSelect={handleSelect}
				onLoadMore={pairings.loadMore}
			/>
			{!pairings.loading && (
				<div className="pairing-list__total">
					{pairings.total} pairings found
				</div>
			)}
		</div>
	);
}

function StatusBar({ message }: { message: string }) {
	const isError = message.startsWith("Error:");
	return (
		<div
			className={`status-bar ${isError ? "status-bar--error" : "status-bar--success"}`}
		>
			{message}
		</div>
	);
}
