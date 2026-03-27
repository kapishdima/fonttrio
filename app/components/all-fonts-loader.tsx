import {
	getAllGoogleFontsUrls,
	getPairingGoogleFontsUrl,
} from "@/lib/pairings";

interface AllFontsLoaderProps {
	pairingName?: string;
}

export function AllFontsLoader({ pairingName }: AllFontsLoaderProps) {
	const urls = pairingName
		? [getPairingGoogleFontsUrl(pairingName)].filter((url): url is string =>
				Boolean(url),
			)
		: getAllGoogleFontsUrls();

	return (
		<>
			{urls.map((url) => (
				<link key={url} rel="stylesheet" href={url} />
			))}
		</>
	);
}
