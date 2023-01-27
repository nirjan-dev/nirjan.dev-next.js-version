import { SocialMenuItem, SubMenu } from "./SubMenu";
import { IoMdHome, IoIosBook, IoIosBuild } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

import styles from "./Navbar.module.scss";
interface InavItem {
  name: string;
  link: string;
  icon: string;
}

function getSelectedIcon(icon: string) {
  let selectedIcon;
  switch (icon) {
    case "IoMdHome":
      selectedIcon = <IoMdHome />;
      break;
    case "IoIosBook":
      selectedIcon = <IoIosBook />;
      break;
    case "MdEmail":
      selectedIcon = <MdEmail />;
      break;
    case "IoIosBuild":
      selectedIcon = <IoIosBuild />;
    default:
      break;
  }
  return selectedIcon;
}

const NavItem = ({ name, link, icon }: InavItem) => {
  return (
    <li className={styles.mainNav__item}>
      <Link href={link} passHref>
        <a className={styles.mainNav__link} title={name}>
          <span className={styles.mainNav__icon} aria-hidden="true">
            {getSelectedIcon(icon)}
          </span>
          {name}
        </a>
      </Link>
    </li>
  );
};

export const Navbar = ({
  navItems,
  socialMenuItems,
}: {
  navItems: InavItem[];
  socialMenuItems: SocialMenuItem[];
}) => {
  return (
    <nav className={styles.mainNav}>
      <ul className={styles.mainNav__list}>
        {navItems.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
        <li className={styles.mainNav__subMenu}>
          <SubMenu socialMenuItems={socialMenuItems} />
        </li>
      </ul>
    </nav>
  );
};
