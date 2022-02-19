import { PortableText } from "lib/sanity";
import { useEffect, useRef } from "react";
import slugify from "slugify";
import { Banner, Container, ShareLinks, Toc } from "ui";
import { DateFormatter } from "utils/dateFormatter";
import styles from "./BlogPost.module.scss";

export const BlogPost = ({ post }) => {
  const comments = useRef();

  useEffect(() => {
    if (comments.current) {
      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.setAttribute("repo", "nirjan-dev/site-comments");
      script.setAttribute("issue-term", "pathname");
      script.setAttribute("theme", "preferred-color-scheme");
      script.setAttribute("crossorigin", "anonymous");
      script.setAttribute("async", "");
      script.setAttribute("id", "utterances");
      (comments.current as any).appendChild(script);
    }

    return () => {
      if (comments.current) {
        const script = document.getElementById("utterances");
        if (script) {
          (comments.current as any).removeChild(script);
        }
      }
    };
  }, [comments]);

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
        subtitle={`Last updated: ${DateFormatter(
          post.updatedAt || post.publishedAt
        )}`}
      />

      <Toc headers={headers} />

      <Container>
        <div className={styles.post__wrapper}>
          <p className={styles.post__excerpt}>{post.excerpt}</p>

          <article className={styles.post__body}>
            <PortableText blocks={post.body} />
          </article>
          {/* */}
          <ShareLinks slug={post.slug} title={post.title} />

          {/* <NewsletterForm hydrate-client={{}} />
          
          */}
          <div ref={comments} id="comments"></div>
        </div>
      </Container>
    </div>
  );
};
