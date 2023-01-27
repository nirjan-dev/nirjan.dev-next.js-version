import { Navbar } from "./Navbar";
import { NavBrand } from "./NavBrand";
import styles from "./Header.module.scss";
import { SocialMenuItem } from "./SubMenu";
import Headroom from "react-headroom";
import "./Headroom.scss";

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
    name: "Tools",
    link: "/tools",
    icon: "IoIosBuild",
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
    <>
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <NavBrand logo={logo} />
      </div>

      <Headroom disableInlineStyles={true}>
        <header className={styles.header}>
          <NavBrand logo={logo} />
          <Navbar navItems={navItems} socialMenuItems={socialMenuItems} />
        </header>
      </Headroom>
    </>
  );
};
