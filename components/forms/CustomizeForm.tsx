"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { submitCustomEnquiry } from "@/lib/supabase-helpers";
import { EMAIL_REGEX } from "@/lib/utils";

const inputClass =
  "w-full px-4 py-3 text-sm bg-cream border border-line rounded-xl focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all text-ink placeholder:text-ink-soft/70";

export default function CustomizeForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function setError(msg: string) {
    setStatus("error");
    setMessage(msg);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const product_type = (formData.get("product_type") as string)?.trim();
    const quantity = (formData.get("quantity") as string)?.trim();
    const requirements = (formData.get("requirements") as string)?.trim();

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!name || name.length < 2) return setError("Please enter a valid name");
    if (!email || !EMAIL_REGEX.test(email)) return setError("Please enter a valid email address");
    if (!phone || !phoneRegex.test(phone)) return setError("Please enter a valid 10-digit mobile number");
    if (!product_type) return setError("Please select a product type");
    if (!quantity) return setError("Please enter quantity");
    if (!requirements || requirements.length < 10) return setError("Please provide detailed requirements (min 10 characters)");

    setStatus("loading");
    const result = await submitCustomEnquiry({ name, email, phone, product_type, quantity, requirements });
    setStatus(result.success ? "success" : "error");
    setMessage(result.message);
    if (result.success) form.reset();
  };

  if (status === "success") {
    return (
      <div className="card-soft text-center py-14 px-6">
        <span className="icon-chip bg-sage w-14 h-14 mx-auto mb-5">
          <Check size={26} className="text-white" strokeWidth={3} />
        </span>
        <h3 className="font-heading text-2xl text-ink">Enquiry submitted!</h3>
        <p className="mt-2 text-sm text-ink-soft">{message}</p>
        <button onClick={() => setStatus("idle")} className="btn btn-pill-light btn-md mt-6">
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="card-soft p-6 md:p-8">
      <h3 className="font-heading text-2xl text-ink mb-6">Start your custom order</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Name</label>
          <input name="name" type="text" required placeholder="Your name" className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Email</label>
            <input name="email" type="email" required placeholder="Email" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Phone</label>
            <input name="phone" type="tel" required placeholder="Phone" className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">What do you need?</label>
          <select name="product_type" required className={inputClass}>
            <option value="">Select product type</option>
            <option value="wedding-invites">Wedding Invitations</option>
            <option value="gift-packaging">Gift Packaging</option>
            <option value="hampers">Gift Hampers</option>
            <option value="corporate">Corporate Gifting</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Quantity (approx.)</label>
          <input name="quantity" type="text" placeholder="e.g. 200 pieces" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Describe your requirements</label>
          <textarea name="requirements" rows={4} placeholder="Colors, materials, event details, budget range..." className={`${inputClass} resize-none`} />
        </div>

        {status === "error" && <p className="text-sm text-terracotta-deep">{message}</p>}

        <button type="submit" disabled={status === "loading"} className="btn btn-pill-brand btn-lg w-full disabled:opacity-60">
          {status === "loading" ? "Submitting…" : "Submit Enquiry"}
        </button>
        <p className="text-xs text-ink-soft text-center">
          We&apos;ll get back to you within 24 hours with a custom quote.
        </p>
      </form>
    </div>
  );
}
