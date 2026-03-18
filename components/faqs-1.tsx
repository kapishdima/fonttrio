"use client";

import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faqItems = [
	{
		id: "item-1",
		question: "What is Fonttrio and how does it work?",
		answer:
			"FontTrio is a curated collection of 49+ font pairings for shadcn/ui projects. Each pairing includes a heading, body, and monospace font that work harmoniously. Install any pairing with a single command and get CSS variables set up automatically.",
	},
	{
		id: "item-2",
		question: "How do I install a font pairing?",
		answer:
			"Run the install command: 'npx shadcn@latest add @fonttrio/[pairing-name]'. For example: 'npx shadcn@latest add @fonttrio/editorial'. This automatically configures fonts via next/font and sets up CSS variables.",
	},
	{
		id: "item-3",
		question: "What CSS variables are created?",
		answer:
			"Each pairing creates three CSS variables: --font-heading, --font-body, and --font-mono. These are automatically applied to your project and ready to use in your components.",
	},
	{
		id: "item-4",
		question: "Can I customize the font pairing after installation?",
		answer:
			"Yes! After installation, you can modify the typography scale, weights, and spacing in your globals.css. The pairings provide a solid foundation that you can adjust to your needs.",
	},
	{
		id: "item-5",
		question: "Are these fonts free to use?",
		answer:
			"Yes, all fonts are from Google Fonts and are free for commercial and personal use. You can use FontTrio pairings in any project without licensing concerns.",
	},
	{
		id: "item-6",
		question: "How do I choose the right pairing for my project?",
		answer:
			"Browse by mood (editorial, bold, minimal, creative) or use case (startup, portfolio, dashboard). Each pairing page shows live previews, type tester, and context examples to help you decide.",
	},
	{
		id: "item-7",
		question: "Does Fonttrio work with Next.js only?",
		answer:
			"No. Fonttrio uses shadcn/ui to distribute fonts, so it works in any project that officially supports shadcn — Next.js, TanStack Start, Vite, Laravel, Astro",
	},
];

export default function FAQs() {
	return (
		<div>
			<Card variant="outline" className="mt-12 p-2">
				<Accordion type="single" collapsible>
					{faqItems.map((item) => (
						<AccordionItem
							key={item.id}
							value={item.id}
							className="border-b-0 px-4 bg-neutral-900"
						>
							<AccordionTrigger className="cursor-pointer py-4 text-sm font-medium text-primary-foreground hover:no-underline">
								{item.question}
							</AccordionTrigger>
							<AccordionContent>
								<p className="text-muted-foreground pb-2 text-sm">
									{item.answer}
								</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Card>
		</div>
	);
}
