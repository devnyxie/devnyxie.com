import React from "react";
import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "./mdx-components";

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType<Record<string, unknown>>>;
}

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default as React.ComponentType<{
    components?: Record<string, React.ComponentType<Record<string, unknown>>>;
  }>;
};

export default function MDXContent({
  code,
  components: additionalComponents = {},
}: MDXContentProps) {
  const Component = useMDXComponent(code);
  return (
    <Component
      components={
        {
          ...mdxComponents,
          ...additionalComponents,
        } as unknown as Record<string, React.ComponentType<Record<string, unknown>>>
      }
    />
  );
}
