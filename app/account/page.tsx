"use client";

import { Check, Copy, Eye, EyeOff, LogOut, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AccountPage() {
	const { data: session, isPending } = authClient.useSession();
	const [apiKey, setApiKey] = useState<string | null>(null);
	const [showKey, setShowKey] = useState(false);
	const [copied, setCopied] = useState(false);
	const [regenerating, setRegenerating] = useState(false);
	const [subscription, setSubscription] = useState<{
		status: string;
		subscribedAt?: string;
		currentPeriodEnd?: string;
	} | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!session?.user) return;

		Promise.all([
			fetch("/api/account/api-key").then((r) => r.json()),
			fetch("/api/account/subscription").then((r) => r.json()),
		]).then(([keyData, subData]) => {
			setApiKey(keyData.apiKey || null);
			setSubscription(subData);
			setLoading(false);
		});
	}, [session?.user]);

	const handleCopyKey = useCallback(() => {
		if (!apiKey) return;
		navigator.clipboard.writeText(apiKey);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [apiKey]);

	const handleRegenerate = useCallback(async () => {
		if (
			!confirm(
				"Regenerate API key? The old key will stop working immediately.",
			)
		)
			return;
		setRegenerating(true);
		const res = await fetch("/api/account/api-key", { method: "POST" });
		const data = await res.json();
		setApiKey(data.apiKey);
		setRegenerating(false);
	}, []);

	if (isPending) {
		return (
			<main className="bg-black min-h-screen flex items-center justify-center">
				<p className="dark:text-neutral-500 text-neutral-400 text-sm">
					Loading...
				</p>
			</main>
		);
	}

	if (!session?.user) {
		if (typeof window !== "undefined") {
			window.location.href = "/sign-in";
		}
		return (
			<main className="bg-black min-h-screen flex items-center justify-center">
				<p className="dark:text-neutral-500 text-neutral-400 text-sm">
					Redirecting...
				</p>
			</main>
		);
	}

	const maskedKey = apiKey
		? `${apiKey.slice(0, 12)}${"•".repeat(16)}${apiKey.slice(-4)}`
		: null;

	const isPro = subscription?.status === "active";

	return (
		<main className="bg-black min-h-screen flex flex-col">
			<InnerHeader />

			<div className="p-3 pt-20">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-12 md:py-16">
					{/* Profile header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: EASE }}
						className="flex items-center justify-between gap-4 flex-wrap"
					>
						<div className="flex items-center gap-4">
							{session.user.image && (
								<img
									src={session.user.image}
									alt=""
									className="size-14 rounded-full ring-1 ring-neutral-200 dark:ring-neutral-800"
								/>
							)}
							<div>
								<h1 className="text-xl font-medium tracking-tight dark:text-white text-neutral-900">
									{session.user.name}
								</h1>
								<p className="text-sm dark:text-neutral-500 text-neutral-500">
									{session.user.email}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<StatusBadge status={subscription?.status || "free"} />
							<Button
								size="sm"
								variant="ghost"
								className="text-xs dark:text-neutral-500 text-neutral-400 hover:dark:text-white hover:text-neutral-900 cursor-pointer"
								onClick={() => authClient.signOut()}
							>
								<LogOut className="size-3 mr-1.5" />
								Sign out
							</Button>
						</div>
					</motion.div>

					<div className="h-px dark:bg-neutral-800 bg-neutral-200 my-8 md:my-10" />

					{/* Two-column layout */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
						className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
					>
						{/* Left: Subscription */}
						<div>
							<h2 className="text-xs font-medium tracking-wider uppercase dark:text-neutral-500 text-neutral-400 mb-4">
								Subscription
							</h2>

							{loading ? (
								<div className="space-y-3">
									<div className="h-5 w-32 rounded dark:bg-neutral-800 bg-neutral-100 animate-pulse" />
									<div className="h-4 w-48 rounded dark:bg-neutral-800 bg-neutral-100 animate-pulse" />
								</div>
							) : isPro ? (
								<div className="space-y-3">
									<p className="text-sm dark:text-neutral-300 text-neutral-700">
										Pro plan active
									</p>
									{subscription?.currentPeriodEnd && (
										<p className="text-sm dark:text-neutral-500 text-neutral-400">
											Renews{" "}
											{new Date(
												subscription.currentPeriodEnd,
											).toLocaleDateString("en-US", {
												month: "long",
												day: "numeric",
												year: "numeric",
											})}
										</p>
									)}
									<Button
										size="sm"
										variant="ghost"
										className="text-xs dark:text-neutral-500 text-neutral-400 hover:dark:text-white hover:text-neutral-900 cursor-pointer -ml-2"
										asChild
									>
										<a href="/ai/docs">Go to docs</a>
									</Button>
								</div>
							) : (
								<div className="space-y-3">
									<p className="text-sm dark:text-neutral-400 text-neutral-600">
										No active subscription
									</p>
									<Button
										size="sm"
										className="cursor-pointer"
										asChild
									>
										<a href="/ai">Upgrade to Pro</a>
									</Button>
								</div>
							)}
						</div>

						{/* Right: API Key */}
						<div>
							<h2 className="text-xs font-medium tracking-wider uppercase dark:text-neutral-500 text-neutral-400 mb-4">
								API Key
							</h2>

							{loading ? (
								<div className="h-10 rounded-xl dark:bg-neutral-800 bg-neutral-100 animate-pulse" />
							) : apiKey ? (
								<div className="space-y-3">
									<div className="flex items-center gap-1.5 rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-3 py-2">
										<code className="text-[13px] font-mono dark:text-neutral-300 text-neutral-700 flex-1 truncate min-w-0">
											{showKey ? apiKey : maskedKey}
										</code>
										<Button
											size="icon"
											variant="ghost"
											className="size-7 shrink-0 dark:text-neutral-500 dark:hover:text-white text-neutral-400 hover:text-neutral-900 cursor-pointer"
											onClick={() => setShowKey(!showKey)}
											aria-label={
												showKey ? "Hide key" : "Show key"
											}
										>
											{showKey ? (
												<EyeOff className="size-3.5" />
											) : (
												<Eye className="size-3.5" />
											)}
										</Button>
										<Button
											size="icon"
											variant="ghost"
											className="size-7 shrink-0 dark:text-neutral-500 dark:hover:text-white text-neutral-400 hover:text-neutral-900 cursor-pointer"
											onClick={handleCopyKey}
											aria-label="Copy key"
										>
											{copied ? (
												<Check className="size-3.5 text-emerald-500" />
											) : (
												<Copy className="size-3.5" />
											)}
										</Button>
									</div>
									<Button
										size="sm"
										variant="ghost"
										className="text-xs dark:text-neutral-500 text-neutral-400 hover:dark:text-white hover:text-neutral-900 cursor-pointer -ml-2"
										onClick={handleRegenerate}
										disabled={regenerating}
									>
										<RefreshCw
											className={`size-3 mr-1.5 ${regenerating ? "animate-spin" : ""}`}
										/>
										{regenerating
											? "Regenerating..."
											: "Regenerate key"}
									</Button>
								</div>
							) : (
								<p className="text-sm dark:text-neutral-500 text-neutral-400">
									Subscribe to Pro to get your API key.
								</p>
							)}
						</div>
					</motion.div>
				</section>
			</div>

			<Footer />
		</main>
	);
}

function StatusBadge({ status }: { status: string }) {
	const config: Record<string, { label: string; dot: string; bg: string }> = {
		active: {
			label: "Pro",
			dot: "bg-emerald-500",
			bg: "dark:bg-emerald-500/10 bg-emerald-50 dark:text-emerald-400 text-emerald-700",
		},
		cancelled: {
			label: "Cancelled",
			dot: "bg-amber-500",
			bg: "dark:bg-amber-500/10 bg-amber-50 dark:text-amber-400 text-amber-700",
		},
		past_due: {
			label: "Past due",
			dot: "bg-red-500",
			bg: "dark:bg-red-500/10 bg-red-50 dark:text-red-400 text-red-700",
		},
		free: {
			label: "Free",
			dot: "dark:bg-neutral-600 bg-neutral-400",
			bg: "dark:bg-neutral-800 bg-neutral-100 dark:text-neutral-400 text-neutral-500",
		},
	};

	const c = config[status] || config.free;

	return (
		<span
			className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg}`}
		>
			<span className={`size-1.5 rounded-full ${c.dot}`} />
			{c.label}
		</span>
	);
}
