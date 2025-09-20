import Heading from "@/components/heading";
import { getPageData } from "@/lib/api/pages";
import { getAllPortfolioItems } from "@/lib/api/portfolio";
import { getAllDesigns } from "@/lib/api/designs";
import PageBreadcrumb from "@/components/layout/breadcrumb";
import ProjectCard from "@/components/portfolio/project-card";
import DesignCard from "@/components/portfolio/design-card";
import Gaps from "@/components/layout/gaps";
import { generateMetadata as createMetadata } from "@/lib/metadata";
import { PortfolioPageType } from "@/lib/types/pages/portfolio";

export async function generateMetadata() {
  const page: PortfolioPageType = getPageData("portfolio");
  return createMetadata({
    title: page.title,
    description: page.description,
  });
}

export default async function PortfolioPage() {
  const page = await getPageData("portfolio");
  const projects = await getAllPortfolioItems();
  const designs = await getAllDesigns();

  return (
    <div className="mx-auto">
      <PageBreadcrumb />
      <Gaps>
        <div className="w-full">
          <div className="mb-8">
            <Heading className="mb-2" size="big">
              {page.title}
            </Heading>
            <p className="text-muted-foreground">{page.description}</p>
          </div>

          <div className="mb-8">
            <Heading className="mb-4">Software Projects</Heading>
            {/* <PortfolioCarousel /> */}
            <div className="grid gap-6">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <ProjectCard key={`${project.slug}-${index}`} {...project} />
                ))
              ) : (
                <p className="text-muted-foreground">No projects found.</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-8">
            <Heading className="mb-2" size="big">
              Designs
            </Heading>
            <p className="text-muted-foreground">
              A collection of my design works and case studies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.length > 0 ? (
              designs.map((design, index) => (
                <DesignCard key={`${design.slug}-${index}`} {...design} />
              ))
            ) : (
              <p className="text-muted-foreground">No designs found.</p>
            )}
          </div>
        </div>
      </Gaps>
    </div>
  );
}
