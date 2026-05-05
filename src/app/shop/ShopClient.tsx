"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/supabase";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "rings", label: "Rings" },
  { value: "necklaces", label: "Necklaces" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelets", label: "Bracelets" },
  { value: "anklets", label: "Anklets" },
  { value: "watches", label: "Watches" },
  { value: "sets", label: "Sets" },
];

export default function ShopClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "price_asc" | "price_desc">("newest");

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (showInStockOnly) list = list.filter((p) => p.in_stock);
    if (sortBy === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, activeCategory, showInStockOnly, sortBy]);

  return (
    <div className="min-h-screen bg-cream-50 pt-28">
      {/* Header */}
      <div className="bg-charcoal-900 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-500/5" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-body text-[10px] tracking-[0.4em] text-gold-400 uppercase mb-3 relative"
        >
          Lamsian Jewels
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-7xl text-cream-50 font-light relative"
        >
          The <span className="text-shimmer italic">Collection</span>
        </motion.h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2 text-[11px] tracking-widest uppercase font-body transition-all duration-200 ${
                  activeCategory === cat.value
                    ? "bg-charcoal-900 text-cream-50"
                    : "border border-cream-300 text-charcoal-700 hover:border-gold-500 hover:text-gold-500"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 font-body text-xs text-charcoal-700 cursor-pointer">
              <input
                type="checkbox"
                checked={showInStockOnly}
                onChange={(e) => setShowInStockOnly(e.target.checked)}
                className="accent-gold-500"
              />
              In Stock Only
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-cream-100 border border-cream-300 text-charcoal-700 text-xs font-body px-3 py-2 focus:outline-none focus:border-gold-500"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Result count */}
        <p className="font-body text-xs text-charcoal-500 mb-8">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} found
        </p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + sortBy + showInStockOnly}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="font-display text-3xl text-charcoal-700 mb-3">No pieces found</p>
                <p className="font-body text-sm text-charcoal-500">Try a different category or filter</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
