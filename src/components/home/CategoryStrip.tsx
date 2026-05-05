"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Diamond, Gem, Sparkles, Link2, Leaf, Watch, Gift } from "lucide-react";

const categories = [
  { label: "Rings", icon: Diamond, slug: "rings" },
  { label: "Necklaces", icon: Gem, slug: "necklaces" },
  { label: "Earrings", icon: Sparkles, slug: "earrings" },
  { label: "Bracelets", icon: Link2, slug: "bracelets" },
  { label: "Anklets", icon: Leaf, slug: "anklets" },
  { label: "Watches", icon: Watch, slug: "watches" },
  { label: "Sets", icon: Gift, slug: "sets" },
];

export default function CategoryStrip() {
  return (
    <section className="bg-cream-100 border-y border-cream-300 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-body text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-10"
        >
          Shop by Category
        </motion.p>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className="flex flex-col items-center gap-3 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-14 h-14 rounded-full border border-cream-300 flex items-center justify-center bg-cream-50 group-hover:border-gold-400 group-hover:bg-gold-500/5 transition-colors text-charcoal-700 group-hover:text-gold-500"
                >
                  <cat.icon size={24} />
                </motion.div>
                <p className="font-body text-[11px] tracking-[0.15em] text-charcoal-700 group-hover:text-gold-500 transition-colors uppercase">
                  {cat.label}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
