import { BlogPost } from "components/BlogPost";
import { urlFor } from "lib/sanity";
import { sanityClient } from "lib/sanity.server";
import { groq } from "next-sanity";
import { NextSeo, WebPageJsonLd, ArticleJsonLd } from "next-seo";
import Layout from "../../components/Layout";

export default function BlogPostPage({ post }) {
  const title = post?.seoTitle;
  const description = post?.seoDescription;
  const url = `https://nirjan.dev/blog/${post.slug}`;
  const image = urlFor(post.mainImage).width(1200).height(630).url();
  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          images: [
            {
              url: image,
            },
          ],
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
        url="https://nirjan.dev/blog"
        title={title}
        images={[image]}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt || post.publishedAt}
        authorName="Nirjan Khadka"
        description={description}
      />
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
    seoDescription,
    seoTitle,
    publishedAt,
    updatedAt,
    "slug": slug.current,
    mainImage,
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
    groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}
