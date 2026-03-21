import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GITHUB_REPO, SOCIAL_LINKS } from "@/lib/constants";

export const GithubStars = () => {
	const [count, setCount] = useState<string | null>(null);

	const fetchData = async () => {
		const data = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
			next: { revalidate: 86400 },
		});
		const json = await data.json();
		const count = json.stargazers_count;

		setCount(
			new Intl.NumberFormat("en-US", {
				notation: "compact",
			}).format(count),
		);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Link
			href={SOCIAL_LINKS.github.url}
			target="_blank"
			rel="noopener noreferrer"
			className="text-white/60 hover:text-white cursor-pointer flex items-center gap-1"
			aria-label={SOCIAL_LINKS.github.label}
		>
			<HugeiconsIcon
				icon={GithubIcon}
				size={16}
				color="currentColor"
				strokeWidth={1.5}
				aria-hidden="true"
			/>
			<span className=" text-xs tracking-tighter font-['Manrope'] font-medium">
				{count}
			</span>
		</Link>
	);
};
