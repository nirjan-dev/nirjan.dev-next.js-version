import React from "react";
import { MediaEditor } from "sanity-plugin-asset-source-ogimage";

// taken from the layout we built above
import { blogPostInstagramLayout } from "../components/ogMediaLayout";

import DefaultSource from "part:@sanity/form-builder/input/image/asset-source-default";
// And let's pretend we have another layout
import { blogPostOgImageLayout } from "../components/ogMediaLayout";
export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    },
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
        sources: [
          DefaultSource,
          {
            name: "sharing-image",
            title: "Generate sharing image",
            component: (props) => (
              <MediaEditor
                // It's vital to forward props to MediaEditor
                {...props}
                // Our custom layouts
                layouts={[blogPostOgImageLayout]}
                // See dialog section below
                dialog={{
                  title: "Create sharing image",
                }}
              />
            ),
            icon: () => <div>🎨</div>,
          },
        ],
      },
    },

    {
      name: "instaImage",
      title: "Instagram image",
      type: "image",
      options: {
        hotspot: true,
        sources: [
          DefaultSource,
          {
            name: "sharing-image",
            title: "Generate sharing image",
            component: (props) => (
              <MediaEditor
                // It's vital to forward props to MediaEditor
                {...props}
                // Our custom layouts
                layouts={[blogPostInstagramLayout]}
                // See dialog section below
                dialog={{
                  title: "Create sharing image",
                }}
              />
            ),
            icon: () => <div>🎨</div>,
          },
        ],
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
