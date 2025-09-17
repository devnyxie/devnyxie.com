import parseMarkdown from "./markdown_parser";
import { parseMDX } from "./mdx_parser";

export async function processContent(
  content: string,
  isMDX: boolean = false
): Promise<string> {
  if (isMDX) {
    return await parseMDX(content);
  } else {
    return await parseMarkdown(content);
  }
}

export default processContent;
