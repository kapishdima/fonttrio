import type { MetadataRoute } from "next";
import { getAllPairings } from "@/lib/pairings";

const BASE_URL = "https://www.fonttrio.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const pairings = getAllPairings();

  const pairingUrls = pairings.map((p) => ({
    url: `${BASE_URL}/${p.name}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pairingUrls,
    {
      url: `${BASE_URL}/sponsors`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
