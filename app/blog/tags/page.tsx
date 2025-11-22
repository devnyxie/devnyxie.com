import { getAllTags } from "@/lib/api/blog/tags";
import PageBreadcrumb from "@/app/components/layout/breadcrumb";
import Tag from "@/app/components/blog/shared/tag/tag";
import Heading from "@/app/components/heading";
import Gaps from "@/app/components/layout/gaps";
import { getPageData } from "@/lib/api/pages";

import { generateMetadata as createMetadata } from "@/lib/metadata";
import Container from "@/app/components/layout/container";

export const metadata = createMetadata({
  title: "Tags",
  description: "Browse all tags used in articles and deep dives",
});

export default async function TagsPage() {
  const tags = await getAllTags();
  const pageData = await getPageData("tags");

  return (
    <Container>
      <PageBreadcrumb />
      <Gaps>
        <div id="section" className="gap-8">
          <div className="mb-8">
            <Heading size="big" className="mb-2">
              {pageData?.title || "Tags"}
            </Heading>
            <p className="text-muted-foreground">{pageData.description}</p>
          </div>

          {tags.length > 0 ? (
            <div className="space-y-8">
              {/* Popular Tags */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {tags
                    .filter((tag) => tag.count >= 2)
                    .map((tag) => (
                      <div key={tag.name} className="flex items-center gap-2">
                        <Tag
                          name={tag.name}
                          path={`/blog/tags/${encodeURIComponent(tag.name)}`}
                          variant="default"
                        />
                        <span className="text-sm text-muted-foreground">
                          ({tag.count})
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* All Tags */}
              <div>
                <h3 className="text-xl font-semibold mb-4">All Tags</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tags.map((tag) => (
                    <div
                      key={tag.name}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Tag
                          name={tag.name}
                          path={`/blog/tags/${encodeURIComponent(tag.name)}`}
                          variant="subtle"
                        />
                        <span className="text-sm font-medium text-muted-foreground">
                          {tag.count} post{tag.count !== 1 ? "s" : ""}
                        </span>
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1">
                        {tag.articlesCount > 0 && (
                          <div>
                            {tag.articlesCount} article
                            {tag.articlesCount !== 1 ? "s" : ""}
                          </div>
                        )}
                        {tag.deepDivesCount > 0 && (
                          <div>
                            {tag.deepDivesCount} deep dive
                            {tag.deepDivesCount !== 1 ? "s" : ""}
                          </div>
                        )}
                        {tag.mentionsCount > 0 && (
                          <div>
                            {tag.mentionsCount} mention
                            {tag.mentionsCount !== 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No tags found.</p>
          )}
        </div>
      </Gaps>
    </Container>
  );
}
