import { Container } from "ui/Container";
import Layout from "../components/Layout";
import styles from "./index.module.scss";
import Image from "next/image";
export default function Index() {
  return (
    <Layout>
      <div className={styles.introBanner}>
        <Container>
          <div className={styles.introBanner__container}>
            <div>
              <h1 className={styles.introBanner__title}>Hi, I'm Nirjan.</h1>
              <h2 className={styles.introBanner__subTitle}>
                I build websites and apps that are fast, user friendly, and
                accessible. I also love sharing stuff that I'm learning and
                building through my &nbsp;
                <a href="/blog">blog</a>, &nbsp;
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
