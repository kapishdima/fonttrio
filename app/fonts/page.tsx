import { getAllFonts } from "@/lib/registry";
import FontsClient from "./fonts-client";

export default function FontsPage() {
	const fonts = getAllFonts().sort((a, b) => a.title.localeCompare(b.title));
	return <FontsClient fonts={fonts} />;
}
