"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Select } from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { makes, bodyTypes, priceBands } from "@/lib/data/vehicles";

/** Glass search bar under the hero — routes into /inventory with query params. */
export function HeroSearch() {
  const router = useRouter();
  const [make, setMake] = useState<string | null>(null);
  const [body, setBody] = useState<string | null>(null);
  const [band, setBand] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (body) params.set("body", body);
    if (band) params.set("band", band);
    router.push(`/inventory${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <form
      onSubmit={submit}
      className="glass rounded-card p-4 sm:p-5"
      aria-label="Search inventory"
    >
      {/*
       * Mobile matches the mobile frame: no visible field labels, make on its
       * own row, then body type beside a compact amber arrow button. Labels stay
       * in the a11y tree via sr-only. Budget is desktop-only (still filterable
       * on /inventory).
       */}
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end md:gap-4">
        <Select
          label="Make"
          labelClassName="sr-only md:not-sr-only md:mb-2 md:block"
          placeholder="Any make"
          options={makes.map((m) => ({ value: m, label: m }))}
          value={make}
          onChange={setMake}
        />

        <div className="flex items-end gap-3 md:contents">
          <Select
            className="flex-1"
            label="Body type"
            labelClassName="sr-only md:not-sr-only md:mb-2 md:block"
            placeholder="Any body type"
            options={bodyTypes.map((b) => ({ value: b, label: b }))}
            value={body}
            onChange={setBody}
          />
          <Button
            type="submit"
            loading={searching}
            aria-label="Search inventory"
            className="h-[46px] w-[46px] shrink-0 !px-0 md:hidden"
          >
            {!searching && <ArrowRight className="h-5 w-5" />}
          </Button>
        </div>

        <Select
          className="hidden md:block"
          label="Budget"
          placeholder="Any budget"
          options={priceBands.map((b) => ({ value: b.id, label: b.label }))}
          value={band}
          onChange={setBand}
        />

        <Button type="submit" loading={searching} className="hidden h-[46px] md:inline-flex">
          {!searching && (
            <>
              Search
              <ArrowRight className="h-4 w-4" />
            </>
          )}
          {searching && "Searching"}
        </Button>
      </div>
    </form>
  );
}
