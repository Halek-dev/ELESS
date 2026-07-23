"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import {
  vehicles,
  makes,
  bodyTypes,
  priceBands,
  years,
  type Vehicle,
  type BodyType,
  type Condition,
} from "@/lib/data/vehicles";
import { Select } from "@/components/ui/Select";
import { Chip } from "@/components/ui/Chip";
import { SegmentedToggle } from "@/components/ui/SegmentedToggle";
import { VehicleCard, VehicleCardSkeleton } from "@/components/vehicle/VehicleCard";
import { EmptyState } from "./EmptyState";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/cn";

type SortKey = "newest" | "price-asc" | "price-desc" | "mileage-asc";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "mileage-asc", label: "Lowest mileage" },
];

interface Filters {
  make: string | null;
  body: BodyType | null;
  band: string | null;
  year: string | null;
  condition: Condition | null;
}

const EMPTY: Filters = { make: null, body: null, band: null, year: null, condition: null };

export function InventoryBrowser() {
  const params = useSearchParams();

  // Seed from URL (e.g. arriving from the home search bar or footer links).
  const [filters, setFilters] = useState<Filters>(() => ({
    make: params.get("make"),
    body: (params.get("body") as BodyType) ?? null,
    band: params.get("band"),
    year: params.get("year"),
    condition: (params.get("condition") as Condition) ?? null,
  }));
  const [sort, setSort] = useState<SortKey>("newest");
  const [loading, setLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Brief skeleton pass whenever the query changes — mirrors the loading frame.
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 320);
    return () => clearTimeout(t);
  }, [filters, sort]);

  const results = useMemo(() => {
    const band = priceBands.find((b) => b.id === filters.band);
    const out = vehicles.filter((v) => {
      if (filters.make && v.make !== filters.make) return false;
      if (filters.body && v.bodyType !== filters.body) return false;
      if (filters.year && v.year !== Number(filters.year)) return false;
      if (filters.condition && v.condition !== filters.condition) return false;
      if (band && (v.price < band.min || v.price >= band.max)) return false;
      return true;
    });

    const sorted = [...out];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "mileage-asc":
        sorted.sort((a, b) => a.mileageKm - b.mileageKm);
        break;
      default:
        sorted.sort((a, b) => b.year - a.year || a.price - b.price);
    }
    // Sold stock always sinks to the bottom.
    return sorted.sort((a, b) => Number(a.status === "sold") - Number(b.status === "sold"));
  }, [filters, sort]);

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const activeChips: { key: keyof Filters; label: string }[] = [];
  if (filters.make) activeChips.push({ key: "make", label: filters.make });
  if (filters.body) activeChips.push({ key: "body", label: filters.body });
  if (filters.band)
    activeChips.push({
      key: "band",
      label: priceBands.find((b) => b.id === filters.band)?.label ?? filters.band,
    });
  if (filters.year) activeChips.push({ key: "year", label: filters.year });
  if (filters.condition) activeChips.push({ key: "condition", label: filters.condition });

  const hasFilters = activeChips.length > 0;

  return (
    <div className="mx-auto max-w-frame px-5 pb-24 pt-28 sm:px-8 lg:px-section lg:pt-36">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[36px] font-extrabold tracking-title text-text sm:text-[44px]">
            Inventory
          </h1>
          <p className="mt-2 text-[15px] text-text-55">
            Every car road-checked, priced in Naira, ready in Lagos or Ibadan.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowMobileFilters((s) => !s)}
          aria-expanded={showMobileFilters}
          className="flex h-[42px] items-center gap-2 rounded-control border border-line-strong bg-glass-fill px-4 text-[14px] font-semibold text-text backdrop-blur-chip lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </button>
      </header>

      {/* Filter bar */}
      <div
        className={cn(
          "glass mt-8 rounded-card p-4 sm:p-5",
          !showMobileFilters && "hidden lg:block",
        )}
      >
        <div className="grid gap-4 lg:grid-cols-[repeat(4,1fr)_auto] lg:items-end">
          <Select
            label="Make"
            placeholder="Any make"
            options={makes.map((m) => ({ value: m, label: m }))}
            value={filters.make}
            onChange={(v) => set("make", v)}
          />
          <Select
            label="Body type"
            placeholder="Any body type"
            options={bodyTypes.map((b) => ({ value: b, label: b }))}
            value={filters.body}
            onChange={(v) => set("body", v as BodyType)}
          />
          <Select
            label="Budget"
            placeholder="Any budget"
            options={priceBands.map((b) => ({ value: b.id, label: b.label }))}
            value={filters.band}
            onChange={(v) => set("band", v)}
          />
          <Select
            label="Year"
            placeholder="Any year"
            options={years.map((y) => ({ value: String(y), label: String(y) }))}
            value={filters.year}
            onChange={(v) => set("year", v)}
          />
          <div className="lg:pb-0">
            <span className="field-label mb-2 block">Condition</span>
            <SegmentedToggle
              ariaLabel="Filter by condition"
              segments={[
                { value: "Tokunbo" as Condition, label: "Tokunbo" },
                { value: "Nigerian-used" as Condition, label: "Nigerian-used" },
              ]}
              value={filters.condition}
              onChange={(v) => set("condition", v)}
            />
          </div>
        </div>
      </div>

      {/* Results header: count + chips + sort */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[15px] text-text-55" aria-live="polite">
            <span className="font-display font-bold text-text tabular-nums">{results.length}</span>{" "}
            {results.length === 1 ? "vehicle" : "vehicles"}
          </p>
          {activeChips.map((c) => (
            <Chip
              key={c.key}
              active
              onRemove={() => set(c.key, null)}
              removeLabel={`Remove ${c.label} filter`}
            >
              {c.label}
            </Chip>
          ))}
          {hasFilters && (
            <button
              type="button"
              onClick={() => setFilters(EMPTY)}
              className="text-[13px] font-semibold text-amber transition-colors hover:text-amber-hover"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="w-full sm:w-[220px]">
          <Select
            placeholder="Sort by"
            options={SORTS}
            value={sort}
            onChange={(v) => setSort(v as SortKey)}
          />
        </div>
      </div>

      {/* Grid / skeleton / empty */}
      <div className="mt-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <VehicleCardSkeleton key={i} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <EmptyState onClear={() => setFilters(EMPTY)} />
        ) : (
          <motion.div
            key={`${JSON.stringify(filters)}-${sort}`}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {results.map((v: Vehicle, i) => (
              <VehicleCard key={v.slug} vehicle={v} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
