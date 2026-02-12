import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

const PAGE_TITLES: Record<string, string> = {
  about: "About Me",
  blog: "Blog",
  portfolio: "Portfolio",
  now: "Now",
  resume: "Resume",
  "self-hosting": "Self Hosting",
  articles: "Articles",
  tags: "Tags",
  all: "All",
};

const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function useBreadcrumbs(pageTitle?: string): BreadcrumbItem[] {
  const pathname = usePathname();

  if (pathname === "/") {
    return [];
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbItems: BreadcrumbItem[] = [];

  breadcrumbItems.push({ title: "Home", href: "/" });

  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    const currentPath = "/" + pathSegments.slice(0, i + 1).join("/");
    const isLast = i === pathSegments.length - 1;

    if (i === 0) {
      const title = PAGE_TITLES[segment] || capitalizeFirst(segment);
      breadcrumbItems.push({
        title,
        href: isLast ? undefined : currentPath,
      });
    } else if (pathSegments[0] === "blog" && i === 1) {
      const isNamedSection = PAGE_TITLES[segment];
      const title = isNamedSection ? PAGE_TITLES[segment] : (pageTitle || capitalizeFirst(segment));
      breadcrumbItems.push({
        title,
        href: isLast ? undefined : currentPath,
      });
    } else if (pathSegments[0] === "blog" && i === 2) {
      const title = pageTitle || capitalizeFirst(segment);
      breadcrumbItems.push({
        title,
        href: isLast ? undefined : currentPath,
      });
    } else {
      const title = pageTitle && isLast ? pageTitle : capitalizeFirst(segment);
      breadcrumbItems.push({
        title,
        href: isLast ? undefined : currentPath,
      });
    }
  }

  return breadcrumbItems;
}
