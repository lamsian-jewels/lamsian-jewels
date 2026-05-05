import Hero from "@/components/home/Hero";
import CategoryStrip from "@/components/home/CategoryStrip";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import { supabase } from "@/lib/supabase";

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
