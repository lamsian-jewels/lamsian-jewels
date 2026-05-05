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

const seoCountyKeywords = [
  "Nairobi",
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita-Taveta",
  "Garissa",
  "Wajir",
  "Mandera",
  "Marsabit",
  "Isiolo",
  "Meru",
  "Tharaka-Nithi",
  "Embu",
  "Kitui",
  "Machakos",
  "Makueni",
  "Nyandarua",
  "Nyeri",
  "Kirinyaga",
  "Murang'a",
  "Kiambu",
  "Turkana",
  "West Pokot",
  "Samburu",
  "Trans-Nzoia",
  "Uasin Gishu",
  "Elgeyo-Marakwet",
  "Nandi",
  "Baringo",
  "Laikipia",
  "Nakuru",
  "Narok",
  "Kajiado",
  "Kericho",
  "Bomet",
  "Kakamega",
  "Vihiga",
  "Bungoma",
  "Busia",
  "Siaya",
  "Kisumu",
  "Homa Bay",
  "Migori",
  "Kisii",
  "Nyamira",
].map((county) => `jewelry ${county}`).join(", ");

export const metadata: Metadata = {
  title: "Lamsian Jewels — Kenya's Handmade Jewelry Brand",
  description:
    "Lamsian Jewels crafts fine rings, necklaces, earrings, bracelets, anklets and watches with Kenya-wide delivery across all 47 counties, from Nairobi to Mombasa, Kisumu, Nakuru, Eldoret and more.",
  keywords: `handmade jewelry, Kenyan jewelry, gold jewelry, silver jewelry, bridal jewelry, gift jewelry, rings, necklaces, earrings, bracelets, anklets, watches, jewelry delivery Kenya, Lamsian Jewels, ${seoCountyKeywords}`,
  viewport: "width=device-width, initial-scale=1",
  authors: [{ name: "Lamsian Jewels", url: "https://lamsianjewels.com" }],
  creator: "Lamsian Jewels",
  publisher: "Lamsian Jewels",
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
  },
  openGraph: {
    title: "Lamsian Jewels — Kenya Jewelry Delivery",
    description:
      "Handcrafted jewelry for women and men with fast delivery across Kenya's 47 counties.",
    type: "website",
    siteName: "Lamsian Jewels",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 1200,
        alt: "Lamsian Jewels logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lamsian Jewels — Kenyan Handmade Jewelry",
    description:
      "Explore rings, necklaces, earrings, bracelets, anklets and watches delivered across all 47 Kenyan counties.",
    images: ["/logo.jpeg"],
    site: "@lamsianjewels",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-cream-50 text-charcoal-900 font-body antialiased overflow-x-hidden">
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
