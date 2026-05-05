"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50 pt-24">
      {/* Hero */}
      <div className="bg-charcoal-900 py-20 text-center relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[500px] h-[500px] border border-gold-500/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-body text-[10px] tracking-[0.4em] text-gold-400 uppercase mb-4 relative">
          Our Story
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-5xl md:text-7xl text-cream-50 font-light relative">
          About <span className="text-shimmer italic">Esther</span>
        </motion.h1>
      </div>

      {/* Story section */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-28"
          >
            <div className="aspect-[3/4] bg-cream-200 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-2xl text-charcoal-400">Esther's Photo</p>
              </div>
              {/* Decorative frame */}
              <div className="absolute inset-4 border border-gold-400/30 pointer-events-none" />
            </div>
            <div className="mt-6 p-6 border border-cream-200 bg-cream-100">
              <p className="font-display text-xl text-charcoal-900 mb-1">Esther [Surname]</p>
              <p className="font-body text-xs tracking-widest text-gold-500 uppercase">Founder, Lamsian Jewels</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="font-body text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-4">The Beginning</p>
              <h2 className="font-display text-4xl text-charcoal-900 font-light leading-tight mb-6">
                Born from a love of beauty and elegance
              </h2>
              <p className="font-body text-charcoal-600 leading-relaxed">
                Lamsian Jewels started with a simple belief: that every woman deserves to feel adorned, seen, and celebrated — no matter the occasion. What began as a personal passion for curating beautiful pieces grew into a brand trusted by hundreds of women across Kenya.
              </p>
            </div>

            <div className="gold-line" />

            <div>
              <p className="font-body text-charcoal-600 leading-relaxed">
                Each piece in our collection is hand-selected for quality, craftsmanship, and timeless appeal. From delicate gold rings to elegant timepieces, we believe jewelry is more than an accessory — it's a story you wear.
              </p>
            </div>

            <div className="gold-line" />

            <div>
              <p className="font-body text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-4">Our Promise</p>
              <div className="space-y-4">
                {[
                  "Authentic, quality pieces at honest prices",
                  "Kenya-wide delivery — from Nairobi to Kisumu to Mombasa",
                  "Personal WhatsApp service — you're never just an order number",
                  "Easy returns and exchanges within 7 days",
                ].map((promise, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-gold-500 mt-0.5">✦</span>
                    <p className="font-body text-sm text-charcoal-700">{promise}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/shop"
                className="btn-gold inline-flex px-10 py-4 text-[11px] tracking-widest uppercase font-body"
              >
                <span>Shop the Collection</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social proof */}
      <div className="bg-charcoal-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-body text-[10px] tracking-[0.4em] text-gold-400 uppercase mb-10">Find Us On</p>
          <div className="flex justify-center gap-8">
            <a
              href="https://instagram.com/lamsianjewels"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 border border-charcoal-700 flex items-center justify-center group-hover:border-gold-500 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-cream-200 group-hover:text-gold-400 transition-colors">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <p className="font-body text-[10px] tracking-widest text-cream-300 uppercase">Instagram</p>
            </a>
            <a
              href="https://tiktok.com/@lamsianjewels"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 border border-charcoal-700 flex items-center justify-center group-hover:border-gold-500 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-cream-200 group-hover:text-gold-400 transition-colors">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
                </svg>
              </div>
              <p className="font-body text-[10px] tracking-widest text-cream-300 uppercase">TikTok</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
