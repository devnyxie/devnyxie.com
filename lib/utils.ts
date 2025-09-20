import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function extractDomain(url: string): string | null {
  try {
    const domain = new URL(url).hostname;
    return domain.replace("www.", "");
  } catch {
    return null;
  }
}

export function normalizeUrl(input: string): string {
  // If it already starts with http:// or https://, return as is
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input;
  }

  // If it starts with www. or is a domain, add https://
  if (input.startsWith("www.") || input.includes(".")) {
    return `https://${input}`;
  }

  // Default fallback
  return `https://${input}`;
}

export function getAbsoluteUrl(domain: string, path: string): string {
  const normalizedDomain = normalizeUrl(domain);
  return `${normalizedDomain}${path.startsWith("/") ? path : "/" + path}`;
}
