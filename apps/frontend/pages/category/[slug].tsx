import { groq } from "next-sanity";
import { Banner, Container } from "ui";
import { BlogList, BlogListItem } from "../../components/BlogList";
import Layout from "../../components/Layout";
import { sanityClient } from "lib/sanity.server";
import { ArticleJsonLd, NextSeo, WebPageJsonLd } from "next-seo";
import ErrorPage from "next/error";

const postListQuery = groq`
  *[_type == "category" 
  
  && !(_id in path("drafts.**")) 
  
  && slug.current == $slug] | order(publishedAt desc) {
  
    title,
    "slug": slug.current,
    description,
    "posts": *[_type == 'post' && !(_id in path("drafts.**")) && references(^._id)] {
        title,
        excerpt,
        "slug": slug.current,
        publishedAt,
        updatedAt
    }
  }[0]
`;

export default function Blog({ category }) {
  if (!category) {
    return <ErrorPage statusCode={404} />;
  }
  const title = category.title;
  const description = category.description;
  const url = `https://nirjan.dev/category/${category.slug}`;
  const postList = category.posts ?? [];
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
        id={`${url}#webpage`}
        reviewedBy={{
          type: "Person",
          name: "Nirjan Khadka",
        }}
      />
      <ArticleJsonLd
        type="Blog"
        url={url}
        title={title}
        images={[
          "https://cdn.sanity.io/images/rl6xlgdh/production/f8310e61d05c1ed6438acae66d6606570896d737-1918x985.png?w=1200&h=630",
        ]}
        datePublished={postList[0]?.publishedAt}
        dateModified={postList[0]?.updatedAt || postList[0]?.publishedAt}
        authorName="Nirjan Khadka"
        description={description}
      />
      <Banner title={title} />
      <Container>
        {postList.length > 0 && <BlogList posts={postList} />}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const category = await sanityClient.fetch(postListQuery, {
    slug: params.slug,
  });

  if (!category) return { notFound: true };

  return {
    props: {
      category,
    },
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    groq`*[_type == "category"
       
       && defined(slug.current) 
       
       && !(_id in path("drafts.**"))][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
