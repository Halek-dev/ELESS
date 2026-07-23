"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { VehicleImage } from "@/components/ui/VehicleImage";
import { HeroSearch } from "./HeroSearch";
import { EASE_OUT } from "@/lib/motion";
import { vehicles } from "@/lib/data/vehicles";

// Hero photography — pinned Unsplash, sourced from the vehicles data file.
const HERO_IMAGE = vehicles[0].images[0];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-10">
      {/* Hero photograph — the only priority image on the page. */}
      <div className="absolute inset-0 -z-10">
        <VehicleImage
          src={HERO_IMAGE}
          alt="A premium SUV on the Eless Autos Motors showroom floor in Lagos"
          priority
          sizes="100vw"
          imgClassName="object-cover"
        />
        {/* Legibility scrim + amber floor glow */}
        <div className="absolute inset-0 photo-scrim" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 100%, rgba(239,159,39,0.18), transparent 65%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-frame px-5 pt-32 sm:px-8 lg:px-section lg:pt-44">
        <motion.p
          className="kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          Lagos · Ibadan · Nationwide delivery
        </motion.p>

        <motion.h1
          className="mt-5 max-w-[16ch] font-display text-[44px] font-extrabold leading-[0.98] tracking-display text-text sm:text-6xl lg:text-[84px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.08 }}
        >
          The right car, inspected and ready.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-text-70 lg:text-[17px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.16 }}
        >
          Tokunbo family SUVs, Nigerian-used budget cars, trucks and premium imports — every one
          road-checked before it reaches you.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.24 }}
        >
          <ButtonLink href="/inventory" size="lg">
            Browse inventory
          </ButtonLink>
          <ButtonLink href="/#finance" variant="secondary" size="lg">
            Sell your car
          </ButtonLink>
        </motion.div>

        {/* Glass search bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.32 }}
          className="mt-12 lg:mt-16"
        >
          <HeroSearch />
        </motion.div>
      </div>
    </section>
  );
}
