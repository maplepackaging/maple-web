import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import WhatsAppButton from "@/components/chat/WhatsAppButton";
import EngagementPopup from "@/components/popups/EngagementPopup";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
        <EngagementPopup />
      </body>
    </html>
  );
}
