import { groq } from "next-sanity";
import { Banner, Container } from "ui";
import { BlogList, BlogListItem } from "../../components/BlogList";
import Layout from "../../components/Layout";
import { sanityClient } from "lib/sanity.server";
import { ArticleJsonLd, NextSeo, WebPageJsonLd } from "next-seo";

const postListQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    title,
    categories[]->{
      title,
      'slug': slug.current
    },
    excerpt,
    publishedAt,
    updatedAt,
    "slug": slug.current
  }
`;

export default function Blog({ postList }) {
  const title = `Web Development Blog by Nirjan Khadka`;
  const description = `I write about different web technologies like HTML, CSS, JavaScript, Svelte, Vue, Storybook, Node.js, SVG, WebGL, web animation and best coding practices.`;
  const url = "https://nirjan.dev/blog";
  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
        }}
      />
      <WebPageJsonLd
        description={description}
        id="https://nirjan.dev/blog#webpage"
        reviewedBy={{
          type: "Person",
          name: "Nirjan Khadka",
        }}
      />
      <ArticleJsonLd
        type="Blog"
        url="https://nirjan.dev/blog"
        title={title}
        images={[
          "https://cdn.sanity.io/images/rl6xlgdh/production/f8310e61d05c1ed6438acae66d6606570896d737-1918x985.png?w=1200&h=630",
        ]}
        datePublished={postList[0].publishedAt}
        dateModified={postList[0].updatedAt || postList[0].publishedAt}
        authorName="Nirjan Khadka"
        description={description}
      />
      <Banner title="My Blog" />
      <Container>
        <div
          style={{
            margin: "0 auto",
            maxWidth: "60ch",
          }}
        >
          <BlogList posts={postList} />
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const postList = await sanityClient.fetch(postListQuery);

  return {
    props: {
      postList,
    },
  };
}
