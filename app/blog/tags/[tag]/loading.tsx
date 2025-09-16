import PageBreadcrumb from "@/components/layout/breadcrumb";
import Gaps from "@/components/layout/gaps";

export default function TagLoading() {
  return (
    <>
      <PageBreadcrumb />
      <Gaps>
        <div id="section" className="gap-8">
          {/* Header skeleton */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="mb-3">
                <div className="h-6 w-24 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-10 w-80 bg-muted rounded animate-pulse mb-2" />
              <div className="h-5 w-96 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-10 w-24 bg-muted rounded animate-pulse" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-12">
            {/* Deep Dives Section */}
            <div>
              <div className="mb-6">
                <div className="h-8 w-32 bg-muted rounded animate-pulse mb-2" />
                <div className="h-5 w-64 bg-muted rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-6 animate-pulse">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0" />
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="h-6 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-full" />
                        <div className="h-4 bg-muted rounded w-2/3" />
                        <div className="flex gap-2 mt-2">
                          <div className="h-6 w-16 bg-muted rounded" />
                          <div className="h-6 w-20 bg-muted rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Articles Section */}
            <div>
              <div className="mb-6">
                <div className="h-8 w-24 bg-muted rounded animate-pulse mb-2" />
                <div className="h-5 w-56 bg-muted rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-6 animate-pulse">
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-full mb-1" />
                    <div className="h-4 bg-muted rounded w-2/3 mb-4" />
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-muted rounded" />
                      <div className="h-6 w-20 bg-muted rounded" />
                      <div className="h-6 w-18 bg-muted rounded" />
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
