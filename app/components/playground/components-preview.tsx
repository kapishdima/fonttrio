"use client";

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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import type { PairingData } from "@/lib/pairings";

export function ComponentsPreview({
	activePairing,
	className,
}: {
	activePairing: PairingData;
	className?: string;
}) {
	const headingFont = `"${activePairing.heading}", ${activePairing.headingCategory}`;
	const bodyFont = `"${activePairing.body}", ${activePairing.bodyCategory}`;
	const monoFont = `"${activePairing.mono}", monospace`;

	return (
		<div
			className={className ?? "flex-2 dark:bg-neutral-950 bg-white overflow-auto lg:max-h-160 hidden lg:block"}
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
