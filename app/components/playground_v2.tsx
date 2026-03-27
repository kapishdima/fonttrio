"use client";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PairsListSelection } from "@/app/components/pairs/pairs-list-selection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInstallCopy } from "@/hooks/use-install-copy";
import { loadFontUrl } from "@/lib/hooks/font-load-registry";
import type { PairingData } from "@/lib/pairings";

const DEFAULT_HEADING = "The future of typography is here";
const DEFAULT_BODY =
	"Good typography is invisible. Great typography speaks before you read a single word. Choose the right pairing and let your content shine.";
const DEFAULT_MONO = `const font = await loadPairing("editorial");\napplyTypography(font, document.body);`;

const titleVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
	},
} as const;

const contentVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
	},
} as const;

const reducedVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export function Playground({ pairings }: { pairings: PairingData[] }) {
	const [activePairing, setActivePairing] = useState(pairings[0]);
	const prefersReducedMotion = useReducedMotion();

	// Load fonts for the active pairing eagerly (no IntersectionObserver needed)
	useEffect(() => {
		if (activePairing.googleFontsUrl) {
			loadFontUrl(activePairing.googleFontsUrl);
		}
	}, [activePairing.googleFontsUrl]);

	const {
		command,
		state: copyState,
		copyCommand,
	} = useInstallCopy(activePairing.name);

	// const isDefault =
	// 	headingText === DEFAULT_HEADING &&
	// 	bodyText === DEFAULT_BODY &&
	// 	monoText === DEFAULT_MONO;

	// const handleReset = useCallback(() => {
	// 	setHeadingText(DEFAULT_HEADING);
	// 	setBodyText(DEFAULT_BODY);
	// 	setMonoText(DEFAULT_MONO);
	// }, []);

	return (
		<section
			aria-label="Playground"
			className="py-16 pt-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden dark:bg-black bg-white relative"
		>
			{/* Heading */}
			<motion.h2
				className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl dark:text-white text-neutral-800 font-medium tracking-tight text-balance"
				variants={prefersReducedMotion ? reducedVariants : titleVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-200px" }}
			>
				Try it with your text
			</motion.h2>
			<motion.p
				className="text-base dark:text-neutral-400 text-neutral-500 mt-3 mb-10 max-w-xl"
				variants={prefersReducedMotion ? reducedVariants : titleVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-200px" }}
			>
				Type anything and see how it looks across different font pairings.
			</motion.p>

			<motion.div
				variants={prefersReducedMotion ? reducedVariants : contentVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
			>
				{/* Browser Chrome */}
				<div className="rounded-xl dark:bg-neutral-950 bg-white border dark:border-neutral-900/50 border-neutral-200 overflow-hidden">
					{/* Title bar */}
					<div className="flex items-center gap-3 px-4 py-3 border-b dark:border-neutral-900/50 border-neutral-200 dark:bg-neutral-950 bg-neutral-50">
						{/* Traffic lights — monochrome */}
						<div className="flex items-center gap-1.5">
							<span className="size-3 rounded-full dark:bg-neutral-700 bg-neutral-300" />
							<span className="size-3 rounded-full dark:bg-neutral-700 bg-neutral-300" />
							<span className="size-3 rounded-full dark:bg-neutral-700 bg-neutral-300" />
						</div>

						{/* Address bar */}
						<div className="flex-1 flex justify-start pl-2">
							<div className="flex items-center gap-2 px-4 py-1 rounded-md dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 max-w-md w-full">
								<span className="text-xs dark:text-neutral-500 text-neutral-400 truncate select-all">
									fonttrio.xyz/{activePairing.name}
								</span>
							</div>
						</div>

						{/* Right side — copy command */}
						<button
							type="button"
							onClick={() => copyCommand()}
							className="flex items-center gap-2 shrink-0 px-3 py-1 rounded-md dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 dark:hover:bg-neutral-800/50 hover:bg-neutral-200 transition-colors cursor-copy"
							aria-label={`Copy install command: ${command}`}
						>
							<code className="text-xs font-medium dark:text-neutral-300 text-neutral-600">
								{copyState === "done" ? "Copied!" : command}
							</code>
						</button>
					</div>

					{/* Browser content */}
					<div className="flex">
						{/* Pairs sidebar */}
						<PairsListSelection
							pairings={pairings}
							onSelectPair={(name: string) => {
								const pairing = pairings.find((p) => p.name === name);
								if (pairing) setActivePairing(pairing);
							}}
							active={activePairing}
							searchable
							direction="vertical"
							className="w-48 shrink-0 border-r dark:border-neutral-900/50 border-neutral-200 p-3 lg:max-h-150"
						/>

						{/* Specimens */}
						<AnimatePresence mode="wait">
							<div className="flex flex-1 min-w-0">
								<TextsPreview
									key={activePairing.name}
									activePairing={activePairing}
								/>
								<ComponentsPreview activePairing={activePairing} />
							</div>
						</AnimatePresence>
					</div>
				</div>
			</motion.div>
		</section>
	);
}

function TextsPreview({ activePairing }: { activePairing: PairingData }) {
	const [headingText, setHeadingText] = useState(DEFAULT_HEADING);
	const [bodyText, setBodyText] = useState(DEFAULT_BODY);
	const [monoText, setMonoText] = useState(DEFAULT_MONO);

	return (
		<motion.div
			key={activePairing.name}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className="flex flex-col flex-1 gap-px border-r"
		>
			{/* Heading */}
			<div className="dark:bg-neutral-950 bg-white px-6 pt-4 pb-6 flex flex-col gap-3 border-b">
				<span className="text-defaul font-medium tracking-tighter dark:text-neutral-500 text-neutral-400">
					{activePairing.heading}
				</span>
				<textarea
					value={headingText}
					onChange={(e) => setHeadingText(e.target.value)}
					rows={3}
					className="w-full resize-none bg-transparent text-xl sm:text-2xl md:text-3xl dark:text-neutral-100 text-neutral-800 leading-tight break-words focus:outline-none placeholder:dark:text-neutral-700 placeholder:text-neutral-300"
					style={{
						fontFamily: `"${activePairing.heading}", ${activePairing.headingCategory}`,
						fontWeight: activePairing.scale.h1.weight,
					}}
					placeholder="Type a heading…"
				/>
			</div>

			{/* Body */}
			<div className="dark:bg-neutral-950 bg-white px-6 pt-4 pb-6 flex flex-col gap-3 border-b">
				<span className="text-defaul font-medium tracking-tighter dark:text-neutral-500 text-neutral-400">
					{activePairing.body}
				</span>
				<textarea
					value={bodyText}
					onChange={(e) => setBodyText(e.target.value)}
					rows={4}
					className="w-full resize-none bg-transparent text-base dark:text-neutral-300 text-neutral-700 leading-relaxed break-words focus:outline-none placeholder:dark:text-neutral-700 placeholder:text-neutral-300"
					style={{
						fontFamily: `"${activePairing.body}", ${activePairing.bodyCategory}`,
						fontWeight: activePairing.scale.body.weight,
					}}
					placeholder="Type body text…"
				/>
			</div>

			<div className="dark:bg-neutral-950 bg-white px-6 pt-4 pb-6 flex flex-col gap-3">
				<span className="text-defaul font-medium tracking-tighter dark:text-neutral-500 text-neutral-400">
					{activePairing.mono}
				</span>
				<textarea
					value={monoText}
					onChange={(e) => setMonoText(e.target.value)}
					rows={4}
					className="w-full resize-none bg-transparent text-sm dark:text-neutral-300 text-neutral-700 leading-relaxed break-words focus:outline-none placeholder:dark:text-neutral-700 placeholder:text-neutral-300"
					style={{
						fontFamily: `"${activePairing.mono}", monospace`,
					}}
					placeholder="Type code…"
				/>
			</div>
		</motion.div>
	);
}

function ComponentsPreview({ activePairing }: { activePairing: PairingData }) {
	const headingFont = `"${activePairing.heading}", ${activePairing.headingCategory}`;
	const bodyFont = `"${activePairing.body}", ${activePairing.bodyCategory}`;
	const monoFont = `"${activePairing.mono}", monospace`;

	return (
		<div
			className="flex-2 dark:bg-neutral-950 bg-white overflow-auto lg:max-h-160 hidden lg:block"
			style={
				{
					"--font-sans": bodyFont,
					"--font-mono": monoFont,
				} as React.CSSProperties
			}
		>
			<div className="columns-3 gap-4 p-6 lg:p-8 w-337.5">
				{/* Article Card */}
				<Card className="mb-4 break-inside-avoid">
					<CardHeader>
						<CardTitle
							className="text-xl leading-snug"
							style={{
								fontFamily: headingFont,
								fontWeight: activePairing.scale.h2?.weight ?? 600,
							}}
						>
							Building a Type System That Scales
						</CardTitle>
					</CardHeader>
					<CardContent
						className="text-sm text-muted-foreground leading-relaxed"
						style={{
							fontFamily: bodyFont,
						}}
					>
						Choose fonts that complement each other while serving distinct
						roles. The heading font sets the tone, the body font ensures
						readability, and the monospace font handles technical content.
					</CardContent>
					<CardFooter className="gap-2">
						<Button size="sm">Read more</Button>
						<Button size="sm" variant="outline">
							Share
						</Button>
					</CardFooter>
				</Card>

				{/* Login Card */}
				<Card className="mb-4 break-inside-avoid">
					<CardHeader>
						<CardTitle
							style={{
								fontFamily: headingFont,
								fontWeight: activePairing.scale.h3?.weight ?? 600,
							}}
						>
							Welcome back
						</CardTitle>
						<CardDescription
							style={{
								fontFamily: bodyFont,
							}}
						>
							Sign in to your account to continue
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="playground-email">Email</Label>
								<Input
									id="playground-email"
									type="text"
									placeholder="you@example.com"
									autoComplete="one-time-code"
									readOnly
									onFocus={(e) => e.target.removeAttribute("readonly")}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="playground-password">Password</Label>
								<Input
									id="playground-password"
									type="text"
									placeholder="••••••••"
									autoComplete="one-time-code"
									readOnly
									onFocus={(e) => e.target.removeAttribute("readonly")}
								/>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<Button className="w-full">Sign in</Button>
						<Button variant="outline" className="w-full">
							Continue with GitHub
						</Button>
					</CardFooter>
				</Card>

				{/* Code Card */}
				<Card className="mb-4 break-inside-avoid">
					<CardHeader>
						<CardTitle
							style={{
								fontFamily: headingFont,
								fontWeight: activePairing.scale.h3?.weight ?? 600,
							}}
						>
							Quick Setup
						</CardTitle>
						<CardDescription
							style={{
								fontFamily: bodyFont,
							}}
						>
							Install and configure in seconds
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-lg bg-muted p-4 text-sm font-mono leading-relaxed overflow-x-auto">
							{`npx shadcn add @fonttrio/${activePairing.name}`}
						</pre>
					</CardContent>
				</Card>

				{/* Pricing Card */}
				<Card className="mb-4 break-inside-avoid">
					<CardHeader>
						<CardTitle
							style={{
								fontFamily: headingFont,
								fontWeight: activePairing.scale.h3?.weight ?? 600,
							}}
						>
							Pro Plan
						</CardTitle>
						<CardDescription
							style={{
								fontFamily: bodyFont,
							}}
						>
							Everything you need to ship faster
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-baseline gap-1 mb-4">
							<span
								className="text-3xl font-semibold tabular-nums"
								style={{
									fontFamily: headingFont,
									fontWeight: activePairing.scale.h1.weight,
								}}
							>
								$49
							</span>
							<span className="text-sm text-muted-foreground">/month</span>
						</div>
						<Separator className="mb-4" />
						<ul className="flex flex-col gap-2 text-sm text-muted-foreground">
							<li className="flex items-center gap-2">
								<span className="size-1.5 rounded-full bg-foreground" />
								Unlimited font pairings
							</li>
							<li className="flex items-center gap-2">
								<span className="size-1.5 rounded-full bg-foreground" />
								Custom typography scales
							</li>
							<li className="flex items-center gap-2">
								<span className="size-1.5 rounded-full bg-foreground" />
								Priority support
							</li>
						</ul>
					</CardContent>
					<CardFooter>
						<Button
							className="w-full"
							style={{
								fontFamily: bodyFont,
							}}
						>
							Get started
						</Button>
					</CardFooter>
				</Card>

				{/* Notification Settings Card */}
				<Card className="mb-4 break-inside-avoid">
					<CardContent>
						<div className="flex flex-col gap-4">
							<div className="flex items-center justify-between">
								<div>
									<p
										className="text-sm font-medium"
										style={{
											fontFamily: headingFont,
										}}
									>
										Push notifications
									</p>
									<p
										className="text-xs text-muted-foreground"
										style={{
											fontFamily: bodyFont,
										}}
									>
										Receive alerts on your device
									</p>
								</div>
								<Switch />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div>
									<p
										className="text-sm font-medium"
										style={{
											fontFamily: headingFont,
										}}
									>
										Email digest
									</p>
									<p
										className="text-xs text-muted-foreground"
										style={{
											fontFamily: bodyFont,
										}}
									>
										Weekly summary of activity
									</p>
								</div>
								<Switch defaultChecked />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div>
									<p
										className="text-sm font-medium"
										style={{
											fontFamily: headingFont,
										}}
									>
										Marketing
									</p>
									<p
										className="text-xs text-muted-foreground"
										style={{
											fontFamily: bodyFont,
										}}
									>
										Product updates and tips
									</p>
								</div>
								<Switch />
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Search Card */}
				<Card className="mb-4 break-inside-avoid">
					<CardHeader>
						<CardTitle
							style={{
								fontFamily: headingFont,
								fontWeight: activePairing.scale.h3?.weight ?? 600,
							}}
						>
							Find a pairing
						</CardTitle>
						<CardDescription
							style={{
								fontFamily: bodyFont,
								fontWeight: activePairing.scale.body?.weight ?? 400,
							}}
						>
							Search by name, mood, or use case
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-3">
							<Input placeholder="Search pairings…" />
							<div
								className="flex flex-wrap gap-1"
								style={{
									fontFamily: bodyFont,
								}}
							>
								<Badge variant="secondary">elegant</Badge>
								<Badge variant="secondary">modern</Badge>
								<Badge variant="secondary">playful</Badge>
								<Badge variant="secondary">technical</Badge>
								<Badge variant="secondary">minimal</Badge>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							variant="outline"
							className="w-full"
							style={{
								fontFamily: bodyFont,
							}}
						>
							Browse all
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
