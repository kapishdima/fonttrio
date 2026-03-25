"use client";

import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AccountPage() {
	const { data: session, isPending } = authClient.useSession();
	const [apiKey, setApiKey] = useState<string | null>(null);
	const [showKey, setShowKey] = useState(false);
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
			authClient.signIn.social({ provider: "github" });
		}
		return (
			<main className="bg-black min-h-screen flex items-center justify-center">
				<p className="dark:text-neutral-500 text-neutral-400 text-sm">
					Redirecting to sign in...
				</p>
			</main>
		);
	}

	const maskedKey = apiKey
		? `${apiKey.slice(0, 12)}${"•".repeat(20)}${apiKey.slice(-4)}`
		: null;

	const handleCopyKey = () => {
		if (apiKey) navigator.clipboard.writeText(apiKey);
	};

	const handleRegenerate = async () => {
		if (
			!confirm(
				"Regenerate API key? The old key will stop working immediately.",
			)
		)
			return;
		const res = await fetch("/api/account/api-key", { method: "POST" });
		const data = await res.json();
		setApiKey(data.apiKey);
	};

	return (
		<main className="bg-black min-h-screen flex flex-col">
			<InnerHeader />

			{/* Hero */}
			<div className="p-3 pt-20">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: EASE }}
						className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight dark:text-white text-neutral-900"
					>
						Account
					</motion.h1>

					{/* Profile */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
						className="flex items-center gap-4 mt-6"
					>
						{session.user.image && (
							<img
								src={session.user.image}
								alt=""
								className="size-12 rounded-full"
							/>
						)}
						<div>
							<p className="font-medium dark:text-white text-neutral-900">
								{session.user.name}
							</p>
							<p className="text-sm dark:text-neutral-400 text-neutral-600">
								{session.user.email}
							</p>
						</div>
					</motion.div>
				</section>
			</div>

			{/* API Key */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-8">
						API Key
					</h2>

					{loading ? (
						<p className="text-sm dark:text-neutral-500 text-neutral-400">
							Loading...
						</p>
					) : apiKey ? (
						<div className="space-y-4 max-w-xl">
							<div className="flex items-center gap-2 rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-4 py-3">
								<code className="text-sm font-mono dark:text-neutral-300 text-neutral-700 flex-1 truncate">
									{showKey ? apiKey : maskedKey}
								</code>
								<Button
									size="icon"
									variant="ghost"
									className="size-7 dark:text-neutral-500 dark:hover:text-white text-neutral-400 hover:text-neutral-900 cursor-pointer shrink-0"
									onClick={() => setShowKey(!showKey)}
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
									className="size-7 dark:text-neutral-500 dark:hover:text-white text-neutral-400 hover:text-neutral-900 cursor-pointer shrink-0"
									onClick={handleCopyKey}
								>
									<Copy className="size-3.5" />
								</Button>
							</div>
							<Button
								size="sm"
								variant="ghost"
								className="text-xs dark:text-neutral-500 dark:hover:text-white text-neutral-400 hover:text-neutral-900 cursor-pointer"
								onClick={handleRegenerate}
							>
								<RefreshCw className="size-3 mr-1.5" />
								Regenerate key
							</Button>
						</div>
					) : (
						<div className="rounded-2xl border dark:border-neutral-800 border-neutral-200 p-6">
							<p className="text-sm dark:text-neutral-400 text-neutral-600 mb-3">
								Subscribe to Pro to get your API key.
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
				</section>
			</div>

			{/* Subscription */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-8">
						Subscription
					</h2>

					{loading ? (
						<p className="text-sm dark:text-neutral-500 text-neutral-400">
							Loading...
						</p>
					) : (
						<div className="space-y-3">
							<div className="flex items-center gap-3">
								<span className="text-sm dark:text-neutral-400 text-neutral-600">
									Status
								</span>
								<StatusBadge
									status={subscription?.status || "free"}
								/>
							</div>
							{subscription?.currentPeriodEnd && (
								<p className="text-sm dark:text-neutral-500 text-neutral-400">
									Next billing:{" "}
									{new Date(
										subscription.currentPeriodEnd,
									).toLocaleDateString()}
								</p>
							)}
							{subscription?.status === "free" && (
								<Button
									size="sm"
									className="mt-2 cursor-pointer"
									asChild
								>
									<a href="/ai">Upgrade to Pro</a>
								</Button>
							)}
						</div>
					)}
				</section>
			</div>

			{/* Usage */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-8">
						Usage
					</h2>
					<p className="text-sm dark:text-neutral-500 text-neutral-400">
						Usage statistics coming soon.
					</p>
				</section>
			</div>

			<Footer />
		</main>
	);
}

function StatusBadge({ status }: { status: string }) {
	const styles: Record<string, string> = {
		active:
			"bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
		cancelled:
			"bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
		past_due:
			"bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
		free: "dark:bg-neutral-800 bg-neutral-100 dark:text-neutral-400 text-neutral-500 dark:border-neutral-700 border-neutral-200",
	};

	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.free}`}
		>
			{status}
		</span>
	);
}
