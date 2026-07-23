/**
 * A single dark, on-brand blur placeholder used for every next/image while the
 * real photo streams in. Works on both server (Buffer) and client (btoa).
 */
function toBase64(str: string): string {
  return typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
}

const shimmerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="10">
  <defs>
    <radialGradient id="g" cx="50%" cy="60%" r="80%">
      <stop offset="0%" stop-color="#1b2028"/>
      <stop offset="100%" stop-color="#0b0d10"/>
    </radialGradient>
  </defs>
  <rect width="16" height="10" fill="url(#g)"/>
</svg>`;

export const DARK_BLUR = `data:image/svg+xml;base64,${toBase64(shimmerSvg)}`;
