import { Footer, Header } from "ui";
import styles from "./Layout.module.scss";
const socialMenuItems = [
  {
    title: "Codepen profile",
    link: "https://codepen.io/nirjan_dev",
    icon: "IoLogoCodepen",
  },
  {
    title: "Twitter profile",
    link: "https://twitter.com/nirjan_dev",
    icon: "IoLogoTwitter",
  },
  {
    title: "Github profile",
    link: "https://github.com/nirjan-dev",
    icon: "IoLogoGithub",
  },
  {
    title: "Instagram profile",
    link: "https://instagram.com/nirjan.dev",
    icon: "IoLogoInstagram",
  },
  {
    title: "RSS Feed",
    link: "https://nirjan.dev/rss.xml",
    icon: "IoLogoRss",
  },
];
export default function Layout({ children }) {
  return (
    <>
      <a href="#content" className={styles.skipLink}>
        {" "}
        Skip to main content{" "}
      </a>
      <Header socialMenuItems={socialMenuItems} logo="/logo.svg" />
      <main id="content" tabIndex={-1}>
        {children}
      </main>
      <Footer socialMenuItems={socialMenuItems} />
    </>
  );
}
