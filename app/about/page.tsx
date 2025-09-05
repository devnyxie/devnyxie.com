import Heading from "@/components/heading";
import Hero from "@/components/landing/hero";
import { getPageData } from "@/lib/api/pages";
import { getConfig } from "@/lib/app.config";

export default function Page() {
  const page = getPageData("about");
  const {} = getConfig();

  return (
    <div className="mb-8">
      <Heading className="mb-2" size="big">
        {page.title}
      </Heading>
      <p className="text-muted-foreground">{page.description}</p>
    </div>
  );
}
