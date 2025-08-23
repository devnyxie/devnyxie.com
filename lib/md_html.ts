import { unified } from "unified";
import parse from "remark-parse";
import breaks from "remark-breaks";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const parseMarkdown = async (markdownContent: string) => {
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
        light: "light-plus",
        dark: "dark-plus",
      },
      defaultColor: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdownContent);

  const result = html.toString();
  return result;
};

export default parseMarkdown;
