import { motion } from "motion/react";
import { TestimonialMarquee } from "@/app/components/v2/testimonials";

const titleVariants = {
	hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.6, ease: "easeOut" },
	},
} as const;

const testimonials = [
	{
		name: "Evil Rabbit",
		username: "@evilrabbit_",
		content: "This is freaking siiiiiiiick! 🔥",
		url: "https://x.com/evilrabbit_/status/2031101326197989789",
		avatar:
			"https://pbs.twimg.com/profile_images/1998237655063257088/o5zyt_vG_400x400.jpg",
	},
	{
		name: "Duncan",
		username: "@ephraimduncan",
		content: "another banger, nice work",
		url: "https://x.com/ephraimduncan/status/2030370672984182938",
		avatar:
			"https://pbs.twimg.com/profile_images/1740764353408753664/uPGbBhm0_400x400.jpg",
	},
	{
		name: "Ali Bey",
		username: "@alibey_10",
		content: "From idea to launch, it just took you few hours 🚀 congrats!",
		url: "https://x.com/alibey_10/status/2030371649703321876",
		avatar:
			"https://pbs.twimg.com/profile_images/1935578610854719488/E-Wn2FKX_400x400.jpg",
	},
	{
		name: "Ajay Patel",
		username: "@ajaypatel_aj",
		content:
			"This is great, in just few hours you made solution for typography which is most underrated in design.",
		url: "https://x.com/ajaypatel_aj/status/2030491498232656069",
		avatar:
			"https://pbs.twimg.com/profile_images/1957717329397141507/7ctDgOuc_400x400.jpg",
	},
	{
		name: "Matt",
		username: "@uixmat",
		content: "love this mate, great product 😍",
		url: "https://x.com/uixmat/status/2030545630666403983",
		avatar:
			"https://pbs.twimg.com/profile_images/1816722074292899840/nsnPz-xI_400x400.jpg",
	},
	{
		name: "Edu Calvo",
		username: "@educalvolpz",
		content:
			"Nice idea Kapish! It would be nice to be able to have users' personal settings saved",
		url: "https://x.com/educalvolpz/status/2030950003804430716",
		avatar:
			"https://pbs.twimg.com/profile_images/2031310688287698944/DHV-K82k_400x400.jpg",
	},
	{
		name: "zenith",
		username: "@bossadizenith",
		content: "woofff, another day to make life way simpler.",
		url: "https://x.com/bossadizenith/status/2030394148134461673",
		avatar:
			"https://pbs.twimg.com/profile_images/1995053464305434625/okAv-Eab_400x400.jpg",
	},
	{
		name: "shadcn",
		username: "@shadcn",
		content:
			"This is amazing. Using the registry for font distribution. One click install. Congrats on the launch @kapish_dima",
		url: "https://x.com/shadcn/status/2030369586172850558",
		avatar:
			"https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
	},
	{
		name: "Ray Fernando",
		username: "@RayFernando1337",
		content:
			"Font curation like this will make you stand out in the sea of slop.",
		url: "https://x.com/RayFernando1337/status/2031022899742843050",
		avatar:
			"https://pbs.twimg.com/profile_images/1764104074772000768/XcLXXaib_400x400.jpg",
	},
	{
		name: "OrcDev",
		username: "@orcdev",
		content:
			'You can now add a new font to your shadcn app with one command.This is one of those "how did I not think of this" ideas.Genius! well done Dima',
		url: "https://x.com/orcdev/status/2030388789978227164",
		avatar:
			"https://pbs.twimg.com/profile_images/1756766826736893952/6Gvg6jha_400x400.jpg",
	},
	{
		name: "Chánh Đại",
		username: "@iamncdai",
		content: "Shipping speed is insane. Amazing shadcn ecosystem.",
		url: "https://x.com/iamncdai/status/2030480793836175395",
		avatar:
			"https://pbs.twimg.com/profile_images/1905665979662958595/Y0_Ifuk5_400x400.jpg",
	},
	{
		name: "Moumen Soliman",
		username: "@moumensoliman",
		content: "As always, \n@kapish_dima\n delivers 🔥",
		url: "https://x.com/moumensoliman/status/2030799605126795461",
		avatar:
			"https://pbs.twimg.com/profile_images/1985030661556539392/1bLFRnib_400x400.jpg",
	},
	{
		name: "Soleio",
		username: "@soleio",
		content: "Mar 2026",
		url: "https://x.com/soleio/status/2030386724401229888",
		avatar:
			"https://pbs.twimg.com/profile_images/1786076507330195456/6HobRr_a_400x400.jpg",
	},
];

export function XTestimonials() {
	return (
		<section className="py-16 px-24 overflow-hidden  dark:bg-black bg-white">
			<motion.h2
				className="font-['Manrope'] text-5xl dark:text-white text-neutral-800 font-medium tracking-tight text-balance mb-10"
				variants={titleVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-250px" }}
			>
				What our users say
			</motion.h2>

			<TestimonialMarquee
				testimonials={testimonials}
				speed={45}
				pauseOnHover={true}
			/>
		</section>
	);
}
