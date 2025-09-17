import { unified } from "unified";
import parse from "remark-parse";
import breaks from "remark-breaks";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// Helper function to process markdown content within components
const processInlineMarkdown = async (content: string): Promise<string> => {
  const processor = unified()
    .use(parse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeShiki, {
      themes: {
        light: "github-light-default",
        dark: "dark-plus",
      },
      defaultColor: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true });

  const result = await processor.process(content.trim());
  // Remove the wrapping <p> tags if it's a single paragraph
  let html = result.toString();
  if (
    html.startsWith("<p>") &&
    html.endsWith("</p>") &&
    (html.match(/<p>/g) || []).length === 1
  ) {
    html = html.slice(3, -4);
  }
  return html;
};

// Process MDX components and handle markdown content within them
const preprocessMDXComponents = async (content: string): Promise<string> => {
  let result = content;

  // Convert Alert components
  const alertMatches = [
    ...result.matchAll(
      /<Alert\s+variant="(\w+)"(?:\s+title="([^"]*)")?\s*>([\s\S]*?)<\/Alert>/g
    ),
  ];
  for (const match of alertMatches) {
    const [fullMatch, variant, title, innerContent] = match;
    const processedContent = await processInlineMarkdown(innerContent);
    const titleHtml = title
      ? `<h5 class="mb-1 font-medium leading-none tracking-tight">${title}</h5>`
      : "";
    const replacement = `<div role="alert" class="alert-${variant} relative w-full rounded-lg border p-4 my-4">${titleHtml}<div class="text-sm">${processedContent}</div></div>`;
    result = result.replace(fullMatch, replacement);
  }

  // Convert Callout components
  const calloutMatches = [
    ...result.matchAll(
      /<Callout\s+icon="([^"]*)"(?:\s+title="([^"]*)")?(?:\s+variant="(\w+)")?\s*>([\s\S]*?)<\/Callout>/g
    ),
  ];
  for (const match of calloutMatches) {
    const [fullMatch, icon, title, variant, innerContent] = match;
    const processedContent = await processInlineMarkdown(innerContent);
    const titleHtml = title
      ? `<h5 class="mb-2 font-medium leading-none tracking-tight">${title}</h5>`
      : "";
    const replacement = `<div data-callout class="callout-${
      variant || "default"
    } relative w-full rounded-lg border-l-4 p-4 bg-card/50 my-6"><div class="flex items-start gap-3"><span class="text-lg leading-none mt-0.5 shrink-0">${icon}</span><div class="flex-1 min-w-0">${titleHtml}<div class="text-sm">${processedContent}</div></div></div></div>`;
    result = result.replace(fullMatch, replacement);
  }

  // Convert simple self-closing components for now
  result = result.replace(
    /<(\w+)([^>]*)\s*\/>/g,
    '<div data-component="$1"$2></div>'
  );

  return result;
};

const parseMDX = async (mdxContent: string) => {
  // Preprocess MDX components to HTML
  const preprocessed = await preprocessMDXComponents(mdxContent);

  const html = await unified()
    .use(parse)
    .use(breaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(remarkGfm)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["heading-anchor"],
      },
    })
    .use(rehypeShiki, {
      themes: {
        light: "github-light-default",
        dark: "dark-plus",
      },
      defaultColor: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(preprocessed);

  const result = html.toString();
  return result;
};

export { parseMDX };
export default parseMDX;
