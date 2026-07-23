import type { Metadata, Viewport } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Eless Autos Motors — The right car, inspected and ready",
    template: "%s · Eless Autos Motors",
  },
  description:
    "Nigeria's trusted showroom for inspected Tokunbo, Nigerian-used and premium vehicles. Lagos · Ibadan · nationwide delivery.",
  keywords: [
    "Tokunbo cars Nigeria",
    "Nigerian used cars",
    "buy car Lagos",
    "car dealership Ibadan",
    "car finance Nigeria",
  ],
  openGraph: {
    title: "Eless Autos Motors — The right car, inspected and ready",
    description:
      "Tokunbo family SUVs, Nigerian-used budget cars, trucks and premium imports — every one road-checked before it reaches you.",
    type: "website",
    locale: "en_NG",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${sora.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-bg antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-toast focus:rounded-control focus:bg-amber focus:px-4 focus:py-2 focus:font-semibold focus:text-on-amber"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
