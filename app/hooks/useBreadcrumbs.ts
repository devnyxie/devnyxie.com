import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

// Define page titles mapping
const PAGE_TITLES: Record<string, string> = {
  about: "About Me",
  blog: "Blog",
  portfolio: "Portfolio",
  now: "Now",
  articles: "Articles",
  tags: "Tags",
};

export function useBreadcrumbs(pageTitle?: string): BreadcrumbItem[] {
  const pathname = usePathname();

  // Return empty array for root page
  if (pathname === "/") {
    return [];
  }

  // Split pathname into segments and filter out empty strings
  const pathSegments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [];

  // Always start with Home
  breadcrumbItems.push({ title: "Home", href: "/" });

  // Process each path segment
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    const currentPath = "/" + pathSegments.slice(0, i + 1).join("/");
    const isLast = i === pathSegments.length - 1;

    if (i === 0) {
      // First level pages (about, blog, portfolio, now)
      const title = PAGE_TITLES[segment] || segment;
      breadcrumbItems.push({
        title,
        href: isLast ? undefined : currentPath,
      });
    } else if (pathSegments[0] === "blog" && i === 1) {
      // Second level blog pages (articles, tags)
      const title = PAGE_TITLES[segment] || segment;
      breadcrumbItems.push({
        title,
        href: isLast ? undefined : currentPath,
      });
    } else if (pathSegments[0] === "blog" && i === 2) {
      // Third level blog post slug - use pageTitle if provided, otherwise use the slug
      const title = pageTitle || segment;
      breadcrumbItems.push({
        title,
        href: isLast ? undefined : currentPath,
      });
    } else {
      // Other nested pages - use segment name or custom title
      const title = pageTitle && isLast ? pageTitle : segment;
      breadcrumbItems.push({
        title,
        href: isLast ? undefined : currentPath,
      });
    }
  }

  return breadcrumbItems;
}
