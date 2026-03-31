import { useEffect, useRef, useState } from "react";
import type { FilterState } from "../hooks/use-pairings";

interface Props {
	filters: FilterState;
	onChange: (filters: FilterState) => void;
}

const MOODS = [
	"elegant",
	"playful",
	"professional",
	"minimal",
	"warm",
	"bold",
	"modern",
	"literary",
	"friendly",
	"neutral",
];
const USE_CASES = [
	"blog",
	"landing",
	"dashboard",
	"documentation",
	"ecommerce",
	"SaaS",
	"startup",
	"publishing",
];
const CATEGORIES = ["serif", "sans-serif", "monospace"];

export function Filters({ filters, onChange }: Props) {
	const [localQuery, setLocalQuery] = useState(filters.query);
	const debounceRef = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		debounceRef.current = setTimeout(() => {
			if (localQuery !== filters.query) {
				onChange({ ...filters, query: localQuery });
			}
		}, 300);
		return () => clearTimeout(debounceRef.current);
	}, [localQuery, filters, onChange]);

	return (
		<div className="filters">
			<input
				type="text"
				placeholder="Search pairings..."
				value={localQuery}
				onChange={(e) => setLocalQuery(e.target.value)}
				className="filters__search"
			/>
			<div className="filters__row">
				<select
					value={filters.mood}
					onChange={(e) => onChange({ ...filters, mood: e.target.value })}
					className="filters__select"
				>
					<option value="">Mood</option>
					{MOODS.map((m) => (
						<option key={m} value={m}>
							{m}
						</option>
					))}
				</select>
				<select
					value={filters.useCase}
					onChange={(e) => onChange({ ...filters, useCase: e.target.value })}
					className="filters__select"
				>
					<option value="">Use Case</option>
					{USE_CASES.map((u) => (
						<option key={u} value={u}>
							{u}
						</option>
					))}
				</select>
				<select
					value={filters.category}
					onChange={(e) => onChange({ ...filters, category: e.target.value })}
					className="filters__select"
				>
					<option value="">Category</option>
					{CATEGORIES.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
