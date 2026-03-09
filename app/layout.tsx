import type { Metadata } from "next";
import { Bebas_Neue, Heebo } from "next/font/google";
import "./globals.css";
import { AllFontsLoader } from "./components/all-fonts-loader";
import { ThemeProvider } from "./components/theme-provider";
import { PackageManagerProvider } from "@/lib/contexts/package-manager-context";
import { FloatingFontPanel } from "./components/floating-font-panel";

import { Analytics } from "@vercel/analytics/next";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Suspense } from "react";


const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://www.fonttrio.xyz"),
  title: {
    default: "Fonttrio - Font Pairings for shadcn",
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
    title: "Fonttrio - Font Pairings for shadcn",
    description:
      "Three fonts. One command. Curated font pairings for shadcn/ui.",
    url: "https://www.fonttrio.xyz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fonttrio - Font Pairings for shadcn",
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
        <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <AllFontsLoader />
      </head>
      <body className={`${bebasNeue.variable}  antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Fonttrio",
              url: "https://www.fonttrio.xyz",
              description:
                "Curated font pairings for shadcn/ui. Install heading, body, and mono fonts with a single CLI command.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
      <Suspense fallback={null}>
          <PackageManagerProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border"
            >
              Skip to main content
            </a>
            {children}
            <FloatingFontPanel />
          </PackageManagerProvider>
          </Suspense>
          </NuqsAdapter>
        </ThemeProvider>
        <Analytics/>
      </body>
    </html>
  );
}
