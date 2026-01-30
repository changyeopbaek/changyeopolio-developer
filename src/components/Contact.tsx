import { useState } from "react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import styles from "./Contact.module.css";

const BUTTON_FOLLOW_FACTOR = 0.22;
const BUTTON_FOLLOW_MAX = 10;
const TEXT_FOLLOW_FACTOR = 0.45;
const TEXT_FOLLOW_MAX = 28;

function useButtonFollow() {
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const [textOffset, setTextOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rawDx = e.clientX - centerX;
    const rawDy = e.clientY - centerY;

    const bx = Math.max(
      -BUTTON_FOLLOW_MAX,
      Math.min(BUTTON_FOLLOW_MAX, rawDx * BUTTON_FOLLOW_FACTOR),
    );
    const by = Math.max(
      -BUTTON_FOLLOW_MAX,
      Math.min(BUTTON_FOLLOW_MAX, rawDy * BUTTON_FOLLOW_FACTOR),
    );
    const tx = Math.max(
      -TEXT_FOLLOW_MAX,
      Math.min(TEXT_FOLLOW_MAX, rawDx * TEXT_FOLLOW_FACTOR),
    );
    const ty = Math.max(
      -TEXT_FOLLOW_MAX,
      Math.min(TEXT_FOLLOW_MAX, rawDy * TEXT_FOLLOW_FACTOR),
    );

    setButtonOffset({ x: bx, y: by });
    setTextOffset({ x: tx, y: ty });
  };

  const handleMouseLeave = () => {
    setButtonOffset({ x: 0, y: 0 });
    setTextOffset({ x: 0, y: 0 });
  };

  return {
    buttonOffset,
    textOffset,
    handleMouseMove,
    handleMouseLeave,
  };
}

export const Contact = () => {
  const { ref, isVisible } = useFadeInOnScroll();
  const contactFollow = useButtonFollow();
  const githubFollow = useButtonFollow();

  const handleMailClick = () => {
    const email = "martinbaek94@gmail.com";
    const subject = encodeURIComponent("문의");
    const body = encodeURIComponent(
      "안녕하세요,\n\n포트폴리오 웹사이트를 보고 연락드립니다.\n\n",
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  const handleGithubClick = () => {
    window.open("https://github.com/changyeopbaek", "_blank");
  };

  return (
    <section
      ref={ref}
      className={`${styles.section} fade-in ${isVisible ? "visible" : ""}`}
      id="contact"
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.titleLine1}>ALWAYS,</span>
          <span className={`${styles.titleLine2} title-serif`}>
            BE IN AGONY
          </span>
        </h2>
        <p className={styles.description}>
          {/* 데스크톱·태블릿: 2줄 (고민하며 | 저만의 기준을...) */}
          <span className={styles.descDesktop}>
            <span className={styles.descLine}>
              좋은 개발자가 되기 위해 무엇이 필요한지 항상 고민하며
            </span>
            <span className={styles.descLine}>
              저만의 기준을 정립해 나가는 엔지니어가 되고싶습니다
            </span>
          </span>
          {/* 모바일: 4줄 */}
          <span className={styles.descMobile}>
            <span className={styles.descLine}>
              좋은 개발자가 되기 위해 무엇이 필요한지
            </span>
            <span className={styles.descLine}>
              항상 고민하며 저만의 기준을 정립해
            </span>
            <span className={styles.descLine}>
              나가는 엔지니어가 되고싶습니다
            </span>
          </span>
        </p>
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={handleMailClick}
            className={`${styles.button} ${styles.primary}`}
            onMouseMove={contactFollow.handleMouseMove}
            onMouseLeave={contactFollow.handleMouseLeave}
            style={{
              transform: `translate(${contactFollow.buttonOffset.x}px, ${contactFollow.buttonOffset.y}px)`,
            }}
          >
            <span
              className={styles.buttonText}
              style={{
                transform: `translate(${contactFollow.textOffset.x}px, ${contactFollow.textOffset.y}px)`,
              }}
            >
              Contact
            </span>
          </button>
          <button
            type="button"
            onClick={handleGithubClick}
            className={`${styles.button} ${styles.secondary}`}
            onMouseMove={githubFollow.handleMouseMove}
            onMouseLeave={githubFollow.handleMouseLeave}
            style={{
              transform: `translate(${githubFollow.buttonOffset.x}px, ${githubFollow.buttonOffset.y}px)`,
            }}
          >
            <span
              className={styles.buttonText}
              style={{
                transform: `translate(${githubFollow.textOffset.x}px, ${githubFollow.textOffset.y}px)`,
              }}
            >
              Github
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
