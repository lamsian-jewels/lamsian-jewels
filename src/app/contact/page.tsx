"use client";
import type { Metadata } from "next";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, Music, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Lamsian Jewels | WhatsApp Jewelry Orders Kenya",
  description:
    "Contact Lamsian Jewels through WhatsApp, Instagram or TikTok for jewelry orders delivered across all 47 Kenyan counties.",
  keywords:
    "contact jewelry Kenya, WhatsApp jewelry orders, Kenyan jewelry delivery, 47 counties, Lamsian Jewels contact",
};

export default function ContactPage() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000";

  return (
    <div className="min-h-screen bg-cream-50 pt-24">
      <div className="bg-charcoal-900 py-20 text-center relative overflow-hidden">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-[10px] tracking-[0.4em] text-gold-400 uppercase mb-4 relative">
          Get In Touch
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-5xl md:text-7xl text-cream-50 font-light relative">
          Let&apos;s <span className="text-shimmer italic">Connect</span>
        </motion.h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-4">How to Reach Us</p>
            <h2 className="font-display text-3xl text-charcoal-900 font-light mb-8">
              We&apos;re always happy to hear from you
            </h2>
            <p className="font-body text-sm text-charcoal-600 leading-relaxed mb-10">
              The fastest way to reach us is via WhatsApp. We typically respond within a few hours during business hours (Mon–Sat, 8am–8pm EAT).
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "+254 700 000 000",
                  href: `https://wa.me/${waNumber}`,
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  value: "@lamsianjewels",
                  href: "https://instagram.com/lamsianjewels",
                },
                {
                  icon: Music,
                  label: "TikTok",
                  value: "@lamsianjewels",
                  href: "https://tiktok.com/@lamsianjewels",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Nairobi, Kenya",
                  href: undefined,
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 border border-cream-200 hover:border-gold-400/40 transition-colors"
                >
                  <span className="text-charcoal-700 flex-shrink-0"><item.icon size={28} /></span>
                  <div>
                    <p className="font-body text-[10px] tracking-widest text-charcoal-400 uppercase">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-charcoal-800 hover:text-gold-500 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-charcoal-800">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — WhatsApp CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="bg-charcoal-900 p-10 flex-1 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-[80px] rounded-full" />
              <div className="relative">
                <p className="font-body text-[10px] tracking-[0.3em] text-gold-400 uppercase mb-4">Fastest Way to Order</p>
                <h3 className="font-display text-4xl text-cream-50 font-light mb-6">
                  Message us on WhatsApp
                </h3>
                <p className="font-body text-sm text-cream-300/70 leading-relaxed mb-8">
                  Browse the shop, find a piece you love, and tap &quot;Order Now&quot;. We&apos;ll handle the rest — payment, packaging, and Kenya-wide delivery.
                </p>
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hi Lamsian Jewels! I have a question about your collection 💛")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gold-500 text-charcoal-900 px-8 py-4 text-sm tracking-widest uppercase font-body hover:bg-gold-400 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Open WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-cream-100 border border-cream-200 p-6 mt-4">
              <p className="font-body text-xs text-charcoal-500 leading-relaxed">
                <strong className="text-charcoal-800">Business Hours:</strong> Monday – Saturday, 8:00 AM – 8:00 PM (EAT).<br />
                We respond to all messages within a few hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
