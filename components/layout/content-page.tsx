import { Metadata } from "next";
import Heading from "@/components/heading";
import PageBreadcrumb from "@/components/layout/breadcrumb";

interface ContentPageProps {
  title: string;
  description: string;
  processedContent: string; // Already processed HTML
}

interface ContentPageMetadata {
  title: string;
  description: string;
  siteName?: string;
}

export function generateContentPageMetadata({
  title,
  description,
  siteName = "Tim Afanasiev",
}: ContentPageMetadata): Metadata {
  const fullTitle = `${title} - ${siteName}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}

export default function ContentPage({
  title,
  description,
  processedContent,
}: ContentPageProps) {
  return (
    <div className="mb-8">
      <PageBreadcrumb />
      <Heading className="mb-2" size="big">
        {title}
      </Heading>
      <p className="text-muted-foreground mb-8">{description}</p>

      <div
        className="markdown content-body"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  );
}
