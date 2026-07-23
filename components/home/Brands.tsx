"use client";

import { useReducedMotion } from "framer-motion";

const BRANDS = [
  "Toyota",
  "Mercedes-Benz",
  "Honda",
  "Lexus",
  "Ford",
  "Hyundai",
  "Kia",
  "Range Rover",
  "BMW",
  "Audi",
];

/**
 * Continuous brand marquee. Duplicated track scrolls -50% for a seamless loop;
 * reduced motion falls back to a static, wrapped row.
 */
export function Brands() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section className="mx-auto max-w-frame px-5 sm:px-8 lg:px-section">
        <p className="kicker text-center">Brands we stock</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {BRANDS.map((b) => (
            <li key={b} className="font-display text-[22px] font-bold text-text-40">
              {b}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section aria-label="Brands we stock" className="overflow-hidden">
      <p className="kicker mb-6 text-center">Brands we stock</p>
      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <ul className="flex w-max animate-marquee items-center gap-14">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <li
              key={`${b}-${i}`}
              aria-hidden={i >= BRANDS.length}
              className="whitespace-nowrap font-display text-[24px] font-bold text-text-40 transition-colors hover:text-text-70 lg:text-[28px]"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
