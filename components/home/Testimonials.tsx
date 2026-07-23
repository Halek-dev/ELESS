"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

const REVIEWS = [
  {
    quote:
      "Inspection report was spot on. Picked up the Highlander in Lagos and drove it straight to Abuja — no surprises.",
    name: "Chinedu O.",
    city: "Lagos",
  },
  {
    quote:
      "The finance plan made it simple. Monthly repayment was exactly what the calculator showed, kobo for kobo.",
    name: "Aisha B.",
    city: "Ibadan",
  },
  {
    quote:
      "Third car I've bought from Eless. They know their stock and they don't waste your time. Proper professionals.",
    name: "Tunde A.",
    city: "Lagos",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-frame px-5 sm:px-8 lg:px-section">
      <Reveal>
        <p className="kicker">From the driveway</p>
        <h2 className="mt-3 font-display text-[30px] font-bold tracking-heading text-text sm:text-[36px]">
          What buyers say
        </h2>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <motion.figure
            key={r.name}
            variants={fadeUp}
            className="flex flex-col rounded-card border border-line-soft bg-surface p-6"
          >
            <div className="flex gap-0.5" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber" aria-hidden />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-text-70">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-display text-[13px] font-semibold text-text-70"
              >
                {r.name.charAt(0)}
              </span>
              <span>
                <span className="block text-[14px] font-semibold text-text">{r.name}</span>
                <span className="block text-[12px] text-text-50">{r.city}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </RevealGroup>
    </section>
  );
}
