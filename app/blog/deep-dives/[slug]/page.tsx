import { getAllDeepDives, getDeepDiveBySlug } from "@/lib/api/deep-dives";
import { notFound } from "next/navigation";
import parseMarkdown from "@/lib/utils/markdown_parser";
import { formatDate } from "@/lib/utils";
import "../../../assets/md.css";
import Surround from "@/components/blog/surround";
import Tag from "@/components/blog/tag/tag";
import PageBreadcrumb from "@/components/layout/breadcrumb";

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

  return {
    title: deepDive.title,
    description: deepDive.description,
    openGraph: {
      title: deepDive.title,
      description: deepDive.description,
      type: "article",
      publishedTime: deepDive.date.toISOString(),
    },
  };
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

  const content = await parseMarkdown(deepDive.content);

  return (
    <article className="flex flex-col">
      <PageBreadcrumb pageTitle={deepDive.title} />
      <div className="mb-4 gap-4 flex flex-col items-center">
        <img
          src={deepDive.icon}
          alt={deepDive.title}
          className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl"
        />

        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-medium mb-2">{deepDive.title}</h1>
          <div className="flex gap-2 text-sm">
            <p className="text-muted-foreground">{formatDate(deepDive.date)}</p>
            <div className="flex-1 my-0.5 w-[1px] bg-muted" />
            <p className="text-muted-foreground">
              {deepDive.readTime} min read
            </p>
          </div>
        </div>
        <div className="tags flex flex-wrap gap-1 mt-auto">
          {deepDive.tags &&
            deepDive.tags.length > 0 &&
            deepDive.tags.map((tag, idx) => (
              <Tag
                key={`${tag}-${idx}`}
                name={tag}
                path={`/blog/tags/${tag}`}
                variant="subtle"
              />
            ))}
        </div>
        <Surround post={deepDive} contentType="deep-dives" />
      </div>
      <div
        className="markdown content-body deep-dive"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
