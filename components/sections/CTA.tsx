"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 md:py-28 bg-text-dark relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Let&apos;s Create Together
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Have Something Special
            <br />
            in Mind?
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Whether it&apos;s a bespoke wedding invitation, a custom corporate
            hamper, or packaging for your brand — we bring your vision to life.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/customize">
              <Button size="lg">Start Customizing</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-text-dark">
                Get in Touch
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
