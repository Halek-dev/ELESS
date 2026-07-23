"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";
import { DARK_BLUR } from "@/lib/images";

/**
 * next/image wrapper with a branded dark-card fallback on load error.
 * `detail` renders the full "Image couldn't load / Retry" frame; otherwise a
 * quiet dark radial placeholder suited to cards.
 */
export function VehicleImage({
  src,
  alt,
  detail = false,
  className,
  imgClassName,
  priority,
  sizes,
  fill = true,
}: {
  src: string;
  alt: string;
  detail?: boolean;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
} & Partial<Pick<ImageProps, "priority">>) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const placeholderBg =
    "bg-[radial-gradient(120%_100%_at_50%_0%,#1b2028_0%,#0e1116_60%,#0b0d10_100%)]";

  if (failed) {
    return (
      <div className={cn("relative h-full w-full", placeholderBg, className)}>
        {detail ? (
          <div className="absolute inset-3 flex flex-col items-center justify-center gap-4 rounded-card border border-dashed border-line-strong">
            <span className="font-display text-3xl font-extrabold tracking-title text-white/10">
              ELESS<span className="text-amber/40">.</span>
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-control border border-line bg-white/[0.03]">
              <ImageOff className="h-5 w-5 text-text-40" />
            </span>
            <div className="text-center">
              <p className="text-[14px] text-text-50">Image couldn&rsquo;t load</p>
              <button
                type="button"
                onClick={() => {
                  setFailed(false);
                  setAttempt((a) => a + 1);
                }}
                className="mt-1 text-[14px] font-semibold text-amber hover:text-amber-hover focus:outline-none focus-visible:outline-none"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-xl font-extrabold tracking-title text-white/[0.08]">
              ELESS<span className="text-amber/30">.</span>
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden", placeholderBg, className)}>
      <Image
        key={attempt}
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        priority={priority}
        placeholder="blur"
        blurDataURL={DARK_BLUR}
        onError={() => setFailed(true)}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
