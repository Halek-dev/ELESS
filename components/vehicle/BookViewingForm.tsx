"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import type { Vehicle } from "@/lib/data/vehicles";

const SHOWROOMS = [
  { value: "lagos", label: "Lagos · Victoria Island" },
  { value: "ibadan", label: "Ibadan · Ring Road" },
];

/** Valid Nigerian mobile: 0XXXXXXXXXX (11) or +234XXXXXXXXXX (13 digits). */
function isValidNgPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("234")) return digits.length === 13;
  if (digits.startsWith("0")) return digits.length === 11;
  return false;
}

export function BookViewingForm({ vehicle }: { vehicle: Vehicle }) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showroom, setShowroom] = useState<string | null>(
    vehicle.location === "Lagos" ? "lagos" : "ibadan",
  );
  const [touched, setTouched] = useState({ name: false, phone: false });
  const [submitting, setSubmitting] = useState(false);

  const nameError = touched.name && name.trim().length < 2 ? "Enter your full name" : undefined;
  const phoneError =
    touched.phone && !isValidNgPhone(phone) ? "Enter a valid +234 phone number" : undefined;

  const valid = name.trim().length >= 2 && isValidNgPhone(phone) && Boolean(showroom);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (!valid) return;
    setSubmitting(true);
    // No backend — this is a static demo, so we just acknowledge locally.
    setTimeout(() => {
      setSubmitting(false);
      toast({
        kind: "success",
        title: "Viewing requested",
        subtext: `We'll call you about the ${vehicle.name}.`,
      });
      setName("");
      setPhone("");
      setTouched({ name: false, phone: false });
    }, 900);
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-card border border-line-soft bg-surface p-6"
      aria-labelledby="book-viewing-heading"
    >
      <h2
        id="book-viewing-heading"
        className="font-display text-[22px] font-bold tracking-heading text-text"
      >
        Book a viewing
      </h2>
      <p className="mt-2 text-[14px] text-text-55">
        See the {vehicle.name} in person at our {vehicle.location} showroom.
      </p>

      <div className="mt-6 space-y-5">
        <Input
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          error={nameError}
          placeholder="Chinedu Okafor"
          autoComplete="name"
        />
        <Input
          label="Phone number"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          error={phoneError}
          placeholder="0812 000 4477"
          autoComplete="tel"
        />
        <Select
          label="Preferred showroom"
          placeholder="Choose a showroom"
          options={SHOWROOMS}
          value={showroom}
          onChange={setShowroom}
        />
      </div>

      <Button type="submit" block size="lg" className="mt-6" disabled={!valid} loading={submitting}>
        {submitting ? "Sending" : "Confirm booking"}
      </Button>
      <p className="mt-3 text-center text-[11px] text-text-40">
        Demo form — no details are submitted or stored.
      </p>
    </form>
  );
}
