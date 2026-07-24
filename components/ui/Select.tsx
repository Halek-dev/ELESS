"use client";

import { useEffect, useId, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Custom dropdown. The menu renders in a portal with fixed positioning so it
 * never gets clipped by an overflow-hidden filter bar (per interaction rules).
 */
export function Select({
  label,
  options,
  value,
  onChange,
  placeholder,
  className,
  buttonClassName,
  labelClassName,
}: {
  label?: string;
  options: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  buttonClassName?: string;
  /** e.g. "sr-only md:not-sr-only" to hide the label visually but keep its name. */
  labelClassName?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const selected = options.find((o) => o.value === value);

  const place = useCallback(() => {
    if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect());
  }, []);

  useEffect(() => {
    if (!open) return;
    place();
    const onScroll = () => place();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open, place]);

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label htmlFor={id} className={cn("field-label mb-2 block", labelClassName)}>
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-[46px] w-full items-center justify-between gap-2 rounded-control border bg-surface-sunken px-4 text-[14px] transition-colors duration-150 ease-out-quart focus:outline-none focus-visible:outline-none",
          open
            ? "border-amber rounded-b-none focus-visible:outline-none"
            : "border-line hover:border-line-strong",
          selected ? "text-text" : "text-text-55",
          buttonClassName,
        )}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-text-50 transition-transform duration-200", open && "rotate-180 text-amber")}
        />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && rect && (
              <motion.div
                ref={menuRef}
                role="listbox"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16, ease: EASE_OUT }}
                style={{
                  position: "fixed",
                  top: rect.bottom,
                  left: rect.left,
                  width: rect.width,
                }}
                className="z-dropdown max-h-64 overflow-auto rounded-b-control border border-t-0 border-amber bg-surface shadow-card"
              >
                {options.map((opt) => {
                  const isSel = opt.value === value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSel}
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                        triggerRef.current?.focus();
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-[11px] text-left text-[14px] transition-colors",
                        isSel
                          ? "bg-[rgba(239,159,39,0.14)] text-amber-light"
                          : "text-text-70 hover:bg-[rgba(239,159,39,0.10)] hover:text-text",
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSel && <Check className="h-4 w-4 shrink-0" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
