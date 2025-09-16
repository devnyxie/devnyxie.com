import ContentPage, {
  generateContentPageMetadata,
} from "@/components/layout/content-page";
import { getPageData } from "@/lib/api/pages";
import parseMarkdown from "@/lib/utils/markdown_parser";
import { Metadata } from "next";
import "@/app/assets/md.css";

export async function generateStaticParams() {
  // This ensures the page is statically generated at build time
  return [];
}

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageData("about");
  return generateContentPageMetadata({
    title: page.title,
    description: page.description,
  });
}

export default async function Page() {
  const page = getPageData("about");
  const processedContent = await parseMarkdown(page.content);
  return (
    <ContentPage
      title={page.title}
      description={page.description}
      processedContent={processedContent}
    />
  );
}
