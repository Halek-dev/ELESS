"use client";

import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { vehicles } from "@/lib/data/vehicles";

// Deep-link the calculator CTA at the flagship listing.
const flagship = vehicles[0];

export function FinanceCTA() {
  return (
    <section id="finance" className="mx-auto max-w-frame px-5 sm:px-8 lg:px-section">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-card border border-amber-border p-8 sm:p-12"
          style={{
            background:
              "linear-gradient(120deg, rgba(239,159,39,0.16) 0%, rgba(239,159,39,0.06) 45%, rgba(20,23,28,0.9) 100%)",
          }}
        >
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="max-w-[18ch] font-display text-[28px] font-extrabold leading-tight tracking-heading text-text sm:text-[36px]">
                See your monthly repayment before you commit.
              </h2>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-text-70">
                Adjust down payment and tenure and watch the figure move in real Naira.
              </p>
            </div>
            <ButtonLink
              href={`/inventory/${flagship.slug}#finance-calculator`}
              size="lg"
              className="shrink-0"
            >
              Open finance calculator
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
