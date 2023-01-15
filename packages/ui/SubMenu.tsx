import { useState } from "react";
import styles from "./SubMenu.module.scss";
import { FaLink } from "react-icons/fa";
import {
  IoLogoTwitter,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoRss,
} from "react-icons/io";
export interface SocialMenuItem {
  title: string;
  icon: string;
  link: string;
}

function getSelectedIcon(icon: string) {
  let selectedIcon;
  switch (icon) {
    case "IoLogoTwitter":
      selectedIcon = <IoLogoTwitter />;
      break;
    case "IoLogoGithub":
      selectedIcon = <IoLogoGithub />;
      break;
    case "IoLogoLinkedin":
      selectedIcon = <IoLogoLinkedin />;
      break;
    case "IoLogoRss":
      selectedIcon = <IoLogoRss />;
    default:
      break;
  }
  return selectedIcon;
}

const SubMenuItem = ({ title, link, icon }: SocialMenuItem) => {
  return (
    <li className={styles.subMenu__item}>
      <a
        className={styles.subMenu__link}
        title={title}
        href={link}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className={styles.icon} aria-hidden="true">
          {getSelectedIcon(icon)}
        </span>
      </a>
    </li>
  );
};

export const SubMenu: React.FC<{ socialMenuItems: SocialMenuItem[] }> = ({
  socialMenuItems,
}: {
  socialMenuItems: SocialMenuItem[];
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <button
        type="button"
        className={`${styles.menuBtn} ${isMenuOpen ? styles.isActive : ""}`}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="subMenu"
      >
        {/* <i className={styles.ggMenu} /> */}
        <span className={styles.icon} aria-hidden="true">
          <FaLink />
        </span>
        <span className={styles.menuBtn__text}>Social</span>
      </button>

      <ul
        className={`${styles.subMenu} ${isMenuOpen ? styles.isVisible : ""}`}
        id="subMenu"
      >
        {socialMenuItems.map(({ title, icon, link }) => {
          return (
            <SubMenuItem key={title} title={title} link={link} icon={icon} />
          );
        })}
      </ul>
    </>
  );
};
