import { Container } from "ui/Container";
import Layout from "../components/Layout";
import styles from "./index.module.scss";
import Image from "next/image";
import { NextSeo, SocialProfileJsonLd, WebPageJsonLd } from "next-seo";
import Link from "next/link";

export default function Index() {
  const description =
    "I make websites and applications that are fast, user friendly and accessible. I work with modern JavaScript, CSS, HTML, Vue, React and Node.js";
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
    </Layout>
  );
}
