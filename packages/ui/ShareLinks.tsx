import { IoLogoFacebook, IoLogoTwitter } from "react-icons/io";
import styles from "./ShareLinks.module.scss";
export const ShareLinks = ({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) => {
  const encodedTitle = encodeURIComponent(title);
  return (
    <section className={styles.share_links}>
      <a
        className={`${styles.social_btn} ${styles.social_btn__twitter}`}
        href={`https://twitter.com/intent/tweet?url=https://nirjan.dev/${slug}&text=${encodedTitle} by @nirjan_dev`}
        aria-label="share on twitter"
        target="_blank"
        rel="noopener noreferrer"
      >
        Share
        <span aria-hidden="true" className={styles.icon}>
          <IoLogoTwitter />
        </span>
      </a>
      <a
        className={`${styles.social_btn} ${styles.social_btn__twitter}`}
        href={`https://twitter.com/search?q=${encodeURIComponent(
          "https://nirjan.dev/" + slug
        )}`}
        target="_blank"
        aria-label="discuss on twitter"
        rel="noopener noreferrer"
      >
        Discuss
        <span className={styles.icon} aria-hidden="true">
          <IoLogoTwitter />
        </span>
      </a>
      <a
        className={`${styles.social_btn} ${styles.social_btn__facebook}`}
        href={`https://facebook.com/sharer/sharer.php?u=https://nirjan.dev/${slug}`}
        target="_blank"
        aria-label="share on facebook"
        rel="noopener noreferrer"
      >
        Share
        <span aria-hidden="true" className={styles.icon}>
          <IoLogoFacebook />
        </span>
      </a>
    </section>
  );
};
