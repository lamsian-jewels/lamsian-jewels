import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data } = await supabase.from("products").select("slug");
  return (data || []).map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data } = await supabase.from("products").select("name, description").eq("slug", params.slug).single();
  return {
    title: data ? `${data.name} — Lamsian Jewels` : "Product — Lamsian Jewels",
    description: data?.description,
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!product) notFound();

  const { data: related } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(4);

  return <ProductDetailClient product={product} related={related || []} />;
}
