import Heading from "@/components/heading";
import { getPageData } from "@/lib/api/pages";
import { getAllPortfolioItems } from "@/lib/api/portfolio";
import PageBreadcrumb from "@/components/breadcrumb";
import ProjectCard from "@/components/portfolio/project-card";
import PortfolioCarousel from "@/components/carousel";

export const metadata = {
  title: "Portfolio",
  description: "A showcase of my projects and work",
};

export default async function PortfolioPage() {
  const page = await getPageData("portfolio");
  const projects = await getAllPortfolioItems();

  return (
    <div>
      <PageBreadcrumb />
      <div className="mb-8">
        <Heading className="mb-2" size="big">
          {page.title}
        </Heading>
        <p className="text-muted-foreground">{page.description}</p>
      </div>

      <PortfolioCarousel />
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
  );
}
