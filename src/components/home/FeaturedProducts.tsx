"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/supabase";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-body text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-3"
            >
              Curated Pieces
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-6xl text-charcoal-900 font-light"
            >
              Featured <span className="italic text-gold-500">Collection</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/shop"
              className="btn-gold inline-flex px-8 py-3 text-[11px] tracking-widest uppercase font-body"
            >
              <span>View All</span>
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {Array(6).fill(null).map((_, i) => (
              <div key={i} className="aspect-[3/4] skeleton rounded-none" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
