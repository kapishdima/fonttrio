"use client";

import { useRouter } from "next/navigation";
import { type SubmitEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);

		const { error: authError } = await authClient.signUp.email({
			name,
			email,
			password,
		});

		if (authError) {
			setError(authError.message || "Could not create account");
			setLoading(false);
			return;
		}

		router.push("/");
	}

	return (
		<form onSubmit={handleSubmit}>
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor="name">Name</FieldLabel>
					<Input
						id="name"
						type="text"
						name="name"
						autoComplete="name"
						placeholder="Your name"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="h-10"
					/>
				</Field>

				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input
						id="email"
						type="email"
						name="email"
						autoComplete="email"
						placeholder="you@example.com"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="h-10"
					/>
				</Field>

				<Field>
					<FieldLabel htmlFor="password">Password</FieldLabel>
					<Input
						id="password"
						type="password"
						name="password"
						autoComplete="new-password"
						required
						minLength={8}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="h-10"
					/>
				</Field>

				{error && <FieldError>{error}</FieldError>}

				<Button
					type="submit"
					className="w-full h-10 cursor-pointer"
					disabled={loading}
				>
					{loading ? "Creating account..." : "Create account"}
				</Button>
			</FieldGroup>
		</form>
	);
}
