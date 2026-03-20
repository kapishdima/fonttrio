import {
	LanguageSkillIcon,
	Search01Icon,
	Shirt01Icon,
	SmileIcon,
	ToolCaseIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Header } from "@/app/components/v2/header";
import { PairCard } from "@/app/components/v2/pair-card";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getAllPairings } from "@/lib/pairings";

export default function Redesign04Pairs() {
	return (
		<div className="bg-black ">
			<Header />
			<PaisHero />
			<PairsList />
		</div>
	);
}

function PaisHero() {
	return (
		<div className="h-[70vh] p-3">
			<main className="w-full h-full flex items-center justify-around dark:bg-neutral-950 bg-white rounded-4xl pb-[5vh] px-[5vw]">
				<div className="">
					<h2 className="font-[Manrope] text-5xl font-medium text-neutral-900 dark:text-white">
						Search for the perfect <br /> font pairings
					</h2>
					<div className="flex flex-col max-w-[30vw] ">
						<InputGroup className="h-10 mt-6 pl-2 bg-white border-neutral-200font-['Manrope'] font-medium rounded-2xl">
							<InputGroupInput placeholder="exp, blog about architecture" />
							<InputGroupAddon>
								<HugeiconsIcon
									icon={Search01Icon}
									size={24}
									color="currentColor"
									strokeWidth={1.5}
								/>
							</InputGroupAddon>
						</InputGroup>
					</div>
				</div>

				<div
					className="w-[30%] rounded-xl mb-1 relative overflow-hidden"
					style={{
						maskImage:
							"linear-gradient(to right, transparent, black 40%, black 80%, transparent)",
						WebkitMaskImage:
							"linear-gradient(to right, transparent, black 40%, black 80%, transparent)",
					}}
				>
					<div className="absolute inset-y-[-20%] inset-x-0 flex flex-col justify-around pointer-events-none">
						{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
							<div
								key={i}
								className="w-full border-dashed border-t dark:border-neutral-700/30 border-neutral-200"
							/>
						))}
					</div>
					<p className="font-['Playfair_Display'] text-[10vw] dark:text-neutral-100 text-neutral-800 text-center relative z-10 tracking-tight leading-tight">
						Aa
					</p>
				</div>
			</main>
		</div>
	);
}

function PairsList() {
	const pairings = getAllPairings();

	return (
		<div className="p-2">
			<main className="w-full h-full dark:bg-neutral-950 bg-white rounded-4xl py-16 px-24 ">
				<div className="grid grid-cols-5 gap-x-4 py-4 px-6 bg-neutral-50 rounded-3xl mb-10">
					<Field>
						<FieldLabel>
							<FieldTitle className="text-default">
								<HugeiconsIcon
									icon={Shirt01Icon}
									size={18}
									color="currentColor"
									strokeWidth={1.5}
								/>
								Appearance
							</FieldTitle>
						</FieldLabel>
						<Select>
							<SelectTrigger className="w-full bg-neutral-100">
								<SelectValue placeholder="Appearance" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="blueberry">Blueberry</SelectItem>
								<SelectItem value="grapes">Grapes</SelectItem>
								<SelectItem value="pineapple">Pineapple</SelectItem>
							</SelectContent>
						</Select>
					</Field>
					<Field>
						<FieldLabel>
							<FieldTitle className="text-default">
								<HugeiconsIcon
									icon={ToolCaseIcon}
									size={18}
									color="currentColor"
									strokeWidth={1.5}
								/>
								Use Case
							</FieldTitle>
						</FieldLabel>
						<Select>
							<SelectTrigger className="w-full bg-neutral-100">
								<SelectValue placeholder="Use Case" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="blueberry">Blueberry</SelectItem>
								<SelectItem value="grapes">Grapes</SelectItem>
								<SelectItem value="pineapple">Pineapple</SelectItem>
							</SelectContent>
						</Select>
					</Field>
					<Field>
						<FieldLabel>
							<FieldTitle className="text-default">
								<HugeiconsIcon
									icon={LanguageSkillIcon}
									size={18}
									color="currentColor"
									strokeWidth={1.5}
								/>
								Language support
							</FieldTitle>
						</FieldLabel>
						<Select>
							<SelectTrigger className="w-full bg-neutral-100">
								<SelectValue placeholder="Language support" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="blueberry">Blueberry</SelectItem>
								<SelectItem value="grapes">Grapes</SelectItem>
								<SelectItem value="pineapple">Pineapple</SelectItem>
							</SelectContent>
						</Select>
					</Field>
					<Field>
						<FieldLabel>
							<FieldTitle className="text-default">
								<HugeiconsIcon
									icon={SmileIcon}
									size={18}
									color="currentColor"
									strokeWidth={1.5}
								/>
								Feeling
							</FieldTitle>
						</FieldLabel>
						<Select>
							<SelectTrigger className="w-full bg-neutral-100">
								<SelectValue placeholder="Feeling" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="blueberry">Blueberry</SelectItem>
								<SelectItem value="grapes">Grapes</SelectItem>
								<SelectItem value="pineapple">Pineapple</SelectItem>
							</SelectContent>
						</Select>
					</Field>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
					{pairings.map((pairing) => (
						<PairCard key={pairing.name} pairing={pairing} />
					))}
				</div>
			</main>
		</div>
	);
}
