"use client";

import { ShieldCheck, CreditCard, Truck, BadgeCheck } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Verified inspection",
    body: "A 150-point road and mechanical check on every listing.",
  },
  {
    icon: CreditCard,
    title: "Flexible finance",
    body: "Spread payments over up to 48 months with clear terms.",
  },
  {
    icon: Truck,
    title: "Nationwide delivery",
    body: "Door delivery to all 36 states, tracked end to end.",
  },
  {
    icon: BadgeCheck,
    title: "6-month warranty",
    body: "Engine and gearbox cover on every certified vehicle.",
  },
];

export function WhyEless() {
  return (
    <section id="why-eless" className="mx-auto max-w-frame px-5 sm:px-8 lg:px-section">
      <Reveal>
        <p className="kicker">Why Eless</p>
        <h2 className="mt-3 max-w-[20ch] font-display text-[30px] font-bold tracking-heading text-text sm:text-[36px]">
          Bought right, backed all the way
        </h2>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {REASONS.map(({ icon: Icon, title, body }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="rounded-card border border-line-soft bg-surface p-6"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-control border border-amber-border bg-amber-tint">
              <Icon className="h-[22px] w-[22px] text-amber" strokeWidth={1.8} />
            </span>
            <h3 className="mt-5 font-display text-[17px] font-semibold text-text">{title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-text-55">{body}</p>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  );
}
