import React from "react";
// Special component that renders the src for a given `_type: "image"` object
import { Image } from "sanity-plugin-asset-source-ogimage";

import styles from "./ogMediaLayout.module.css";

export const CustomMediaLayout = ({
  title,
  authorImage,
  authorName,
  categories,
}) => (
  <div className={styles.container}>
    <div className={styles.textContainer}>
      <div>
        <h1>🔗 nirjan.dev</h1>
        <h2>{title || "Please insert a title"}</h2>

        <div>
          {categories.split(",").map((category) => (
            <span className={styles.category}>{category}</span>
          ))}
        </div>

        <div className={styles.author}>
          <img src={authorImage} />
          <span>{authorName}</span>
        </div>
      </div>
    </div>
  </div>
);

export const blogPostInstagramLayout = {
  name: "blogPostInstagram",
  title: "Blog post (Instagram)",
  // Start defining the form editors will fill to change the final image
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "authorImage",
      title: "Author's image",
      type: "string",
    },
    {
      title: "Author",
      name: "authorName",
      type: "string",
    },
    {
      title: "Categories",
      name: "categories",
      type: "string",
    },
  ],
  prepare: (document) => {
    return {
      title: document.title,
      authorImage:
        "https://cdn.sanity.io/images/rl6xlgdh/production/d51d03176c1d083983d3e3ade6b06dffd0e0b32f-400x400.jpg?w=1000&h=1000&fit=max",
      authorName: "Nirjan Khadka",
      categories: "default",
    };
  },
  dimensions: {
    width: 1200,
    height: 1200,
  },
  component: CustomMediaLayout,
};

export const blogPostOgImageLayout = {
  ...blogPostInstagramLayout,
  dimensions: {
    width: 1200,
    height: 630,
  },
};
