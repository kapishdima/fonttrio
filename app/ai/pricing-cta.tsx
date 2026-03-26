"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { getCheckoutUrl } from "@/lib/pro";

export function PricingCta() {
	const { data: session } = authClient.useSession();

	return (
		<Button
			variant="default"
			className="w-full h-10 cursor-pointer"
			asChild
		>
			<a
				href={session?.user ? getCheckoutUrl(session.user.id) : "#"}
				onClick={(e) => {
					if (!session?.user) {
						e.preventDefault();
						authClient.signIn.social({ provider: "github" });
					}
				}}
			>
				{session?.user ? "Subscribe" : "Sign in to subscribe"}
			</a>
		</Button>
	);
}
