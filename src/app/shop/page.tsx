import { Suspense } from "react";
import ShopClient from "./ShopClient";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Shop — Lamsian Jewels",
  description: "Browse our full collection of rings, necklaces, earrings, bracelets, anklets, watches and sets.",
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
