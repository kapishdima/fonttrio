"use client";

import { TestimonialSpotlight } from "@/components/testimonial-spotlight/testimonial-spotlight";

const marqueeStyles = `
@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - 1rem));
  }
}

.marquee-animate {
  animation: marquee-scroll var(--marquee-speed) linear infinite;
}

.marquee-container:hover .marquee-animate.pause-on-hover {
  animation-play-state: paused;
}
`;

interface Testimonial {
	name: string;
	username: string;
	content: string;
	avatar?: string;
	className?: string;
	url?: string;
}

export function Marquee({
	children,
	direction = "left",
	speed = 40,
	pauseOnHover = false,
	className = "",
}: {
	children: React.ReactNode;
	direction?: "left" | "right";
	speed?: number;
	pauseOnHover?: boolean;
	className?: string;
}) {
	return (
		<>
			<style>{marqueeStyles}</style>
			<div
				className={`marquee-container flex overflow-hidden gap-4 ${className}`}
				style={{
					maskImage:
						"linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
					WebkitMaskImage:
						"linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
				}}
			>
				{[0, 1, 2, 3].map((i) => (
					<div
						key={i}
						className={`marquee-animate flex shrink-0 gap-4 ${pauseOnHover ? "pause-on-hover" : ""}`}
						style={{
							"--marquee-speed": `${speed}s`,
							animationDirection: direction === "right" ? "reverse" : "normal",
							willChange: "transform",
						}}
						aria-hidden={i > 0}
					>
						{children}
					</div>
				))}
			</div>
		</>
	);
}

export function TestimonialCard({
	name,
	username,
	content,
	avatar,
	url,
	className = "",
}: Testimonial) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className={`relative w-87.5 shrink-0 cursor-pointer rounded-xl border dark:border-neutral-900 border-neutral-200 dark:bg-neutral-950 bg-white p-5 transition-[background-color,border-color] ease-out duration-150 dark:hover:border-neutral-700/60 hover:border-neutral-300 dark:hover:bg-neutral-900/60 hover:bg-neutral-50 ${className}`}
		>
			<div className="flex items-center gap-3 mb-3">
				{avatar ? (
					// biome-ignore lint/performance/noImgElement: <>
					<img
						src={avatar}
						alt={name}
						className="w-9.5 h-9.5 rounded-full object-cover dark:border-zinc-700/50 border-neutral-200 border"
					/>
				) : (
					<div className="w-10 h-10 rounded-full dark:bg-linear-to-br dark:from-zinc-700 dark:to-zinc-800 bg-neutral-100 flex items-center justify-center dark:border-zinc-700/50 border-neutral-200 border">
						<span className="text-sm font-medium tracking-tighter dark:text-zinc-300 text-neutral-600">
							{name?.charAt(0)?.toUpperCase() || "?"}
						</span>
					</div>
				)}
				<div className="flex flex-col">
					<span className="text-sm font-bold dark:text-zinc-200 text-neutral-800">
						{name}
					</span>
					<span className="text-xs dark:text-zinc-500 text-neutral-500">
						{username}
					</span>
				</div>
			</div>
			<p className="text-sm font-medium dark:text-zinc-400 text-neutral-600 leading-normal text-balance">
				{content}
			</p>
		</a>
	);
}

export function TestimonialMarquee({
	testimonials = [],
	speed = 40,
	pauseOnHover = true,
	className = "",
}: {
	testimonials: Testimonial[];
	speed?: number;
	pauseOnHover?: boolean;
	className?: string;
}) {
	const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
	const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

	return (
		<div
			className={`relative flex flex-col gap-4 overflow-hidden py-4 ${className}`}
		>
			<div className="pb-px">
				<Marquee direction="left" speed={speed} pauseOnHover={pauseOnHover}>
					{firstRow.map((testimonial) => (
						<TestimonialSpotlight
							className="w-[80vw] sm:w-[50vw] md:w-[30vw] lg:w-[25vw] max-w-full"
							key={testimonial.username}
							authorAvatar={testimonial.avatar ?? ""}
							authorName={testimonial.name}
							authorTagline={testimonial.username}
							url={testimonial.url ?? ""}
							quote={testimonial.content}
						/>
					))}
				</Marquee>
			</div>
			<Marquee direction="right" speed={speed} pauseOnHover={pauseOnHover}>
				{secondRow.map((testimonial) => (
					<TestimonialSpotlight
						className="w-[80vw] sm:w-[50vw] md:w-[30vw] lg:w-[25vw] max-w-full"
						key={testimonial.username}
						authorAvatar={testimonial.avatar ?? ""}
						authorName={testimonial.name}
						authorTagline={testimonial.username}
						url={testimonial.url ?? ""}
						quote={testimonial.content}
					/>
					// <TestimonialCard key={testimonial.name} {...testimonial} />
				))}
			</Marquee>
		</div>
	);
}
