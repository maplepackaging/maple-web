"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { submitContactForm } from "@/lib/supabase-helpers";
import { EMAIL_REGEX } from "@/lib/utils";

const inputClass =
  "w-full px-4 py-3 text-sm bg-cream border border-line rounded-xl focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all text-ink placeholder:text-ink-soft/70";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const subject = (formData.get("subject") as string)?.trim();
    const messageText = (formData.get("message") as string)?.trim();

    if (!name || name.length < 2) return setError("Please enter a valid name");
    if (!email || !EMAIL_REGEX.test(email)) return setError("Please enter a valid email address");
    if (!subject || subject.length < 3) return setError("Please enter a subject");
    if (!messageText || messageText.length < 10) return setError("Message must be at least 10 characters");

    setStatus("loading");
    const result = await submitContactForm({ name, email, subject, message: messageText });
    setStatus(result.success ? "success" : "error");
    setMessage(result.message);
    if (result.success) form.reset();
  };

  function setError(msg: string) {
    setStatus("error");
    setMessage(msg);
  }

  if (status === "success") {
    return (
      <div className="text-center py-14">
        <span className="icon-chip bg-sage w-14 h-14 mx-auto mb-5">
          <Check size={26} className="text-white" strokeWidth={3} />
        </span>
        <h3 className="font-heading text-2xl text-ink">Message sent!</h3>
        <p className="mt-2 text-sm text-ink-soft">{message}</p>
        <button onClick={() => setStatus("idle")} className="btn btn-pill-light btn-md mt-6">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Name</label>
          <input name="name" type="text" required placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Email</label>
          <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">Subject</label>
        <select name="subject" required className={inputClass}>
          <option value="">Select a topic</option>
          <option value="custom-order">Custom Order</option>
          <option value="bulk-enquiry">Bulk Enquiry</option>
          <option value="wedding">Wedding Invitations</option>
          <option value="corporate">Corporate Gifting</option>
          <option value="general">General Question</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">Message</label>
        <textarea name="message" rows={5} required placeholder="Tell us about your requirements..." className={`${inputClass} resize-none`} />
      </div>

      {status === "error" && <p className="text-sm text-terracotta-deep">{message}</p>}

      <button type="submit" disabled={status === "loading"} className="btn btn-pill-brand btn-lg w-full sm:w-auto disabled:opacity-60">
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
