import { AuthLayout } from "@/app/components/auth/auth-layout";
import { SignInForm } from "@/app/components/auth/sign-in-form";
import {
	AuthDivider,
	SocialButtons,
} from "@/app/components/auth/social-buttons";

export default function SignInPage() {
	return (
		<AuthLayout>
			<h1 className="text-2xl sm:text-3xl font-medium tracking-tight dark:text-white text-neutral-900 mt-8 mb-2">
				Sign in
			</h1>
			<p className="text-sm dark:text-neutral-500 text-neutral-400 mb-8">
				Enter your credentials to continue
			</p>

			<SocialButtons />
			<AuthDivider />
			<SignInForm />

			<p className="mt-6 text-center text-sm dark:text-neutral-500 text-neutral-400">
				Don&apos;t have an account?{" "}
				<a
					href="/sign-up"
					className="dark:text-white text-neutral-900 underline underline-offset-2"
				>
					Sign up
				</a>
			</p>
		</AuthLayout>
	);
}
