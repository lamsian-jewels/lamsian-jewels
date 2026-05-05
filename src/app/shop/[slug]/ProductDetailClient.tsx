"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, MessageCircle, Share2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/supabase";

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000";
  const waMessage = encodeURIComponent(
    `Hi! I'd like to order the *${product.name}* — KES ${product.price.toLocaleString()}. Is it available?`
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-10"
        >
          <Link
            href="/shop"
            className="flex items-center gap-1 text-xs font-body tracking-widest uppercase text-charcoal-500 hover:text-gold-500 transition-colors"
          >
            <ChevronLeft size={14} />
            Back to Shop
          </Link>
          <span className="text-charcoal-400 text-xs">·</span>
          <span className="text-xs font-body text-charcoal-400 capitalize">{product.category}</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div className="relative aspect-[4/5] bg-cream-200 overflow-hidden mb-4">
              {product.images?.[activeImage] ? (
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 skeleton" />
              )}
              {!product.in_stock && (
                <div className="absolute inset-0 bg-charcoal-900/40 flex items-center justify-center">
                  <p className="font-display text-3xl text-cream-50">Sold Out</p>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 aspect-square overflow-hidden border-2 transition-colors ${
                      activeImage === i ? "border-gold-500" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="font-body text-[10px] tracking-[0.3em] text-gold-500 uppercase mb-3 capitalize">
              {product.category}
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-charcoal-900 font-light leading-tight mb-4">
              {product.name}
            </h1>
            <p className="font-display text-3xl text-charcoal-900 mb-6">
              KES {product.price.toLocaleString()}
            </p>

            <div className="gold-line mb-6" />

            {/* Material */}
            {product.material && (
              <div className="flex items-center gap-3 mb-4">
                <span className="font-body text-xs tracking-widest text-charcoal-500 uppercase">Material</span>
                <span className="font-body text-sm text-charcoal-800">{product.material}</span>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="font-body text-sm text-charcoal-600 leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* Stock badge */}
            <div className="flex items-center gap-2 mb-8">
              <span
                className={`w-2 h-2 rounded-full ${
                  product.in_stock ? "bg-green-500" : "bg-charcoal-400"
                }`}
              />
              <span className="font-body text-xs text-charcoal-600">
                {product.in_stock ? "In Stock" : "Currently Out of Stock"}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {product.in_stock ? (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-charcoal-900 text-cream-50 py-4 px-8 text-sm tracking-widest uppercase font-body hover:bg-gold-500 hover:text-charcoal-900 transition-colors"
                >
                  <MessageCircle size={16} />
                  Order on WhatsApp
                </a>
              ) : (
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi! I'm interested in the *${product.name}*. Let me know when it's back in stock!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 border border-charcoal-900 text-charcoal-900 py-4 px-8 text-sm tracking-widest uppercase font-body hover:bg-charcoal-900 hover:text-cream-50 transition-colors"
                >
                  Notify Me
                </a>
              )}
              <button
                onClick={handleShare}
                className="w-14 border border-cream-300 flex items-center justify-center text-charcoal-600 hover:border-gold-500 hover:text-gold-500 transition-colors"
                aria-label="Share"
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Delivery note */}
            <div className="bg-cream-100 border border-cream-200 p-4">
              <p className="font-body text-xs text-charcoal-600">
                🇰🇪 <strong>Kenya-wide delivery</strong> · Orders fulfilled via WhatsApp · 
                Typical delivery 2–4 business days
              </p>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="gold-line mb-12" />
            <p className="font-body text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-3">
              You May Also Like
            </p>
            <h2 className="font-display text-3xl text-charcoal-900 font-light mb-10">
              More {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
