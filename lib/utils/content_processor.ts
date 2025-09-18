import parseMarkdown from "./markdown_parser";
import { processMDXContent } from "./mdx_processor";

/**
 * Process content using either the legacy markdown parser or the new MDX processor
 * @param content - The raw content string
 * @param useMDX - Whether to use MDX processing (default: true)
 * @returns Processed HTML content
 */
export async function processContent(
  content: string,
  useMDX: boolean = true
): Promise<string> {
  if (useMDX) {
    const { content: processedContent } = await processMDXContent(content);
    return processedContent as unknown as string;
  } else {
    return await parseMarkdown(content);
  }
}

export default processContent;