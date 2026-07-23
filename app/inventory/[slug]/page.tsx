import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { vehicles, getVehicle, getSimilar } from "@/lib/data/vehicles";
import { formatKm, formatNaira, pluralBodyType } from "@/lib/format";
import { Gallery } from "@/components/vehicle/Gallery";
import { FinanceCalculator } from "@/components/vehicle/FinanceCalculator";
import { BookViewingForm } from "@/components/vehicle/BookViewingForm";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const vehicle = getVehicle(params.slug);
  if (!vehicle) return { title: "Vehicle not found" };
  return {
    title: `${vehicle.name} — ${formatNaira(vehicle.price)}`,
    description: vehicle.description,
    openGraph: {
      title: `${vehicle.year} ${vehicle.name} — ${formatNaira(vehicle.price)}`,
      description: vehicle.description,
      images: [vehicle.images[0]],
    },
  };
}

export default function VehicleDetailPage({ params }: { params: { slug: string } }) {
  const vehicle = getVehicle(params.slug);
  if (!vehicle) notFound();

  const similar = getSimilar(vehicle);

  return (
    <div className="mx-auto max-w-frame px-5 pb-24 pt-28 sm:px-8 lg:px-section lg:pt-32">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-[13px] text-text-50">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/inventory" className="transition-colors hover:text-text">
              Inventory
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li>
            <Link
              href={`/inventory?body=${encodeURIComponent(vehicle.bodyType)}`}
              className="transition-colors hover:text-text"
            >
              {vehicle.condition} {pluralBodyType(vehicle.bodyType)}
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li aria-current="page" className="text-amber">
            {vehicle.name}
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start lg:gap-12">
        {/* Left column */}
        <div>
          <Gallery vehicle={vehicle} />

          {/* Title block */}
          <div className="mt-8">
            <span className="inline-flex items-center gap-2 rounded-pill border border-[rgba(29,158,117,0.4)] bg-teal-tint px-3.5 py-1.5 text-[12px] font-semibold text-teal">
              {vehicle.condition} · Verified
            </span>
            <h1 className="mt-4 font-display text-[34px] font-extrabold leading-tight tracking-title text-text sm:text-[44px]">
              {vehicle.name}
            </h1>
            <p className="mt-3 text-[16px] text-text-55">{vehicle.tagline}</p>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              {vehicle.features.map((f) => (
                <li
                  key={f}
                  className="rounded-pill border border-line-strong bg-glass-fill px-4 py-2 text-[13px] text-text-70"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Specification table */}
          <section className="mt-10 overflow-hidden rounded-card border border-line-soft bg-surface">
            <h2 className="border-b border-line-soft px-6 py-5 font-display text-[18px] font-semibold text-text">
              Specification
            </h2>
            <dl className="grid sm:grid-cols-2">
              {vehicle.specs.map((row, i) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 border-b border-line-soft px-6 py-4 sm:[&:nth-child(odd)]:border-r"
                >
                  <dt className="text-[14px] text-text-55">{row.label}</dt>
                  <dd className="text-right font-display text-[14px] font-semibold text-text">
                    {row.value}
                  </dd>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 border-b border-line-soft px-6 py-4 sm:border-r">
                <dt className="text-[14px] text-text-55">Mileage</dt>
                <dd className="text-right font-display text-[14px] font-semibold text-text">
                  {formatKm(vehicle.mileageKm)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-line-soft px-6 py-4">
                <dt className="text-[14px] text-text-55">Location</dt>
                <dd className="text-right font-display text-[14px] font-semibold text-text">
                  {vehicle.location}
                </dd>
              </div>
            </dl>
          </section>

          {/* About */}
          <section className="mt-10">
            <h2 className="font-display text-[22px] font-bold tracking-heading text-text">
              About this vehicle
            </h2>
            <p className="mt-4 max-w-[70ch] text-[16px] leading-relaxed text-text-70">
              {vehicle.description}
            </p>
          </section>

          {/* Inspection */}
          <section className="mt-10 rounded-card border border-line-soft bg-surface p-6">
            <h2 className="font-display text-[20px] font-bold tracking-heading text-text">
              150-point inspection passed
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {vehicle.inspection.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-tint">
                    <Check className="h-3 w-3 text-teal" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] text-text-70">{item.label}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Book a viewing */}
          <section className="mt-10">
            <BookViewingForm vehicle={vehicle} />
          </section>
        </div>

        {/* Right column — sticky finance calculator */}
        <FinanceCalculator vehicle={vehicle} />
      </div>

      {/* Similar vehicles */}
      {similar.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <h2 className="font-display text-[26px] font-bold tracking-heading text-text sm:text-[28px]">
              Similar vehicles
            </h2>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((v, i) => (
              <VehicleCard key={v.slug} vehicle={v} index={i} />
            ))}
          </RevealGroup>
        </section>
      )}
    </div>
  );
}
