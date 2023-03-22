import { Footer, Header } from "ui";
import styles from "./Layout.module.scss";
const socialMenuItems = [
  {
    title: "Twitter profile",
    link: "https://twitter.com/nirjan_dev",
    icon: "IoLogoTwitter",
  },
  {
    title: "LinkedIn profile",
    link: "https://www.linkedin.com/in/nirjankhadka/",
    icon: "IoLogoLinkedin",
  },
  {
    title: "Github profile",
    link: "https://github.com/nirjan-dev",
    icon: "IoLogoGithub",
  },
  {
    title: "RSS Feed",
    link: "https://nirjan.dev/api/rss",
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
