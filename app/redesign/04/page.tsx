"use client";

import { BestPairs } from "@/app/components/v2/best-pairs";
import { Faq } from "@/app/components/v2/faq";
import { Footer } from "@/app/components/v2/footer";
import { Header } from "@/app/components/v2/header";
import { Hero } from "@/app/components/v2/hero/hero";
import { HowItWorks } from "@/app/components/v2/how-it-works";
import { Playground } from "@/app/components/v2/playground";
import { SponsorsMarquee } from "@/app/components/v2/sponsors-marquee";
import { XTestimonials } from "@/app/components/v2/x-testimonials";

export default function Redesign04() {
	return (
		<main className="w-screen overflow-x-hidden bg-black">
			<Header />
			<Hero />
			<SponsorsMarquee />
			<HowItWorks />
			<Playground />
			<BestPairs />
			<XTestimonials />
			<Faq />
			<Footer />
		</main>
	);
}
