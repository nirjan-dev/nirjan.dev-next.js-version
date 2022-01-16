import { BlogPost } from "components/BlogPost";
import { sanityClient } from "lib/sanity.server";
import { groq } from "next-sanity";
import Layout from "../../components/Layout";

export default function BlogPostPage({ post }) {
  console.log({ post });
  return (
    <Layout>
      <BlogPost post={post} />
    </Layout>
  );
}

const postQuery = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    title,
    categories[]->{
      title,
    },
    excerpt,
    publishedAt,
    "slug": slug.current,
    body[]
  }`;

export async function getStaticProps({ params, preview = false }) {
  const post = await sanityClient.fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
