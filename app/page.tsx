import { BestPairs } from "@/app/components/best-pairs";
import { Faq } from "@/app/components/faq";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { Hero } from "@/app/components/hero/hero";
import { HowItWorks } from "@/app/components/how-it-works";
import { Playground } from "@/app/components/playground";
import { SponsorsMarquee } from "@/app/components/sponsors-marquee";
import { XTestimonials } from "@/app/components/x-testimonials";
import { getAllPairings, getAllPopularPairings } from "@/lib/pairings";

export default function Root() {
	const pairings = getAllPairings();
	const popularPairings = getAllPopularPairings();
	const defaultPairingUrl = pairings[0]?.googleFontsUrl;

	return (
		<main className="w-screen overflow-x-hidden bg-black">
			{defaultPairingUrl && (
				<link rel="preload" href={defaultPairingUrl} as="style" />
			)}
			<Header />
			<Hero />
			<Playground pairings={pairings} />
			<HowItWorks />
			<BestPairs pairings={popularPairings} />
			<SponsorsMarquee />
			<XTestimonials />
			<Faq />
			<Footer />
		</main>
	);
}
