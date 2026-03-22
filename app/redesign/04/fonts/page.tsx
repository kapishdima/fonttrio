import { getAllFonts } from "@/lib/registry";
import FontsClient from "@/app/fonts/fonts-client";

export default function Redesign04FontsPage() {
	const fonts = getAllFonts().sort((a, b) => a.title.localeCompare(b.title));
	return <FontsClient fonts={fonts} />;
}
