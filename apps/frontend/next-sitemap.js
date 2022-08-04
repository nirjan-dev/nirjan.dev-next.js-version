/** @type {import('next-sitemap').IConfig} */
// import { createClient } from "next-sanity";
// import { config } from "./config";

const { createClient } = require("next-sanity");
const groq = require("groq");

const sanityClient = createClient({
  dataset: "production",
  projectId: "rl6xlgdh",
  apiVersion: "2021-03-25",
  useCdn: true,
});

module.exports = {
  siteUrl: "https://nirjan.dev",
  generateRobotsTxt: true, // (optional)
  transform: async (config, path) => {
    // don't include the blog pages, category pages and the blog list page
    if (path.startsWith("/blog") || path.startsWith("/category")) {
      return null;
    }

    // Use default transformation for all other cases
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
    };
  },
  additionalPaths: async (config) => {
    let entries = [];

    const posts = await sanityClient.fetch(
      groq`
          *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
            publishedAt,
            updatedAt,
            "slug": slug.current,
          }
      `
    );

    const categories = await sanityClient.fetch(
      groq`
          *[_type == "category" 
  
          && !(_id in path("drafts.**")) 
          
          ] | order(publishedAt desc) {
              "slug": slug.current,
              "updatedAt": _updatedAt,
              "latestPostPublishedAt": *[_type == 'post' && !(_id in path("drafts.**")) && references(^._id)][0].publishedAt
            }
        `
    );

    entries = posts.map((post) => {
      return {
        loc: `https://nirjan.dev/blog/${post.slug}`,
        lastmod: post.updatedAt || post.publishedAt,
      };
    });

    entries.push(
      ...categories.map((category) => {
        return {
          loc: `https://nirjan.dev/category/${category.slug}`,
          lastmod: category.latestPostPublishedAt || category.updatedAt,
        };
      })
    );

    entries.push({
      loc: `https://nirjan.dev/blog`,
      lastmod: posts[0].updatedAt || posts[0].publishedAt,
    });

    return entries;
  },
};
