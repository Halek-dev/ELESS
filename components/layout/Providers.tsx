"use client";

import { MotionConfig } from "framer-motion";
import { ToastProvider } from "@/components/ui/Toast";

/**
 * App-wide client providers. MotionConfig reducedMotion="user" makes every
 * Framer Motion animation respect the OS prefers-reduced-motion setting.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>{children}</ToastProvider>
    </MotionConfig>
  );
}
