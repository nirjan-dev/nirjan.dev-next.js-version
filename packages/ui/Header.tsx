import { Navbar } from "./Navbar";
import { NavBrand } from "./NavBrand";
import styles from "./Header.module.scss";
import { SocialMenuItem } from "./SubMenu";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: "IoMdHome",
  },
  {
    name: "Blog",
    link: "/blog",
    icon: "IoIosBook",
  },
  {
    name: "Contact",
    link: "/contact",
    icon: "MdEmail",
  },
];

export const Header = ({
  logo,
  socialMenuItems,
}: {
  logo: string;
  socialMenuItems: SocialMenuItem[];
}) => {
  return (
    <header className={styles.header}>
      <NavBrand logo={logo} />
      <Navbar navItems={navItems} socialMenuItems={socialMenuItems} />
    </header>
  );
};
