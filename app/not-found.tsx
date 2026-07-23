import { ButtonLink } from "@/components/ui/Button";
import { CarFront } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-frame flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
      <span className="flex h-[110px] w-[110px] items-center justify-center rounded-full border border-amber-border bg-amber-tint">
        <CarFront className="h-11 w-11 text-amber" strokeWidth={1.6} />
      </span>
      <h1 className="mt-8 font-display text-[32px] font-extrabold tracking-title text-text sm:text-[44px]">
        That page took a wrong turn
      </h1>
      <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-text-55">
        The page or vehicle you&rsquo;re looking for isn&rsquo;t here. It may have been sold — new
        stock lands every week.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/inventory" size="lg">
          Browse inventory
        </ButtonLink>
        <ButtonLink href="/" variant="secondary" size="lg">
          Back home
        </ButtonLink>
      </div>
    </div>
  );
}
