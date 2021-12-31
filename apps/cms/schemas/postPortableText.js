export default {
  name: "postPortableText",
  type: "array",
  title: "Post Portable Text",
  of: [
    {
      type: "block",
    },
    {
      type: "image",
      options: {
        hotspot: true,
        metadata: ["location", "palette", "exif", "lqip"],
      },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
          description: `This will be shown immediately below the image.`,
          options: {
            isHighlighted: true,
          },
        },
        {
          name: "credit",
          type: "string",
          title: "Credit",
          options: {
            isHighlighted: true,
          },
        },
        {
          type: "string",
          name: "link",
          title: "Link",
          options: {
            isHighlighted: true,
          },
        },
        {
          type: "text",
          name: "alt",
          title: "Alternative text",
          description: `Important for SEO and accessiblity for visually-impaired users`,
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      type: "code",
    },
  ],
};
