import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';

// Custom components that can be used in MDX content
const components = {
  // You can add custom components here that will be available in MDX
  // For example:
  // Alert: ({ children, variant = 'info' }: { children: React.ReactNode; variant?: string }) => (
  //   <div className={`alert alert-${variant}`}>{children}</div>
  // ),
};

export async function processMDXContent(content: string) {
  const { content: processedContent, frontmatter } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkBreaks,
        ],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, {
            behavior: "wrap",
            properties: {
              className: ["heading-anchor"],
            },
          }],
          [rehypeShiki, {
            themes: {
              light: "github-light-default",
              dark: "dark-plus",
            },
            defaultColor: false,
          }],
        ],
      },
    },
    components,
  });

  return { content: processedContent, frontmatter };
}

export default processMDXContent;