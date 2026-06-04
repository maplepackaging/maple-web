"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, WHATSAPP_NUMBER } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const handleWhatsAppCheckout = () => {
    const lines = items.map(
      (item) =>
        `- ${item.product.name} (x${item.quantity}) — ${formatPrice(item.product.price * item.quantity)}`
    );
    const message = [
      "Hi! I'd like to place an order:",
      "",
      ...lines,
      "",
      `Total: ${formatPrice(totalPrice)}`,
      "",
      "Please confirm availability and delivery details. Thank you!",
    ].join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    closeCart();
  };

  
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      // Only restore if no other overlay (mobile menu) is open
      if (!document.querySelector('[data-scroll-lock]')) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        data-scroll-lock={isOpen || undefined}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-paper z-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 className="font-heading text-xl text-ink">
            Your cart ({mounted ? totalItems : 0})
          </h2>
          <button
            onClick={closeCart}
            className="grid place-items-center w-10 h-10 rounded-full bg-cream text-ink hover:text-terracotta transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        {!mounted || items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <span className="icon-chip bg-cream-deep w-16 h-16 mb-5">
              <ShoppingBag size={26} className="text-ink-soft" />
            </span>
            <p className="font-heading text-xl text-ink mb-2">Your cart is empty</p>
            <p className="text-sm text-ink-soft mb-6">Looks like you haven&apos;t added anything yet</p>
            <Button onClick={closeCart}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-deep shrink-0">
                    <Image
                      src={item.product.images?.[0] || "/placeholder-product.png"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.id}`}
                      onClick={closeCart}
                      className="text-sm font-semibold text-ink hover:text-terracotta transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm font-semibold text-terracotta mt-1">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-line rounded-full bg-cream">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="grid place-items-center w-8 h-8 rounded-full hover:text-terracotta transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-sm font-semibold min-w-7 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="grid place-items-center w-8 h-8 rounded-full hover:text-terracotta transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-text-muted hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-line px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-ink">Subtotal</span>
                <span className="font-heading text-2xl text-ink">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-ink-soft">Shipping and taxes calculated at checkout</p>
              <Button size="lg" className="w-full" onClick={handleWhatsAppCheckout}>
                Proceed to Checkout
              </Button>
              <button
                onClick={closeCart}
                className="w-full text-center text-sm text-ink-soft hover:text-terracotta transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
