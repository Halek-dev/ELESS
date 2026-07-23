"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "whatsapp" | "whatsapp-solid";
type Size = "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 font-display font-semibold rounded-control select-none " +
  "transition-[background,box-shadow,transform,border-color,opacity] duration-200 ease-out-quart " +
  "disabled:cursor-not-allowed active:translate-y-px focus:outline-none focus-visible:outline-none";

const sizes: Record<Size, string> = {
  md: "text-[14px] px-6 py-[13px]",
  lg: "text-[15px] px-[30px] py-4",
};

const variants: Record<Variant, string> = {
  // Amber fill. Hover deepens glow; pressed drops shadow; disabled fades.
  primary:
    "bg-amber text-on-amber shadow-glow " +
    "hover:bg-amber-hover hover:shadow-glow-strong " +
    "active:bg-amber-pressed active:shadow-none " +
    "disabled:bg-amber/25 disabled:text-on-amber/60 disabled:opacity-50 disabled:shadow-none disabled:active:translate-y-0",
  // Glass outline.
  secondary:
    "bg-glass-fill text-text border border-line-strong shadow-glow-inner backdrop-blur-chip " +
    "hover:bg-white/10 hover:border-white/25 " +
    "active:bg-white/[0.03] active:border-white/20 " +
    "disabled:opacity-40 disabled:active:translate-y-0",
  // Teal-tint secondary WhatsApp.
  whatsapp:
    "bg-teal-tint text-teal border border-[rgba(29,158,117,0.35)] " +
    "hover:bg-[rgba(29,158,117,0.22)] hover:border-[rgba(29,158,117,0.5)] " +
    "disabled:opacity-40 disabled:active:translate-y-0",
  // Solid teal WhatsApp (footer / drawer).
  "whatsapp-solid":
    "bg-teal text-white shadow-card hover:bg-teal-hover disabled:opacity-40 disabled:active:translate-y-0",
};

function classes(variant: Variant, size: Size, block: boolean, className?: string) {
  return cn(base, sizes[size], variants[variant], block && "w-full", className);
}

function Spinner({ variant }: { variant: Variant }) {
  const color =
    variant === "primary" ? "border-on-amber/35 border-t-on-amber" : "border-white/35 border-t-white";
  return <span aria-hidden className={cn("h-[15px] w-[15px] rounded-full border-2 animate-spin-fast", color)} />;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  block?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading = false, block = false, className, children, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes(variant, size, block, className)}
      {...props}
    >
      {loading && <Spinner variant={variant} />}
      {children}
    </button>
  );
});

export default Button;

/** Link styled identically to Button, for navigation CTAs. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  block = false,
  className,
  children,
  external = false,
  ...props
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const cls = classes(variant, size, block, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...props}>
      {children}
    </Link>
  );
}
