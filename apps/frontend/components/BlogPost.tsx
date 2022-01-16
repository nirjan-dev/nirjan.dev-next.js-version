import { PortableText } from "lib/sanity";
import slugify from "slugify";
import { Banner, Container, Toc } from "ui";
import { DateFormatter } from "utils/dateFormatter";
import styles from "./BlogPost.module.scss";

export const BlogPost = ({ post }) => {
  const headers = post.body
    .filter((node) => {
      const { style } = node;

      // if (/^h\d/.test(style)) {
      if (/^h2$/.test(style)) {
        return node;
      }
    })
    .map((header) => {
      return {
        text: header.children[0].text,
        link: `#${slugify(header.children[0].text).toLowerCase()}`,
      };
    });

  return (
    <div className={styles.post}>
      <Banner
        title={post.title}
        subtitle={`Last updated: ${DateFormatter(post.publishedAt)}`}
      />

      <Toc headers={headers} />

      <Container>
        <div className={styles.post__wrapper}>
          <p className={styles.post__excerpt}>{post.excerpt}</p>

          <article className={styles.post__body}>
            <PortableText blocks={post.body} />
          </article>
          {/* <section className="share-links">
      <a
        className="social-btn social-btn--twitter"
        href={`https://twitter.com/intent/tweet?url=https://nirjan.dev/${post.slug}&text=${post.name} by @nirjan_dev`}
        aria-label="share on twitter"
        target="_blank"
        rel="noopener noreferrer">
        Share
        <span aria-hidden="true" className="icon"><IoLogoTwitter /></span>
      </a>
      <a
        className="social-btn social-btn--twitter"
        href={`https://twitter.com/search?q=${encodeURIComponent('https://nirjan.dev/' + post.slug)}`}
        target="_blank"
        aria-label="discuss on twitter"
        rel="noopener noreferrer">
        Discuss
        <span className="icon" aria-hidden="true"><IoLogoTwitter /></span>
      </a>
      <a
        className="social-btn social-btn--facebook"
        href={`https://facebook.com/sharer/sharer.php?u=https://nirjan.dev/${post.name}`}
        target="_blank"
        aria-label="share on facebook"
        rel="noopener noreferrer">
        Share
        <span aria-hidden="true" className="icon"><IoLogoFacebook /></span>
      </a>
    </section> */}

          {/* <NewsletterForm hydrate-client={{}} />
    <script
      src="https://utteranc.es/client.js"
      repo="nirjan-dev/site-comments"
      issue-term="pathname"
      crossorigin="anonymous"
      theme="preferred-color-scheme"
      async>
    </script> */}
        </div>
      </Container>
    </div>
  );
};
