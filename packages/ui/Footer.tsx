import { Container } from "./Container";
import { SocialMenuItem } from "./SubMenu";
import {
  IoLogoCodepen,
  IoLogoTwitter,
  IoLogoGithub,
  IoLogoInstagram,
} from "react-icons/io";
import styles from "./Footer.module.scss";

function getSelectedIcon(icon: string) {
  let selectedIcon;
  switch (icon) {
    case "IoLogoCodepen":
      selectedIcon = <IoLogoCodepen />;
      break;
    case "IoLogoTwitter":
      selectedIcon = <IoLogoTwitter />;
      break;
    case "IoLogoGithub":
      selectedIcon = <IoLogoGithub />;
      break;
    case "IoLogoInstagram":
      selectedIcon = <IoLogoInstagram />;
      break;
    default:
      break;
  }
  return selectedIcon;
}

const FooterItem = ({ title, link, icon }: SocialMenuItem) => {
  return (
    <li>
      <a title={title} href={link} rel="noopener noreferrer" target="_blank">
        <span className={styles.icon} aria-hidden="true">
          {getSelectedIcon(icon)}
        </span>
      </a>
    </li>
  );
};

export const Footer = ({
  socialMenuItems,
}: {
  socialMenuItems: SocialMenuItem[];
}) => {
  return (
    <footer className={styles.footer}>
      <Container>
        <ul>
          {socialMenuItems.map((item) => {
            return <FooterItem key={item.title} {...item} />;
          })}
        </ul>
      </Container>
    </footer>
  );
};
