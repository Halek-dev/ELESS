import type { Variants } from "framer-motion";

/**
 * Shared motion vocabulary. Eased and intentional — exponential ease-out,
 * no bouncy defaults. Framer Motion automatically honours prefers-reduced-motion
 * when MotionConfig reducedMotion="user" wraps the app (see AppProviders).
 */

/** ease-out-expo — exponential decel, no bounce. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** Parent that staggers its children on scroll into view. */
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Common viewport config for whileInView reveals. */
export const inView = { once: true, amount: 0.2 } as const;
