"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/lib/supabase";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const router = useRouter();
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000";
  const waMessage = encodeURIComponent(
    `Hi! I'm interested in the *${product.name}* (KES ${product.price.toLocaleString()}). Is it available?`
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="product-card group"
    >
      <div
        className="relative overflow-hidden bg-cream-200 aspect-[3/4] cursor-pointer"
        onClick={() => router.push(`/shop/${product.slug}`)}
      >
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="product-card-img object-cover"
          />
        ) : (
          <div className="absolute inset-0 skeleton" />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_new && (
            <span className="bg-gold-500 text-charcoal-900 text-[10px] tracking-widest uppercase px-2.5 py-1 font-body font-medium">
              New
            </span>
          )}
          {!product.in_stock && (
            <span className="bg-charcoal-900/80 text-cream-200 text-[10px] tracking-widest uppercase px-2.5 py-1 font-body">
              Sold Out
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-all duration-500" />

        {/* Quick WhatsApp button */}
        {product.in_stock && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.open(waLink, "_blank");
              }}
              className="flex items-center gap-2 bg-charcoal-900 text-cream-50 text-xs tracking-widest uppercase px-5 py-2.5 font-body hover:bg-gold-500 hover:text-charcoal-900 transition-colors"
            >
              <MessageCircle size={14} />
              <span>Order Now</span>
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-4 pb-2">
        <p className="font-body text-[10px] tracking-[0.2em] text-gold-500 uppercase mb-1">
          {product.material}
        </p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-display text-lg font-medium text-charcoal-900 hover:text-gold-600 transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="font-body text-base text-charcoal-700 mt-1.5">
          KES {product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
