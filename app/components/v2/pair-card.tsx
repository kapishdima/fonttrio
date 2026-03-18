"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { usePackageManagerContext } from "@/lib/contexts/package-manager-context";
import { useLazyFontLoad } from "@/lib/hooks/use-lazy-font-load";
import { buildInstallCommand } from "@/lib/package-managers";
import type { PairingData } from "@/lib/pairings";

interface PairCardProps {
	pairing: PairingData;
}

export function PairCard({ pairing }: PairCardProps) {
	const { ref, loaded } = useLazyFontLoad(pairing.googleFontsUrl);
	const { packageManager } = usePackageManagerContext();
	const command = buildInstallCommand(pairing.name, packageManager);

	const [opened, setOpened] = useState(false);

	return (
		<>
			<motion.div
				layoutId={`card-${pairing.name}`}
				ref={ref as React.Ref<HTMLDivElement>}
				onClick={() => setOpened((t) => !t)}
				className={
					"group flex flex-col h-full rounded-xl border dark:border-neutral-900/50 dark:bg-neutral-950 overflow-hidden dark:hover:bg-neutral-800/60 transition-colors cursor-pointer z-0 active:scale-[0.98]"
				}
			>
				<div
					className={`flex-1 px-6 py-5 flex flex-col gap-2 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
				>
					<motion.p
						layoutId={`heading-${pairing.name}`}
						className="text-3xl md:text-2xl text-neutral-200 truncate font-['Manrope'] font-extrabold"
					>
						{pairing.heading}
					</motion.p>

					<motion.p
						layoutId={`description-${pairing.name}`}
						className="text-sm text-neutral-600 line-clamp-2 font-['Manrope'] font-medium leading-normal"
					>
						{pairing.description}
					</motion.p>
				</div>

				<div className="w-full flex items-center gap-2 px-6 py-3 border-t dark:border-neutral-900/50 dark:bg-neutral-900/50 hover:bg-neutral-800/50 text-left transition-colors min-h-[44px]">
					<code className="flex-1 truncate text-neutral-500 font-medium text-xs font-['Manrope']">
						{command}
					</code>
				</div>
			</motion.div>

			<AnimatePresence>{opened ? <Overlay /> : null}</AnimatePresence>
			<AnimatePresence>
				{opened ? (
					<ActivePair onClickAway={() => setOpened(false)} pair={pairing} />
				) : null}
			</AnimatePresence>
		</>
	);
}

function Overlay() {
	return createPortal(
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="w-screen h-screen bg-black/20 backdrop-blur-sm fixed top-0 left-0 z-99"
		/>,
		document.body,
	);
}

function ActivePair({
	pair,
	onClickAway,
}: {
	pair: PairingData;
	onClickAway: () => void;
}) {
	const ref = useClickAway(onClickAway);

	return createPortal(
		<motion.div
			ref={ref}
			layoutId={`card-${pair.name}`}
			className="w-[30vw]  px-6 py-5 rounded-xl border dark:border-neutral-900/50 dark:bg-neutral-950 overflow-hidden fixed top-1/2 left-1/2 z-999 -translate-x-1/2 -translate-y-1/2"
		>
			<motion.p
				layoutId={`heading-${pair.name}`}
				className="text-2xl md:text-4xl text-neutral-200 truncate font-extrabold mb-3"
				style={{
					fontFamily: pair.heading,
				}}
			>
				{pair.heading}
			</motion.p>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.2 }}
			>
				<Button className="absolute top-5 right-5">Open</Button>
			</motion.div>

			<motion.p
				layoutId={`description-${pair.name}`}
				className="font-['Manrope'] text-sm text-neutral-600 line-clamp-2 font-medium leading-normal pb-8 border-b dark:border-neutral-900/50"
			>
				{pair.description}
			</motion.p>
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.2 }}
				className="text-sm text-neutral-600 font-medium leading-normal mt-5"
				style={{
					fontFamily: pair.description,
				}}
			>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy text ever
				since the 1500s, when an unknown printer took a galley of type and
				scrambled it to make a type specimen book.
			</motion.p>

			<motion.code
				className="px-4 py-2 bg-neutral-900 text-primary-foreground rounded-md text-sm mt-4 block"
				style={{ fontFamily: pair.mono }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: 0.3 }}
			>
				{buildInstallCommand(pair.name, "npm")}
			</motion.code>
		</motion.div>,
		document.body,
	);
}
