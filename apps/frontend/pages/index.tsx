import { Container } from "ui/Container";
import Layout from "../components/Layout";
import styles from "./index.module.scss";
import Image from "next/image";
import { NextSeo, SocialProfileJsonLd, WebPageJsonLd } from "next-seo";
import Link from "next/link";
import { BlogList } from "components/BlogList";
import { sanityClient } from "lib/sanity.server";
import { groq } from "next-sanity";
import { DateFormatter } from "utils/dateFormatter";

export default function Index({ postList }) {
  const description =
    "I make websites and applications that are fast, user friendly and accessible. I work with modern JavaScript, CSS, HTML, Vue, Svelte, React and Node.js";
  const title = "Nirjan Khadka | Developer specializing in Web and Mobile App";
  const url = "https://nirjan.dev";
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
        id="https://nirjan.dev/#webpage"
        reviewedBy={{
          type: "Person",
          name: "Nirjan Khadka",
        }}
      />
      <SocialProfileJsonLd
        type="Person"
        name="Nirjan Khadka"
        url={url}
        sameAs={[
          "https://www.instagram.com/nirjan.dev",
          "https://www.linkedin.com/nirjankhadka",
          "https://twitter.com/nirjan.dev",
          "https://codepen.io/nk13_codes",
          "https://github.com/NK-WebDev",
        ]}
      />
      <div className={styles.introBanner}>
        <Container>
          <div className={styles.introBanner__container}>
            <div>
              <h1 className={styles.introBanner__title}>
                Hi, I&apos;m Nirjan.
              </h1>
              <h2 className={styles.introBanner__subTitle}>
                I build websites and apps that are fast, user friendly, and
                accessible. I also love sharing stuff that I&apos;m learning and
                building through my &nbsp;
                <Link href="/blog">blog</Link>, &nbsp;
                <a
                  href="https://twitter.com/nirjan_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  twitter
                </a>
                &nbsp; and &nbsp;
                <a
                  href="https://instagram.com/nirjan.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  instagram
                </a>
                .
              </h2>
            </div>

            <Image
              src="/img/illustration.png"
              alt=""
              width={400}
              height={400}
            />
          </div>
        </Container>
      </div>

      <div className={styles.blogPosts}>
        <Container>
          <div>
            <h2 className={styles.blogPosts__title}>My Featured Posts</h2>

            <ul className={styles.blogPosts__list}>
              {postList.map(({ title, publishedAt, slug, excerpt }) => {
                return (
                  <li className={styles.blogPosts__card} key={slug}>
                    <h3 className={styles.blogPosts__cardTitle}>
                      <Link passHref href={`/blog/${slug}`}>
                        <a className={styles.posts__link}>{title}</a>
                      </Link>
                    </h3>

                    <p className={styles.blogPosts__cardExcerpt}>{excerpt}</p>

                    <p className={styles.blogPosts__cardMeta}>
                      <small className={styles.posts__date}>
                        {DateFormatter(publishedAt)}{" "}
                      </small>
                    </p>
                  </li>
                );
              })}
            </ul>

            <Link href="/blog" passHref>
              <a className={styles.blogPosts__viewAll}>View All Posts</a>
            </Link>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

const postListQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && featured == true] | order(_updatedAt desc) {
    title,
    categories[]->{
      title,
      'slug': slug.current
    },
    excerpt,
    publishedAt,
    updatedAt,
    "slug": slug.current
  }[0...3]
`;

export async function getStaticProps() {
  const postList = await sanityClient.fetch(postListQuery);

  return {
    props: {
      postList,
    },
  };
}
