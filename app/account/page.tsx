"use client";

import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

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
			<div className="min-h-screen bg-black flex items-center justify-center">
				<p className="text-white/60 text-sm">Loading...</p>
			</div>
		);
	}

	if (!session?.user) {
		if (typeof window !== "undefined") {
			authClient.signIn.social({ provider: "github" });
		}
		return (
			<div className="min-h-screen bg-black flex items-center justify-center">
				<p className="text-white/60 text-sm">Redirecting to sign in...</p>
			</div>
		);
	}

	const maskedKey = apiKey
		? `${apiKey.slice(0, 12)}${"•".repeat(20)}${apiKey.slice(-4)}`
		: null;

	const handleCopyKey = () => {
		if (apiKey) navigator.clipboard.writeText(apiKey);
	};

	const handleRegenerate = async () => {
		if (!confirm("Regenerate API key? The old key will stop working immediately.")) return;
		const res = await fetch("/api/account/api-key", { method: "POST" });
		const data = await res.json();
		setApiKey(data.apiKey);
	};

	return (
		<div className="min-h-screen bg-black">
			<div className="mx-auto max-w-2xl px-6 py-24">
				<h1 className="text-2xl font-bold text-white mb-8">Account</h1>

				{/* Profile */}
				<section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
					<h2 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
						Profile
					</h2>
					<div className="flex items-center gap-4">
						{session.user.image && (
							<img
								src={session.user.image}
								alt=""
								className="size-12 rounded-full"
							/>
						)}
						<div>
							<p className="text-white font-medium">{session.user.name}</p>
							<p className="text-white/50 text-sm">{session.user.email}</p>
						</div>
					</div>
				</section>

				{/* API Key */}
				<section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
					<h2 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
						API Key
					</h2>
					{loading ? (
						<p className="text-white/40 text-sm">Loading...</p>
					) : apiKey ? (
						<div className="space-y-3">
							<div className="flex items-center gap-2 bg-black/50 rounded-lg px-3 py-2 border border-white/10">
								<code className="text-sm text-white/80 font-mono flex-1 truncate">
									{showKey ? apiKey : maskedKey}
								</code>
								<Button
									size="icon"
									variant="ghost"
									className="size-7 text-white/40 hover:text-white cursor-pointer"
									onClick={() => setShowKey(!showKey)}
								>
									{showKey ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
								</Button>
								<Button
									size="icon"
									variant="ghost"
									className="size-7 text-white/40 hover:text-white cursor-pointer"
									onClick={handleCopyKey}
								>
									<Copy className="size-3.5" />
								</Button>
							</div>
							<Button
								size="sm"
								variant="ghost"
								className="text-xs text-white/40 hover:text-white cursor-pointer"
								onClick={handleRegenerate}
							>
								<RefreshCw className="size-3 mr-1.5" />
								Regenerate
							</Button>
						</div>
					) : (
						<p className="text-white/40 text-sm">
							Subscribe to Pro to get your API key.
						</p>
					)}
				</section>

				{/* Subscription */}
				<section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
					<h2 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
						Subscription
					</h2>
					{loading ? (
						<p className="text-white/40 text-sm">Loading...</p>
					) : (
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<span className="text-white/60 text-sm">Status:</span>
								<StatusBadge status={subscription?.status || "free"} />
							</div>
							{subscription?.currentPeriodEnd && (
								<p className="text-white/40 text-sm">
									Next billing:{" "}
									{new Date(subscription.currentPeriodEnd).toLocaleDateString()}
								</p>
							)}
							{subscription?.status === "free" && (
								<Button
									size="sm"
									className="mt-3 text-xs rounded-full cursor-pointer"
									asChild
								>
									<a href="/ai">Upgrade to Pro</a>
								</Button>
							)}
						</div>
					)}
				</section>

				{/* Usage (placeholder) */}
				<section className="rounded-2xl border border-white/10 bg-white/5 p-6">
					<h2 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
						Usage
					</h2>
					<p className="text-white/30 text-sm">
						Usage statistics coming soon.
					</p>
				</section>
			</div>
		</div>
	);
}

function StatusBadge({ status }: { status: string }) {
	const colors: Record<string, string> = {
		active: "bg-green-500/20 text-green-400 border-green-500/30",
		cancelled: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
		past_due: "bg-red-500/20 text-red-400 border-red-500/30",
		free: "bg-white/10 text-white/50 border-white/20",
	};

	return (
		<span
			className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colors[status] || colors.free}`}
		>
			{status}
		</span>
	);
}
