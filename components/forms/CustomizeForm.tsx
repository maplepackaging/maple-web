"use client";

import { useState } from "react";
import { submitCustomEnquiry } from "@/lib/supabase-helpers";

export default function CustomizeForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number
    
    if (!name || name.length < 2) {
      setStatus("error");
      setMessage("Please enter a valid name");
      return;
    }
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }
    if (!phone || !phoneRegex.test(phone)) {
      setStatus("error");
      setMessage("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!product_type) {
      setStatus("error");
      setMessage("Please select a product type");
      return;
    }
    if (!quantity) {
      setStatus("error");
      setMessage("Please enter quantity");
      return;
    }
    if (!requirements || requirements.length < 10) {
      setStatus("error");
      setMessage("Please provide detailed requirements (min 10 characters)");
      return;
    }

    setStatus("loading");
    const result = await submitCustomEnquiry({
      name,
      email,
      phone,
      product_type,
      quantity,
      requirements,
    });

    setStatus(result.success ? "success" : "error");
    setMessage(result.message);
    if (result.success) form.reset();
  };

  if (status === "success") {
    return (
      <div className="bg-beige rounded-xl p-8 border border-border text-center py-16">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="font-heading text-xl font-semibold text-text-dark">
          Enquiry Submitted!
        </h3>
        <p className="mt-2 text-sm text-text-muted">{message}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 px-6 py-2 text-sm text-primary font-medium hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-beige rounded-xl p-8 border border-border">
      <h3 className="font-heading text-xl font-semibold text-text-dark mb-6">
        Start Your Custom Order
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Name
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full px-4 py-3 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-text-dark placeholder:text-text-muted"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-text-dark placeholder:text-text-muted"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-3 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-text-dark placeholder:text-text-muted"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            What do you need?
          </label>
          <select
            name="product_type"
            required
            className="w-full px-4 py-3 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-text-dark"
          >
            <option value="">Select product type</option>
            <option value="wedding-invites">Wedding Invitations</option>
            <option value="gift-packaging">Gift Packaging</option>
            <option value="hampers">Gift Hampers</option>
            <option value="corporate">Corporate Gifting</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Quantity (approx.)
          </label>
          <input
            name="quantity"
            type="text"
            placeholder="e.g. 200 pieces"
            className="w-full px-4 py-3 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-text-dark placeholder:text-text-muted"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Describe your requirements
          </label>
          <textarea
            name="requirements"
            rows={4}
            placeholder="Colors, materials, event details, budget range..."
            className="w-full px-4 py-3 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-text-dark placeholder:text-text-muted resize-none"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600">{message}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Submit Enquiry"}
        </button>
        <p className="text-xs text-text-muted text-center">
          We&apos;ll get back to you within 24 hours with a custom quote.
        </p>
      </form>
    </div>
  );
}
