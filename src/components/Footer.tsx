import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-200">
      {/* Marquee */}
      <div className="border-y border-charcoal-700 overflow-hidden py-4">
        <div className="marquee-inner flex whitespace-nowrap">
          {Array(8).fill("✦  Artistic Charm  ✦  Handcrafted Elegance  ✦  Kenya-wide Delivery  ✦  Lamsian Jewels  ").map((text, i) => (
            <span key={i} className="font-display text-xl text-gold-400 px-4 tracking-wide">
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image src="/logo.jpeg" alt="Lamsian Jewels" fill className="object-cover" />
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-cream-50">Lamsian</p>
                <p className="font-body text-[10px] tracking-[0.3em] text-gold-400 uppercase">Jewels</p>
              </div>
            </div>
            <p className="font-body text-sm text-cream-300 leading-relaxed max-w-xs">
              Artistic charm and aesthetics — jewelry and timepieces crafted for the woman who knows her worth.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/lamsianjewels"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-charcoal-700 flex items-center justify-center text-cream-300 hover:text-gold-400 hover:border-gold-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://tiktok.com/@lamsianjewels"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-charcoal-700 flex items-center justify-center text-cream-300 hover:text-gold-400 hover:border-gold-500 transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-charcoal-700 flex items-center justify-center text-cream-300 hover:text-gold-400 hover:border-gold-500 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-body text-xs tracking-[0.2em] text-gold-400 uppercase mb-6">Shop</h3>
            <ul className="space-y-3">
              {["Rings", "Necklaces", "Earrings", "Bracelets", "Anklets", "Watches", "Sets"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/shop?category=${cat.toLowerCase()}`}
                    className="font-body text-sm text-cream-300 hover:text-cream-50 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-body text-xs tracking-[0.2em] text-gold-400 uppercase mb-6">Info</h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Esther" },
                { href: "/contact", label: "Contact Us" },
                { href: "/shop", label: "New Arrivals" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream-300 hover:text-cream-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 border border-charcoal-700">
              <p className="font-body text-xs text-cream-300 mb-2">Kenya-wide delivery</p>
              <p className="font-body text-xs text-gold-400">Orders via WhatsApp</p>
            </div>
          </div>
        </div>

        <div className="gold-line mt-12 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-charcoal-600">
            © {new Date().getFullYear()} Lamsian Jewels. All rights reserved.
          </p>
          <p className="font-body text-xs text-charcoal-600">
            Artistic charm and aesthetics
          </p>
        </div>
      </div>
    </footer>
  );
}
