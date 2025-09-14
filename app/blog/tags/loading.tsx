import PageBreadcrumb from "@/components/breadcrumb";
import Gaps from "@/components/layout/gaps";

export default function TagsLoading() {
  return (
    <>
      <PageBreadcrumb />
      <Gaps>
        <div id="section" className="gap-8">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="h-10 w-24 bg-muted rounded animate-pulse mb-4" />
            <div className="h-6 w-96 bg-muted rounded animate-pulse" />
          </div>

          <div className="space-y-8">
            {/* Popular Tags Section */}
            <div>
              <div className="h-7 w-32 bg-muted rounded animate-pulse mb-4" />
              <div className="flex flex-wrap gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-8 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* All Tags Section */}
            <div>
              <div className="h-7 w-24 bg-muted rounded animate-pulse mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 animate-pulse">
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-6 w-24 bg-muted rounded" />
                      <div className="h-4 w-16 bg-muted rounded" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-3 w-20 bg-muted rounded" />
                      <div className="h-3 w-16 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Gaps>
    </>
  );
}
