const customValidation = (Rule) =>
  Rule.error().custom((field, context) => {
    if (context.parent.hasReview && !slug) {
      return `${field.title} Required`;
    }
    return true;
  });

const customHiddenLogic = ({ parent }) => !parent?.hasReview;

export default {
  name: "tool",
  title: "tool",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "toolTags",
      title: "Tags",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [{ type: "reference", to: { type: "toolTag" } }],
    },
    {
      name: "link",
      title: "Link",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "updatedAt",
      title: "Updated at",
      type: "datetime",
    },

    {
      name: "featured",
      title: "Featured",
      type: "boolean",
    },

    {
      name: "hasReview",
      title: "Has Review",
      type: "boolean",
      default: false,
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      hidden: customHiddenLogic,
      validation: customValidation,
    },

    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      hidden: customHiddenLogic,
      validation: customValidation,
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      hidden: customHiddenLogic,
      validation: customValidation,
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      hidden: customHiddenLogic,
      validation: customValidation,
      options: {
        hotspot: true,
      },
    },

    {
      name: "review",
      title: "Review",
      type: "postPortableText",
      hidden: customHiddenLogic,
      validation: customValidation,
    },
  ],

  preview: {
    select: {
      title: "title",
    },
  },
};
