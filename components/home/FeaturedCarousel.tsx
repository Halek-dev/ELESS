"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { getFeatured, vehicles } from "@/lib/data/vehicles";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { stagger, inView } from "@/lib/motion";
import { cn } from "@/lib/cn";

// Featured picks: the flagged ones first, topped up with fresh premium stock.
const featured = [
  ...getFeatured(),
  ...vehicles.filter((v) => !v.featured && v.status === "available").slice(0, 3),
];

export function FeaturedCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-frame px-5 sm:px-8 lg:px-section">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-[28px] font-bold tracking-heading text-text sm:text-[36px]">
          Featured vehicles
        </h2>
        {/* Touch devices swipe the track, so the arrows are desktop-only. */}
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous vehicles"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-control border transition-colors",
              atStart
                ? "cursor-not-allowed border-line-soft bg-white/[0.03] text-text-40"
                : "border-line-strong bg-glass-fill text-text hover:bg-white/10",
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next vehicles"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-control border transition-colors",
              atEnd
                ? "cursor-not-allowed border-line-soft bg-white/[0.03] text-text-40"
                : "border-transparent bg-amber text-on-amber shadow-glow hover:bg-amber-hover",
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <motion.div
        ref={trackRef}
        onScroll={onScroll}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
      >
        {featured.map((v, i) => (
          <div
            key={v.slug}
            className="w-[280px] shrink-0 snap-start sm:w-[340px] lg:w-[380px]"
          >
            <VehicleCard vehicle={v} index={i} sizes="(max-width: 640px) 80vw, 380px" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
