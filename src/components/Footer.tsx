import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.footerWrap}>
      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()}. BAEK CHANGYEOP. ALL rights reserved.
        </p>
      </footer>
    </div>
  );
};
