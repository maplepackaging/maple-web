import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us — Maple Packaging",
  description:
    "Get in touch with Maple Packaging for custom orders, bulk enquiries, or any questions. We'd love to hear from you.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const contactInfo = [
    { icon: Mail, title: "Email", detail: settings.email || "hello@maplepackaging.com", href: `mailto:${settings.email || "hello@maplepackaging.com"}` },
    { icon: Phone, title: "Phone", detail: settings.phone || "+91 84335 72388", href: `tel:${(settings.phone || "+91 84335 72388").replace(/\s/g, "")}` },
    { icon: MapPin, title: "Address", detail: settings.address || "Mumbai, Maharashtra, India", href: null },
    { icon: Clock, title: "Hours", detail: settings.hours || "Mon – Sat, 10 AM – 7 PM IST", href: null },
  ];

  return (
    <>
      <PageHero
        label="Contact us"
        title="Get in touch"
        subtitle="Have a question, custom order, or just want to say hello? We're here to help."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-14 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3 card-soft p-6 md:p-8">
              <ContactForm />
            </div>

            <div className="lg:col-span-2 space-y-3.5">
              {contactInfo.map((item) => (
                <div key={item.title} className="card-soft flex gap-4 p-5">
                  <span className="icon-chip bg-terracotta-soft w-11 h-11 shrink-0">
                    <item.icon size={18} className="text-terracotta" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-ink-soft hover:text-terracotta transition-colors">
                        {item.detail}
                      </a>
                    ) : (
                      <p className="text-sm text-ink-soft">{item.detail}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="rounded-[1.75rem] bg-espresso-deep text-cream p-6">
                <h3 className="font-heading text-lg text-white">Quick response guarantee</h3>
                <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                  We respond to all enquiries within 24 hours. For urgent orders, call us directly or
                  use our AI Gift Concierge (bottom right).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
