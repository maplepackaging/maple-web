"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    sessionStorage.setItem("popup-dismissed", "true");
    setTimeout(() => setIsVisible(false), 2500);
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
            <div className="relative bg-surface rounded-2xl shadow-2xl max-w-md w-full overflow-hidden pointer-events-auto">
              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 text-text-muted hover:text-text-dark transition-colors"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              {/* Top accent bar */}
              <div className="h-1.5 bg-primary" />

              <div className="px-8 py-10 text-center">
                {!submitted ? (
                  <>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-6">
                      <Gift size={28} className="text-primary" />
                    </div>
                    <h3 className="font-heading text-2xl md:text-3xl font-semibold text-text-dark">
                      Get 10% Off
                    </h3>
                    <p className="mt-2 text-sm text-text-muted max-w-xs mx-auto leading-relaxed">
                      Join our mailing list and receive 10% off your first
                      order. Be the first to know about new collections.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-6">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                        className="w-full px-4 py-3 text-sm bg-beige border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-text-dark placeholder:text-text-muted"
                      />
                      <button
                        type="submit"
                        className="w-full mt-3 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm"
                      >
                        Claim My 10% Off
                      </button>
                    </form>
                    <button
                      onClick={dismiss}
                      className="mt-4 text-xs text-text-muted hover:text-text-dark transition-colors"
                    >
                      No thanks, I&apos;ll pay full price
                    </button>
                  </>
                ) : (
                  <>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-6">
                      <span className="text-3xl">🎉</span>
                    </div>
                    <h3 className="font-heading text-2xl font-semibold text-text-dark">
                      You&apos;re In!
                    </h3>
                    <p className="mt-2 text-sm text-text-muted">
                      Check your inbox for your 10% discount code. Welcome to
                      the Maple family.
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
