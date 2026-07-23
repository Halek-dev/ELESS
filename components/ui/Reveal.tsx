"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, inView } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Scroll reveal. Content is visible by default and only animates in — nothing
 * is gated behind a class toggle, so it never ships blank in a headless render.
 */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const Comp = motion[as];
  return (
    <Comp
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={className}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers direct `Reveal`/variant children as they scroll in. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ul";
}) {
  const Comp = motion[as];
  return (
    <Comp
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
