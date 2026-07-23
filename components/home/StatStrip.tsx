"use client";

import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { value: 6200, suffix: "+", label: "Cars delivered", accent: false },
  { value: 32, suffix: "", label: "Brands stocked", accent: false },
  { value: 14, suffix: "", label: "Years in business", accent: false },
  { value: 100, suffix: "%", label: "Verified inspections", accent: true },
];

export function StatStrip() {
  return (
    <Reveal className="mx-auto max-w-frame px-5 sm:px-8 lg:px-section">
      <div className="glass grid grid-cols-2 gap-y-8 rounded-card px-6 py-8 sm:px-8 lg:grid-cols-4 lg:gap-0">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={
              i > 0
                ? "lg:border-l lg:border-line-soft lg:pl-8"
                : ""
            }
          >
            <p
              className={`font-display text-[36px] font-extrabold leading-none tracking-heading tabular-nums lg:text-[42px] ${
                s.accent ? "text-amber" : "text-text"
              }`}
            >
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-[13px] text-text-55">{s.label}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
