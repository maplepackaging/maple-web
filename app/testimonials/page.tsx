import type { Metadata } from "next";
import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { getTestimonials } from "@/lib/supabase-data";

export const metadata: Metadata = {
  title: "Testimonials — Maple Packaging",
  description:
    "Read what our clients say about Maple Packaging — real stories from weddings, corporate events, and personal gifting.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="bg-beige py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Client Stories"
          subtitle="Real experiences from people who trusted us with their most important moments"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-surface rounded-xl p-8 border border-border hover:shadow-md transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-text-dark leading-relaxed text-[15px] italic">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-text-dark text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-text-muted">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-muted">
            Have a story to share? We&apos;d love to hear from you.
          </p>
          <a
            href="mailto:hello@maplepackaging.com"
            className="inline-block mt-4 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm"
          >
            Share Your Experience
          </a>
        </div>
      </div>
    </div>
  );
}
