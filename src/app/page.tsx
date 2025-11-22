"use client";
import { CertificationSection } from "@/components/courses/certificate";
import FAQSection from "@/components/FAQSection";
import TestimonialGoogleSwiper from "@/components/GoogleTestimonial/GoogleTestimonial";
import HeroSectionV2 from "@/components/HeroSection2";
import { FeatureProduct } from "@/components/productDetail/featuresProduct";
import ShortBio from "@/components/ShortBio/shortBio";
import TargetAudienceSection from "@/components/TargetAudienceSection";

export default function Home() {
  return (
    <>
     <div className="overflow-y-auto overflow-x-hidden">
      <HeroSectionV2 />
      <ShortBio />
      <FeatureProduct />
      <TargetAudienceSection />
      <TestimonialGoogleSwiper />
      <CertificationSection />
      <FAQSection />
    </div>
    </>
  );
}
