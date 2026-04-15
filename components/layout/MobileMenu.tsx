"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
}: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    return () => {
      // Only restore if no other overlay (cart) is open
      if (!document.querySelector('[data-scroll-lock]')) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            data-scroll-lock
            className="fixed top-0 left-0 z-50 h-full w-[85%] max-w-sm bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <span className="font-heading text-xl font-semibold text-text-dark">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-1 text-text-muted hover:text-text-dark transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="p-5 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-3 px-2 text-text-dark hover:text-primary hover:bg-beige rounded-lg transition-all duration-200"
                >
                  <span className="font-medium">{link.label}</span>
                  <ChevronRight size={16} className="text-text-muted" />
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border">
              <Link
                href="/customize"
                onClick={onClose}
                className="block w-full text-center py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
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
