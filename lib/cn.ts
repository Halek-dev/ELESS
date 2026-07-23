type ClassValue = string | number | false | null | undefined | 0n;

/** Minimal className joiner — no external deps. */
export function cn(...parts: ClassValue[]): string {
  return parts.filter((p): p is string => typeof p === "string" && p.length > 0).join(" ");
}
