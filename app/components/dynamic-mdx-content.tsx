import React from "react";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { mdxComponents } from "./mdx-components";

interface DynamicMDXContentProps {
  source: string;
  components?: Record<string, React.ComponentType<Record<string, unknown>>>;
}

export default async function DynamicMDXContent({
  source,
  components: additionalComponents = {},
}: DynamicMDXContentProps) {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm, remarkBreaks],
  });

  const { default: Content } = await run(compiled, {
    ...(runtime as Parameters<typeof run>[1]),
  });

  return (
    <Content
      components={
        {
          ...mdxComponents,
          ...additionalComponents,
        } as unknown as Record<string, React.ComponentType>
      }
    />
  );
}
