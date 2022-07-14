import { BlogPost } from "components/BlogPost";
import { urlFor, usePreviewSubscription } from "lib/sanity";
import { getClient, sanityClient } from "lib/sanity.server";
import { groq } from "next-sanity";
import { NextSeo, WebPageJsonLd, ArticleJsonLd } from "next-seo";
import Layout from "../../components/Layout";

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 */
function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) {
    return data;
  }

  if (data.length === 1) {
    return data[0];
  }

  if (preview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0];
  }

  return data[0];
}

export default function BlogPostPage({ data, preview }) {
  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.page,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  });

  // Client-side uses the same query, so we may need to filter it down again
  const post = filterDataToSingleItem(previewData, preview);

  const title = post?.seoTitle;
  const description = post?.seoDescription;
  const url = `https://nirjan.dev/blog/${post?.slug}`;
  const publishedDate = post?.publishedAt;
  const modifiedDate = post?.updatedAt ?? publishedDate;
  const image =
    post?.mainImage && urlFor(post.mainImage).width(1200).height(630).url();

  const postComponents = (
    <>
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
        datePublished={publishedDate}
        dateModified={modifiedDate}
        authorName="Nirjan Khadka"
        description={description}
      />

      <BlogPost post={post} />
    </>
  );
  return <Layout>{post && postComponents}</Layout>;
}

const postQuery = groq`
  *[_type == "post" && slug.current == $slug]{
    title,
    _id,
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
    body[] {
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": @.post->slug
        }
      }
    }
  }`;

export async function getStaticProps({ params, preview = false }) {
  const data = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  });

  const queryParams = { slug: params.slug };

  if (!data) return { notFound: true };

  const page = filterDataToSingleItem(data, preview);

  return {
    props: {
      data: { page: page ?? null, query: postQuery, queryParams },
      preview,
    },
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
