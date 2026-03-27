import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Suspense } from "react";

const manrope = Manrope({
	weight: ["400", "500", "600", "700"],
	variable: "--font-manrope",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://www.fonttrio.xyz"),
	title: {
		default: "Fonttrio - Best Font Pairings",
		template: "%s | Fonttrio",
	},
	description:
		"Three fonts. One command. Curated font pairings for shadcn/ui. Install heading, body, and mono fonts with a single CLI command.",
	icons: {
		icon: "/logo/logo-square.svg",
	},
	openGraph: {
		type: "website",
		siteName: "Fonttrio",
		title: "Fonttrio - Best Font Pairings",
		description:
			"Three fonts. One command. Curated font pairings for shadcn/ui.",
		url: "https://www.fonttrio.xyz",
	},
	twitter: {
		card: "summary_large_image",
		title: "Fonttrio - Best Font Pairings",
		description:
			"Three fonts. One command. Curated font pairings for shadcn/ui.",
	},
	alternates: {
		canonical: "https://www.fonttrio.xyz",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta
					name="theme-color"
					content="#fafafa"
					media="(prefers-color-scheme: light)"
				/>
				<meta
					name="theme-color"
					content="#0a0a0a"
					media="(prefers-color-scheme: dark)"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
			</head>
			<body className={`${manrope.variable} antialiased`}>
				<NextThemesProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NuqsAdapter>
						<Suspense fallback={null}>{children}</Suspense>
					</NuqsAdapter>
				</NextThemesProvider>
				<Analytics />
			</body>
		</html>
	);
}
