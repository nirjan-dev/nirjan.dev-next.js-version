import styles from "./NavBrand.module.scss";
export const NavBrand = ({ logo }: { logo: string }) => {
  return (
    <a href="/" className={styles.navBrand}>
      <img width="205" height="70" src={logo} alt="Homepage link" />
    </a>
  );
};
