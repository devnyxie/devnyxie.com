import Heading from "@/components/heading";
import { getPageData } from "@/lib/api/pages";
import PageBreadcrumb from "@/components/breadcrumb";
import parseMarkdown from "@/lib/utils/markdown_parser";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageData("now");

  return {
    title: `${page.title} - Tim Afanasiev`,
    description: page.description,
    openGraph: {
      title: `${page.title} - Tim Afanasiev`,
      description: page.description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${page.title} - Tim Afanasiev`,
      description: page.description,
    },
  };
}

export default async function Page() {
  const page = getPageData("now");
  const content = await parseMarkdown(page.content);

  return (
    <div className="mb-8">
      <PageBreadcrumb />
      <Heading className="mb-2" size="big">
        {page.title}
      </Heading>
      <p className="text-muted-foreground mb-8">{page.description}</p>

      <div
        className="markdown content-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
