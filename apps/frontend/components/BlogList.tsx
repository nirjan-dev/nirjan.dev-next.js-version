import Link from "next/link";
import { DateFormatter } from "../utils/dateFormatter";
import styles from "./BlogList.module.scss";
export interface BlogListItem {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

const BlogListItem = ({ title, date, excerpt, slug }: BlogListItem) => {
  return (
    <li className={styles.posts__listItem}>
      <h2 className={styles.posts__title}>
        <Link passHref href={`/${slug}`}>
          <a className={styles.posts__link} href={slug}>
            {title}
          </a>
        </Link>
      </h2>
      <p>
        <small className={styles.posts__date}>{DateFormatter(date)} </small>
      </p>
      <p className={styles.posts__excerpt}>{excerpt}</p>
    </li>
  );
};

export const BlogList = ({ posts }: { posts: BlogListItem[] }) => {
  return (
    <section className={styles.posts}>
      <ul className={styles.posts__list}>
        {posts.map((post) => {
          return <BlogListItem key={post.slug} {...post} />;
        })}
      </ul>
    </section>
  );
};
