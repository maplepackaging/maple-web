import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Maple Packaging",
  description:
    "Get in touch with Maple Packaging for custom orders, bulk enquiries, or any questions. We'd love to hear from you.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    detail: "hello@maplepackaging.com",
    href: "mailto:hello@maplepackaging.com",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    title: "Address",
    detail: "Mumbai, Maharashtra, India",
    href: null,
  },
  {
    icon: Clock,
    title: "Hours",
    detail: "Mon – Sat, 10 AM – 7 PM IST",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-beige py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Contact Us"
          title="Get in Touch"
          subtitle="Have a question, custom order, or just want to say hello? We're here to help."
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            {contactInfo.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-dark">
                    {item.title}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-text-muted hover:text-primary transition-colors"
                    >
                      {item.detail}
                    </a>
                  ) : (
                    <p className="text-sm text-text-muted">{item.detail}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Quick response note */}
            <div className="mt-8 p-6 bg-surface rounded-xl border border-border">
              <h3 className="font-heading text-lg font-semibold text-text-dark">
                Quick Response Guarantee
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                We respond to all enquiries within 24 hours. For urgent orders,
                call us directly or use our AI Gift Concierge (bottom right).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
