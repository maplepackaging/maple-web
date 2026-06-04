"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import MobileMenu from "./MobileMenu";

const defaultNavLinks = [
  { label: "Shop", href: "/categories" },
  { label: "Wedding", href: "/categories/wedding-invites" },
  { label: "Hampers", href: "/categories/hampers-gifts" },
  { label: "Corporate", href: "/categories/corporate-gifting" },
  { label: "About", href: "/about" },
];

interface HeaderProps {
  navLinks?: { label: string; href: string }[];
}

export default function Header({ navLinks: navLinksProp }: HeaderProps) {
  const navLinks = navLinksProp?.length ? navLinksProp : defaultNavLinks;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4">
        <div className="max-w-7xl mx-auto">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-[1.75rem] border border-line/70 bg-paper/90 backdrop-blur-md px-3 sm:px-4 lg:px-5 h-16 lg:h-[4.5rem] transition-shadow duration-300",
              scrolled
                ? "shadow-[0_14px_40px_-18px_rgba(46,30,19,0.35)]"
                : "shadow-[0_10px_30px_-20px_rgba(46,30,19,0.25)]"
            )}
          >
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden grid place-items-center w-10 h-10 rounded-full text-ink hover:bg-cream transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <Image
                src="/logowithoutbg.png"
                alt="Maple Packaging"
                width={170}
                height={52}
                className="h-9 lg:h-11 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-9">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-underline text-[0.95rem] font-medium text-ink/80 hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <button
                className="hidden sm:grid place-items-center w-11 h-11 rounded-full bg-paper border border-line/80 text-ink shadow-[0_6px_16px_-10px_rgba(46,30,19,0.4)] hover:-translate-y-0.5 hover:text-terracotta transition-all"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button
                onClick={openCart}
                className="relative grid place-items-center w-11 h-11 rounded-full bg-paper border border-line/80 text-ink shadow-[0_6px_16px_-10px_rgba(46,30,19,0.4)] hover:-translate-y-0.5 hover:text-terracotta transition-all"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 grid place-items-center bg-terracotta text-white text-[11px] font-bold rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link href="/customize" className="btn btn-pill-dark btn-md hidden sm:inline-flex">
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
