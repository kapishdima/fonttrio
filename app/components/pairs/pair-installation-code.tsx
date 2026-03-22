import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import {
	CodeBlockCommand,
	convertNpmCommand,
} from "@/components/code-block-command/code-block-command";
import { buildInstallCommand } from "@/lib/package-managers";
import type { PairingData } from "@/lib/pairings";

type PairInstallationCodeProps<T extends ElementType = "div"> = {
	as?: T;
	pairing: PairingData;
	className?: string;
} & ComponentPropsWithoutRef<T>;

export function PairInstallationCode<T extends ElementType = "div">({
	pairing,
	as,
	className,
}: PairInstallationCodeProps<T>) {
	const Comp = as || "div";

	return (
		<Comp
			className={clsx(
				"dark:bg-neutral-900/50 bg-neutral-100 dark:text-white text-neutral-800 rounded-md text-sm font-medium block",
				className,
			)}
		>
			<CodeBlockCommand
				{...convertNpmCommand(buildInstallCommand(pairing.name))}
			/>
		</Comp>
	);
}
