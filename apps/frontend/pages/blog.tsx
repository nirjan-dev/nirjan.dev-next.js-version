import { groq } from "next-sanity";
import { Banner, Container } from "ui";
import { BlogList, BlogListItem } from "../components/BlogList";
import Layout from "../components/Layout";
import { sanityClient } from "lib/sanity.server";

const postListQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] {
    title,
    categories[]->{
      title
    },
    excerpt,
    publishedAt,
    "slug": slug.current
  }
`;

export default function Blog({ postList }) {
  console.log({ postList });
  return (
    <Layout>
      <Banner title="My Blog" />
      <Container>
        <BlogList posts={postList} />
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
