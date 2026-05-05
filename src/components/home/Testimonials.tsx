"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Amira K.",
    location: "Nairobi",
    text: "I ordered a pearl necklace for my mum's birthday and it arrived beautifully packaged. She absolutely loves it!",
    rating: 5,
  },
  {
    name: "Zawadi M.",
    location: "Mombasa",
    text: "The gold bangle set is stunning. Great quality and the WhatsApp ordering process was so smooth.",
    rating: 5,
  },
  {
    name: "Faith O.",
    location: "Kisumu",
    text: "The watch I got is exactly as shown — elegant and high quality. Delivered to Kisumu within 3 days. Will order again!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-cream-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-3">
            Client Love
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-charcoal-900 font-light">
            What They <span className="italic text-gold-500">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="bg-cream-50 p-8 border border-cream-200 hover:border-gold-400/30 transition-colors relative"
            >
              {/* Quote mark */}
              <p className="font-display text-7xl text-gold-300/40 leading-none absolute top-4 left-6">
                &ldquo;
              </p>
              <div className="pt-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(null).map((_, j) => (
                    <span key={j} className="text-gold-400 text-sm">★</span>
                  ))}
                </div>
                <p className="font-body text-charcoal-700 leading-relaxed mb-6 text-sm">
                  {t.text}
                </p>
                <div className="gold-line mb-4" />
                <p className="font-display text-base text-charcoal-900">{t.name}</p>
                <p className="font-body text-[11px] tracking-widest text-gold-500 uppercase mt-0.5">
                  {t.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
