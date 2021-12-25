export let isNarrow: boolean = false;
export let isFlex: boolean = false;
import styles from "./Container.module.scss";

export const Container = ({
  children,
  isNarrow,
  isFlex,
}: {
  children: React.ReactChild;
  isNarrow?: boolean;
  isFlex?: boolean;
}) => {
  return (
    <div
      className={`${styles.container} ${isNarrow ? styles.isNarrow : ""} ${
        isFlex ? styles.isFlex : ""
      }`}
    >
      {children}
    </div>
  );
};
