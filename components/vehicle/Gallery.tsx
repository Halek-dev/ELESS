"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { VehicleImage } from "@/components/ui/VehicleImage";
import type { Vehicle } from "@/lib/data/vehicles";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Gallery({ vehicle }: { vehicle: Vehicle }) {
  const [active, setActive] = useState(0);
  const images = vehicle.images;

  return (
    <div>
      {/* Main frame */}
      <div className="floor-glow relative aspect-[16/10] overflow-hidden rounded-card border border-line-soft">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="absolute inset-0"
          >
            <VehicleImage
              src={images[active]}
              alt={`${vehicle.year} ${vehicle.name} — view ${active + 1} of ${images.length}`}
              detail
              priority={active === 0}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>
        </AnimatePresence>

        {(vehicle.isNew || vehicle.status === "sold") && (
          <div className="absolute left-4 top-4 z-10">
            <Badge variant={vehicle.status === "sold" ? "sold" : "new"}>
              {vehicle.status === "sold" ? "Sold" : "New arrival"}
            </Badge>
          </div>
        )}

        <span className="absolute right-4 top-4 z-10 rounded-pill border border-white/10 bg-[rgba(11,13,16,0.55)] px-3 py-1.5 text-[12px] font-semibold text-text-70 backdrop-blur-[8px] tabular-nums">
          {active + 1} / {images.length}
        </span>
      </div>

      {/* Filmstrip */}
      <ul className="mt-4 grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <li key={src + i}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative block aspect-[16/10] w-full overflow-hidden rounded-thumb border-2 transition-colors",
                i === active ? "border-amber" : "border-transparent hover:border-line-strong",
              )}
            >
              <VehicleImage
                src={src}
                alt=""
                sizes="120px"
                imgClassName={cn("transition-opacity", i !== active && "opacity-70")}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
