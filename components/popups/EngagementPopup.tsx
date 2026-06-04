"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/supabase-helpers";

export default function EngagementPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem("popup-dismissed")) return;

    let triggered = false;

    const timer = setTimeout(() => {
      if (!triggered) {
        triggered = true;
        setIsVisible(true);
      }
    }, 45000);

    const handleScroll = () => {
      if (triggered) return;
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.4) {
        triggered = true;
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("popup-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    sessionStorage.setItem("popup-dismissed", "true");
    const result = await subscribeToNewsletter(email.trim(), "popup");
    if (result.success) {
      setSubmitted(true);
      setTimeout(() => setIsVisible(false), 2500);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative bg-paper rounded-[1.75rem] shadow-2xl max-w-md w-full overflow-hidden pointer-events-auto border border-line">
              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 z-10 grid place-items-center w-8 h-8 rounded-full bg-cream text-ink-soft hover:text-ink transition-colors"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              <div className="px-8 py-10 text-center">
                {!submitted ? (
                  <>
                    <span className="icon-chip bg-terracotta-soft w-16 h-16 mx-auto mb-6">
                      <Gift size={28} className="text-terracotta" />
                    </span>
                    <span className="eyebrow block mb-2">Welcome gift</span>
                    <h3 className="font-heading text-3xl text-ink">Get 10% off</h3>
                    <p className="mt-2 text-sm text-ink-soft max-w-xs mx-auto leading-relaxed">
                      Join our mailing list and receive 10% off your first order. Be the first to
                      know about new collections.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        required
                        className="w-full px-4 py-3 text-sm bg-cream border border-line rounded-full text-center focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all text-ink placeholder:text-ink-soft/70"
                      />
                      <button type="submit" className="btn btn-pill-brand btn-lg w-full">
                        Claim my 10% off
                      </button>
                    </form>
                    <button
                      onClick={dismiss}
                      className="mt-4 text-xs text-ink-soft hover:text-ink transition-colors"
                    >
                      No thanks, I&apos;ll pay full price
                    </button>
                  </>
                ) : (
                  <>
                    <span className="icon-chip bg-sage-soft w-16 h-16 mx-auto mb-6">
                      <span className="text-3xl">🎉</span>
                    </span>
                    <h3 className="font-heading text-2xl text-ink">You&apos;re in!</h3>
                    <p className="mt-2 text-sm text-ink-soft">
                      Check your inbox for your 10% discount code. Welcome to the Maple family.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
