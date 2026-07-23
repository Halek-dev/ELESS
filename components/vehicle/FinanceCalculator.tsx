"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Button, { ButtonLink } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { AutopayModal } from "./AutopayModal";
import type { Vehicle } from "@/lib/data/vehicles";
import { CONTACT } from "@/lib/data/vehicles";
import { formatNaira, monthlyRepayment, whatsappLink } from "@/lib/format";
import { EASE_OUT } from "@/lib/motion";

/** Down payment 30–50% of price; tenure 12–36 months (per finance terms). */
const DOWN_MIN_PCT = 0.3;
const DOWN_MAX_PCT = 0.5;
const TENURE_MIN = 12;
const TENURE_MAX = 36;

export function FinanceCalculator({ vehicle }: { vehicle: Vehicle }) {
  const downMin = Math.round(vehicle.price * DOWN_MIN_PCT);
  const downMax = Math.round(vehicle.price * DOWN_MAX_PCT);
  const step = 500_000;

  const [down, setDown] = useState(Math.round(vehicle.price * vehicle.defaultDownPct));
  const [tenure, setTenure] = useState(36);
  const [autopayOpen, setAutopayOpen] = useState(false);

  const monthly = useMemo(
    () => monthlyRepayment(vehicle.price - down, vehicle.apr, tenure),
    [vehicle.price, vehicle.apr, down, tenure],
  );

  const sold = vehicle.status === "sold";

  return (
    <>
      <motion.aside
        id="finance-calculator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
        className="glass rounded-card p-6 lg:sticky lg:top-24"
        aria-label="Finance calculator"
      >
        <p className="text-[14px] text-text-55">Price</p>
        <p className="mt-1 font-display text-[34px] font-extrabold leading-none tracking-heading text-amber tabular-nums sm:text-[40px]">
          {formatNaira(vehicle.price)}
        </p>

        <h2 className="field-label mt-7">Finance calculator</h2>

        <div className="mt-5 space-y-6">
          <Slider
            label="Down payment"
            readout={formatNaira(down)}
            bubble={formatNaira(down)}
            min={downMin}
            max={downMax}
            step={step}
            value={down}
            onChange={setDown}
            ariaValueText={`${formatNaira(down)} down payment`}
          />
          <Slider
            label="Tenure"
            readout={`${tenure} months`}
            bubble={`${tenure} months`}
            min={TENURE_MIN}
            max={TENURE_MAX}
            step={6}
            value={tenure}
            onChange={setTenure}
            ariaValueText={`${tenure} months`}
          />
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line-soft pt-4">
          <span className="text-[15px] text-text-70">APR</span>
          <span className="font-display text-[15px] font-bold text-text tabular-nums">
            {vehicle.apr}% p.a.
          </span>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[14px] text-text-55">Estimated monthly repayment</p>
          <p className="mt-1 font-display text-[34px] font-extrabold leading-none tracking-heading text-amber tabular-nums sm:text-[40px]">
            {formatNaira(monthly)}
          </p>
          <p className="mt-1 text-[13px] text-text-50">/ month</p>
        </div>

        <div className="mt-6 space-y-3">
          <Button block size="lg" disabled={sold} onClick={() => setAutopayOpen(true)}>
            {sold ? "This car is sold" : "Set up autopay"}
          </Button>
          <ButtonLink
            href={whatsappLink(
              CONTACT.phoneLocal,
              `Hi Eless Autos, I'm interested in the ${vehicle.year} ${vehicle.name} (${formatNaira(vehicle.price)}).`,
            )}
            external
            variant="whatsapp"
            block
            size="lg"
          >
            <WhatsAppIcon className="h-[15px] w-[15px]" />
            Chat on WhatsApp
          </ButtonLink>
        </div>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-text-40">
          Illustrative demo figures. Final terms subject to approval and Eless Autos finance
          partners.
        </p>
      </motion.aside>

      <AutopayModal
        open={autopayOpen}
        onClose={() => setAutopayOpen(false)}
        vehicle={vehicle}
        monthly={monthly}
        tenure={tenure}
      />
    </>
  );
}
