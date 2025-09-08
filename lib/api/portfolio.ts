import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { PortfolioItem, portfolioItemSchema } from "@/lib/types/data/portfolio";
import { parseYamlWithJsYaml } from "../utils/yaml_parser";
import { getContentConfig } from "../content.config";
import { glob } from "glob";

const PORTFOLIO_DIR = path.join(process.cwd(), "content", "portfolio");

function parsePortfolioItem(
  filePath: string,
  slug: string
): PortfolioItem | null {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    // const frontmatter = yaml.load(fileContent) as Record<string, unknown>;
    const frontmatter = parseYamlWithJsYaml(filePath, portfolioItemSchema);

    const portfolioData = {
      ...frontmatter,
      slug,
      path: filePath,
    };

    const parsed = portfolioItemSchema.safeParse(portfolioData);

    if (!parsed.success) {
      const errorDetails = parsed.error.issues
        .map((issue) => {
          const fieldPath =
            issue.path.length > 0 ? issue.path.join(".") : "root";
          const receivedValue = issue.path.reduce((obj: unknown, key) => {
            if (obj && typeof obj === "object" && typeof key === "string") {
              return (obj as Record<string, unknown>)[key];
            }
            return undefined;
          }, portfolioData);
          const receivedType = typeof receivedValue;
          return `  • Field "${fieldPath}": ${issue.message}`;
        })
        .join("\n");

      console.error(
        `Validation failed for portfolio item "${slug}":\n${errorDetails}`
      );
      return null;
    }

    console.log(`Portfolio item "${slug}" parsed successfully ✅`);
    return parsed.data as PortfolioItem;
  } catch (error) {
    console.error(`Error parsing portfolio item "${slug}":`, error);
    return null;
  }
}

// function parsePortfolioItem(
//   filePath: string,
//   slug: string
// ): PortfolioItem | null {
//   try {
//     const fileContent = fs.readFileSync(filePath, "utf8");
//     const frontmatter = yaml.load(fileContent) as Record<string, unknown>;

//     const portfolioData = {
//       ...frontmatter,
//       slug,
//       path: filePath,
//     };

//     const parsed = portfolioItemSchema.safeParse(portfolioData);

//     if (!parsed.success) {
//       const errorDetails = parsed.error.issues
//         .map((issue) => {
//           const fieldPath =
//             issue.path.length > 0 ? issue.path.join(".") : "root";
//           const receivedValue = issue.path.reduce((obj: unknown, key) => {
//             if (obj && typeof obj === "object" && typeof key === "string") {
//               return (obj as Record<string, unknown>)[key];
//             }
//             return undefined;
//           }, portfolioData);
//           const receivedType = typeof receivedValue;
//           return `  • Field "${fieldPath}": ${issue.message}`;
//         })
//         .join("\n");

//       console.error(
//         `Validation failed for portfolio item "${slug}":\n${errorDetails}`
//       );
//       return null;
//     }

//     console.log(`Portfolio item "${slug}" parsed successfully ✅`);
//     return parsed.data as PortfolioItem;
//   } catch (error) {
//     console.error(`Error parsing portfolio item "${slug}":`, error);
//     return null;
//   }
// }

async function getAllPortfolioFiles(): Promise<string[]> {
  const { content } = getContentConfig();
  // const portfolioFiles: string[] = [];

  // function scanDirectory(dir: string) {
  //   if (!fs.existsSync(dir)) return;

  //   const entries = fs.readdirSync(dir, { withFileTypes: true });

  //   for (const entry of entries) {
  //     const fullPath = path.join(dir, entry.name);

  //     if (entry.isDirectory()) {
  //       scanDirectory(fullPath);
  //     } else if (entry.isFile() && entry.name.endsWith(".yml")) {
  //       portfolioFiles.push(fullPath);
  //     }
  //   }
  // }

  // scanDirectory(content.portfolio.source);
  const articlesGlob = path.resolve("./content/" + content.portfolio.source);
  const portfolioFiles = await glob(articlesGlob, { nodir: true });
  return portfolioFiles;
}

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  const portfolioFiles = await getAllPortfolioFiles();
  const portfolioItems: PortfolioItem[] = [];

  for (const filePath of portfolioFiles) {
    const fileName = path.basename(filePath, ".yml");
    const portfolioItem = parsePortfolioItem(filePath, fileName);

    if (portfolioItem && portfolioItem.public) {
      portfolioItems.push(portfolioItem);
    }
  }

  // Sort by date (newest first), then by title
  return portfolioItems.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (dateA !== dateB) {
      return dateB - dateA; // Newest first
    }

    return a.title.localeCompare(b.title);
  });
}

export async function getPortfolioItemBySlug(
  slug: string
): Promise<PortfolioItem | null> {
  const portfolioFiles = await getAllPortfolioFiles();

  for (const filePath of portfolioFiles) {
    const fileName = path.basename(filePath, ".yml");

    if (fileName === slug) {
      const portfolioItem = parsePortfolioItem(filePath, fileName);
      return portfolioItem && portfolioItem.public ? portfolioItem : null;
    }
  }

  return null;
}
