import { Container } from "ui/Container";
import Layout from "../components/Layout";

export default function Index() {
  return (
    <Layout>
      <Container>
        <>
          <h1 className="intro-banner__title">
            <span className="intro-banner__title-intro">Hi, I'm Nirjan</span>I
            make websites and apps that are blazing fast, user friendly,
            optimized and accessible to everyone. I specialize in modern
            JavaScript, CSS, HTML, Vue, Svelte and Node.js
          </h1>
          <h2 className="intro-banner__sub-title">
            I also love sharing what I've learnt about web development and UI/UX
            design through my
            <a href="/blog">blog</a>,
            <a
              href="https://twitter.com/nirjan_dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              twitter{" "}
            </a>{" "}
            and{" "}
            <a
              href="https://instagram.com/nirjan.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              instagram{" "}
            </a>
          </h2>
        </>
      </Container>
    </Layout>
  );
}
