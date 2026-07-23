import Link from "next/link";
import { cn } from "@/lib/cn";

/** ELESS. brand wordmark with amber full-stop. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Eless Autos Motors — home"
      className={cn(
        "font-display text-xl font-extrabold tracking-title text-text focus:outline-none focus-visible:outline-none",
        className,
      )}
    >
      ELESS<span className="text-amber">.</span>
    </Link>
  );
}
