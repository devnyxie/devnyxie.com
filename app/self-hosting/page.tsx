import ContentPage, {
  generateContentPageMetadata,
} from "@/components/layout/content-page";
import { getPageData } from "@/lib/api/pages";
import { Metadata } from "next";
import "@/app/assets/md.css";

export async function generateStaticParams() {
  // This ensures the page is statically generated at build time
  return [];
}

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageData("self-hosting");
  return generateContentPageMetadata({
    title: page.title,
    description: page.description,
  });
}

export default async function Page() {
  const page = getPageData("self-hosting");

  return (
    <ContentPage
      title={page.title}
      description={page.description}
      content={page.content}
    />
  );
}
