"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { CONTACT } from "@/lib/data/vehicles";
import { whatsappLink } from "@/lib/format";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/#finance", label: "Finance" },
  { href: "/#why-eless", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close drawer on route change.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]) && href !== "/";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-navbar transition-colors duration-300 ease-out-quart",
          scrolled
            ? "border-b border-line bg-[rgba(11,13,16,0.70)] shadow-[0_12px_30px_rgba(0,0,0,0.40)] backdrop-blur-panel"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-18 max-w-frame items-center justify-between px-5 sm:px-8 lg:px-section">
          <Wordmark />

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-[15px] font-medium transition-colors hover:text-text",
                    isActive(link.href) ? "text-text" : "text-text-70",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right cluster */}
          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={`tel:${CONTACT.phoneLocal}`}
              className="text-[14px] text-text-70 transition-colors hover:text-text"
            >
              {CONTACT.phoneDisplay}
            </a>
            <ButtonLink href="/inventory" size="md">
              Book a viewing
            </ButtonLink>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-control border border-line-strong bg-glass-fill backdrop-blur-chip text-text lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-modal lg:hidden">
            <motion.div
              className="absolute inset-0 bg-[rgba(7,8,10,0.65)] backdrop-blur-[8px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="glass absolute right-0 top-0 flex h-full w-[80%] max-w-[360px] flex-col border-l border-line-strong px-6 py-5 backdrop-blur-drawer shadow-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.36, ease: EASE_OUT }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between">
                <Wordmark />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-control border border-line-strong bg-white/[0.04] text-text"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-10 flex flex-col">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: Math.min(i * 3, 9) }}
                      transition={{ delay: 0.08 + i * 0.05, duration: 0.3, ease: EASE_OUT }}
                      className="border-b border-line-soft"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center justify-between py-5 font-display text-[22px] font-semibold transition-colors",
                          active ? "text-amber" : "text-text hover:text-amber-light",
                        )}
                      >
                        {link.label}
                        <ArrowRight className={cn("h-5 w-5", active ? "text-amber" : "text-text-40")} />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-8 space-y-4">
                <ButtonLink
                  href={whatsappLink(CONTACT.phoneLocal, "Hi Eless Autos, I'd like to ask about a car.")}
                  external
                  variant="whatsapp-solid"
                  block
                  size="lg"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  WhatsApp us
                </ButtonLink>
                <a
                  href={`tel:${CONTACT.phoneLocal}`}
                  className="block text-center text-[15px] font-semibold text-amber-light"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
