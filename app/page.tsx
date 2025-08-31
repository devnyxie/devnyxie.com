import Hero from "@/components/landing/hero";
import { getPageData } from "@/lib/api/pages";
import { getConfig } from "@/lib/app.config";

export default function Home() {
  const pageData = getPageData("index");
  const { picture } = getConfig();

  return (
    <div className="w-full flex justify-center">
      <Hero
        title={pageData.title}
        description={pageData.description}
        picture={picture}
      />
    </div>
  );
}
