"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/supabase";

export default function CTABanner({ newArrivals }: { newArrivals: Product[] }) {
  return (
    <section className="py-24 bg-cream-50">
      {/* New Arrivals strip */}
      {newArrivals.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-2">Just In</p>
              <h2 className="font-display text-4xl text-charcoal-900 font-light">New <span className="italic text-gold-500">Arrivals</span></h2>
            </div>
            <Link href="/shop?filter=new" className="btn-gold px-6 py-2.5 text-[11px] tracking-widest uppercase font-body">
              <span>See All New</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/shop/${p.slug}`} className="group block">
                  <div className="aspect-square bg-cream-200 overflow-hidden mb-3 relative">
                    {p.images?.[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <span className="absolute top-2 left-2 bg-gold-500 text-charcoal-900 text-[9px] tracking-widest uppercase px-2 py-0.5">New</span>
                  </div>
                  <p className="font-display text-base text-charcoal-900">{p.name}</p>
                  <p className="font-body text-sm text-charcoal-600 mt-0.5">KES {p.price.toLocaleString()}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* WhatsApp CTA */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-charcoal-900 p-14 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold-500/10 blur-[80px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold-400/8 blur-[80px] rounded-full" />
          </div>
          <div className="relative z-10">
            <p className="font-body text-[10px] tracking-[0.4em] text-gold-400 uppercase mb-4">
              Order Directly
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-cream-50 font-light mb-4">
              Found something you love?
            </h2>
            <p className="font-body text-cream-300/70 mb-8 max-w-md mx-auto text-sm">
              Message us on WhatsApp and we'll confirm availability, arrange delivery anywhere in Kenya, and have it at your door.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000"}?text=${encodeURIComponent("Hi! I'd like to place an order from Lamsian Jewels 💛")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gold-500 text-charcoal-900 px-10 py-4 text-sm tracking-widest uppercase font-body hover:bg-gold-400 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
