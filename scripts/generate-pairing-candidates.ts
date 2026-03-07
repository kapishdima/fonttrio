/**
 * Generates curated font pairing JSON files from available fonts.
 * Creates registry:style items in registry/pairings/.
 *
 * Strategy:
 * 1. Define pairing recipes (heading + body + mono combinations)
 * 2. For each recipe, generate a registry:style JSON with typography scale
 * 3. Write to registry/pairings/
 *
 * Usage: bun run scripts/generate-pairing-candidates.ts
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const PAIRINGS_DIR = join(import.meta.dir, "..", "registry", "pairings");
const BASE_URL = "https://fonttrio.dev";

function toKebab(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface PairingRecipe {
  name: string;
  heading: string;
  body: string;
  mono: string;
  description: string;
  categories: string[];
  mood: string[];
  useCase: string[];
  /** Typography scale preset */
  scalePreset: "serif-editorial" | "sans-clean" | "sans-geometric" | "serif-classic" | "display-bold" | "humanist";
}

/**
 * Typography scale presets — different scales for different aesthetics.
 */
const SCALE_PRESETS: Record<string, {
  h1: Record<string, string>;
  h2: Record<string, string>;
  h3: Record<string, string>;
  h4h5h6: Record<string, string>;
  body: Record<string, string>;
}> = {
  "serif-editorial": {
    h1: { "font-size": "2.25rem", "line-height": "1.2", "letter-spacing": "-0.025em", "font-weight": "700" },
    h2: { "font-size": "1.875rem", "line-height": "1.25", "letter-spacing": "-0.02em", "font-weight": "600" },
    h3: { "font-size": "1.5rem", "line-height": "1.3", "letter-spacing": "-0.015em", "font-weight": "600" },
    h4h5h6: { "letter-spacing": "-0.01em" },
    body: { "line-height": "1.65" },
  },
  "sans-clean": {
    h1: { "font-size": "2.25rem", "line-height": "1.15", "letter-spacing": "-0.03em", "font-weight": "700" },
    h2: { "font-size": "1.875rem", "line-height": "1.2", "letter-spacing": "-0.025em", "font-weight": "600" },
    h3: { "font-size": "1.5rem", "line-height": "1.25", "letter-spacing": "-0.02em", "font-weight": "600" },
    h4h5h6: { "letter-spacing": "-0.01em" },
    body: { "line-height": "1.6" },
  },
  "sans-geometric": {
    h1: { "font-size": "2.5rem", "line-height": "1.1", "letter-spacing": "-0.03em", "font-weight": "700" },
    h2: { "font-size": "2rem", "line-height": "1.15", "letter-spacing": "-0.025em", "font-weight": "600" },
    h3: { "font-size": "1.5rem", "line-height": "1.25", "letter-spacing": "-0.015em", "font-weight": "600" },
    h4h5h6: { "letter-spacing": "-0.01em" },
    body: { "line-height": "1.6" },
  },
  "serif-classic": {
    h1: { "font-size": "2.5rem", "line-height": "1.15", "letter-spacing": "-0.015em", "font-weight": "400" },
    h2: { "font-size": "2rem", "line-height": "1.2", "letter-spacing": "-0.01em", "font-weight": "400" },
    h3: { "font-size": "1.5rem", "line-height": "1.3", "letter-spacing": "0em", "font-weight": "400" },
    h4h5h6: { "letter-spacing": "0em" },
    body: { "line-height": "1.75" },
  },
  "display-bold": {
    h1: { "font-size": "2.75rem", "line-height": "1.05", "letter-spacing": "-0.035em", "font-weight": "800" },
    h2: { "font-size": "2.25rem", "line-height": "1.1", "letter-spacing": "-0.025em", "font-weight": "700" },
    h3: { "font-size": "1.75rem", "line-height": "1.2", "letter-spacing": "-0.02em", "font-weight": "700" },
    h4h5h6: { "letter-spacing": "-0.01em" },
    body: { "line-height": "1.6" },
  },
  "humanist": {
    h1: { "font-size": "2.25rem", "line-height": "1.2", "letter-spacing": "-0.02em", "font-weight": "600" },
    h2: { "font-size": "1.75rem", "line-height": "1.25", "letter-spacing": "-0.015em", "font-weight": "600" },
    h3: { "font-size": "1.375rem", "line-height": "1.3", "letter-spacing": "-0.01em", "font-weight": "500" },
    h4h5h6: { "letter-spacing": "-0.005em" },
    body: { "line-height": "1.65" },
  },
};

