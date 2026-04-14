import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    // General
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "Maple Packaging",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description (SEO)",
      type: "text",
      rows: 2,
    }),

    // Announcement Bar
    defineField({
      name: "announcements",
      title: "Announcement Bar Messages",
      type: "array",
      of: [{ type: "string" }],
    }),

    // Navigation
    defineField({
      name: "navLinks",
      title: "Header Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "URL" },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),

    // Contact Info
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "hours",
      title: "Business Hours",
      type: "string",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number (with country code, no +)",
      type: "string",
    }),

    // Social Links
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram Handle",
      type: "string",
      description: 'e.g. "@maplepackaging_"',
    }),
    defineField({
      name: "instagramFeedUrl",
      title: "Instagram Feed URL (Behold)",
      type: "url",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "pinterestUrl",
      title: "Pinterest URL",
      type: "url",
    }),

    // Footer Links
    defineField({
      name: "footerShopLinks",
      title: "Footer — Shop Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "URL" },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "footerCompanyLinks",
      title: "Footer — Company Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "URL" },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "footerSupportLinks",
      title: "Footer — Support Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "URL" },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "footerTagline",
      title: "Footer — Brand Tagline",
      type: "text",
      rows: 2,
    }),

    // Why Us Section
    defineField({
      name: "whyUsHeading",
      title: "Why Us — Heading",
      type: "string",
    }),
    defineField({
      name: "whyUsBody",
      title: "Why Us — Body Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "whyUsStats",
      title: "Why Us — Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "number", title: "Number" },
            { name: "suffix", type: "string", title: "Suffix (e.g. +, h, %)" },
            { name: "label", type: "string", title: "Label" },
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),

    // CTA Section
    defineField({
      name: "ctaHeading",
      title: "CTA — Heading",
      type: "string",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA — Body Text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ctaStats",
      title: "CTA — Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Display Value (e.g. 10K+)" },
            { name: "label", type: "string", title: "Label" },
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),

    // Newsletter
    defineField({
      name: "newsletterHeading",
      title: "Newsletter — Heading",
      type: "string",
    }),
    defineField({
      name: "newsletterBody",
      title: "Newsletter — Body Text",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
