"use client";

const announcements = [
  "Flat 25% off on Eid Hampers",
  "Free shipping on orders above ₹999",
  "New: Corporate Gifting Collection 2025",
  "Custom packaging available — minimum 50 qty",
  "Diwali Early Bird: 20% off on bulk orders",
];

export default function AnnouncementBar() {
  const duplicated = [...announcements, ...announcements];

  return (
    <div className="bg-text-dark text-white py-2 overflow-hidden">
      <div className="animate-scroll-left flex whitespace-nowrap">
        {duplicated.map((text, i) => (
          <span key={i} className="mx-8 text-sm font-light tracking-wide">
            {text}
            <span className="ml-8 text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
