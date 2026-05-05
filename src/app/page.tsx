import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CategoryStrip from "@/components/home/CategoryStrip";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Home — Lamsian Jewels | Kenya Handmade Jewelry",
  description:
    "Shop handmade rings, necklaces, earrings, bracelets, anklets and watches from Lamsian Jewels with Kenya-wide delivery to all 47 counties.",
  keywords:
    "Kenyan jewelry, handmade jewelry Kenya, wedding jewelry Nairobi, gift jewelry Mombasa, jewelry delivery Kisumu, 47 counties of Kenya",
};

export const revalidate = 60;

export default async function HomePage() {
  const { data: featured } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("in_stock", true)
    .limit(6);

  const { data: newArrivals } = await supabase
    .from("products")
    .select("*")
    .eq("is_new", true)
    .limit(4);

  return (
    <main>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts products={featured || []} />
      <BrandStory />
      <Testimonials />
      <CTABanner newArrivals={newArrivals || []} />
    </main>
  );
}
