"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="py-28 bg-charcoal-900 relative overflow-hidden noise-overlay">
      {/* Background glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-[10px] tracking-[0.4em] text-gold-400 uppercase mb-6"
            >
              Our Story
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-6xl text-cream-50 font-light leading-tight mb-8"
            >
              Where Art Meets{" "}
              <span className="text-shimmer italic">Adornment</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-body text-cream-300/80 leading-relaxed mb-6"
            >
              Lamsian Jewels was born from a passion for beauty in every detail. Each piece is thoughtfully curated or crafted to bring out the elegance that lives within every woman.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-body text-cream-300/80 leading-relaxed mb-10"
            >
              From delicate gold rings to statement timepieces, our collection speaks to those who see jewelry not just as an accessory — but as an expression of self.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/about"
                className="btn-gold inline-flex px-8 py-3 text-[11px] tracking-widest uppercase font-body"
              >
                <span>Meet Esther</span>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { num: "200+", label: "Pieces Crafted" },
              { num: "100%", label: "Authentic Materials" },
              { num: "47+", label: "Counties Reached" },
              { num: "500+", label: "Happy Clients" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="border border-charcoal-700 p-8 text-center hover:border-gold-500/40 transition-colors"
              >
                <p className="font-display text-4xl text-gold-400 mb-2">{stat.num}</p>
                <p className="font-body text-[11px] tracking-[0.2em] text-cream-300/60 uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