/**
 * Curated pairing recipes.
 * Each one is a deliberate typographic choice, not random.
 */
const RECIPES: PairingRecipe[] = [
  // ── Existing 6 (skip generation, already exist) ──

  // ── Contrast: Serif heading + Sans body ──
  {
    name: "newspaper",
    heading: "Playfair Display",
    body: "DM Sans",
    mono: "JetBrains Mono",
    description: "High-contrast editorial with a modern twist. Playfair's sharp serifs cut through DM Sans's soft geometry, creating a sophisticated tension between tradition and modernity.",
    categories: ["serif", "contrast", "editorial"],
    mood: ["sophisticated", "editorial"],
    useCase: ["news", "magazine", "blog"],
    scalePreset: "serif-editorial",
  },
  {
    name: "scholar",
    heading: "EB Garamond",
    body: "Inter",
    mono: "Source Code Pro",
    description: "Academic precision meets digital clarity. EB Garamond's renaissance roots lend authority to headings, while Inter ensures perfect screen readability for long-form content.",
    categories: ["serif", "contrast", "academic"],
    mood: ["academic", "refined"],
    useCase: ["documentation", "research", "education"],
    scalePreset: "serif-classic",
  },
  {
    name: "storyteller",
    heading: "Lora",
    body: "Nunito Sans",
    mono: "Inconsolata",
    description: "Warm and inviting. Lora's brushed curves bring narrative warmth to headlines, while Nunito Sans's rounded terminals keep body text approachable and easy to scan.",
    categories: ["serif", "contrast", "warm"],
    mood: ["warm", "narrative"],
    useCase: ["blog", "storytelling", "content"],
    scalePreset: "serif-editorial",
  },
  {
    name: "journal",
    heading: "Merriweather",
    body: "Mulish",
    mono: "Source Code Pro",
    description: "Purpose-built for reading. Merriweather's sturdy serifs hold up at any size, paired with Mulish's neutral warmth for body text that keeps readers engaged paragraph after paragraph.",
    categories: ["serif", "contrast", "readable"],
    mood: ["reliable", "readable"],
    useCase: ["blog", "journal", "publishing"],
    scalePreset: "serif-editorial",
  },
  {
    name: "gazette",
    heading: "Cormorant Garamond",
    body: "Raleway",
    mono: "Roboto Mono",
    description: "Old-world elegance meets contemporary grace. Cormorant Garamond's delicate high-contrast strokes create dramatic headlines, balanced by Raleway's geometric sophistication.",
    categories: ["serif", "contrast", "elegant"],
    mood: ["elegant", "dramatic"],
    useCase: ["magazine", "luxury", "fashion"],
    scalePreset: "serif-classic",
  },
  {
    name: "thesis",
    heading: "Noto Serif",
    body: "Noto Sans",
    mono: "Inconsolata",
    description: "The universal pairing. Noto's unified design system ensures consistent rendering across every language and script. Truly global typography with no tofu.",
    categories: ["serif", "contrast", "universal"],
    mood: ["universal", "professional"],
    useCase: ["documentation", "i18n", "enterprise"],
    scalePreset: "serif-editorial",
  },

  // ── Contrast: Sans heading + Serif body ──
  {
    name: "architect",
    heading: "Outfit",
    body: "Libre Baskerville",
    mono: "IBM Plex Mono",
    description: "Structured meets refined. Outfit's geometric precision in headings contrasts beautifully with Libre Baskerville's warm readability, like blueprints meeting handwritten notes.",
    categories: ["sans-serif", "contrast", "structured"],
    mood: ["structured", "professional"],
    useCase: ["portfolio", "agency", "architecture"],
    scalePreset: "sans-geometric",
  },
  {
    name: "curator",
    heading: "Plus Jakarta Sans",
    body: "PT Serif",
    mono: "Source Code Pro",
    description: "Contemporary curation. Plus Jakarta Sans brings Indonesian design heritage to bold headings, while PT Serif delivers ParaType's exceptional Cyrillic and Latin body text.",
    categories: ["sans-serif", "contrast", "curated"],
    mood: ["curated", "contemporary"],
    useCase: ["gallery", "museum", "portfolio"],
    scalePreset: "humanist",
  },

  // ── Sans + Sans (complementary, different fonts) ──
  {
    name: "dashboard",
    heading: "Manrope",
    body: "DM Sans",
    mono: "Fira Code",
    description: "Data-driven clarity. Manrope's optical corrections make dense dashboards legible, while DM Sans handles labels and descriptions with compact efficiency.",
    categories: ["sans-serif", "complementary", "data"],
    mood: ["analytical", "clear"],
    useCase: ["dashboard", "analytics", "admin"],
    scalePreset: "sans-clean",
  },
  {
    name: "product",
    heading: "Plus Jakarta Sans",
    body: "Inter",
    mono: "JetBrains Mono",
    description: "Product-focused clarity. Jakarta's slightly warmer geometry gives headings personality without the noise, while Inter handles the fine print with surgical precision.",
    categories: ["sans-serif", "complementary", "product"],
    mood: ["friendly", "professional"],
    useCase: ["SaaS", "product", "web app"],
    scalePreset: "sans-clean",
  },
  {
    name: "fintech",
    heading: "Outfit",
    body: "IBM Plex Sans",
    mono: "IBM Plex Mono",
    description: "Trust through typography. Outfit's geometric clarity inspires confidence in headings, while IBM Plex's rigorous design system ensures readability in data-heavy financial interfaces.",
    categories: ["sans-serif", "complementary", "finance"],
    mood: ["trustworthy", "precise"],
    useCase: ["fintech", "banking", "enterprise"],
    scalePreset: "sans-clean",
  },
  {
    name: "studio",
    heading: "Bricolage Grotesque",
    body: "Figtree",
    mono: "Fira Code",
    description: "Design-forward pairing. Bricolage Grotesque's distinctive ink traps and angular terminals command attention, softened by Figtree's friendly geometric body text.",
    categories: ["sans-serif", "creative", "design"],
    mood: ["creative", "distinctive"],
    useCase: ["design studio", "agency", "creative"],
    scalePreset: "display-bold",
  },

  // ── Superfamily (same font heading + body) ──
  {
    name: "corporate",
    heading: "Roboto",
    body: "Roboto",
    mono: "Roboto Mono",
    description: "Google's type system. Roboto's dual nature — mechanical skeleton with friendly curves — creates a cohesive experience from headlines to fine print. The de facto standard for Material Design.",
    categories: ["sans-serif", "superfamily", "corporate"],
    mood: ["neutral", "systematic"],
    useCase: ["enterprise", "Android", "Material Design"],
    scalePreset: "sans-clean",
  },
  {
    name: "document",
    heading: "Source Sans 3",
    body: "Source Sans 3",
    mono: "Source Code Pro",
    description: "Adobe's open-source superfamily. Source Sans 3's humanist proportions excel in UI and documents alike, with Source Code Pro maintaining the same vertical metrics for seamless mixed content.",
    categories: ["sans-serif", "superfamily", "document"],
    mood: ["professional", "versatile"],
    useCase: ["documentation", "enterprise", "publishing"],
    scalePreset: "humanist",
  },
  {
    name: "startup",
    heading: "Nunito",
    body: "Nunito Sans",
    mono: "Fira Code",
    description: "Friendly and approachable. Nunito's rounded terminals give headings warmth, while Nunito Sans straightens out for professional body text. The family that grows with your product.",
    categories: ["sans-serif", "superfamily", "friendly"],
    mood: ["friendly", "approachable"],
    useCase: ["startup", "consumer app", "landing page"],
    scalePreset: "sans-geometric",
  },

  // ── Display-heavy ──
  {
    name: "headline",
    heading: "Anton",
    body: "Work Sans",
    mono: "Roboto Mono",
    description: "Bold and unapologetic. Anton's narrow, impactful letterforms dominate the viewport, while Work Sans's humanist warmth grounds the reading experience in comfortable body text.",
    categories: ["display", "bold", "impactful"],
    mood: ["bold", "impactful"],
    useCase: ["news", "sports", "media"],
    scalePreset: "display-bold",
  },
  {
    name: "poster",
    heading: "Oswald",
    body: "Barlow",
    mono: "Inconsolata",
    description: "Condensed impact. Oswald's tall proportions make every headline a statement, balanced by Barlow's slightly rounded sans-serif that adds approachability to the mechanical strength.",
    categories: ["display", "condensed", "bold"],
    mood: ["commanding", "editorial"],
    useCase: ["media", "news", "marketing"],
    scalePreset: "display-bold",
  },
  {
    name: "brutalist",
    heading: "Archivo Black",
    body: "Archivo",
    mono: "Source Code Pro",
    description: "Raw typographic power. Archivo Black's heavy weight fills every pixel of the headline, while regular Archivo maintains the same DNA in a readable body weight. No decoration, pure function.",
    categories: ["display", "brutalist", "bold"],
    mood: ["raw", "brutalist"],
    useCase: ["portfolio", "art", "experimental"],
    scalePreset: "display-bold",
  },

  // ── Humanist / Warm sans ──
  {
    name: "handbook",
    heading: "Lexend",
    body: "Lexend",
    mono: "Inconsolata",
    description: "Designed for readability research. Lexend's variable font axes were fine-tuned through scientific studies to reduce visual noise and increase reading proficiency.",
    categories: ["sans-serif", "superfamily", "readable"],
    mood: ["accessible", "clear"],
    useCase: ["education", "documentation", "accessibility"],
    scalePreset: "humanist",
  },
  {
    name: "agency",
    heading: "Schibsted Grotesk",
    body: "Karla",
    mono: "Fira Code",
    description: "Nordic minimalism meets grotesque warmth. Schibsted Grotesk's Scandinavian clarity in headlines paired with Karla's quirky grotesque personality for body text that feels human.",
    categories: ["sans-serif", "complementary", "nordic"],
    mood: ["minimal", "nordic"],
    useCase: ["agency", "design", "portfolio"],
    scalePreset: "sans-clean",
  },

  // ── Serif + Serif (harmonious) ──
  {
    name: "literary",
    heading: "EB Garamond",
    body: "Crimson Text",
    mono: "Inconsolata",
    description: "Pure literary elegance. Two old-style serifs in conversation — Garamond's refined Renaissance forms meet Crimson's contemporary interpretation, creating a scholarly harmony.",
    categories: ["serif", "harmonious", "literary"],
    mood: ["scholarly", "literary"],
    useCase: ["publishing", "literature", "academic"],
    scalePreset: "serif-classic",
  },
  {
    name: "novel",
    heading: "Cormorant Garamond",
    body: "Lora",
    mono: "JetBrains Mono",
    description: "For stories worth telling. Cormorant's dramatic display weight arrests attention at the chapter level, while Lora's brush-inspired curves make each paragraph a pleasure to read.",
    categories: ["serif", "harmonious", "narrative"],
    mood: ["dramatic", "literary"],
    useCase: ["publishing", "book", "longform"],
    scalePreset: "serif-classic",
  },

  // ── Wave 2: More pairings from unused fonts ──

  // Sans contrast pairs
  {
    name: "launch",
    heading: "Sora",
    body: "Public Sans",
    mono: "Fira Code",
    description: "Launch-ready confidence. Sora's geometric precision with optical adjustments makes bold headlines pop, while Public Sans — born from US government accessibility standards — ensures every word lands clearly.",
    categories: ["sans-serif", "complementary", "startup"],
    mood: ["modern", "confident"],
    useCase: ["startup", "landing page", "product"],
    scalePreset: "sans-geometric",
  },
  {
    name: "saas",
    heading: "Urbanist",
    body: "Libre Franklin",
    mono: "JetBrains Mono",
    description: "SaaS-native typography. Urbanist's low-contrast geometric forms feel at home in navigation and pricing, while Libre Franklin's newsprint heritage makes feature descriptions feel trustworthy.",
    categories: ["sans-serif", "complementary", "product"],
    mood: ["clean", "startup"],
    useCase: ["SaaS", "pricing page", "product"],
    scalePreset: "sans-clean",
  },
  {
    name: "playful",
    heading: "Quicksand",
    body: "Cabin",
    mono: "Inconsolata",
    description: "Rounded and inviting. Quicksand's perfectly circular counters give headings a toy-like friendliness, while Cabin's humanist proportions keep body text grounded and professional.",
    categories: ["sans-serif", "complementary", "friendly"],
    mood: ["playful", "approachable"],
    useCase: ["kids", "education", "consumer app"],
    scalePreset: "humanist",
  },
  {
    name: "venture",
    heading: "Jost",
    body: "Rubik",
    mono: "Roboto Mono",
    description: "Futura-inspired ambition. Jost channels Paul Renner's geometric ideals for commanding headlines, softened by Rubik's slightly rounded sans-serif that adds just enough warmth for comfortable reading.",
    categories: ["sans-serif", "complementary", "geometric"],
    mood: ["bold", "geometric"],
    useCase: ["venture capital", "finance", "landing page"],
    scalePreset: "sans-geometric",
  },
  {
    name: "govtech",
    heading: "Public Sans",
    body: "Lato",
    mono: "Source Code Pro",
    description: "Government-grade clarity. Public Sans was designed for the US Web Design System — strong, neutral, and accessible. Paired with Lato's warm humanist body text for approachable civic interfaces.",
    categories: ["sans-serif", "complementary", "accessible"],
    mood: ["trustworthy", "accessible"],
    useCase: ["government", "healthcare", "public sector"],
    scalePreset: "humanist",
  },
  {
    name: "devtool",
    heading: "Red Hat Display",
    body: "Red Hat Display",
    mono: "Fira Code",
    description: "Open-source identity. Red Hat Display balances geometric precision with humanist warmth, creating a type system that feels both technical and approachable — exactly what developer tools need.",
    categories: ["sans-serif", "superfamily", "developer"],
    mood: ["technical", "open-source"],
    useCase: ["developer tools", "documentation", "open source"],
    scalePreset: "sans-clean",
  },
  {
    name: "social",
    heading: "Poppins",
    body: "Hind",
    mono: "Roboto Mono",
    description: "Global-ready friendliness. Poppins brings Indian Type Foundry's geometric warmth to headlines, while Hind's Devanagari-first design ensures beautiful rendering across Latin and Indic scripts.",
    categories: ["sans-serif", "complementary", "global"],
    mood: ["friendly", "warm"],
    useCase: ["social media", "consumer app", "i18n"],
    scalePreset: "sans-geometric",
  },
  {
    name: "swiss",
    heading: "Inter Tight",
    body: "Open Sans",
    mono: "IBM Plex Mono",
    description: "Neo-grotesque precision. Inter Tight's condensed proportions pack more information into headlines without sacrificing legibility, while Open Sans provides the reliable body text that 40% of the web already trusts.",
    categories: ["sans-serif", "complementary", "neutral"],
    mood: ["neutral", "systematic"],
    useCase: ["enterprise", "dashboard", "admin"],
    scalePreset: "sans-clean",
  },
  {
    name: "health",
    heading: "Figtree",
    body: "Overpass",
    mono: "Inconsolata",
    description: "Calm and clear. Figtree's friendly geometry in headings paired with Overpass's Highway Gothic roots — designed to be read at speed. Perfect for interfaces where clarity saves lives.",
    categories: ["sans-serif", "complementary", "healthcare"],
    mood: ["calm", "clear"],
    useCase: ["healthcare", "wellness", "medical"],
    scalePreset: "humanist",
  },

  // Serif heading + Sans body
  {
    name: "digest",
    heading: "Bitter",
    body: "Open Sans",
    mono: "Source Code Pro",
    description: "Slab-serif substance. Bitter's sturdy slab serifs were designed specifically for screen reading, making headlines feel anchored and authoritative. Open Sans handles the body with effortless neutrality.",
    categories: ["serif", "contrast", "editorial"],
    mood: ["reliable", "editorial"],
    useCase: ["newsletter", "blog", "content"],
    scalePreset: "serif-editorial",
  },
  {
    name: "manifesto",
    heading: "Roboto Slab",
    body: "Roboto",
    mono: "Roboto Mono",
    description: "The complete Roboto system. Slab headlines bring gravitas to Google's most versatile typeface family. A three-weight system that works everywhere, from Android to enterprise dashboards.",
    categories: ["serif", "superfamily", "systematic"],
    mood: ["systematic", "professional"],
    useCase: ["enterprise", "Material Design", "documentation"],
    scalePreset: "serif-editorial",
  },
  {
    name: "broadsheet",
    heading: "PT Serif",
    body: "PT Sans",
    mono: "Inconsolata",
    description: "Russia's gift to web typography. ParaType's public text fonts — commissioned for pan-Russian readability — pair beautifully: serif headlines carry authority, sans body text ensures clarity across Cyrillic and Latin.",
    categories: ["serif", "superfamily", "universal"],
    mood: ["authoritative", "universal"],
    useCase: ["news", "publishing", "i18n"],
    scalePreset: "serif-editorial",
  },

  // Display-heavy
  {
    name: "impact",
    heading: "Fjalla One",
    body: "Josefin Sans",
    mono: "Fira Code",
    description: "Condensed power meets art deco elegance. Fjalla One's Nordic condensed forms dominate the headline, while Josefin Sans's vintage geometric proportions add character to every paragraph.",
    categories: ["display", "condensed", "bold"],
    mood: ["impactful", "commanding"],
    useCase: ["media", "sports", "marketing"],
    scalePreset: "display-bold",
  },
  {
    name: "capsule",
    heading: "Montserrat",
    body: "Karla",
    mono: "JetBrains Mono",
    description: "Buenos Aires modernism. Montserrat channels the urban signage of its namesake neighborhood — bold, geometric, unmistakable. Karla's grotesque quirks keep body text from feeling clinical.",
    categories: ["sans-serif", "complementary", "urban"],
    mood: ["modern", "bold"],
    useCase: ["fashion", "retail", "branding"],
    scalePreset: "display-bold",
  },
  {
    name: "beacon",
    heading: "Exo 2",
    body: "Titillium Web",
    mono: "Source Code Pro",
    description: "Space-age geometry. Exo 2's futuristic proportions make headlines feel like mission control, while Titillium Web's Italian polytechnic origins keep body text grounded in engineering precision.",
    categories: ["sans-serif", "geometric", "futuristic"],
    mood: ["futuristic", "technical"],
    useCase: ["tech", "space", "gaming"],
    scalePreset: "sans-geometric",
  },
  {
    name: "dossier",
    heading: "Barlow Condensed",
    body: "Barlow",
    mono: "IBM Plex Mono",
    description: "California grotesk in two widths. Barlow Condensed packs maximum information into headlines, while regular Barlow breathes in body text. A superfamily designed for screen-first interfaces.",
    categories: ["sans-serif", "superfamily", "condensed"],
    mood: ["efficient", "modern"],
    useCase: ["dashboard", "data", "news"],
    scalePreset: "sans-clean",
  },

  // Warm humanist pairs
  {
    name: "memoir",
    heading: "Bitter",
    body: "Lora",
    mono: "Inconsolata",
    description: "Two screen-first serifs in harmony. Bitter's sturdy slab headlines ground the page, while Lora's calligraphic curves make every paragraph feel like turning a page in a favorite book.",
    categories: ["serif", "harmonious", "warm"],
    mood: ["warm", "narrative"],
    useCase: ["blog", "memoir", "longform"],
    scalePreset: "serif-classic",
  },
  {
    name: "folio",
    heading: "Josefin Sans",
    body: "Raleway",
    mono: "Roboto Mono",
    description: "Vintage geometry meets modern elegance. Josefin Sans's 1920s-inspired letterforms create distinctive headlines, while Raleway's refined thin weights bring fashion-forward sophistication to body text.",
    categories: ["sans-serif", "complementary", "elegant"],
    mood: ["elegant", "sophisticated"],
    useCase: ["portfolio", "fashion", "luxury"],
    scalePreset: "sans-geometric",
  },
  {
    name: "commons",
    heading: "Cabin",
    body: "Mukta",
    mono: "Fira Code",
    description: "Humanist warmth across scripts. Cabin's slightly condensed forms give headings a distinct character, while Mukta — designed for both Devanagari and Latin — brings inclusive readability to body text.",
    categories: ["sans-serif", "complementary", "inclusive"],
    mood: ["approachable", "inclusive"],
    useCase: ["community", "nonprofit", "education"],
    scalePreset: "humanist",
  },
  {
    name: "protocol",
    heading: "Saira",
    body: "Ubuntu",
    mono: "IBM Plex Mono",
    description: "Racing DNA meets open-source philosophy. Saira's motorsport-inspired geometry powers through headlines, while Ubuntu's distinctive humanist forms — Canonical's signature typeface — make body text unmistakably modern.",
    categories: ["sans-serif", "complementary", "technical"],
    mood: ["technical", "distinctive"],
    useCase: ["developer tools", "Linux", "open source"],
    scalePreset: "sans-geometric",
  },
  {
    name: "dispatch",
    heading: "Heebo",
    body: "Assistant",
    mono: "Source Code Pro",
    description: "Hebrew-Latin harmony. Heebo's geometric forms designed for both scripts create inclusive headlines, while Assistant — with similar dual-script DNA — maintains that consistency through body text.",
    categories: ["sans-serif", "complementary", "global"],
    mood: ["neutral", "inclusive"],
    useCase: ["i18n", "enterprise", "communication"],
    scalePreset: "sans-clean",
  },
];

