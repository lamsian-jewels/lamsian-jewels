import { Suspense } from "react";
import ShopClient from "./ShopClient";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Shop — Lamsian Jewels | Kenya Jewelry Collection",
  description:
    "Browse handcrafted rings, necklaces, earrings, bracelets, anklets, watches and curated jewelry sets from Lamsian Jewels.",
  keywords:
    "shop jewelry Kenya, handmade jewelry collection, rings, necklaces, earrings, bracelets, anklets, watches, jewelry sets, Kenya delivery, 47 counties",
  openGraph: {
    title: "Shop — Lamsian Jewels",
    description:
      "Browse handcrafted rings, necklaces, earrings, bracelets, anklets and watches with delivery across all 47 Kenyan counties.",
    type: "website",
  },
};
export const revalidate = 60;

export default async function ShopPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-50 pt-28 flex items-center justify-center"><p className="font-body text-charcoal-400 tracking-widest">Loading collection...</p></div>}>
      <ShopClient products={products || []} />
    </Suspense>
  );
}
