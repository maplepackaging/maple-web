"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/supabase-helpers";
import { EMAIL_REGEX } from "@/lib/utils";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    const result = await subscribeToNewsletter(trimmedEmail);
    setStatus(result.success ? "success" : "error");
    setMessage(result.message);
    if (result.success) setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-2.5 p-2 rounded-[1.5rem] sm:rounded-full bg-white/10 border border-white/15">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          disabled={status === "loading"}
          className="flex-1 px-4 py-3 bg-transparent text-sm text-cream placeholder:text-cream/40 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-pill-brand btn-md disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {message && (
        <p className={`mt-2.5 text-xs px-2 ${status === "success" ? "text-sage-soft" : "text-terracotta-soft"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
