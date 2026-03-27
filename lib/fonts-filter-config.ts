import {
	LanguageSkillIcon,
	Shirt01Icon,
	SmileIcon,
	TextFontIcon,
} from "@hugeicons/core-free-icons";
import type { FilterDefinition } from "@/app/components/filters/types";
import { FONT_CATEGORY_OPTIONS } from "@/lib/hooks/use-font-filters";

export const FONT_FILTERS: FilterDefinition[] = [
	{
		id: "appearance",
		icon: Shirt01Icon,
		label: "Appearance",
		options: [
			{ value: "modern", label: "Modern" },
			{ value: "classic", label: "Classic" },
			{ value: "geometric", label: "Geometric" },
			{ value: "humanist", label: "Humanist" },
			{ value: "grotesque", label: "Grotesque" },
		],
	},
	{
		id: "category",
		icon: TextFontIcon,
		label: "Category",
		options: FONT_CATEGORY_OPTIONS.filter((c) => c.key !== "all").map(
			(cat) => ({ value: cat.key, label: cat.label }),
		),
	},
	{
		id: "language",
		icon: LanguageSkillIcon,
		label: "Language",
		options: [
			{ value: "latin", label: "Latin" },
			{ value: "cyrillic", label: "Cyrillic" },
			{ value: "greek", label: "Greek" },
			{ value: "vietnamese", label: "Vietnamese" },
			{ value: "arabic", label: "Arabic" },
			{ value: "hebrew", label: "Hebrew" },
			{ value: "devanagari", label: "Devanagari" },
			{ value: "chinese-simplified", label: "Chinese Simplified" },
			{ value: "japanese", label: "Japanese" },
			{ value: "korean", label: "Korean" },
		],
	},
	{
		id: "feeling",
		icon: SmileIcon,
		label: "Feeling",
		options: [
			{ value: "elegant", label: "Elegant" },
			{ value: "playful", label: "Playful" },
			{ value: "professional", label: "Professional" },
			{ value: "minimal", label: "Minimal" },
			{ value: "warm", label: "Warm" },
			{ value: "bold", label: "Bold" },
		],
	},
];
