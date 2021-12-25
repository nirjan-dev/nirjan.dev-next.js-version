import { Footer, Header } from "ui";
import styles from "./Layout.module.scss";
const socialMenuItems = [
  {
    title: "codepen profile",
    link: "https://codepen.io/nirjan_dev",
    icon: "IoLogoCodepen",
  },
  {
    title: "twitter profile",
    link: "https://twitter.com/nirjan_dev",
    icon: "IoLogoTwitter",
  },
  {
    title: "github profile",
    link: "https://github.com/nirjan-dev",
    icon: "IoLogoGithub",
  },
  {
    title: "instagram profile",
    link: "https://instagram.com/nirjan.dev",
    icon: "IoLogoInstagram",
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
