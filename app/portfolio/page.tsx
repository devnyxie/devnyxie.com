import Heading from "@/app/components/heading";
import { getPageData } from "@/lib/api/pages";
import { getAllPortfolioItems } from "@/lib/api/portfolio/portfolio";
import { getAllDesigns } from "@/lib/api/portfolio/designs";
import PageBreadcrumb from "@/app/components/layout/breadcrumb";
import ProjectCard from "@/app/components/portfolio/project-card";
import DesignCard from "@/app/components/portfolio/design-card";
import Gaps from "@/app/components/layout/gaps";
import { generateMetadata as createMetadata } from "@/metadata";
import { PortfolioPageType } from "@/lib/types/pages/portfolio";
import Container from "@/app/components/layout/container";
import List from "@/app/components/layout/list";

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
    <Container>
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
            <List gap="6">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <ProjectCard key={`${project.slug}-${index}`} {...project} />
                ))
              ) : (
                <p className="text-muted-foreground">No projects found.</p>
              )}
            </List>
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
          <List asGrid cols="1 md:2 lg:3" gap="6">
            {designs.length > 0 ? (
              designs.map((design, index) => (
                <DesignCard key={`${design.slug}-${index}`} {...design} />
              ))
            ) : (
              <p className="text-muted-foreground">No designs found.</p>
            )}
          </List>
        </div>
      </Gaps>
    </Container>
  );
}
