import { Suspense } from "react";
import type { Metadata } from "next";
import { InventoryBrowser } from "@/components/inventory/InventoryBrowser";
import { VehicleCardSkeleton } from "@/components/vehicle/VehicleCard";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "Browse inspected Tokunbo and Nigerian-used cars, SUVs, pickups and premium imports in Lagos and Ibadan. Filter by make, body type, budget and year.",
};

function InventoryFallback() {
  return (
    <div className="mx-auto max-w-frame px-5 pb-24 pt-28 sm:px-8 lg:px-section lg:pt-36">
      <div className="skeleton h-11 w-56 rounded" />
      <div className="skeleton mt-8 h-[110px] rounded-card" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <VehicleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <Suspense fallback={<InventoryFallback />}>
      <InventoryBrowser />
    </Suspense>
  );
}
