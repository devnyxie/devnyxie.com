"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FileText, FolderOpen, BookOpen, Loader2 } from "lucide-react";
import {
    Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/shadcn/command";
import { SearchResult } from "@/app/api/search/route";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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
    year: "numeric" 
  });
}

function HighlightedText({ text }: { text: string }) {
  // Parse markdown-style bold markers (added by API)
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/50 text-foreground px-0.5 rounded">
              {part.slice(2, -2)}
            </mark>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const abortControllerRef = React.useRef<AbortController | null>(null);

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
          { signal: abortControllerRef.current.signal }
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

  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
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
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search"
      description="Search across all content"
      className=""
    >
      <Command>
        <CommandInput
          placeholder="Search articles, portfolio, and pages..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {!isLoading && query.length >= 2 && results.length === 0 && (
            <CommandEmpty>
              No results found for &quot;{query}&quot;
            </CommandEmpty>
          )}

          {!isLoading && query.length < 2 && query.length > 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Type at least 2 characters to search
            </div>
          )}

          {!isLoading && query.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Start typing to search across articles, portfolio, and pages
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <>
              {Object.entries(groupedResults).map(([type, items]) =>
                items.length > 0 ? (
                  <CommandGroup key={type} heading={getTypeLabel(type) + "s"}>
                    {items.map((result) => {
                      const Icon = getIcon(result.type);
                      return (
                        <CommandItem
                          key={result.url}
                          value={`${result.title} ${result.excerpt}`}
                          onSelect={() => handleSelect(result.url)}
                          className="flex flex-col items-start gap-1 py-3"
                        >
                          <div className="flex items-center gap-2 w-full">
                            <Icon className="size-4 shrink-0" />
                            <span className="font-medium flex-1">
                              <HighlightedText text={result.title} />
                            </span>
                            {result.date && (
                              <span className="text-xs text-muted-foreground">
                                {formatDate(result.date)}
                              </span>
                            )}
                          </div>
                          {result.excerpt && (
                            <p className="text-xs text-muted-foreground line-clamp-2 pl-6">
                              <HighlightedText text={result.excerpt} />
                            </p>
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
    </CommandDialog>
  );
}
