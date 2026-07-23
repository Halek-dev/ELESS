"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertTriangle } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/cn";

type ToastKind = "success" | "error";
interface ToastItem {
  id: number;
  kind: ToastKind;
  title: string;
  subtext?: string;
}

interface ToastCtx {
  toast: (t: Omit<ToastItem, "id">) => void;
}

const Ctx = createContext<ToastCtx | null>(null);

export function useToast(): ToastCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const toast = useCallback((t: Omit<ToastItem, "id">) => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 4200);
  }, []);

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      {mounted &&
        createPortal(
          <div className="pointer-events-none fixed bottom-6 right-6 z-toast flex flex-col gap-3">
            <AnimatePresence>
              {items.map((t) => (
                <motion.div
                  key={t.id}
                  role="status"
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                  className={cn(
                    "glass pointer-events-auto flex w-[320px] items-start gap-3 rounded-control p-3.5 backdrop-blur-chip",
                    t.kind === "success"
                      ? "border-[rgba(29,158,117,0.40)]"
                      : "border-[rgba(226,75,74,0.45)]",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full",
                      t.kind === "success" ? "bg-teal text-white" : "bg-red text-white",
                    )}
                  >
                    {t.kind === "success" ? (
                      <Check className="h-4 w-4" strokeWidth={3} />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-text">{t.title}</p>
                    {t.subtext && <p className="text-[12px] text-text-50">{t.subtext}</p>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </Ctx.Provider>
  );
}
