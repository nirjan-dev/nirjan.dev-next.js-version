import styles from "./Banner.module.scss";
import Link from "next/link";

export let title: string;
export let subtitle: string;

export const Banner = ({
  title,
  subtitle,
  categories,
}: {
  title: string;
  subtitle?: string;
  categories?: { title: string; slug: string }[];
}) => {
  return (
    <section className={styles.banner}>
      <h1 className={styles.banner__title}>{title}</h1>

      {subtitle && <p className={styles.banner__subtitle}>{subtitle}</p>}

      {categories && (
        <div>
          {categories.map((category) => {
            return (
              <Link
                key={category.title}
                passHref
                href={`/category/${category.slug}`}
              >
                <a className={styles.banner__category}>{category.title}</a>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};
