import type { Metadata } from "next";
import { Poppins, Outfit } from "next/font/google";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import WhatsAppButton from "@/components/chat/WhatsAppButton";
import EngagementPopup from "@/components/popups/EngagementPopup";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/cart/CartDrawer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maple Packaging — Premium Packaging & Gifting",
  description:
    "Handcrafted premium packaging and curated gift hampers for weddings, corporate events, and every occasion. Elevate your gifting experience with Maple Packaging.",
  keywords: [
    "premium packaging",
    "wedding invitations",
    "gift hampers",
    "corporate gifting",
    "custom packaging",
  ],
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://maplepackaging.com",
    siteName: "Maple Packaging",
    title: "Maple Packaging — Premium Packaging & Gifting",
    description:
      "Handcrafted premium packaging and curated gift hampers for weddings, corporate events, and every occasion.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maple Packaging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maple Packaging — Premium Packaging & Gifting",
    description:
      "Handcrafted premium packaging and curated gift hampers for weddings, corporate events, and every occasion.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://maplepackaging.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${outfit.variable} font-sans antialiased min-h-full flex flex-col`}
      >
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
          <ChatWidget />
          <EngagementPopup />
        </CartProvider>
      </body>
    </html>
  );
}
