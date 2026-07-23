"use client";

import { useId, useState } from "react";

/**
 * Amber-fill range slider with live readout and a value bubble while dragging.
 * Track 6px, thumb 20px (24px + glow when active) — per component spec.
 */
export function Slider({
  label,
  readout,
  bubble,
  min,
  max,
  step,
  value,
  onChange,
  ariaValueText,
}: {
  label: string;
  readout: string;
  /** Text shown in the value bubble above the thumb while dragging. */
  bubble?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  ariaValueText?: string;
}) {
  const id = useId();
  const [dragging, setDragging] = useState(false);
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className="els-slider">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[15px] text-text-70 font-body">
          {label}
        </label>
        <span className="text-[14px] font-bold text-amber-light font-display tabular-nums">
          {readout}
        </span>
      </div>

      <div className="relative mt-3">
        {/* Value bubble */}
        {dragging && bubble && (
          <span
            className="pointer-events-none absolute -top-9 z-10 -translate-x-1/2 rounded-thumb bg-on-amber px-2.5 py-1 text-[12px] font-bold text-amber-light tabular-nums shadow-pop"
            style={{ left: `calc(${pct}% )` }}
          >
            {bubble}
          </span>
        )}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-valuetext={ariaValueText ?? readout}
          onChange={(e) => onChange(Number(e.target.value))}
          onPointerDown={() => setDragging(true)}
          onPointerUp={() => setDragging(false)}
          onBlur={() => setDragging(false)}
          className="els-range"
          style={{ ["--pct" as string]: `${pct}%` }}
        />
      </div>

      <style jsx>{`
        .els-range {
          width: 100%;
          height: 20px;
          background: transparent;
        }
        .els-range::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(
            to right,
            var(--amber) 0%,
            var(--amber) var(--pct),
            rgba(255, 255, 255, 0.12) var(--pct),
            rgba(255, 255, 255, 0.12) 100%
          );
        }
        .els-range::-moz-range-track {
          height: 6px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
        }
        .els-range::-moz-range-progress {
          height: 6px;
          border-radius: 999px;
          background: var(--amber);
        }
        .els-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          margin-top: -7px;
          height: 20px;
          width: 20px;
          border-radius: 999px;
          background: var(--amber);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .els-range::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border: none;
          border-radius: 999px;
          background: var(--amber);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .els-range:active::-webkit-slider-thumb,
        .els-range:focus-visible::-webkit-slider-thumb {
          transform: scale(1.2);
          box-shadow: 0 0 0 6px rgba(239, 159, 39, 0.22);
        }
        .els-range:active::-moz-range-thumb,
        .els-range:focus-visible::-moz-range-thumb {
          transform: scale(1.2);
          box-shadow: 0 0 0 6px rgba(239, 159, 39, 0.22);
        }
        @media (prefers-reduced-motion: reduce) {
          .els-range::-webkit-slider-thumb,
          .els-range::-moz-range-thumb {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
