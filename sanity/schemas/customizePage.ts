import { defineField, defineType } from "sanity";

export default defineType({
  name: "customizePage",
  title: "Customize Page",
  type: "document",
  fields: [
    defineField({
      name: "heroLabel",
      title: "Hero Label",
      type: "string",
      initialValue: "Bespoke Packaging",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroBody",
      title: "Hero Body",
      type: "text",
      rows: 3,
    }),

    // Steps
    defineField({
      name: "steps",
      title: "How It Works Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            {
              name: "icon",
              type: "string",
              title: "Icon Name",
              description: "Lucide icon name: Pen, Palette, Box, Truck",
            },
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),

    // Customizable Products List
    defineField({
      name: "customizableProducts",
      title: "Customizable Products List",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "customizableTitle",
      title: "Customizable Section — Title",
      type: "string",
    }),
    defineField({
      name: "customizableBody",
      title: "Customizable Section — Body",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Customize Page" };
    },
  },
});
