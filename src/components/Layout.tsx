import type { ReactNode } from "react";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.contentColumn}>
      <div className={styles.lineContainer} aria-hidden="true">
        <div className={`${styles.lineVertical} ${styles.lineVerticalLeft}`} />
        <div className={`${styles.lineVertical} ${styles.lineVerticalRight}`} />
      </div>
      <div className={styles.headerSpacer} aria-hidden="true" />
      {children}
    </div>
  );
};
