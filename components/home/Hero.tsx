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
        {/*
         * Legibility scrim. Mobile stacks copy *under* the photo, so it needs a
         * vertical fade to solid --bg; desktop puts copy beside the photo, so it
         * needs a horizontal one. A single horizontal gradient leaves mobile text
         * sitting on the bright part of the image.
         */}
        <div
          aria-hidden
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,13,16,0.30) 0%, rgba(11,13,16,0.72) 26%, rgb(11,13,16) 46%)",
          }}
        />
        <div className="absolute inset-0 hidden lg:block photo-scrim" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-bg via-bg/70 to-transparent" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 100%, rgba(239,159,39,0.18), transparent 65%)",
          }}
        />
      </div>

      {/* Copy sits below the photo on mobile (~35% down), beside it on desktop. */}
      <div className="mx-auto max-w-frame px-5 pt-[32vh] sm:px-8 sm:pt-40 lg:px-section lg:pt-44">
        <motion.p
          className="kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {/* display:none keeps the unused variant out of the a11y tree too */}
          <span className="sm:hidden">Lagos · Ibadan</span>
          <span className="hidden sm:inline">Lagos · Ibadan · Nationwide delivery</span>
        </motion.p>

        <motion.h1
          className="mt-5 max-w-[16ch] font-display text-[44px] font-extrabold leading-[0.98] tracking-display text-text sm:text-6xl lg:text-[84px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.08 }}
        >
          The right car, inspected and ready.
        </motion.h1>

        <motion.div
          className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-text-70 lg:text-[17px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.16 }}
        >
          <p className="sm:hidden">
            Tokunbo SUVs, budget cars, trucks and premium imports.
          </p>
          <p className="hidden sm:block">
            Tokunbo family SUVs, Nigerian-used budget cars, trucks and premium imports — every one
            road-checked before it reaches you.
          </p>
        </motion.div>

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
