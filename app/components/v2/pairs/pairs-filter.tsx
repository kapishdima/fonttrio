import {
	LanguageSkillIcon,
	Search01Icon,
	Shirt01Icon,
	SmileIcon,
	ToolCaseIcon,
	Trash2,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const FILTERS = [
	{ id: "appearance", icon: Shirt01Icon, label: "Appearance" },
	{ id: "usecase", icon: ToolCaseIcon, label: "Use Case" },
	{ id: "language", icon: LanguageSkillIcon, label: "Language" },
	{ id: "feeling", icon: SmileIcon, label: "Feeling" },
];

export function PairFilter() {
	return (
		// bg-neutral-50 border border-neutral-100
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl">
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
					<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
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
					<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
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
					<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
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
					<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
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
	);
}

export function FilterPill() {
	const [activeFilter, setActiveFilter] = useState<any>(null);

	return (
		<>
			<motion.div
				layout
				className={`bg-neutral-950 backdrop-blur-md border border-white/10 flex flex-col overflow-hidden rounded-full z-0 px-2 py-1.5 w-[20vw]`}
				transition={{ layout: { duration: 0.3, type: "spring", bounce: 0 } }}
			>
				<InputGroup className="border-none text-white rounded-full">
					<InputGroupAddon>
						<HugeiconsIcon
							icon={Search01Icon}
							size={24}
							color="currentColor"
							strokeWidth={1.5}
						/>
					</InputGroupAddon>
					<InputGroupInput />
				</InputGroup>
			</motion.div>
			<motion.div
				layout
				className={`bg-neutral-950 backdrop-blur-md border border-white/10 flex flex-col overflow-hidden rounded-full z-0`}
				transition={{ layout: { duration: 0.3, type: "spring", bounce: 0 } }}
			>
				<div className="flex items-center gap-1 px-2 py-1.5">
					{FILTERS.map((filter) => (
						<>
							<Button
								size="icon"
								variant="ghost"
								className={`h-8 w-8 rounded-full p-0 text-white ${activeFilter === filter.id ? "bg-white text-neutral-950" : "bg-transparent"}`}
								onClick={() =>
									setActiveFilter((f) => (f === filter.id ? null : filter.id))
								}
							>
								<HugeiconsIcon
									icon={filter.icon}
									size={12}
									strokeWidth={1.5}
									color="currentColor"
								/>
							</Button>
							{activeFilter === filter.id ? (
								<motion.div
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<Select>
										<SelectTrigger className="w-40 bg-neutral-800 border-neutral-700 text-white text-xs h-8">
											<SelectValue placeholder={filter.label} />
										</SelectTrigger>
										<SelectContent className="fixed z-200">
											<SelectItem value="apple">Apple</SelectItem>
											<SelectItem value="banana">Banana</SelectItem>
											<SelectItem value="blueberry">Blueberry</SelectItem>
											<SelectItem value="grapes">Grapes</SelectItem>
											<SelectItem value="pineapple">Pineapple</SelectItem>
										</SelectContent>
									</Select>
								</motion.div>
							) : null}
						</>
					))}
					<Button
						size="icon"
						variant="destructive"
						className={`h-8 w-8 rounded-full p-0`}
					>
						<HugeiconsIcon
							icon={Trash2}
							size={12}
							strokeWidth={1.5}
							color="currentColor"
						/>
					</Button>
				</div>
			</motion.div>
		</>
	);
}
