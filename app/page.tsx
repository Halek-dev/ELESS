import { Hero } from "@/components/home/Hero";
import { StatStrip } from "@/components/home/StatStrip";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { WhyEless } from "@/components/home/WhyEless";
import { BodyTypes } from "@/components/home/BodyTypes";
import { Brands } from "@/components/home/Brands";
import { Testimonials } from "@/components/home/Testimonials";
import { FinanceCTA } from "@/components/home/FinanceCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="space-y-20 pb-24 pt-4 lg:space-y-24 lg:pb-28">
        <StatStrip />
        <FeaturedCarousel />
        <WhyEless />
        <BodyTypes />
        <Brands />
        <Testimonials />
        <FinanceCTA />
      </div>
    </>
  );
}
