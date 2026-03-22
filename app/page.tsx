import { BestPairs } from "@/app/components/best-pairs";
import { Faq } from "@/app/components/faq";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { Hero } from "@/app/components/hero/hero";
import { HowItWorks } from "@/app/components/how-it-works";
import { Playground } from "@/app/components/playground";
import { SponsorsMarquee } from "@/app/components/sponsors-marquee";
import { XTestimonials } from "@/app/components/x-testimonials";
import { getAllPairings } from "@/lib/pairings";

export default function Redesign04() {
	const pairings = getAllPairings();

	return (
		<main className="w-screen overflow-x-hidden bg-black">
			<Header />
			<Hero />
			<SponsorsMarquee />
			<HowItWorks />
			<Playground pairings={pairings} />
			<BestPairs pairings={pairings} />
			<XTestimonials />
			<Faq />
			<Footer />
		</main>
	);
}
