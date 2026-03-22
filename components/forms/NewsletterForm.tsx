"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/supabase-helpers";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    const result = await subscribeToNewsletter(email.trim());
    setStatus(result.success ? "success" : "error");
    setMessage(result.message);
    if (result.success) setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        disabled={status === "loading"}
        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 bg-primary text-white font-medium text-sm rounded-r-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
      {message && (
        <p className={`absolute mt-14 text-xs ${status === "success" ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
