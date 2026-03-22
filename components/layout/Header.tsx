"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Wedding Invites", href: "/categories/wedding-invites" },
    { label: "Gift Packaging", href: "/categories/gift-packaging" },
    { label: "Hampers & Gifts", href: "/categories/hampers-gifts" },
    { label: "Corporate", href: "/categories/corporate-gifting" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-[#FAFBF0]"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 -ml-2 text-text-dark hover:text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src={scrolled ? "/logowithoutbg.png" : "/logo.png"}
                alt="Maple Packaging"
                width={180}
                height={56}
                style={{ width: "auto", height: "auto" }}
                className="h-12 md:h-14 transition-opacity duration-300"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-text-dark hover:text-primary transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                className="p-2 text-text-dark hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={openCart}
                className="p-2 text-text-dark hover:text-primary transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link
                href="/customize"
                className="hidden lg:inline-flex items-center px-5 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-200"
              >
                Customize
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