function buildPairingJson(recipe: PairingRecipe) {
  const scale = SCALE_PRESETS[recipe.scalePreset];
  const headingKebab = toKebab(recipe.heading);
  const bodyKebab = toKebab(recipe.body);
  const monoKebab = toKebab(recipe.mono);

  // Collect unique font dependencies
  const deps = new Set([headingKebab, bodyKebab, monoKebab]);

  return {
    name: `pairing-${recipe.name}`,
    type: "registry:style",
    extends: "none",
    title: `${recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)} — ${recipe.heading} + ${recipe.body} + ${recipe.mono}`,
    description: recipe.description,
    categories: recipe.categories,
    registryDependencies: Array.from(deps).map(
      (d) => `${BASE_URL}/r/${d}.json`
    ),
    cssVars: {
      theme: {
        "--font-heading": `var(--font-${headingKebab})`,
        "--font-body": `var(--font-${bodyKebab})`,
        "--font-mono": `var(--font-${monoKebab})`,
      },
    },
    css: {
      h1: { "font-family": "var(--font-heading)", ...scale.h1 },
      h2: { "font-family": "var(--font-heading)", ...scale.h2 },
      h3: { "font-family": "var(--font-heading)", ...scale.h3 },
      "h4, h5, h6": { "font-family": "var(--font-heading)", ...scale.h4h5h6 },
      "body, p": { "font-family": "var(--font-body)", ...scale.body },
      "code, pre": { "font-family": "var(--font-mono)" },
    },
    meta: {
      preview: "The quick brown fox jumps over the lazy dog",
      mood: recipe.mood,
      useCase: recipe.useCase,
    },
  };
}

