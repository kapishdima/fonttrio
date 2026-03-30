import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy — fonttrio",
	description: "How fonttrio handles your data and privacy.",
};

const LAST_UPDATED = "March 30, 2026";

export default function PrivacyPolicyPage() {
	return (
		<main className="bg-black">
			<InnerHeader />

			<div className="p-3 pt-28">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					{/* Header */}
					<div className="mb-16 md:mb-20">
						<h1 className="text-4xl sm:text-5xl font-medium tracking-tight dark:text-white text-neutral-900 text-balance">
							Privacy Policy
						</h1>
						<p className="mt-4 text-sm dark:text-neutral-500 text-neutral-400 tabular-nums">
							Last updated: {LAST_UPDATED}
						</p>
					</div>

					{/* Content */}
					<div className="max-w-2xl space-y-12">
						<Section title="Overview">
							<p>
								fonttrio is an open-source, curated font pairing registry for
								shadcn. We are committed to keeping your experience simple and
								your data private. We do not require accounts, collect personal
								information, or track individual users.
							</p>
						</Section>

						<Section title="Information We Collect">
							<p>
								fonttrio does not collect personal data. We do not use sign-up
								forms, authentication, or user profiles. When you visit our
								website, standard web server logs may record your IP address,
								browser type, and referring page — this is handled by our hosting
								provider and is not used to identify individuals.
							</p>
						</Section>

						<Section title="Analytics">
							<p>
								We use Vercel Analytics to understand aggregate traffic patterns
								such as page views and visitor counts. Vercel Analytics is
								privacy-focused and does not use cookies or collect personally
								identifiable information. You can learn more in{" "}
								<Anchor href="https://vercel.com/docs/analytics/privacy-policy">
									Vercel&rsquo;s analytics privacy policy
								</Anchor>
								.
							</p>
						</Section>

						<Section title="Third-Party Services">
							<p>
								When you install a font pairing via the shadcn CLI, fonts are
								loaded from Google Fonts. Google may collect usage data according
								to their own privacy policy. fonttrio itself does not proxy,
								cache, or store font files — we provide JSON metadata only.
							</p>
							<p>
								Our website is hosted on Vercel. Please refer to{" "}
								<Anchor href="https://vercel.com/legal/privacy-policy">
									Vercel&rsquo;s privacy policy
								</Anchor>{" "}
								for information on how they handle hosting-related data.
							</p>
						</Section>

						<Section title="Cookies">
							<p>
								fonttrio does not set any first-party cookies. Third-party
								services embedded on the site (such as analytics) may set their
								own cookies according to their respective policies.
							</p>
						</Section>

						<Section title="Data Retention">
							<p>
								Since we do not collect personal data, there is nothing to
								retain. Server logs maintained by our hosting provider are subject
								to their own retention policies.
							</p>
						</Section>

						<Section title="Your Rights">
							<p>
								If you believe any of your data has been collected inadvertently,
								or if you have questions about your privacy, please contact us and
								we will address your concerns promptly.
							</p>
						</Section>

						<Section title="Changes to This Policy">
							<p>
								We may update this policy from time to time. Changes will be
								reflected on this page with an updated date. Continued use of the
								site constitutes acceptance of the revised policy.
							</p>
						</Section>

						<Section title="Contact">
							<p>
								For privacy-related questions, reach out via our{" "}
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
