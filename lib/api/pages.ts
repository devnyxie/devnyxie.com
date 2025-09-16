import path from "path";
import contentConfig from "../content.config";
import { parseYamlFile } from "../utils/yaml_parser";
import { contentPageSchema } from "../types/base";

export function getPageData(pageName: string) {
  const pageConfig = contentConfig.pages[pageName];
  if (!pageConfig) {
    throw new Error(`Page ${pageName} not found in content config`);
  }
  const filePath = path.join(process.cwd(), "content", pageConfig.source);
  return parseYamlFile(filePath, pageConfig.schema);
}

export function getAllContentPages() {
  // Get all pages that use contentPageSchema (have content field)
  return Object.keys(contentConfig.pages).filter(pageName => {
    const pageConfig = contentConfig.pages[pageName];
    return pageConfig.schema === contentConfig.pages.about.schema; // Same schema as about/now
  });
}

export function getContentPageBySlug(slug: string) {
  try {
    return getPageData(slug);
  } catch (error) {
    return null;
  }
}
