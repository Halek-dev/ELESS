import { cn } from "@/lib/cn";

export type BadgeVariant = "tokunbo" | "nigerian-used" | "sold" | "new";

const styles: Record<BadgeVariant, string> = {
  tokunbo: "bg-[rgba(29,158,117,0.92)] text-white",
  "nigerian-used": "bg-white/[0.14] text-white",
  sold: "bg-red text-white",
  new: "bg-amber text-on-amber",
};

const labels: Record<BadgeVariant, string> = {
  tokunbo: "Tokunbo",
  "nigerian-used": "Nigerian-used",
  sold: "Sold",
  new: "New",
};

export function Badge({
  variant,
  children,
  className,
}: {
  variant: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3.5 py-1.5 text-[12px] font-semibold font-display leading-none",
        styles[variant],
        className,
      )}
    >
      {children ?? labels[variant]}
    </span>
  );
}
