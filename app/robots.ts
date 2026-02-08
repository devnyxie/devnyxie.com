import { MetadataRoute } from "next";
import { APP_CONFIG } from "@/app.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${APP_CONFIG.domain}/sitemap.xml`,
  };
}
