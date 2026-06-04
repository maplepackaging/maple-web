import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { CopyrightYear } from "@/components/ui/CopyrightYear";
import type { SiteSettings } from "@/lib/content";

const defaultFooterLinks = {
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
    { label: "Shipping Policy", href: "/contact" },
    { label: "Return Policy", href: "/contact" },
    { label: "Privacy Policy", href: "/about" },
    { label: "Terms of Service", href: "/about" },
  ],
};

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const footerLinks = {
    shop: settings?.footerShopLinks?.length ? settings.footerShopLinks : defaultFooterLinks.shop,
    company: settings?.footerCompanyLinks?.length ? settings.footerCompanyLinks : defaultFooterLinks.company,
    support: settings?.footerSupportLinks?.length ? settings.footerSupportLinks : defaultFooterLinks.support,
  };
  const email = settings?.email || "hello@maplepackaging.com";
  const phone = settings?.phone || "+91 84335 72388";
  const address = settings?.address || "Mumbai, India";
  const tagline =
    settings?.footerTagline ||
    "Crafting premium packaging and gifting experiences that leave lasting impressions. Every box tells a story.";
  const instagramUrl = settings?.instagramUrl || "https://instagram.com";
  const facebookUrl = settings?.facebookUrl || "https://facebook.com";
  const newsletterHeading = settings?.newsletterHeading || "Stay in the loop";
  const newsletterBody =
    settings?.newsletterBody ||
    "Be the first to know about new collections, exclusive offers, and gifting inspiration.";

  const columns: [string, { label: string; href: string }[]][] = [
    ["Shop", footerLinks.shop],
    ["Company", footerLinks.company],
    ["Support", footerLinks.support],
  ];

  return (
    <footer className="bg-cream-deep pt-12 md:pt-16 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter card */}
        <div className="relative overflow-hidden rounded-[2.25rem] bg-espresso-deep text-cream px-6 py-10 md:px-12 md:py-12">
          <div className="dotted-grid absolute inset-0 opacity-[0.07] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-7">
            <div className="max-w-md">
              <h3 className="font-heading text-3xl md:text-4xl text-white leading-tight">
                {newsletterHeading}
              </h3>
              <p className="mt-2.5 text-cream/60 text-sm md:text-base">{newsletterBody}</p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 md:py-16">
          <div className="col-span-2">
            <Image
              src="/logowithoutbg.png"
              alt="Maple Packaging"
              width={150}
              height={46}
              style={{ width: "auto" }}
              className="h-11"
            />
            <p className="mt-4 text-sm text-ink-soft max-w-xs leading-relaxed">{tagline}</p>
            <div className="mt-6 space-y-2.5 text-sm text-ink-soft">
              <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-terracotta transition-colors">
                <Mail size={15} className="text-terracotta" />
                {email}
              </a>
              <a href={`tel:${phone}`} className="flex items-center gap-3 hover:text-terracotta transition-colors">
                <Phone size={15} className="text-terracotta" />
                {phone}
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-terracotta" />
                {address}
              </div>
            </div>
          </div>

          {columns.map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-ink text-sm tracking-wide uppercase mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="link-underline text-sm text-ink-soft hover:text-ink transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Oversized brand wordmark */}
      <div className="select-none pointer-events-none px-5" aria-hidden="true">
        <span className="block font-heading font-extrabold tracking-tighter leading-[1.05] text-center text-transparent bg-clip-text bg-gradient-to-b from-terracotta via-clay to-[#a8855a] text-[22vw] lg:text-[16rem]">
          MAPLE
        </span>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-6">
        <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-soft">
            © <CopyrightYear /> Maple Packaging. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5">
            {/* hihi */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid place-items-center w-10 h-10 rounded-full bg-paper border border-line text-ink hover:text-terracotta hover:-translate-y-0.5 transition-all"
            >
              <Instagram size={17} />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid place-items-center w-10 h-10 rounded-full bg-paper border border-line text-ink hover:text-terracotta hover:-translate-y-0.5 transition-all"
            >
              <Facebook size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
