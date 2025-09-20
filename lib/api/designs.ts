import path from "path";
import { PortfolioItem, portfolioItemSchema } from "@/lib/types/data/portfolio";
import { parseYamlFile } from "../utils/yaml_parser";
import { getContentConfig } from "../content.config";
import { glob } from "glob";

function parseFile(filePath: string): PortfolioItem | null {
  const slug = path.basename(filePath, ".yml");
  try {
    const frontmatter = parseYamlFile(filePath, portfolioItemSchema);

    const designData = {
      ...frontmatter,
      slug,
      path: filePath,
    };

    const parsed = portfolioItemSchema.safeParse(designData);

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
  const designsGlob = "./content/" + content.designs.source;
  const designFiles = await glob(designsGlob, { nodir: true });
  return designFiles;
}

export async function getAllDesigns(): Promise<PortfolioItem[]> {
  const designFiles = await getFiles();
  const designs: PortfolioItem[] = [];

  for (const filePath of designFiles) {
    const design = parseFile(filePath);

    if (design) {
      designs.push(design);
    }
  }

  console.log(`Parsed ${designs.length} designs`);

  return designs.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateA !== dateB) {
      return dateB - dateA;
    }
    return a.title.localeCompare(b.title);
  });
}

export async function getDesignBySlug(
  slug: string
): Promise<PortfolioItem | null> {
  const designFiles = await getFiles();

  for (const filePath of designFiles) {
    const design = parseFile(filePath);
    if (design && design.slug === slug && design.public) {
      return design;
    }
  }

  return null;
}