function main() {
  mkdirSync(PAIRINGS_DIR, { recursive: true });

  // Existing pairings that should NOT be overwritten
  const EXISTING = new Set([
    "editorial",
    "modern-clean",
    "technical",
    "creative",
    "classic",
    "minimal",
  ]);

  let created = 0;
  let skipped = 0;

  for (const recipe of RECIPES) {
    if (EXISTING.has(recipe.name)) {
      console.log(`SKIP (existing): ${recipe.name}`);
      skipped++;
      continue;
    }

    const filePath = join(PAIRINGS_DIR, `${recipe.name}.json`);

    // Don't overwrite manually edited pairings
    if (existsSync(filePath)) {
      console.log(`SKIP (file exists): ${recipe.name}`);
      skipped++;
      continue;
    }

    const json = buildPairingJson(recipe);
    writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");
    console.log(`CREATED: ${recipe.name} (${recipe.heading} + ${recipe.body} + ${recipe.mono})`);
    created++;
  }

  console.log(`\nDone: ${created} created, ${skipped} skipped`);
  console.log(`Total pairings in registry: ${created + skipped + EXISTING.size}`);
  console.log("\nRun 'bun run generate:fonts' to ensure all font dependencies exist.");
  console.log("Then 'bun run build:registry' to rebuild public/r/.");
}

main();
