"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import type { Vehicle } from "@/lib/data/vehicles";
import { formatNaira, formatKm } from "@/lib/format";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { VehicleImage } from "@/components/ui/VehicleImage";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

function conditionBadge(v: Vehicle): BadgeVariant {
  if (v.status === "sold") return "sold";
  if (v.isNew) return "new";
  return v.condition === "Tokunbo" ? "tokunbo" : "nigerian-used";
}

export function VehicleCard({
  vehicle,
  index = 0,
  sizes,
}: {
  vehicle: Vehicle;
  index?: number;
  sizes?: string;
}) {
  const sold = vehicle.status === "sold";
  const badge = conditionBadge(vehicle);

  return (
    <motion.article variants={fadeUp} className="h-full">
      <Link
        href={`/inventory/${vehicle.slug}`}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-card border border-white/[0.08] bg-surface",
          "transition-[transform,border-color,box-shadow] duration-300 ease-out-quart",
          "hover:-translate-y-1.5 hover:border-[rgba(239,159,39,0.30)] hover:shadow-card-hover",
          "focus-visible:-translate-y-1.5 focus-visible:border-[rgba(239,159,39,0.30)]",
          "motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0",
        )}
      >
        {/* Image area */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <VehicleImage
            src={vehicle.images[0]}
            alt={`${vehicle.year} ${vehicle.name} — ${vehicle.condition}, ${vehicle.location}`}
            sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            imgClassName={cn(
              "transition-transform duration-500 ease-out-quart group-hover:scale-[1.12] motion-reduce:group-hover:scale-100",
              sold && "opacity-45",
            )}
          />
          {/* Condition badge top-left */}
          <div className="absolute left-3 top-3">
            <Badge variant={badge} />
          </div>
          {/* Quick-view eye top-right */}
          <span
            aria-hidden
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-control border border-white/10 bg-[rgba(11,13,16,0.55)] backdrop-blur-[8px] text-white/80 transition-colors group-hover:text-white"
          >
            <Eye className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-[19px] font-semibold leading-tight text-text">
            {vehicle.name}
          </h3>
          <p className="mt-1.5 text-[13px] text-text-50">
            {vehicle.year} · {formatKm(vehicle.mileageKm)} · {vehicle.location}
          </p>
          <p
            className={cn(
              "mt-3 font-display text-[21px] font-bold tracking-heading tabular-nums",
              sold ? "text-text-40" : "text-amber",
            )}
          >
            {formatNaira(vehicle.price)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

/** Loading skeleton matching the vehicle card footprint. */
export function VehicleCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card border border-white/[0.08] bg-surface">
      <div className="aspect-[16/10] skeleton" />
      <div className="flex flex-col gap-3 p-5">
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-5 w-1/3 rounded" />
      </div>
    </div>
  );
}
