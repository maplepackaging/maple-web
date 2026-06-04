"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      if (!document.querySelector("[data-scroll-lock]")) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            data-scroll-lock
            className="fixed top-0 left-0 z-50 h-full w-[86%] max-w-sm bg-cream shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5">
              <Image
                src="/logowithoutbg.png"
                alt="Maple Packaging"
                width={150}
                height={46}
                className="h-9 w-auto"
              />
              <button
                onClick={onClose}
                className="grid place-items-center w-10 h-10 rounded-full bg-paper border border-line text-ink hover:text-terracotta transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="px-5 py-2 space-y-2 flex-1 overflow-y-auto">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-center justify-between rounded-2xl px-4 py-4 bg-paper border border-line/70 text-ink hover:border-terracotta/40 transition-all"
                  >
                    <span className="font-heading text-xl">{link.label}</span>
                    <ArrowUpRight
                      size={20}
                      className="text-ink-soft group-hover:text-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-5">
              <Link
                href="/customize"
                onClick={onClose}
                className="btn btn-pill-brand btn-lg w-full"
              >
                Customize Your Order
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
