import { Metadata } from "next";
import Heading from "@/app/components/heading";
import PageBreadcrumb from "@/app/components/layout/breadcrumb";
import DynamicMDXContent from "@/app/components/dynamic-mdx-content";
import Container from "./container";

interface ContentPageProps {
  title: string;
  description: string;
  processedContent?: string; // Already processed HTML (legacy)
  content?: string; // Raw content to be processed with MDX
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

export default async function ContentPage({
  title,
  description,
  processedContent,
  content,
}: ContentPageProps) {
  return (
    <Container className="mb-8">
      <PageBreadcrumb />
      <Heading className="mb-2" size="big">
        {title}
      </Heading>
      <p className="text-muted-foreground mb-8">{description}</p>

      <div className="markdown content-body">
        {content ? (
          <DynamicMDXContent source={content} />
        ) : processedContent ? (
          <div dangerouslySetInnerHTML={{ __html: processedContent }} />
        ) : (
          <div>No content available</div>
        )}
      </div>
    </Container>
  );
}
