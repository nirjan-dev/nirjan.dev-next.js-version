import { Container } from "ui/Container";
import Layout from "../components/Layout";
import styles from "./index.module.scss";
export default function Index() {
  return (
    <Layout>
      <div className={styles.introBanner}>
        <Container>
          <>
            <h1 className={styles.introBanner__title}>
              <span className={styles.introBanner__titleIntro}>
                Hi, I'm Nirjan
              </span>
              I make websites and apps that are blazing fast, user friendly,
              optimized and accessible to everyone. I specialize in modern
              JavaScript, CSS, HTML, Vue, Svelte and Node.js
            </h1>
            <h2 className={styles.introBanner__subTitle}>
              I also love sharing what I've learnt about web development and
              UI/UX design through my &nbsp;<a href="/blog">blog</a>, &nbsp;
              <a
                href="https://twitter.com/nirjan_dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                twitter &nbsp;
              </a>
              and &nbsp;
              <a
                href="https://instagram.com/nirjan.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                instagram
              </a>
            </h2>
          </>
        </Container>
      </div>
    </Layout>
  );
}
