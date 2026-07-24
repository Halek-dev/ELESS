"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { VehicleImage } from "@/components/ui/VehicleImage";
import { useToast } from "@/components/ui/Toast";
import type { Vehicle } from "@/lib/data/vehicles";
import { formatNaira } from "@/lib/format";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/cn";

const STEPS = ["Details", "Schedule", "Confirm"] as const;

/** Build the next `count` monthly debit dates from a start date. */
function debitDates(start: Date, count: number): Date[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start);
    d.setMonth(d.getMonth() + i);
    return d;
  });
}

const longDate = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const shortDate = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function AutopayModal({
  open,
  onClose,
  vehicle,
  monthly,
  tenure,
}: {
  open: boolean;
  onClose: () => void;
  vehicle: Vehicle;
  monthly: number;
  tenure: number;
}) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => setMounted(true), []);

  // First-debit options: the 1st of each of the next three months.
  const dateOptions = useMemo(() => {
    const base = new Date();
    return Array.from({ length: 3 }, (_, i) => {
      const d = new Date(base.getFullYear(), base.getMonth() + i + 1, 1);
      return { value: d.toISOString(), label: longDate.format(d) };
    });
  }, []);
  const [firstDebit, setFirstDebit] = useState<string>(dateOptions[0].value);
  const startDate = useMemo(() => new Date(firstDebit), [firstDebit]);

  // Reset to step 1 whenever the modal is reopened.
  useEffect(() => {
    if (open) {
      setStep(0);
      setSubmitting(false);
    }
  }, [open]);

  // Scroll lock + Escape to close.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open, step]);

  const schedule = debitDates(startDate, Math.min(6, tenure));
  const totalPayable = monthly * tenure;

  const confirm = () => {
    setSubmitting(true);
    // Visual mock only — no payment integration, nothing leaves the browser.
    setTimeout(() => {
      setReference(`ELS-AP-${Math.floor(1_000_000 + Math.random() * 8_999_999)}`);
      setSubmitting(false);
      setStep(2);
      toast({
        kind: "success",
        title: "Autopay set up",
        subtext: "Demo only — no card was charged.",
      });
    }, 900);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-modal flex items-start justify-center overflow-y-auto p-4 sm:items-center">
          <motion.div
            className="fixed inset-0 bg-[rgba(7,8,10,0.72)] backdrop-blur-[14px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="autopay-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
            className="glass relative my-auto w-full max-w-[500px] rounded-card p-6 backdrop-blur-modal focus:outline-none sm:p-[30px]"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <h2
                id="autopay-title"
                className="font-display text-[26px] font-extrabold tracking-heading text-text sm:text-[28px]"
              >
                {step === 0 && "Set up autopay"}
                {step === 1 && "Your debit schedule"}
                {step === 2 && "Autopay is live"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close autopay"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-line-strong bg-white/[0.04] text-text-70 transition-colors hover:text-text"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Stepper */}
            <ol className="mt-6 flex items-center gap-2" aria-label="Progress">
              {STEPS.map((label, i) => {
                const done = i < step;
                const current = i === step;
                return (
                  <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
                    <span
                      aria-current={current ? "step" : undefined}
                      className={cn(
                        "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[13px] font-bold font-display",
                        done && "bg-teal text-white",
                        current &&
                          "bg-amber text-on-amber shadow-[0_0_0_4px_rgba(239,159,39,0.18)]",
                        !done && !current && "border border-line-strong bg-white/[0.04] text-text-40",
                      )}
                    >
                      {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                    </span>
                    <span
                      className={cn(
                        "text-[14px] font-semibold",
                        current ? "text-text" : done ? "text-text-70" : "text-text-40",
                      )}
                    >
                      {label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span
                        aria-hidden
                        className={cn(
                          "h-px flex-1",
                          done ? "bg-teal" : "bg-white/[0.12]",
                        )}
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            {/* Panels */}
            <div className="mt-7">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    {/* Vehicle row */}
                    <div className="flex items-center gap-4 rounded-control border border-line-soft bg-white/[0.03] p-3">
                      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-thumb">
                        <VehicleImage
                          src={vehicle.images[0]}
                          alt={`${vehicle.year} ${vehicle.name}`}
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-display text-[17px] font-semibold text-text">
                          {vehicle.name}
                        </p>
                        <p className="text-[13px] text-text-50">
                          {vehicle.year} · {vehicle.condition} · {vehicle.location}
                        </p>
                      </div>
                    </div>

                    {/* Summary tiles */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-control border border-line-soft bg-white/[0.03] p-4">
                        <p className="text-[13px] text-text-50">Monthly amount</p>
                        <p className="mt-1 font-display text-[18px] font-extrabold text-amber tabular-nums sm:text-[20px]">
                          {formatNaira(monthly)}
                        </p>
                      </div>
                      <div className="rounded-control border border-line-soft bg-white/[0.03] p-4">
                        <p className="text-[13px] text-text-50">Tenure</p>
                        <p className="mt-1 whitespace-nowrap font-display text-[18px] font-extrabold text-text tabular-nums sm:text-[20px]">
                          {tenure} months
                        </p>
                      </div>
                    </div>

                    {/* First debit date */}
                    <div className="mt-5">
                      <Select
                        label="First debit date"
                        placeholder="Choose a date"
                        options={dateOptions}
                        value={firstDebit}
                        onChange={setFirstDebit}
                      />
                    </div>

                    {/* Card fields — demo placeholders, read-only by design. */}
                    <div className="mt-5">
                      <span className="field-label mb-2 block">Card number</span>
                      <div className="relative flex h-[46px] items-center rounded-control border border-amber bg-surface-sunken px-4 shadow-[0_0_0_3px_rgba(239,159,39,0.20)]">
                        <span className="text-[15px] tracking-wider text-text">
                          5399 •••• •••• 2210
                        </span>
                        <Check className="ml-auto h-4 w-4 text-amber" strokeWidth={2.5} />
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <span className="field-label mb-2 block">Expiry</span>
                        <div className="flex h-[46px] items-center rounded-control border border-line bg-surface-sunken px-4 text-[15px] text-text">
                          09 / 28
                        </div>
                      </div>
                      <div>
                        <span className="field-label mb-2 block">CVV</span>
                        <div className="flex h-[46px] items-center rounded-control border border-line bg-surface-sunken px-4 text-[15px] tracking-[0.3em] text-text">
                          •••
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 rounded-control border border-amber-border bg-amber-tint px-4 py-3 text-[12px] leading-relaxed text-amber-light">
                      Demo only — these card details are placeholders. Nothing is charged, stored or
                      sent anywhere.
                    </p>

                    <Button block size="lg" className="mt-5" onClick={() => setStep(1)}>
                      Continue to schedule
                    </Button>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    <p className="text-[14px] text-text-55">
                      Next {schedule.length} of {tenure} debits
                    </p>

                    <ul className="mt-4 overflow-hidden rounded-control border border-line-soft">
                      {schedule.map((d, i) => (
                        <li
                          key={d.toISOString()}
                          className={cn(
                            "flex items-center gap-3 px-4 py-[15px]",
                            i > 0 && "border-t border-line-soft",
                            i === 0 && "bg-amber-tint",
                          )}
                        >
                          <span className="font-display text-[13px] font-semibold text-text-40 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[15px] text-text">{shortDate.format(d)}</span>
                          {i === 0 && (
                            <span className="rounded-pill bg-[rgba(239,159,39,0.28)] px-2.5 py-1 text-[11px] font-bold text-amber-light">
                              Next
                            </span>
                          )}
                          <span className="ml-auto font-display text-[15px] font-bold text-text tabular-nums">
                            {formatNaira(monthly)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex items-center justify-between gap-3 rounded-control border border-amber-border bg-amber-tint px-4 py-4">
                      <span className="text-[14px] text-text-70">
                        Total payable over {tenure} months
                      </span>
                      <span className="font-display text-[19px] font-extrabold text-amber tabular-nums">
                        {formatNaira(totalPayable)}
                      </span>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Button variant="secondary" size="lg" onClick={() => setStep(0)}>
                        Back
                      </Button>
                      <Button size="lg" block loading={submitting} onClick={confirm}>
                        {submitting ? "Confirming" : "Confirm autopay"}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                      className="mx-auto flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[rgba(29,158,117,0.4)] bg-teal-tint shadow-[0_0_40px_rgba(29,158,117,0.25)]"
                    >
                      <Check className="h-10 w-10 text-teal" strokeWidth={2.5} />
                    </motion.span>

                    <p className="mt-6 text-[15px] leading-relaxed text-text-70">
                      Your first debit of{" "}
                      <span className="font-semibold text-text tabular-nums">
                        {formatNaira(monthly)}
                      </span>{" "}
                      is scheduled for {longDate.format(startDate)}.
                    </p>

                    <div className="mt-6 flex items-center justify-between rounded-control border border-line-soft bg-white/[0.03] px-4 py-4">
                      <span className="text-[14px] text-text-55">Reference</span>
                      <span className="font-display text-[16px] font-extrabold text-amber-light">
                        {reference}
                      </span>
                    </div>

                    <h3 className="field-label mt-7 text-left">What happens next</h3>
                    <ol className="mt-4 space-y-4 text-left">
                      {[
                        "A confirmation and full schedule are on the way to your email.",
                        `Our ${vehicle.location} team will call to arrange handover or delivery.`,
                        "Manage or pause autopay anytime from your dashboard.",
                      ].map((t, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-tint font-display text-[12px] font-bold text-amber">
                            {i + 1}
                          </span>
                          <span className="text-[15px] leading-relaxed text-text-70">{t}</span>
                        </li>
                      ))}
                    </ol>

                    <Button block size="lg" className="mt-7" onClick={onClose}>
                      View my purchase
                    </Button>
                    <p className="mt-4 text-[11px] text-text-40">
                      Demo flow — no payment was processed.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
