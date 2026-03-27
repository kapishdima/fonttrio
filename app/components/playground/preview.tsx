import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PairingData } from "@/lib/pairings";
import { injectFonts } from "@/lib/preview";

export function PlaygroundPreview({
	activePairing,
}: {
	activePairing: PairingData;
}) {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [iframeLoaded, setIframeLoaded] = useState(false);

	useEffect(() => {
		if (!iframeLoaded) return;
		const iframe = iframeRef.current;
		if (!iframe) return;

		try {
			const doc = iframe.contentDocument;
			if (doc) {
				injectFonts(doc, activePairing);
			}
		} catch {
			console.warn("Cannot access iframe document");
		}
	}, [activePairing, iframeLoaded]);

	const handleIframeLoad = () => setIframeLoaded(true);

	return (
		<div className="p-3 pt-0 flex-1">
			<section
				className="w-full dark:bg-neutral-950 bg-white rounded-4xl overflow-hidden relative"
				style={{ height: "80vh" }}
			>
				{!iframeLoaded && (
					<div className="absolute inset-0 flex items-center justify-center dark:bg-neutral-950 bg-white z-10">
						<div className="flex items-center gap-3 dark:text-neutral-400 text-neutral-500">
							<Loader2 className="size-5 animate-spin" />
							<span className="text-sm">Loading preview...</span>
						</div>
					</div>
				)}
				<iframe
					ref={iframeRef}
					src="/api/preview"
					title="shadcn/ui component preview"
					className="w-full h-full border-0"
					onLoad={handleIframeLoad}
				/>
			</section>
		</div>
	);
}
