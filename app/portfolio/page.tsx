import Heading from "@/app/components/heading";
import { getPageData } from "@/lib/api/pages";
import { getAllPortfolioItems } from "@/lib/api/portfolio/portfolio";
import PageBreadcrumb from "@/app/components/layout/breadcrumb";
import ProjectCard from "@/app/components/portfolio/project-card";
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

  return (
    <Container>
      <PageBreadcrumb />
      <div className="w-full">
        <div className="mb-8">
          <Heading className="mb-2" size="big">
            {page.title}
          </Heading>
          <p className="text-muted-foreground">{page.description}</p>
        </div>

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
    </Container>
  );
}
