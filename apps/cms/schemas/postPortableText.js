import React from "react";

const InternalLinkRenderer = (props) => (
  <a
    style={{
      color: "green",
    }}
  >
    {props.children}
  </a>
);

export default {
  name: "postPortableText",
  type: "array",
  title: "Post Portable Text",
  of: [
    {
      type: "block",
      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "External link",
            options: {
              modal: {
                width: "medium",
              },
            },

            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
              },
              {
                title: "Open in new tab?",
                name: "blank",
                type: "boolean",
                default: true,
              },
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Internal link to other article",
            blockEditor: {
              render: InternalLinkRenderer,
            },
            options: {
              modal: {
                type: "dialog",
                width: "large",
              },
            },
            fields: [
              {
                type: "reference",
                title: "Post",
                name: "post",
                to: [{ type: "post" }],
                validation: (Rule) =>
                  Rule.required().warning(
                    "Post field cannot be empty in internal link"
                  ),
              },
              {
                title: "Open in new tab ?",
                name: "blank",
                type: "boolean",
                default: true,
              },
            ],
          },
        ],
      },
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
