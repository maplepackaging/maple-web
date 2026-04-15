"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/supabase-helpers";
import { EMAIL_REGEX } from "@/lib/utils";

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

    // Validation
    if (!name || name.length < 2) {
      setStatus("error");
      setMessage("Please enter a valid name");
      return;
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }
    if (!subject || subject.length < 3) {
      setStatus("error");
      setMessage("Please enter a subject");
      return;
    }
    if (!messageText || messageText.length < 10) {
      setStatus("error");
      setMessage("Message must be at least 10 characters");
      return;
    }

    setStatus("loading");
    const result = await submitContactForm({
      name,
      email,
      subject,
      message: messageText,
    });

    setStatus(result.success ? "success" : "error");
    setMessage(result.message);
    if (result.success) form.reset();
  };

  if (status === "success") {
    return (
      <div className="bg-surface rounded-xl p-8 border border-border text-center py-16">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="font-heading text-xl font-semibold text-text-dark">
          Message Sent!
        </h3>
        <p className="mt-2 text-sm text-text-muted">{message}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 px-6 py-2 text-sm text-primary font-medium hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface rounded-xl p-8 border border-border space-y-6"
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Name
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full px-4 py-3 text-sm bg-beige border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-text-dark placeholder:text-text-muted"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 text-sm bg-beige border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-text-dark placeholder:text-text-muted"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Subject
        </label>
        <select
          name="subject"
          required
          className="w-full px-4 py-3 text-sm bg-beige border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-text-dark"
        >
          <option value="">Select a topic</option>
          <option value="custom-order">Custom Order</option>
          <option value="bulk-enquiry">Bulk Enquiry</option>
          <option value="wedding">Wedding Invitations</option>
          <option value="corporate">Corporate Gifting</option>
          <option value="general">General Question</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-2">
          Message
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us about your requirements..."
          className="w-full px-4 py-3 text-sm bg-beige border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-text-dark placeholder:text-text-muted resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
