import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description: 'e.g. "Bride, Mumbai" or "CEO, Acme Corp"',
    }),
    defineField({
      name: "content",
      title: "Testimonial Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "avatar",
      title: "Avatar (initials or image)",
      type: "string",
      description: 'Short text like initials "RS" or an emoji',
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
