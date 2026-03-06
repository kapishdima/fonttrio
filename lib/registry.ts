import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const REGISTRY_DIR = join(process.cwd(), "registry");
const FONTS_DIR = join(REGISTRY_DIR, "fonts");
const PAIRINGS_DIR = join(REGISTRY_DIR, "pairings");

export interface FontItem {
  name: string;
  type: "registry:font";
  title: string;
  description: string;
  font: {
    family: string;
    provider: string;
    import: string;
    variable: string;
    weight: string[];
    subsets: string[];
  };
}

export interface PairingItem {
  name: string;
  type: "registry:style";
  extends: string;
  title: string;
  description: string;
  categories: string[];
  registryDependencies: string[];
  cssVars: {
    theme: Record<string, string>;
  };
  css: Record<string, Record<string, string>>;
  meta: {
    preview: string;
    mood: string[];
    useCase: string[];
  };
}

export interface RegistryIndex {
  fonts: Array<{
    name: string;
    title: string;
    category: string;
    url: string;
  }>;
  pairings: Array<{
    name: string;
    title: string;
    description: string;
    categories: string[];
    mood: string[];
    useCase: string[];
    url: string;
  }>;
}

function readJsonDir<T>(dir: string): T[] {
  try {
    const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
    return files.map((f) => {
      const content = readFileSync(join(dir, f), "utf-8");
      return JSON.parse(content) as T;
    });
  } catch {
    return [];
  }
}

export function getAllFonts(): FontItem[] {
  return readJsonDir<FontItem>(FONTS_DIR);
}

export function getAllPairings(): PairingItem[] {
  return readJsonDir<PairingItem>(PAIRINGS_DIR);
}

export function getFont(name: string): FontItem | null {
  try {
    const content = readFileSync(join(FONTS_DIR, `${name}.json`), "utf-8");
    return JSON.parse(content) as FontItem;
  } catch {
    return null;
  }
}

export function getPairing(name: string): PairingItem | null {
  try {
    const content = readFileSync(join(PAIRINGS_DIR, `${name}.json`), "utf-8");
    return JSON.parse(content) as PairingItem;
  } catch {
    return null;
  }
}

export function buildRegistryIndex(baseUrl = "https://fonttrio.dev"): RegistryIndex {
  const fonts = getAllFonts();
  const pairings = getAllPairings();

  return {
    fonts: fonts.map((f) => ({
      name: f.name,
      title: f.title,
      category: f.font?.provider || "google",
      url: `${baseUrl}/r/${f.name}.json`,
    })),
    pairings: pairings.map((p) => ({
      name: p.name,
      title: p.title,
      description: p.description,
      categories: p.categories,
      mood: p.meta?.mood || [],
      useCase: p.meta?.useCase || [],
      url: `${baseUrl}/r/${p.name.replace("pairing-", "")}.json`,
    })),
  };
}
