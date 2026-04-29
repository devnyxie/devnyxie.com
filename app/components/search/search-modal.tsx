"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, FolderOpen, BookOpen, Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/shadcn/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/app/components/shadcn/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/shadcn/breadcrumb";
import { SearchResult } from "@/app/api/search/route";
import MDXContent from "@/app/components/mdx-content";
import "@/app/assets/md.css";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type BreadcrumbItemType = { title: string; href?: string };

function getIcon(type: string) {
  switch (type) {
    case "article":
      return BookOpen;
    case "portfolio":
      return FolderOpen;
    case "page":
      return FileText;
    default:
      return FileText;
  }
}

function getTypeLabel(type: string) {
  switch (type) {
    case "article":
      return "Article";
    case "portfolio":
      return "Portfolio";
    case "page":
      return "Page";
    default:
      return type;
  }
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <mark
              key={i}
              className="bg-yellow-200 dark:bg-yellow-900/50 text-foreground px-0.5 rounded"
            >
              {part.slice(2, -2)}
            </mark>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

function getPreviewBreadcrumb(result: SearchResult): BreadcrumbItemType[] {
  const base: BreadcrumbItemType[] = [{ title: "Home", href: "/" }];
  if (result.type === "article") {
    return [...base, { title: "Blog", href: "/blog" }, { title: result.title }];
  }
  if (result.type === "portfolio") {
    return [
      ...base,
      { title: "Portfolio", href: "/portfolio" },
      { title: result.title },
    ];
  }
  return [...base, { title: result.title }];
}

function PreviewBreadcrumb({ items }: { items: BreadcrumbItemType[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.title}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedUrl, setHighlightedUrl] = React.useState("");
  const [previewResult, setPreviewResult] = React.useState<SearchResult | null>(
    null,
  );
  const [previewCode, setPreviewCode] = React.useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = React.useState(false);
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const previewAbortRef = React.useRef<AbortController | null>(null);

  // Reset state when modal closes
  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setHighlightedUrl("");
      setPreviewResult(null);
      setPreviewCode(null);
    }
  }, [open]);

  // Search
  React.useEffect(() => {
    const performSearch = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
          { signal: abortControllerRef.current.signal },
        );
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        setResults(data.results || []);
      } catch (error: unknown) {
        if ((error as Error).name !== "AbortError") {
          console.error("Search error:", error);
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 150);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Auto-select first result when results change
  React.useEffect(() => {
    if (results.length > 0) {
      setHighlightedUrl(results[0].url);
    } else {
      setHighlightedUrl("");
      setPreviewResult(null);
      setPreviewCode(null);
    }
  }, [results]);

  // Fetch preview when highlighted result changes
  React.useEffect(() => {
    if (!highlightedUrl) {
      setPreviewResult(null);
      setPreviewCode(null);
      return;
    }

    const result = results.find((r) => r.url === highlightedUrl);
    if (!result) return;

    setPreviewResult(result);

    if (previewAbortRef.current) {
      previewAbortRef.current.abort();
    }
    previewAbortRef.current = new AbortController();

    setIsPreviewLoading(true);
    setPreviewCode(null);

    fetch(
      `/api/search/preview?type=${result.type}&slug=${encodeURIComponent(result.slug)}`,
      { signal: previewAbortRef.current.signal },
    )
      .then((r) => r.json())
      .then((data) => {
        setPreviewCode(data.code ?? "");
        setIsPreviewLoading(false);
      })
      .catch((error: unknown) => {
        if ((error as Error).name !== "AbortError") {
          setIsPreviewLoading(false);
          setPreviewCode("");
        }
      });
  }, [highlightedUrl, results]);

  // Cleanup abort controllers on unmount
  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      if (previewAbortRef.current) previewAbortRef.current.abort();
    };
  }, []);

  const handleSelect = (url: string) => {
    onOpenChange(false);
    router.push(url);
    setQuery("");
    setResults([]);
  };

  const groupedResults = React.useMemo(() => {
    const groups: Record<string, SearchResult[]> = {
      article: [],
      portfolio: [],
      page: [],
    };
    results.forEach((result) => {
      if (groups[result.type]) {
        groups[result.type].push(result);
      }
    });
    return groups;
  }, [results]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden p-0 gap-0 sm:max-w-4xl h-[min(620px,85vh)] flex flex-col"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">
          Search across all content
        </DialogDescription>

        <div className="flex flex-1 overflow-hidden">
          {/* Left panel: results list */}
          <div className="w-72 border-r flex flex-col shrink-0 overflow-hidden">
            <Command
              shouldFilter={false}
              value={highlightedUrl}
              onValueChange={setHighlightedUrl}
              className="h-full flex flex-col"
            >
              <CommandInput
                placeholder="Search articles, portfolio..."
                value={query}
                onValueChange={setQuery}
              />
              <CommandList className="flex-1 overflow-y-auto max-h-none">
                {isLoading && (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  </div>
                )}

                {!isLoading && query.length >= 2 && results.length === 0 && (
                  <CommandEmpty>
                    No results for &quot;{query}&quot;
                  </CommandEmpty>
                )}

                {!isLoading && query.length > 0 && query.length < 2 && (
                  <div className="py-6 text-center text-xs text-muted-foreground">
                    Type at least 2 characters
                  </div>
                )}

                {!isLoading && query.length === 0 && (
                  <div className="py-6 text-center text-xs text-muted-foreground">
                    Start typing to search
                  </div>
                )}

                {!isLoading && results.length > 0 && (
                  <>
                    {Object.entries(groupedResults).map(([type, items]) =>
                      items.length > 0 ? (
                        <CommandGroup
                          key={type}
                          heading={getTypeLabel(type) + "s"}
                        >
                          {items.map((result) => {
                            const Icon = getIcon(result.type);
                            return (
                              <CommandItem
                                key={result.url}
                                value={result.url}
                                onSelect={() => handleSelect(result.url)}
                                className="flex items-center gap-2 py-2"
                              >
                                <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                                <span className="text-sm truncate flex-1">
                                  <HighlightedText text={result.title} />
                                </span>
                                {result.date && (
                                  <span className="text-xs text-muted-foreground shrink-0">
                                    {formatDate(result.date)}
                                  </span>
                                )}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      ) : null,
                    )}
                  </>
                )}
              </CommandList>
            </Command>
          </div>

          {/* Right panel: content preview */}
          <div className="hidden md:flex flex-1 flex-col overflow-hidden">
            {!previewResult ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                {query.length === 0
                  ? "Start typing to search"
                  : "Select a result to preview"}
              </div>
            ) : (
              <div className="flex flex-col h-full overflow-y-auto p-6">
                <PreviewBreadcrumb
                  items={getPreviewBreadcrumb(previewResult)}
                />
                <h2 className="text-xl font-semibold mt-3 mb-1">
                  {previewResult.title}
                </h2>
                {previewResult.date && (
                  <p className="text-xs text-muted-foreground mb-4">
                    {formatDate(previewResult.date)}
                  </p>
                )}
                <hr className="mb-4" />

                {isPreviewLoading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}

                {!isPreviewLoading && previewCode && (
                  <div className="content-body prose text-sm">
                    <MDXContent code={previewCode} />
                  </div>
                )}

                {!isPreviewLoading && previewCode === "" && (
                  <p className="text-sm text-muted-foreground italic">
                    No preview available.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
