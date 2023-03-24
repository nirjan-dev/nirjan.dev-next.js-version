import { groq } from "next-sanity";
import { Banner, Container } from "ui";
import Layout from "../../components/Layout";
import { sanityClient } from "lib/sanity.server";
import { NextSeo, WebPageJsonLd } from "next-seo";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";
import ErrorPage from "next/error";

const toolTagQuery = groq`
  *[_type == "toolTag" 
  
  && slug.current == $toolTag
  
  && !(_id in path("drafts.**"))] 
  
  | order(publishedAt desc) {
    
    title,
    "slug": slug.current,
    _id,

    "toolsList": *[_type == "tool" && references(^._id)] | order(publishedAt desc) {
        title,
        _id,
        toolTags[]->{
        title,
        'slug': slug.current
        },
        excerpt,
        link,
        publishedAt,
        updatedAt,
        mainImage
    }
  }[0]
`;

export default function ToolTag({ toolTag }) {
  if (!toolTag) return <ErrorPage statusCode={404} />;

  const title = `Best ${toolTag.title} Tools and Resources for building Apps and Sites`;
  const description = `List of ${toolTag.title} Tools and Resources for making Apps and Sites curated by Nirjan Khadka`;
  const url = `https://nirjan.dev/tools/${toolTag.slug}`;

  const toolsList = toolTag?.toolsList;

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
        id="https://nirjan.dev/tools#webpage"
        reviewedBy={{
          type: "Person",
          name: "Nirjan Khadka",
        }}
      />

      <Banner title={`Tools & Resources tagged as #${toolTag?.title}`} />

      <Container isFlex={true}>
        <Link passHref href="/tools">
          <a
            style={{
              textDecoration: "none",
            }}
          >
            Back to All Tools &larr;
          </a>
        </Link>
      </Container>

      <Container isFlex={true}>
        <ul className={styles.toolsList}>
          {toolsList?.map((tool) => {
            return (
              <li className={styles.toolArticle} key={tool._id}>
                <Image
                  src={urlFor(tool.mainImage).width(898).height(436).url()}
                  alt={tool.title}
                  width={449}
                  height={218}
                />

                <h2 className={styles.toolTitle}>{tool.title}</h2>

                <p className={styles.toolExcerpt}>{tool.excerpt}</p>

                <p>
                  {tool.toolTags.map((tag) => {
                    return (
                      <Link passHref key={tag.slug} href={`/tools/${tag.slug}`}>
                        <a className={styles.toolTag}>#{tag.title}</a>
                      </Link>
                    );
                  })}
                </p>

                <a
                  href={tool.link}
                  rel="nofollow noreferrer"
                  target="_blank"
                  className={styles.toolLink}
                >
                  Visit Tool
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const toolTag = await sanityClient.fetch(toolTagQuery, {
    toolTag: params.toolTag,
  });

  if (!toolTag) {
    return { notFound: true };
  }

  return {
    props: {
      toolTag,
    },
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    groq`*[_type == "toolTag" && defined(slug.current) && !(_id in path("drafts.**"))][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { toolTag: slug } })),
    fallback: true,
  };
}
