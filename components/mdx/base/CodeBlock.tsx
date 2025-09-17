import React from "react";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  filename?: string;
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      className,
      title,
      language,
      showLineNumbers = false,
      highlightLines = [],
      filename,
      children,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);
    const internalRef = React.useRef<HTMLDivElement>(null);
    const divRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

    const copyToClipboard = async () => {
      const codeElement = divRef.current?.querySelector("code");
      if (codeElement) {
        await navigator.clipboard.writeText(codeElement.textContent || "");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <div
        ref={divRef}
        className={cn(
          "relative rounded-lg border bg-muted/25 overflow-hidden",
          className
        )}
        {...props}
      >
        {(title || filename || language) && (
          <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b text-sm">
            <div className="flex items-center gap-2">
              {filename && (
                <span className="font-mono text-muted-foreground">
                  {filename}
                </span>
              )}
              {title && <span className="font-medium">{title}</span>}
              {language && !filename && (
                <span className="text-muted-foreground uppercase text-xs font-mono">
                  {language}
                </span>
              )}
            </div>
            <button
              onClick={copyToClipboard}
              className="p-1 rounded hover:bg-muted/80 transition-colors"
              title="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </div>
        )}
        <div className="relative">
          <pre className="p-4 overflow-x-auto text-sm">
            <code className={language ? `language-${language}` : ""}>
              {children}
            </code>
          </pre>
        </div>
      </div>
    );
  }
);

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
