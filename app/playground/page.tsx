"use client";

import {
	ArrowRight,
	Bell,
	Check,
	Copy,
	Github,
	Mail,
	MessageSquare,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCommandInstallation } from "@/hooks/use-command-installation";
import { type PairingData, getAllPairings, getPairing } from "@/lib/pairings";

// ─── Pairing Selector ────────────────────────────────────────────────

function PairingSelector({
	pairings,
	active,
	onSelect,
}: {
	pairings: PairingData[];
	active: PairingData;
	onSelect: (name: string) => void;
}) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [scrollFade, setScrollFade] = useState<
		"none" | "right" | "left" | "both"
	>("right");

	const updateScrollFade = useCallback(() => {
		const el = scrollRef.current;
		if (!el) return;
		const atStart = el.scrollLeft <= 2;
		const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
		setScrollFade(
			atStart && atEnd
				? "none"
				: atStart
					? "right"
					: atEnd
						? "left"
						: "both",
		);
	}, []);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		updateScrollFade();
		el.addEventListener("scroll", updateScrollFade, { passive: true });
		window.addEventListener("resize", updateScrollFade);
		return () => {
			el.removeEventListener("scroll", updateScrollFade);
			window.removeEventListener("resize", updateScrollFade);
		};
	}, [updateScrollFade]);

	const fadeMask =
		scrollFade === "none"
			? undefined
			: scrollFade === "right"
				? "linear-gradient(to right, black 90%, transparent)"
				: scrollFade === "left"
					? "linear-gradient(to left, black 90%, transparent)"
					: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)";

	return (
		<div
			ref={scrollRef}
			className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
			style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
		>
			{pairings.map((p) => (
				<button
					key={p.name}
					type="button"
					onClick={() => onSelect(p.name)}
					className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border cursor-pointer ${
						active.name === p.name
							? "dark:bg-white dark:text-black bg-neutral-900 text-white border-transparent"
							: "dark:bg-neutral-900 dark:text-neutral-400 bg-white text-neutral-600 dark:border-neutral-800 border-neutral-200 dark:hover:text-white hover:text-neutral-900"
					}`}
				>
					{p.name}
				</button>
			))}
		</div>
	);
}

// ─── Install Command Bar ─────────────────────────────────────────────

function InstallBar({ command }: { command: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(command);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [command]);

	return (
		<button
			type="button"
			onClick={handleCopy}
			className="flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-lg dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 dark:hover:bg-neutral-800/50 hover:bg-neutral-200 transition-colors cursor-pointer group"
			aria-label={`Copy install command: ${command}`}
		>
			<code className="text-xs font-medium dark:text-neutral-300 text-neutral-600">
				{command}
			</code>
			<span className="dark:text-neutral-500 text-neutral-400 group-hover:dark:text-neutral-300 group-hover:text-neutral-600 transition-colors">
				{copied ? (
					<Check className="size-3.5" />
				) : (
					<Copy className="size-3.5" />
				)}
			</span>
		</button>
	);
}

// ─── Demo Blocks ─────────────────────────────────────────────────────

const fontVar = {
	heading: "var(--pg-heading)",
	body: "var(--pg-body)",
	mono: "var(--pg-mono)",
} as const;

function HeroBlock() {
	return (
		<Card className="md:col-span-2 overflow-hidden">
			<CardHeader>
				<CardDescription
					style={{ fontFamily: fontVar.body }}
					className="text-xs uppercase tracking-wider"
				>
					Marketing
				</CardDescription>
				<CardTitle
					style={{ fontFamily: fontVar.heading }}
					className="text-3xl sm:text-4xl tracking-tight"
				>
					Build something beautiful
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<p
					style={{ fontFamily: fontVar.body }}
					className="text-muted-foreground leading-relaxed"
				>
					Create stunning interfaces with carefully crafted typography. The
					right font pairing transforms your design from good to exceptional.
				</p>
				<div className="flex gap-2">
					<Button style={{ fontFamily: fontVar.body }}>
						Get started <ArrowRight className="size-4" />
					</Button>
					<Button variant="outline" style={{ fontFamily: fontVar.body }}>
						Learn more
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

function LoginFormBlock() {
	return (
		<Card>
			<CardHeader>
				<CardTitle
					style={{ fontFamily: fontVar.heading }}
					className="text-xl"
				>
					Sign in
				</CardTitle>
				<CardDescription style={{ fontFamily: fontVar.body }}>
					Enter your credentials to continue
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label style={{ fontFamily: fontVar.body }} htmlFor="pg-email">
						Email
					</Label>
					<Input
						id="pg-email"
						type="email"
						placeholder="you@example.com"
						style={{ fontFamily: fontVar.body }}
					/>
				</div>
				<div className="space-y-2">
					<Label style={{ fontFamily: fontVar.body }} htmlFor="pg-password">
						Password
					</Label>
					<Input
						id="pg-password"
						type="password"
						placeholder="••••••••"
						style={{ fontFamily: fontVar.body }}
					/>
				</div>
				<Button className="w-full" style={{ fontFamily: fontVar.body }}>
					Sign in
				</Button>
				<div className="relative">
					<Separator />
					<span
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground"
						style={{ fontFamily: fontVar.body }}
					>
						or
					</span>
				</div>
				<Button
					variant="outline"
					className="w-full"
					style={{ fontFamily: fontVar.body }}
				>
					<Github className="size-4" />
					Continue with GitHub
				</Button>
			</CardContent>
		</Card>
	);
}

function NotificationsBlock() {
	const notifications = [
		{
			icon: MessageSquare,
			title: "New comment on your post",
			desc: 'Sarah left a comment on "Getting Started"',
			time: "2m ago",
			unread: true,
		},
		{
			icon: Mail,
			title: "Welcome to the team",
			desc: "You've been added to the Design project",
			time: "1h ago",
			unread: true,
		},
		{
			icon: Bell,
			title: "Deployment complete",
			desc: "Production build v2.4.1 deployed",
			time: "3h ago",
			unread: false,
		},
	];

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle
						style={{ fontFamily: fontVar.heading }}
						className="text-lg"
					>
						Notifications
					</CardTitle>
					<Badge variant="secondary" className="text-xs">
						2 new
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-3">
				{notifications.map((n) => (
					<div key={n.title} className="flex gap-3 items-start">
						<div className="mt-0.5 rounded-full p-1.5 bg-muted">
							<n.icon className="size-3.5 text-muted-foreground" />
						</div>
						<div className="flex-1 min-w-0 space-y-0.5">
							<p
								style={{ fontFamily: fontVar.body }}
								className={`text-sm leading-tight ${n.unread ? "font-semibold" : ""}`}
							>
								{n.title}
							</p>
							<p
								style={{ fontFamily: fontVar.body }}
								className="text-xs text-muted-foreground truncate"
							>
								{n.desc}
							</p>
						</div>
						<span
							style={{ fontFamily: fontVar.mono }}
							className="text-[10px] text-muted-foreground shrink-0 mt-0.5"
						>
							{n.time}
						</span>
					</div>
				))}
			</CardContent>
		</Card>
	);
}

function CodeSnippetBlock({ command }: { command: string }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle
					style={{ fontFamily: fontVar.heading }}
					className="text-lg"
				>
					Installation
				</CardTitle>
				<CardDescription style={{ fontFamily: fontVar.body }}>
					Add this pairing to your project
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="install">
					<TabsList>
						<TabsTrigger
							value="install"
							style={{ fontFamily: fontVar.mono }}
						>
							Install
						</TabsTrigger>
						<TabsTrigger
							value="usage"
							style={{ fontFamily: fontVar.mono }}
						>
							Usage
						</TabsTrigger>
					</TabsList>
					<TabsContent value="install">
						<div className="mt-3 rounded-lg bg-neutral-950 dark:bg-neutral-900 p-4 overflow-x-auto">
							<code
								style={{ fontFamily: fontVar.mono }}
								className="text-sm text-neutral-300 whitespace-pre"
							>
								{command}
							</code>
						</div>
					</TabsContent>
					<TabsContent value="usage">
						<div className="mt-3 rounded-lg bg-neutral-950 dark:bg-neutral-900 p-4 overflow-x-auto">
							<code
								style={{ fontFamily: fontVar.mono }}
								className="text-sm text-neutral-300 whitespace-pre"
							>
								{`/* Fonts are applied via CSS variables */\nh1 { font-family: var(--font-heading); }\np  { font-family: var(--font-body); }\ncode { font-family: var(--font-mono); }`}
							</code>
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}

function DashboardBlock() {
	const metrics = [
		{
			label: "Revenue",
			value: "$12,489",
			change: "+12.5%",
			up: true,
		},
		{
			label: "Users",
			value: "2,847",
			change: "+8.2%",
			up: true,
		},
		{
			label: "Bounce Rate",
			value: "24.3%",
			change: "-3.1%",
			up: false,
		},
	];

	return (
		<Card className="md:col-span-2">
			<CardHeader>
				<CardTitle
					style={{ fontFamily: fontVar.heading }}
					className="text-lg"
				>
					Dashboard
				</CardTitle>
				<CardDescription style={{ fontFamily: fontVar.body }}>
					Overview of key metrics this month
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-3 gap-4">
					{metrics.map((m) => (
						<div
							key={m.label}
							className="space-y-1 rounded-xl bg-muted/50 p-3"
						>
							<p
								style={{ fontFamily: fontVar.body }}
								className="text-xs text-muted-foreground"
							>
								{m.label}
							</p>
							<p
								style={{ fontFamily: fontVar.heading }}
								className="text-2xl font-semibold tracking-tight"
							>
								{m.value}
							</p>
							<div className="flex items-center gap-1">
								{m.up ? (
									<TrendingUp className="size-3 text-emerald-500" />
								) : (
									<TrendingDown className="size-3 text-red-500" />
								)}
								<span
									style={{ fontFamily: fontVar.mono }}
									className={`text-xs ${m.up ? "text-emerald-500" : "text-red-500"}`}
								>
									{m.change}
								</span>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

function SettingsBlock() {
	return (
		<Card>
			<CardHeader>
				<CardTitle
					style={{ fontFamily: fontVar.heading }}
					className="text-lg"
				>
					Preferences
				</CardTitle>
				<CardDescription style={{ fontFamily: fontVar.body }}>
					Manage your account settings
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<Label style={{ fontFamily: fontVar.body }} htmlFor="pg-dark">
						Dark mode
					</Label>
					<Switch id="pg-dark" defaultChecked />
				</div>
				<Separator />
				<div className="flex items-center justify-between">
					<Label style={{ fontFamily: fontVar.body }} htmlFor="pg-notifs">
						Notifications
					</Label>
					<Switch id="pg-notifs" defaultChecked />
				</div>
				<Separator />
				<div className="space-y-2">
					<Label style={{ fontFamily: fontVar.body }}>Language</Label>
					<Select defaultValue="en">
						<SelectTrigger
							className="w-full"
							style={{ fontFamily: fontVar.body }}
						>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="en">English</SelectItem>
							<SelectItem value="es">Espa&#241;ol</SelectItem>
							<SelectItem value="fr">Fran&#231;ais</SelectItem>
							<SelectItem value="de">Deutsch</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
			<CardFooter>
				<Button className="w-full" style={{ fontFamily: fontVar.body }}>
					Save changes
				</Button>
			</CardFooter>
		</Card>
	);
}

// ─── Page ────────────────────────────────────────────────────────────

export default function PlaygroundPage() {
	const pairings = useMemo(() => getAllPairings(), []);
	const [pairingName, setPairingName] = useQueryState(
		"pairing",
		parseAsString.withDefault(pairings[0]?.name ?? "editorial"),
	);
	const activePairing = useMemo(
		() => getPairing(pairingName) ?? pairings[0],
		[pairingName, pairings],
	);
	const command = useCommandInstallation(activePairing.name);

	return (
		<main className="bg-black">
			<InnerHeader />

			{/* Header section */}
			<div className="p-3 pt-20">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-12 md:py-16">
					<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight dark:text-white text-neutral-800 mb-3">
						Playground
					</h1>
					<p className="text-base dark:text-neutral-400 text-neutral-500 mb-8 max-w-xl">
						See how font pairings look on real UI components. Pick a
						pairing and watch every element update.
					</p>

					<div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
						<PairingSelector
							pairings={pairings}
							active={activePairing}
							onSelect={(name) => setPairingName(name)}
						/>
					</div>

					<div className="flex items-center gap-3 flex-wrap">
						<InstallBar command={command} />
						<div className="flex gap-1.5">
							{activePairing.mood.slice(0, 3).map((m) => (
								<Badge
									key={m}
									variant="secondary"
									className="text-xs rounded-md font-medium tracking-tighter"
								>
									{m}
								</Badge>
							))}
						</div>
					</div>

					{/* Font info row */}
					<div className="mt-6 flex gap-6 text-xs dark:text-neutral-500 text-neutral-400 flex-wrap">
						<span>
							<span className="font-semibold uppercase tracking-wider dark:text-neutral-400 text-neutral-500">
								Heading
							</span>{" "}
							{activePairing.heading}
						</span>
						<span>
							<span className="font-semibold uppercase tracking-wider dark:text-neutral-400 text-neutral-500">
								Body
							</span>{" "}
							{activePairing.body}
						</span>
						<span>
							<span className="font-semibold uppercase tracking-wider dark:text-neutral-400 text-neutral-500">
								Mono
							</span>{" "}
							{activePairing.mono}
						</span>
					</div>
				</section>
			</div>

			{/* Preview grid */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-12 md:py-16">
					<AnimatePresence mode="wait">
						<motion.div
							key={activePairing.name}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							style={
								{
									"--pg-heading": `"${activePairing.heading}", ${activePairing.headingCategory}`,
									"--pg-body": `"${activePairing.body}", ${activePairing.bodyCategory}`,
									"--pg-mono": `"${activePairing.mono}", monospace`,
								} as React.CSSProperties
							}
						>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								<HeroBlock />
								<LoginFormBlock />
								<NotificationsBlock />
								<CodeSnippetBlock command={command} />
								<DashboardBlock />
								<SettingsBlock />
							</div>
						</motion.div>
					</AnimatePresence>
				</section>
			</div>

			<Footer />
		</main>
	);
}
