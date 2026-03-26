import { AuthLayout } from "@/app/components/auth/auth-layout";
import { SignUpForm } from "@/app/components/auth/sign-up-form";
import {
	AuthDivider,
	SocialButtons,
} from "@/app/components/auth/social-buttons";

export default function SignUpPage() {
	return (
		<AuthLayout>
			<h1 className="text-2xl sm:text-3xl font-medium tracking-tight dark:text-white text-neutral-900 mt-8 mb-2">
				Create account
			</h1>
			<p className="text-sm dark:text-neutral-500 text-neutral-400 mb-8">
				Get started with Fonttrio
			</p>

			<SocialButtons />
			<AuthDivider />
			<SignUpForm />

			<p className="mt-6 text-center text-sm dark:text-neutral-500 text-neutral-400">
				Already have an account?{" "}
				<a
					href="/sign-in"
					className="dark:text-white text-neutral-900 underline underline-offset-2"
				>
					Sign in
				</a>
			</p>
		</AuthLayout>
	);
}
