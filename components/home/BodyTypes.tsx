"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, CarFront, Truck, CarTaxiFront, Bus, Gem } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { BodyType } from "@/lib/data/vehicles";

const SHAPES: { type: BodyType; icon: typeof Car; highlight?: boolean }[] = [
  { type: "Sedan", icon: Car },
  { type: "SUV", icon: CarFront },
  { type: "Pickup", icon: Truck },
  { type: "Hatchback", icon: CarTaxiFront },
  { type: "Bus", icon: Bus },
  { type: "Luxury", icon: Gem, highlight: true },
];

export function BodyTypes() {
  return (
    <section className="mx-auto max-w-frame px-5 sm:px-8 lg:px-section">
      <Reveal>
        <p className="kicker">Find your shape</p>
        <h2 className="mt-3 font-display text-[30px] font-bold tracking-heading text-text sm:text-[36px]">
          Browse by body type
        </h2>
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {SHAPES.map(({ type, icon: Icon, highlight }) => (
          <motion.div key={type} variants={fadeUp}>
            <Link
              href={`/inventory?body=${encodeURIComponent(type)}`}
              className={cn(
                "group flex h-full flex-col items-center justify-center gap-3 rounded-card border p-6 transition-all duration-300 ease-out-quart",
                "hover:-translate-y-1 motion-reduce:hover:translate-y-0",
                highlight
                  ? "border-amber-border bg-amber-tint hover:bg-[rgba(239,159,39,0.20)]"
                  : "border-line-soft bg-surface hover:border-amber-border hover:bg-amber-tint",
              )}
            >
              <Icon
                className={cn(
                  "h-7 w-7 transition-colors",
                  highlight ? "text-amber" : "text-text-70 group-hover:text-amber",
                )}
                strokeWidth={1.6}
              />
              <span
                className={cn(
                  "font-display text-[14px] font-semibold",
                  highlight ? "text-amber-light" : "text-text",
                )}
              >
                {type}
              </span>
            </Link>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  );
}
