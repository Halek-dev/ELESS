"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/cn";

/** Filter chip (pill). Inactive / active / removable states per spec. */
export function Chip({
  active = false,
  onClick,
  onRemove,
  removeLabel,
  children,
  className,
  ...props
}: {
  active?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">) {
  const removable = Boolean(onRemove);
  return (
    <button
      type="button"
      onClick={onRemove ?? onClick}
      aria-pressed={onClick ? active : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-pill text-[13px] leading-none font-body transition-colors duration-150 ease-out-quart",
        removable ? "py-[9px] pl-[15px] pr-[9px]" : "px-4 py-[9px]",
        active
          ? "bg-[rgba(239,159,39,0.16)] border border-amber-border text-amber-light font-semibold"
          : "bg-glass-fill border border-line-strong text-text-70 hover:bg-white/10 hover:text-text",
        className,
      )}
      {...props}
    >
      {children}
      {removable && (
        <span
          aria-hidden
          className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[rgba(239,159,39,0.28)]"
        >
          <X className="h-3 w-3" strokeWidth={2.5} />
        </span>
      )}
      {removable && <span className="sr-only">{removeLabel ?? "Remove filter"}</span>}
    </button>
  );
}
