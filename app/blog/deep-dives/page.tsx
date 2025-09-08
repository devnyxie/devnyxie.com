import { getAllDeepDives } from "@/lib/api/deep-dives";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Tag from "@/components/blog/tag/tag";
import PageBreadcrumb from "@/components/breadcrumb";

export const metadata = {
  title: "Deep Dives",
  description: "In-depth explorations of complex topics",
};

export default async function DeepDivesPage() {
  const deepDives = await getAllDeepDives();

  return (
    <div>
      <PageBreadcrumb />
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Deep Dives</h1>
        <p className="text-muted-foreground text-lg">
          In-depth explorations of complex topics
        </p>
      </div>

      <div className="grid gap-6">
        {deepDives.map((deepDive) => (
          <article
            key={deepDive.slug}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={deepDive.icon}
                  alt={deepDive.title}
                  className="w-12 h-12 rounded-lg flex-shrink-0"
                />

                <div className="flex flex-col gap-2 flex-1">
                  <Link
                    href={`/blog/deep-dives/${deepDive.slug}`}
                    className="text-xl font-semibold hover:text-primary transition-colors"
                  >
                    {deepDive.title}
                  </Link>

                  <p className="text-muted-foreground line-clamp-2">
                    {deepDive.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{formatDate(deepDive.date)}</span>
                    <span>•</span>
                    <span>{deepDive.readTime} min read</span>
                  </div>

                  {deepDive.tags && deepDive.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {deepDive.tags.map((tag, idx) => (
                        <Tag
                          key={`${tag}-${idx}`}
                          name={tag}
                          path={`/blog/tags/${tag}`}
                          variant="subtle"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
