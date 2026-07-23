import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { CONTACT } from "@/lib/data/vehicles";
import { whatsappLink } from "@/lib/format";

const browse = [
  { label: "All inventory", href: "/inventory" },
  { label: "Tokunbo SUVs", href: "/inventory?condition=Tokunbo&body=SUV" },
  { label: "Budget cars", href: "/inventory?band=under-20" },
  { label: "Trucks & pickups", href: "/inventory?body=Pickup" },
  { label: "Premium imports", href: "/inventory?body=Luxury" },
];

const company = [
  { label: "About Eless", href: "/#why-eless" },
  { label: "Finance", href: "/#finance" },
  { label: "Sell your car", href: "/inventory" },
  { label: "Warranty", href: "/#why-eless" },
  { label: "Contact", href: "/#contact" },
];

const showrooms = [
  { city: "Lagos", lines: ["18 Adeola Odeku, Victoria Island"] },
  { city: "Ibadan", lines: ["KM 5 Ring Road, Challenge"] },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-bg-deep">
      <div className="mx-auto max-w-frame px-5 py-16 sm:px-8 lg:px-section">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 md:col-span-1">
            <Wordmark />
            <p className="mt-4 max-w-[240px] text-[14px] leading-relaxed text-text-55">
              Nigeria&rsquo;s trusted showroom for inspected Tokunbo, Nigerian-used and premium vehicles.
            </p>
            <ButtonLink
              href={whatsappLink(CONTACT.phoneLocal, "Hi Eless Autos, I'd like to ask about a car.")}
              external
              variant="whatsapp-solid"
              size="md"
              className="mt-6"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </ButtonLink>
          </div>

          <nav aria-label="Browse">
            <h2 className="field-label mb-4">Browse</h2>
            <ul className="space-y-3">
              {browse.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[14px] text-text-70 transition-colors hover:text-amber-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="field-label mb-4">Company</h2>
            <ul className="space-y-3">
              {company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[14px] text-text-70 transition-colors hover:text-amber-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1">
            <h2 className="field-label mb-4">Showrooms</h2>
            <ul className="space-y-4">
              {showrooms.map((s) => (
                <li key={s.city}>
                  <p className="text-[14px] font-semibold text-text">{s.city}</p>
                  {s.lines.map((line) => (
                    <p key={line} className="text-[13px] text-text-55">
                      {line}
                    </p>
                  ))}
                </li>
              ))}
              <li>
                <a href={`tel:${CONTACT.phoneLocal}`} className="text-[14px] font-semibold text-amber-light">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line-soft pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-text-40">© 2026 Eless Autos Motors Ltd.</p>
          <ul className="flex items-center gap-6 text-[13px] text-text-55">
            {["Instagram", "Facebook", "X", "TikTok"].map((s) => (
              <li key={s}>
                <a href="#" className="transition-colors hover:text-amber-light">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
