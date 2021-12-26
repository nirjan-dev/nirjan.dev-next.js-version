import styles from "./Banner.module.scss";

export let title: string;
export let subtitle: string;

export const Banner = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <section className={styles.banner}>
      <h1 className={styles.banner__title}>{title}</h1>

      {subtitle && <p className={styles.banner__subtitle}>{subtitle}</p>}
    </section>
  );
};
