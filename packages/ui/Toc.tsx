import styles from "./toc.module.scss";
import { useState } from "react";
import { IoIosList } from "react-icons/io";
export const Toc = ({
  headers,
}: {
  headers: {
    link: string;
    text: string;
  }[];
}) => {
  const [active, setActive] = useState(false);

  return (
    <aside className={styles.toc}>
      <button onClick={() => setActive(!active)} className={styles.toc__button}>
        <IoIosList aria-label="Table of Contents" />
      </button>
      <h2 className={styles.toc__header}>Table of Contents</h2>

      <ul className={`${styles.toc__list} ${active ? styles.active : null}`}>
        {headers.map((header) => {
          return (
            <li className={styles.toc__list_item} key={header.link}>
              <a
                className={styles.toc__link}
                href={header.link}
                onClick={() => setActive(false)}
              >
                {header.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
