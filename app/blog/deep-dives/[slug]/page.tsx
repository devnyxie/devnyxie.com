import { getAllDeepDives, getDeepDiveBySlug } from "@/lib/api/blog/deep-dives";
import { notFound } from "next/navigation";
import MDXContent from "@/app/components/mdx-content";
import "@/app/assets/md.css";
import Surround from "@/app/components/blog/shared/surround";
import PageBreadcrumb from "@/app/components/layout/breadcrumb";
import { generateMetadata as createMetadata } from "@/lib/metadata";
import IntroSection from "@/app/components/blog/shared/introSection";
import TableOfContents from "@/app/components/blog/shared/tableOfContents-v2";

export async function generateStaticParams() {
  const deepDives = await getAllDeepDives();
  return deepDives.map((deepDive) => ({
    slug: deepDive.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deepDive = await getDeepDiveBySlug(slug);

  if (!deepDive) {
    return {
      title: "Deep Dive Not Found",
    };
  }

  return createMetadata({
    title: deepDive.title,
    description: deepDive.description,
    type: "article",
    publishedTime: deepDive.date.toISOString(),
  });
}

export default async function DeepDivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deepDive = await getDeepDiveBySlug(slug);

  if (!deepDive) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,var(--breakpoint-md))_minmax(0,1fr)]">
      <div className="col-start-2">
        <PageBreadcrumb pageTitle={deepDive.title} />
      </div>
      <div className="col-start-2 gap-4 flex flex-col items-center">
        <IntroSection {...deepDive} />
      </div>
      <div className="col-start-2 gap-2 my-6">
        <Surround post={deepDive} contentType="deep-dives" />
      </div>

      <div className="content-body prose col-start-2 relative">
        <MDXContent source={deepDive.content} />
      </div>
      <TableOfContents />
      <div className="col-start-2 gap-2 mt-6">
        <Surround post={deepDive} contentType="deep-dives" />
      </div>
    </div>
  );
}
