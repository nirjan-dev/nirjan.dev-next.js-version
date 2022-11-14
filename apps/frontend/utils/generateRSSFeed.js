import fs from "fs";
import { Feed } from "feed";

const { createClient } = require("next-sanity");
const groq = require("groq");

const sanityClient = createClient({
  dataset: "production",
  projectId: "rl6xlgdh",
  apiVersion: "2021-03-25",
  useCdn: true,
});

export default async function generateRssFeed() {
  const posts = await sanityClient.fetch(
    groq`
        *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
            publishedAt,
            updatedAt,
            "slug": slug.current,
            title,
            excerpt
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
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.rss2());
  fs.writeFileSync("./public/rss.json", feed.json1());
  fs.writeFileSync("./public/atom.xml", feed.atom1());
}
