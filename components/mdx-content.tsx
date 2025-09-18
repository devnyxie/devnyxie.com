import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';
import { Alert, Callout, CodeBlock, FeatureCard } from './mdx-components';

interface MDXContentProps {
  source: string;
  components?: Record<string, React.ComponentType<Record<string, unknown>>>;
}

// Define components directly here to avoid any import issues
const components = {
  Alert,
  Callout,
  CodeBlock,
  FeatureCard,
};

export default function MDXContent({ source, components: additionalComponents = {} }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      options={{
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
      }}
      components={{
        ...components,
        ...additionalComponents,
      }}
    />
  );
}