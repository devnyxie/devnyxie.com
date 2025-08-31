import path from "path";
import contentConfig from "../content.config";
import { parseYamlWithJsYaml } from "../utils/yaml_parser";

export function getPageData(pageName: string) {
  const pageConfig = contentConfig.pages[pageName];
  if (!pageConfig) {
    throw new Error(`Page ${pageName} not found in content config`);
  }

  const filePath = path.join(process.cwd(), "content", pageConfig.source);
  return parseYamlWithJsYaml(filePath, pageConfig.schema);
}
