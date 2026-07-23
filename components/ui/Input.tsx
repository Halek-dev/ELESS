"use client";

import { forwardRef, useId } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  /** Optional trailing adornment (e.g. a check glyph). */
  adornment?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, adornment, className, id, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="field-label mb-2 block">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(
            "h-[46px] w-full rounded-control border bg-surface-sunken px-4 text-[15px] text-text",
            "placeholder:text-text-40 caret-amber transition-colors duration-150 ease-out-quart",
            "focus:outline-none focus-visible:outline-none",
            (adornment || hasError) && "pr-11",
            hasError
              ? "border-red bg-red-tint focus:border-red focus:shadow-[0_0_0_3px_rgba(226,75,74,0.15)]"
              : "border-line focus:border-amber focus:shadow-[0_0_0_3px_rgba(239,159,39,0.20)]",
            className,
          )}
          {...props}
        />
        {hasError ? (
          <AlertCircle
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-red"
          />
        ) : (
          adornment && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-amber">
              {adornment}
            </span>
          )
        )}
      </div>
      {hasError && (
        <p id={errorId} className="mt-2 text-[12px] text-red font-body">
          {error}
        </p>
      )}
    </div>
  );
});
