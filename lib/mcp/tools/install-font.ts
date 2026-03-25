import type { FontItem } from "@/lib/registry";

export interface InstallFontInput {
	name: string;
}

export interface InstallFontResult {
	found: boolean;
	name: string;
	command?: string;
	title?: string;
	error?: string;
}

export function installFont(
	getFont: (name: string) => FontItem | null,
	input: InstallFontInput,
): InstallFontResult {
	const { name } = input;
	const font = getFont(name);

	if (!font) {
		return {
			found: false,
			name,
			error: `Font "${name}" not found. Use search_fonts to find available fonts.`,
		};
	}

	return {
		found: true,
		name: font.name,
		title: font.title,
		command: `bunx shadcn@latest add https://www.fonttrio.xyz/r/${font.name}.json`,
	};
}
