import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerDiv}>
        <h2 className={styles.title}>Imprint</h2>
        <h2 className={styles.title}>Legal Notice</h2>
        <h2 className={styles.title}>Terms & Conditions</h2>
      </div>
    </footer>
  );
};

export default Footer;
