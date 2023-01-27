import fs from "fs";
import { Feed } from "feed";
import htm from "htm";
import vhtml from "vhtml";
import { toHTML, uriLooksSafe } from "@portabletext/to-html";

const { createClient } = require("next-sanity");
const groq = require("groq");

const sanityClient = createClient({
  dataset: "production",
  projectId: "rl6xlgdh",
  apiVersion: "2021-03-25",
  useCdn: true,
});

const html = htm.bind(vhtml);

const myPortableTextComponents = {
  types: {
    image: ({ value }) => html`<img src="${value.imageUrl}" />`,
  },

  marks: {
    link: ({ children, value }) => {
      // ⚠️ `value.href` IS NOT "SAFE" BY DEFAULT ⚠️
      // ⚠️ Make sure you sanitize/validate the href! ⚠️
      const href = value.href || "";

      if (uriLooksSafe(href)) {
        const rel = href.startsWith("/") ? undefined : "noreferrer noopener";
        return html`<a href="${href}" rel="${rel}">${children}</a>`;
      }

      // If the URI appears unsafe, render the children (eg, text) without the link
      return children;
    },

    internalLink: ({ children, value }) => {
      const slug = value.slug.current || "";

      const href = `https://nirjan.dev/blog/${slug}`;

      return html`<a href="${href}">${children}</a>`;
    },
  },
};

export default async function generateRssFeed() {
  const posts = await sanityClient.fetch(
    groq`
        *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
            publishedAt,
            updatedAt,
            "slug": slug.current,
            title,
            excerpt,
            body[] {
              ...,
              markDefs[]{
                ...,
                _type == "internalLink" => {
                  "slug": @.post->slug
                }
              }
            }
        }
    `
  );
  const site_url = "nirjan.dev";

  const feedOptions = {
    title: "Nirjan Khadka's Blog",
    description:
      "I write about different web technologies like HTML, CSS, JavaScript, Svelte, Vue, Storybook, Node.js, SVG, WebGL, web animation and best coding practices.",
    id: site_url,
    link: site_url,
    image: `${site_url}/logo.png`,
    favicon: `${site_url}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Nirjan Khadka`,
    generator: "Next.js",
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
      json: `${site_url}/rss.json`,
      atom: `${site_url}/atom.xml`,
    },
  };

  const feed = new Feed(feedOptions);

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.slug}`,
      link: `${site_url}/blog/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.updatedAt),
      content: toHTML(post.body, myPortableTextComponents).toString(),
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.rss2());
  fs.writeFileSync("./public/rss.json", feed.json1());
  fs.writeFileSync("./public/atom.xml", feed.atom1());
}
