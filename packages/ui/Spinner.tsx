import styles from "./Spinner.module.scss";

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.container}>
        <div className={`${styles.dot} ${styles.dot1}`} />
        <div className={`${styles.dot} ${styles.dot2}`} />
        <div className={`${styles.dot} ${styles.dot3}`} />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
