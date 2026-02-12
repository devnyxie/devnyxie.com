import { Metadata } from "next";

interface BaseMetadata {
  title: string;
  description: string;
  siteName?: string;
  type?: "website" | "article";
  publishedTime?: string;
  image?: string;
}

export function generateMetadata({
  title,
  description,
  siteName = "Tim Afanasiev",
  type = "website",
  publishedTime,
  image,
}: BaseMetadata): Metadata {
  // Disabled for now, repeating site name when shared on social media
  // const fullTitle = title.includes(siteName) ? title : `${title} - ${siteName}`;
  const fullTitle = title;
  const metadata: Metadata = {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type,
      siteName,
      ...(image && { images: [{ url: image }] }),
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image && { images: [image] }),
    },
  };

  return metadata;
}
