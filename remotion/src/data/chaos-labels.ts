export interface ChaosLabel {
	x: number;
	y: number;
	label: string;
	rotation: number;
	phase: number; // for float animation offset
}

// Seeded random for deterministic positions
function seededRandom(seed: number) {
	let s = seed;
	return () => {
		s = (s * 16807) % 2147483647;
		return (s - 1) / 2147483646;
	};
}

const FONT_NAMES = [
	"Playfair Display", "Source Serif 4", "JetBrains Mono", "Inter",
	"Geist Mono", "IBM Plex Sans", "IBM Plex Mono", "Space Grotesk",
	"DM Sans", "Fira Code", "DM Serif Display", "Libre Baskerville",
	"Geist", "Outfit", "Manrope", "Roboto", "Open Sans", "Lato",
	"Montserrat", "Poppins", "Raleway", "Nunito", "Bebas Neue",
	"Merriweather", "PT Sans", "Ubuntu", "Oswald", "Quicksand",
	"Cabin", "Karla", "Rubik", "Work Sans", "Josefin Sans",
	"Mulish", "Barlow", "Inconsolata", "Arimo", "Source Code Pro",
	"Crimson Text", "Lora", "Noto Sans", "Bitter", "Dosis",
	"Exo 2", "Archivo", "Overpass", "Lexend", "Sora",
];

const rand = seededRandom(42);
const W = 1920;
const H = 1080;
const TOTAL = 200;

// Grid-jittered placement: divide screen into cells, place one label per cell
// with random jitter. This guarantees even coverage across the full area.
const COLS = 14;
const ROWS = Math.ceil(TOTAL / COLS);
const CELL_W = W / COLS;
const CELL_H = H / ROWS;

export const CHAOS_LABELS: ChaosLabel[] = Array.from(
	{ length: TOTAL },
	(_, i) => {
		const col = i % COLS;
		const row = Math.floor(i / COLS);

		// Position within cell with jitter (70% of cell size)
		const jitterX = (rand() - 0.5) * CELL_W * 0.7;
		const jitterY = (rand() - 0.5) * CELL_H * 0.7;

		return {
			x: Math.min(W - 40, Math.max(40, (col + 0.5) * CELL_W + jitterX)),
			y: Math.min(H - 30, Math.max(30, (row + 0.5) * CELL_H + jitterY)),
			label: FONT_NAMES[i % FONT_NAMES.length],
			rotation: (rand() - 0.5) * 50,
			phase: rand() * Math.PI * 2,
		};
	},
);
