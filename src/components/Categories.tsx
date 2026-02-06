import Marquee from "react-fast-marquee";
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
          <Marquee
            speed={100}
            direction="right"
            gradient={false}
            pauseOnHover={false}
            className={styles.marquee}
          >
            {categories.map((category, index) => (
              <div key={index} className={styles.category}>
                {category}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
