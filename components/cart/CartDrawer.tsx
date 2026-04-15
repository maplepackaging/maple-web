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

  // Prevent body scroll when drawer is open
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
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-heading text-lg font-semibold text-text-dark">
            Your Cart ({mounted ? totalItems : 0})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-beige rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        {!mounted || items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag size={48} className="text-border mb-4" />
            <p className="font-heading text-lg font-semibold text-text-dark mb-2">
              Your cart is empty
            </p>
            <p className="text-sm text-text-muted mb-6">
              Looks like you haven&apos;t added anything yet
            </p>
            <Button onClick={closeCart}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-beige-dark shrink-0">
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
                      className="text-sm font-medium text-text-dark hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm font-semibold text-text-dark mt-1">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-beige transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-medium min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-beige transition-colors"
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
            <div className="border-t border-border px-6 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-text-dark">Subtotal</span>
                <span className="text-lg font-bold text-text-dark">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-text-muted">
                Shipping and taxes calculated at checkout
              </p>
              <Button size="lg" className="w-full" onClick={handleWhatsAppCheckout}>
                Proceed to Checkout
              </Button>
              <button
                onClick={closeCart}
                className="w-full text-center text-sm text-text-muted hover:text-primary transition-colors"
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
