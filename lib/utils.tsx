/**
 * Combines class names into a single string, filtering out falsy values.
 * @param classes - Array of class names (string or falsy).
 * @returns Combined class names as a string.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}