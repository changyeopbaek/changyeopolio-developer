import styles from "./Categories.module.css";

const categories = [
  "ENVIRONMENT",
  "GAMES",
  "HEALTH",
  "SPORTS",
  "FOOD",
  "LOCAL",
  "SHOPPING",
];

export const Categories = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.scrollWrapper}>
          <div className={styles.scrollContent}>
            {[...categories, ...categories, ...categories].map(
              (category, index) => (
                <div key={index} className={styles.category}>
                  {category}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
