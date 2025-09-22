import path from "path";

export function getSlug(filePath: string): string | null {
  if (filePath.endsWith(".md")) {
    return path.basename(filePath, ".md");
  } else if (filePath.endsWith(".mdx")) {
    return path.basename(filePath, ".mdx");
  } else {
    return null;
  }
}
