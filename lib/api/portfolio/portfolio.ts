import path from "path";
import { PortfolioItem, portfolioItemSchema } from "@/lib/types/data/portfolio";
import { parseYamlFile } from "../../utils/yaml_parser";
import { getContentConfig } from "../../content.config";
import { glob } from "glob";

function parseFile(filePath: string): PortfolioItem | null {
  const slug = path.basename(filePath, ".yml");
  try {
    const frontmatter = parseYamlFile(filePath, portfolioItemSchema);

    const portfolioData = {
      ...frontmatter,
      slug,
      path: filePath,
    };

    const parsed = portfolioItemSchema.safeParse(portfolioData);

    if (!parsed.success) {
      return null;
    }
    return parsed.data as PortfolioItem;
  } catch (error) {
    return null;
  }
}

async function getFiles(): Promise<string[]> {
  const { content } = getContentConfig();
  const articlesGlob = "./content/" + content.software.source;
  const portfolioFiles = await glob(articlesGlob, { nodir: true });
  return portfolioFiles;
}

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  const portfolioFiles = await getFiles();
  const portfolioItems: PortfolioItem[] = [];

  for (const filePath of portfolioFiles) {
    const portfolioItem = parseFile(filePath);

    if (portfolioItem) {
      portfolioItems.push(portfolioItem);
    }
  }

  // logger
  // console.log(`Parsed ${portfolioItems.length} portfolio items`);

  return portfolioItems.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateA !== dateB) {
      return dateB - dateA;
    }
    return a.title.localeCompare(b.title);
  });
}

export async function getPortfolioItemBySlug(
  slug: string
): Promise<PortfolioItem | null> {
  const portfolioFiles = await getFiles();

  for (const filePath of portfolioFiles) {
    const portfolioItem = parseFile(filePath);
    return portfolioItem && portfolioItem.public ? portfolioItem : null;
  }

  return null;
}
