import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "Our Story",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
    }),

    // What We Do
    defineField({
      name: "whatWeDoTitle",
      title: "What We Do — Title",
      type: "string",
    }),
    defineField({
      name: "whatWeDoBody",
      title: "What We Do — Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "whatWeDoImage",
      title: "What We Do — Image",
      type: "image",
      options: { hotspot: true },
    }),

    // Values
    defineField({
      name: "values",
      title: "Our Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),

    // Process Steps
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "step", type: "string", title: "Step Number (e.g. 01)" },
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "string", title: "Description" },
          ],
          preview: {
            select: { title: "title", subtitle: "step" },
          },
        },
      ],
    }),

    // Bottom CTA
    defineField({
      name: "ctaHeading",
      title: "Bottom CTA — Heading",
      type: "string",
    }),
    defineField({
      name: "ctaBody",
      title: "Bottom CTA — Body",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
