import { PortableText } from "lib/sanity";
import Link from "next/link";
import { useEffect, useRef } from "react";
import slugify from "slugify";
import { Banner, Container, InlineNewsletterForm, ShareLinks, Toc } from "ui";
import { DateFormatter } from "utils/dateFormatter";
import styles from "./BlogPost.module.scss";

export const BlogPost = ({ post, relatedPosts }) => {
  const comments = useRef();

  // const [openNewsletterModal, setOpenNewsletterModal] = useState(false);

  // const handleScroll = () => {
  //   const scrollPercent =
  //     (document.documentElement.scrollTop + document.body.scrollTop) /
  //     (document.documentElement.scrollHeight -
  //       document.documentElement.clientHeight);
  //   if (scrollPercent >= 0.8) {
  //     setOpenNewsletterModal(true);
  //   }
  // };

  useEffect(() => {
    // window.addEventListener("scroll", handleScroll);

    const commentsContainer = comments?.current;
    if (commentsContainer) {
      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.setAttribute("repo", "nirjan-dev/site-comments");
      script.setAttribute("issue-term", "pathname");
      script.setAttribute("theme", "preferred-color-scheme");
      script.setAttribute("crossorigin", "anonymous");
      script.setAttribute("async", "");
      script.setAttribute("id", "utterances");
      (commentsContainer as any).appendChild(script);
    }

    return () => {
      // window.removeEventListener("scroll", handleScroll);
      if (commentsContainer) {
        const script = document.getElementById("utterances");
        if (script) {
          (commentsContainer as any).removeChild(script);
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
    <div className={styles.post} data-content="main">
      <Banner
        title={post.title}
        subtitle={`Last updated: ${DateFormatter(
          post.updatedAt || post.publishedAt
        )}`}
        categories={post.categories}
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

          <InlineNewsletterForm
            formId="4007452"
            copyText="If you enjoyed reading this post and want to stay updated on similar content then subscribe to my newsletter. No spam, just good stuff. 🙏 Unsubscribe anytime."
          />
          {/* <Modal openModalFromParent={openNewsletterModal}></Modal> */}

          {relatedPosts.length > 0 && (
            <div className={styles.post__related}>
              <h3 className={styles.post__related__title}>Related Posts</h3>
              <ul className={styles.post__related__list}>
                {relatedPosts.map((post) => (
                  <li key={post._id}>
                    <Link passHref href={`/blog/${post.slug.current}`}>
                      <a>{post.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div ref={comments} id="comments"></div>
        </div>
      </Container>
    </div>
  );
};
