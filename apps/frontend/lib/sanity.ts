import { CodeBlock, SanityImage } from "ui";
import slugify from "slugify";
// lib/sanity.js
import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from "next-sanity";
import { config } from "./config";
import React from "react";

import BlockContent from "@sanity/block-content-to-react/lib/BlockContent";

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

const BlockRenderer = (props) => {
  const { style = "normal" } = props.node;

  // if (/^h\d/.test(style)) {
  if (/^h2$/.test(style)) {
    const level = style.replace(/[^\d]/g, "");
    return React.createElement(
      style,
      {
        className: `heading-${level}`,
        id: `${slugify(props.node.children[0].text).toLowerCase()}`,
      },
      props.children
    );
  }

  // Fall back to default handling
  return BlockContent.defaultSerializers.types.block(props);
};

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {
    types: { block: BlockRenderer, image: SanityImage, code: CodeBlock },
  },
});

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);

// Set up the live preview subscription hook
export const usePreviewSubscription: any =
  createPreviewSubscriptionHook(config);
