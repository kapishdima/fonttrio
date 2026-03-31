import { useEffect, useRef } from "react";

export function useGoogleFonts(urls: string[]) {
	const loadedRef = useRef(new Set<string>());

	useEffect(() => {
		for (const url of urls) {
			if (loadedRef.current.has(url)) continue;
			if (loadedRef.current.size >= 30) break;

			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = url;
			document.head.appendChild(link);
			loadedRef.current.add(url);
		}
	}, [urls]);
}
