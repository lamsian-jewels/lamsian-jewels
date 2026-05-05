"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};
const item = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal-900 noise-overlay">
      {/* Ambient background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-gold-500/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full bg-gold-400/15 blur-[140px]"
        />
      </div>

      {/* Decorative rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] border border-gold-500/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] border border-gold-500/6 rounded-full"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="font-body text-[11px] tracking-[0.5em] text-gold-400 uppercase"
          >
            Artistic Charm & Aesthetics
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={item}
            className="font-display text-6xl md:text-8xl lg:text-[110px] text-cream-50 leading-none font-light"
          >
            Lamsian{" "}
            <span className="text-shimmer italic">Jewels</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="font-body text-base md:text-lg text-cream-300/80 max-w-md leading-relaxed"
          >
            Handcrafted jewelry and elegant timepieces — adorning the women who dare to shine.
          </motion.p>

          {/* Gold line */}
          <motion.div
            variants={item}
            className="w-20 h-px bg-gold-500"
          />

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/shop"
              className="btn-gold px-10 py-4 text-xs tracking-widest uppercase font-body"
            >
              <span>Explore Collection</span>
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 text-xs tracking-widest uppercase font-body bg-gold-500 text-charcoal-900 hover:bg-gold-400 transition-colors"
            >
              Order on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="font-body text-[9px] tracking-[0.3em] text-cream-300/50 uppercase">Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-gold-500/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
