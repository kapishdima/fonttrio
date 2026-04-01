import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function BackLink({ href, text }: { href: string; text: string }) {
	return (
		<Link
			href={href}
			className="inline-flex items-center gap-1.5 text-sm font-medium dark:text-neutral-400 text-neutral-500 dark:hover:text-neutral-200 hover:text-neutral-800 transition-colors mb-8"
		>
			<HugeiconsIcon icon={ArrowLeft02Icon} size={16} />
			{text}
		</Link>
	);
}
