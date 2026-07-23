"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * App Router `template.tsx` remounts on every navigation, which gives us a
 * clean route-transition hook. Kept subtle — a short fade/rise, no slide.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
