import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lamsian Jewels — Artistic Charm and Aesthetics",
  description:
    "Discover handcrafted jewelry and elegant timepieces by Lamsian Jewels. Rings, necklaces, earrings, bracelets, anklets, and watches — all with artistic charm.",
  keywords: "jewelry Kenya, gold jewelry Nairobi, handmade jewelry, watches Kenya, Lamsian Jewels",
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
  },
  openGraph: {
    title: "Lamsian Jewels",
    description: "Artistic charm and aesthetics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-cream-50 text-charcoal-900 font-body antialiased">
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
