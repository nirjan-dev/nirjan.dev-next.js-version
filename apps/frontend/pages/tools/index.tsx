import { groq } from "next-sanity";
import { Banner, Container, InlineNewsletterForm } from "ui";
import Layout from "../../components/Layout";
import { sanityClient } from "lib/sanity.server";
import { NextSeo, WebPageJsonLd } from "next-seo";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";

const toolsListQuery = groq`
  *[_type == "tool" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
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
`;

export default function Blog({ toolsList }) {
  const title = `Best Tools and Resources for building Apps and Sites`;
  const description = `List of Tools and Resources for making Apps and Sites curated by Nirjan Khadka`;
  const url = "https://nirjan.dev/tools";

  const allTags = [];

  toolsList.forEach((tool) => {
    tool.toolTags.forEach((tag) => {
      if (!allTags.includes(tag.slug)) {
        allTags.push(tag);
      }
    });
  });

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
              url: "https://nirjan.dev/img/tools-og.jpeg",
              width: 1200,
              height: 630,
            },
          ],
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

      <Banner
        title="Tools & Resources"
        subtitle="Tools for building apps & sites curated by me."
      />

      <Container isFlex={true}>
        <div className={styles.filter}>
          <h2 className={styles.filterTitle}>Filter by Tags</h2>
          <ul className={styles.filterList}>
            {allTags.map((tag) => {
              return (
                <li className={styles.filterItem} key={tag.slug}>
                  <Link passHref href={`/tools/${tag.slug}`}>
                    <a className={styles.filterLink}>#{tag.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>

      <Container isFlex={true}>
        <div>
          <InlineNewsletterForm
            copyText="Subscribe to get the most useful tools directly to your inbox. Unsubscribe anytime."
            formId="4798512"
            noRSS
          />
        </div>
      </Container>

      <Container isFlex={true}>
        <ul className={styles.toolsList}>
          {toolsList.map((tool) => {
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

export async function getStaticProps() {
  const toolsList = await sanityClient.fetch(toolsListQuery);

  return {
    props: {
      toolsList,
    },
  };
}
