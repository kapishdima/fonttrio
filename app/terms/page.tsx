import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms of Service — fonttrio",
	description: "Terms and conditions for using the fonttrio registry.",
};

const LAST_UPDATED = "March 30, 2026";

export default function TermsOfServicePage() {
	return (
		<main className="bg-black">
			<InnerHeader />

			<div className="p-3 pt-28">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					{/* Header */}
					<div className="mb-16 md:mb-20">
						<h1 className="text-4xl sm:text-5xl font-medium tracking-tight dark:text-white text-neutral-900 text-balance">
							Terms of Service
						</h1>
						<p className="mt-4 text-sm dark:text-neutral-500 text-neutral-400 tabular-nums">
							Last updated: {LAST_UPDATED}
						</p>
					</div>

					{/* Content */}
					<div className="max-w-2xl space-y-12">
						<Section title="Acceptance of Terms">
							<p>
								By accessing or using fonttrio, you agree to be bound by these
								Terms of Service. If you do not agree, please do not use the
								service.
							</p>
						</Section>

						<Section title="Description of Service">
							<p>
								fonttrio is a curated, open-source font pairing registry
								compatible with shadcn/ui. It provides JSON metadata for Google
								Fonts pairings that can be installed via the shadcn CLI. fonttrio
								does not host or distribute font files — it references fonts
								served by Google Fonts.
							</p>
						</Section>

						<Section title="Use of the Registry">
							<p>
								You may freely use the fonttrio registry to install font pairings
								in your projects, whether personal or commercial. Pairings are
								installed via the shadcn CLI using our public registry endpoint.
								There are no usage limits or fees.
							</p>
						</Section>

						<Section title="Intellectual Property">
							<p>
								Fonts referenced by fonttrio are the property of their respective
								authors and are subject to their individual licenses (typically
								the SIL Open Font License or Apache License 2.0). fonttrio does
								not claim ownership over any fonts.
							</p>
							<p>
								The fonttrio codebase is open-source. Please refer to the license
								file in our{" "}
								<Anchor href="https://github.com/kapishdima/fonttrio">
									GitHub repository
								</Anchor>{" "}
								for details.
							</p>
						</Section>

						<Section title="Third-Party Content">
							<p>
								fonttrio integrates with third-party services including Google
								Fonts and Vercel. Your use of these services is governed by their
								respective terms. fonttrio is not responsible for the
								availability, accuracy, or licensing changes of third-party fonts
								or services.
							</p>
						</Section>

						<Section title="Disclaimer of Warranties">
							<p>
								fonttrio is provided &ldquo;as is&rdquo; and &ldquo;as
								available&rdquo; without warranties of any kind, express or
								implied. We do not guarantee that the service will be
								uninterrupted, error-free, or that font pairings will be
								compatible with every project configuration.
							</p>
						</Section>

						<Section title="Limitation of Liability">
							<p>
								To the fullest extent permitted by law, fonttrio and its
								contributors shall not be liable for any indirect, incidental,
								special, or consequential damages arising from your use of the
								service.
							</p>
						</Section>

						<Section title="Changes to Terms">
							<p>
								We may revise these terms at any time. Changes take effect when
								posted on this page. Continued use of fonttrio after changes
								constitutes acceptance of the updated terms.
							</p>
						</Section>

						<Section title="Contact">
							<p>
								Questions about these terms? Reach out via our{" "}
								<Anchor href="https://github.com/kapishdima/fonttrio">
									GitHub repository
								</Anchor>
								.
							</p>
						</Section>
					</div>
				</section>
			</div>

			<Footer />
		</main>
	);
}

function Section({
	title,
	children,
}: { title: string; children: React.ReactNode }) {
	return (
		<div>
			<h2 className="text-lg font-medium dark:text-white text-neutral-900 mb-3">
				{title}
			</h2>
			<div className="space-y-3 text-base dark:text-neutral-400 text-neutral-600 leading-relaxed">
				{children}
			</div>
		</div>
	);
}

function Anchor({
	href,
	children,
}: { href: string; children: React.ReactNode }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-500 dark:hover:decoration-neutral-400 transition-colors duration-150"
		>
			{children}
		</a>
	);
}
