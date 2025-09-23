import { getAllDeepDives } from "@/lib/api/blog/deep-dives";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Tag from "@/components/blog/shared/tag/tag";
import PageBreadcrumb from "@/components/layout/breadcrumb";

import { generateMetadata as createMetadata } from "@/lib/metadata";
import { Button } from "@/components/button";
import Container from "@/components/layout/container";
import List from "@/components/layout/list";

export const metadata = createMetadata({
  title: "Deep Dives",
  description:
    "In-depth explorations of complex topics in software engineering",
});

export default async function DeepDivesPage() {
  const deepDives = await getAllDeepDives();

  return (
    <Container>
      <PageBreadcrumb />
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-4">Deep Dives</h1>
          <p className="text-muted-foreground text-lg">
            In-depth explorations of complex topics
          </p>
        </div>
        <div className="flex gap-2 h-max">
          <Link href="/blog/tags">
            <Button variant={"outline"} size={"md"}>
              Browse Tags
            </Button>
          </Link>
        </div>
      </div>

      <List gap="6">
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
      </List>
    </Container>
  );
}
