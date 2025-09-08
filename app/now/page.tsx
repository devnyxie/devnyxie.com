import Heading from "@/components/heading";
import { getPageData } from "@/lib/api/pages";
import PageBreadcrumb from "@/components/breadcrumb";

export default function Page() {
  const page = getPageData("now");

  return (
    <div className="mb-8">
      <PageBreadcrumb />
      <Heading className="mb-2" size="big">
        {page.title}
      </Heading>
      <p className="text-muted-foreground">{page.description}</p>
    </div>
  );
}
