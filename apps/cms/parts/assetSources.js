import React from "react";

import MediaAssetSource from "part:sanity-plugin-media/asset-source";
import { MediaEditor } from "sanity-plugin-asset-source-ogimage";

// taken from the layout we built above
import { blogPostInstagramLayout } from "../components/ogMediaLayout";

// And let's pretend we have another layout
import { blogPostOgImageLayout } from "../components/ogMediaLayout";
export default [
  MediaAssetSource,

  {
    name: "ogImageGenerate",
    title: "Generate OG image",
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

  // {
  //   name: "instaImageGenerate",
  //   title: "Generate Insta Image",
  //   component: (props) => (
  //     <MediaEditor
  //       // It's vital to forward props to MediaEditor
  //       {...props}
  //       // Our custom layouts
  //       layouts={[blogPostInstagramLayout]}
  //       // See dialog section below
  //       dialog={{
  //         title: "Create sharing image",
  //       }}
  //     />
  //   ),
  //   icon: () => <div>🎨</div>,
  // },
];
