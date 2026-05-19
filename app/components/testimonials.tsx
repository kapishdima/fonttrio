"use client";

import {
	Marquee,
	MarqueeContent,
	MarqueeItem,
} from "@/components/kibo-ui/marquee";
import {
	Testimonial,
	TestimonialAuthor,
	TestimonialAuthorName,
	TestimonialAuthorTagline,
	TestimonialAvatar,
	TestimonialAvatarImg,
	TestimonialAvatarRing,
	TestimonialQuote,
} from "@/components/testimonial";

interface ITestimonial {
	name: string;
	username: string;
	content: string;
	avatar?: string;
	className?: string;
	url?: string;
}

export function TestimonialMarquee({
	testimonials = [],
}: {
	testimonials: ITestimonial[];
}) {
	const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
	const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

	return (
		<div className="w-full [&_.rfm-initial-child-container]:items-stretch!  [&_.rfm-marquee]:items-stretch!">
			{[firstRow, secondRow].map((list, index) => (
				<Marquee
					key={`marquee-${index}`}
					className="border-y border-line first:border-b-0"
				>
					<MarqueeContent direction={index % 2 === 1 ? "right" : "left"}>
						{list.map((item) => (
							<MarqueeItem
								key={item.url}
								className="mx-0 h-full w-xs border-r border-line"
							>
								<a
									className="block h-full transition-[background-color] ease-out hover:bg-accent/20"
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Testimonial>
										<TestimonialQuote className="text-sm">
											<p>{item.content}</p>
										</TestimonialQuote>

										<TestimonialAuthor>
											<TestimonialAvatar>
												<TestimonialAvatarImg src={item.avatar} />
												<TestimonialAvatarRing />
											</TestimonialAvatar>

											<TestimonialAuthorName>{item.name}</TestimonialAuthorName>

											<TestimonialAuthorTagline>
												{item.username}
											</TestimonialAuthorTagline>
										</TestimonialAuthor>
									</Testimonial>
								</a>
							</MarqueeItem>
						))}
					</MarqueeContent>
				</Marquee>
			))}
		</div>
	);
}
