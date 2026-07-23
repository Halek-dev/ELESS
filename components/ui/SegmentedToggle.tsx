"use client";

import { cn } from "@/lib/cn";

export interface Segment<T extends string> {
  value: T;
  label: string;
}

/** Tokunbo / Nigerian-used segmented toggle. */
export function SegmentedToggle<T extends string>({
  segments,
  value,
  onChange,
  ariaLabel,
}: {
  segments: Segment<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1 rounded-control border border-line-soft bg-[rgba(0,0,0,0.30)] p-1"
    >
      {segments.map((seg) => {
        const active = seg.value === value;
        return (
          <button
            key={seg.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? null : seg.value)}
            className={cn(
              "rounded-[9px] px-4 py-2 text-[14px] transition-colors duration-150 ease-out-quart focus:outline-none focus-visible:outline-none",
              active
                ? "bg-amber font-bold text-on-amber"
                : "font-semibold text-text-55 hover:text-text",
            )}
          >
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}
