import Link from "next/link";
import { Button } from "@/components/button";
import PageBreadcrumb from "@/components/layout/breadcrumb";
import Gaps from "@/components/layout/gaps";
import Heading from "@/components/heading";

export default function TagNotFound() {
  return (
    <>
      <PageBreadcrumb />
      <Gaps>
        <div id="section" className="gap-8 text-center">
          <Heading size="big" className="mb-4">
            Tag Not Found
          </Heading>
          <p className="text-muted-foreground text-lg mb-8">
            The tag you&apos;re looking for doesn&apos;t exist or has no
            associated posts.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/blog/tags">Browse All Tags</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </Gaps>
    </>
  );
}
