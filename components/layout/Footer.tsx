import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import NewsletterForm from "@/components/forms/NewsletterForm";

const footerLinks = {
  shop: [
    { label: "Wedding Invites", href: "/categories/wedding-invites" },
    { label: "Gift Packaging", href: "/categories/gift-packaging" },
    { label: "Hampers & Gifts", href: "/categories/hampers-gifts" },
    { label: "Corporate Gifting", href: "/categories/corporate-gifting" },
    { label: "Gift Articles", href: "/categories/gift-articles" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Return Policy", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-text-dark text-white/80">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white">
                Stay in the loop
              </h3>
              <p className="mt-2 text-white/60 text-sm">
                Be the first to know about new collections, exclusive offers,
                and gifting inspiration.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Image
              src="/logo.png"
              alt="Maple Packaging"
              width={140}
              height={44}
              className="h-10 w-auto brightness-0 invert opacity-90"
            />
            <p className="mt-4 text-sm text-white/50 max-w-xs leading-relaxed">
              Crafting premium packaging and gifting experiences that leave
              lasting impressions. Every box tells a story.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Mail size={14} />
                <span>hello@maplepackaging.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Phone size={14} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <MapPin size={14} />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium text-white text-sm tracking-wider uppercase mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-white text-sm tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-white text-sm tracking-wider uppercase mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2025 Maple Packaging. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-primary transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-primary transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-primary transition-colors"
            >
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
