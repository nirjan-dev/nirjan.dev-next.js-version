import Link from "next/link";
import { DateFormatter } from "../utils/dateFormatter";
import styles from "./BlogList.module.scss";
export interface BlogListItem {
  title: string;
  publishedAt: string;
  excerpt: string;
  slug: string;
  categories: { title: string; slug: string }[];
}

const BlogListItem = ({
  title,
  publishedAt,
  categories,
  excerpt,
  slug,
}: BlogListItem) => {
  return (
    <li className={styles.posts__listItem}>
      <h2 className={styles.posts__title}>
        <Link passHref href={`/blog/${slug}`}>
          <a className={styles.posts__link}>{title}</a>
        </Link>
      </h2>
      <p className={styles.posts__meta}>
        <small className={styles.posts__date}>
          {DateFormatter(publishedAt)}{" "}
        </small>

        {categories &&
          categories.map((category) => {
            return (
              <Link
                key={category.title}
                passHref
                href={`/category/${category.slug}`}
              >
                <a className={styles.posts__category}>{category.title}</a>
              </Link>
            );
          })}
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
