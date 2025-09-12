import Heading from "@/components/heading";
import { getPageData } from "@/lib/api/pages";
import { getAllPortfolioItems } from "@/lib/api/portfolio";
import { getPortfolioImages } from "@/lib/api/designs";
import PageBreadcrumb from "@/components/breadcrumb";
import ProjectCard from "@/components/portfolio/project-card";
import PortfolioCarousel from "@/components/carousel";
import DesignShowcase from "@/components/portfolio/design-showcase";
import Gaps from "@/components/layout/gaps";

export const metadata = {
  title: "Portfolio",
  description: "A showcase of my projects and work",
};

export default async function PortfolioPage() {
  const page = await getPageData("portfolio");
  const projects = await getAllPortfolioItems();
  const designImages = await getPortfolioImages();

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

        <div>
          <div className="mb-8">
            <Heading className="mb-2" size="big">
              Designs
            </Heading>
            <p className="text-muted-foreground">
              A collection of my design works and case studies.
            </p>
          </div>
          <div className="grid gap-6">
            <DesignShowcase images={designImages} />
          </div>
        </div>
      </Gaps>
    </div>
  );
}
