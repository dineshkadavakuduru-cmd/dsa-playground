import type { MetadataRoute } from "next";
import { STRUCTURES, type StructureKind } from "./_lib/structures";

const SITE_URL = "https://dsa-playground-puce.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...(Object.keys(STRUCTURES) as StructureKind[]).map((kind) => ({
      url: `${SITE_URL}/${kind}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
