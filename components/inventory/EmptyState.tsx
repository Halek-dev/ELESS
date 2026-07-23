"use client";

import { SearchX } from "lucide-react";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/** "No cars match those filters" — per the empty-state frame. */
export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className="flex flex-col items-center justify-center rounded-card border border-line-soft bg-surface/40 px-6 py-20 text-center"
    >
      <span className="flex h-[110px] w-[110px] items-center justify-center rounded-full border border-amber-border bg-amber-tint">
        <SearchX className="h-11 w-11 text-amber" strokeWidth={1.6} />
      </span>
      <h2 className="mt-8 font-display text-[24px] font-bold tracking-heading text-text">
        No cars match those filters
      </h2>
      <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-text-55">
        Try widening your budget or removing a filter. New stock lands every week.
      </p>
      <Button onClick={onClear} className="mt-8" size="lg">
        Clear all filters
      </Button>
    </motion.div>
  );
}
