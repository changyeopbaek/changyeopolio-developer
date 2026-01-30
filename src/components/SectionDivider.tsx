import styles from "./SectionDivider.module.css";

interface SectionDividerProps {
  /** 모바일에서만 가로줄 숨김 (예: Hero 하단) */
  hideOnMobile?: boolean;
}

export const SectionDivider = ({ hideOnMobile }: SectionDividerProps) => {
  return (
    <div
      className={`${styles.sectionDivider} ${hideOnMobile ? styles.hideOnMobile : ""}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className={styles.lineHorizontal} />
      <div className={`${styles.corner} ${styles.cornerLeft}`} />
      <div className={`${styles.corner} ${styles.cornerRight}`} />
    </div>
  );
};
