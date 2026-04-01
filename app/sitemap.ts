import type { MetadataRoute } from "next";
import { getAllPairings } from "@/lib/pairings";
import { getAllFonts } from "@/lib/registry";

const BASE_URL = "https://www.fonttrio.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const pairings = getAllPairings();
  const fonts = getAllFonts();

  const pairingUrls = pairings.map((p) => ({
    url: `${BASE_URL}/pairs/${p.name}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const fontUrls = fonts.map((f) => ({
    url: `${BASE_URL}/fonts/${f.name}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/sponsors`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...pairingUrls,
    ...fontUrls
  ];
}
