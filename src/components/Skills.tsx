import { useEffect, useState } from "react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import { getSkillIconInfo, getSkillIconUrl } from "./skillIconSlugs";
import styles from "./Skills.module.css";

const skillCards = [
  {
    title: "Languages",
    tags: ["JavaScript(ES6+)", "TypeScript", "HTML5", "CSS3"],
    content:
      "숙련된 JavaScript(ES6+), TypeScript, HTML5, CSS3 개발자로 React/Next.js 프로젝트에서 상태 관리, API 연동, 타입 안전한 코드베이스를 효율적으로 구현합니다.",
  },
  {
    title: "Framework & Library",
    tags: ["React", "Next.js", "React Query", "Zustand"],
    content:
      "React/Next.js 기반 SPA·SSR 개발과 React Query, Zustand를 활용한 서버/클라이언트 상태 관리 경험이 있습니다.",
  },
  {
    title: "Styling & UI",
    tags: ["CSS3", "CSS Modules", "Sass", "Tailwind CSS"],
    content:
      "반응형·접근성을 고려한 UI 구현과 CSS Modules, Sass, Tailwind를 활용한 디자인 시스템 적용을 할 수 있습니다.",
  },
  {
    title: "Tools & Collaboration",
    tags: [
      "Git",
      "GitHub",
      "Figma",
      "Notion",
      "Slack",
      "Jira",
      "Vercel",
      "Netlify",
      "Vite",
      "Bun",
    ],
    content:
      "Git/GitHub 브랜치 전략과 코드 리뷰, Figma 디자인 시안 기반 구현, Notion·Slack·Jira을 활용한 협업에 익숙합니다.",
  },
  {
    title: "Learning",
    tags: ["문서 읽기", "디버깅", "테스트"],
    content:
      "공식 문서와 타입 정의를 활용한 빠른 습득, Chrome DevTools 기반 디버깅, 사용자 관점의 테스트(QA)를 실무에서 수 없이 경험하였으며 중요하게 생각합니다.",
  },
];

/** SVG 텍스트에서 fill을 브랜드 색으로 바꾼 뒤 data URL 생성 */
async function fetchColoredIconSvg(
  url: string,
  hex: string,
): Promise<string | null> {
  try {
    const res = await fetch(url);
    const text = await res.text();
    // 1) 기존 fill/stroke를 브랜드 색으로 교체
    let colored = text.replace(
      /(fill|stroke)="[^"]*"/g,
      (_match, attr) => `${attr}="${hex}"`,
    );
    // 2) simple-icons는 path에 fill이 없을 수 있음 → 없으면 추가
    colored = colored.replace(/<path\s+([^>]*)>/g, (match, attrs) =>
      attrs.includes("fill=") ? match : `<path fill="${hex}" ${attrs}>`,
    );
    return `data:image/svg+xml,${encodeURIComponent(colored)}`;
  } catch {
    return null;
  }
}

export const Skills = () => {
  const { ref, isVisible } = useFadeInOnScroll();
  const [failedIcons, setFailedIcons] = useState<Set<string>>(new Set());
  const [coloredUrls, setColoredUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const tags = skillCards.flatMap((c) => c.tags);
    tags.forEach((tag) => {
      const info = getSkillIconInfo(tag);
      if (!info) return;
      fetchColoredIconSvg(info.url, info.hex).then((dataUrl) => {
        if (dataUrl) {
          setColoredUrls((prev) => ({ ...prev, [tag]: dataUrl }));
        }
      });
    });
  }, []);

  const handleIconError = (tag: string) => {
    setFailedIcons((prev) => new Set(prev).add(tag));
  };

  return (
    <section
      ref={ref}
      className={`${styles.section} fade-in ${isVisible ? "visible" : ""}`}
      id="skills"
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.titleLine1}>SKILLS, </span>
          <span className={`${styles.titleLine2} title-serif`}>
            WHICH I CAN USE
          </span>
        </h2>
        <div className={styles.cardsWrapper}>
          {skillCards.map((card, index) => (
            <div
              key={index}
              className={styles.card}
              style={{ zIndex: index + 1 }}
              data-index={index}
            >
              <span className={styles.cardNumber} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.cardInner}>
                <div className={styles.cardIcon} aria-hidden>
                  {"</>"}
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <div className={styles.tagList}>
                  {card.tags.map((tag) => {
                    const iconUrl = getSkillIconUrl(tag);
                    const coloredUrl = coloredUrls[tag];
                    const useColored = coloredUrl != null;
                    const useCdn =
                      !useColored && iconUrl && !failedIcons.has(tag);
                    return (
                      <span key={tag} className={styles.tag}>
                        {useColored ? (
                          <img
                            src={coloredUrl}
                            alt=""
                            className={styles.tagIconImg}
                            aria-hidden
                          />
                        ) : useCdn ? (
                          <img
                            src={iconUrl!}
                            alt=""
                            className={styles.tagIconImg}
                            aria-hidden
                            onError={() => handleIconError(tag)}
                          />
                        ) : (
                          <span className={styles.tagIcon} aria-hidden>
                            {"</>"}
                          </span>
                        )}
                        <span className={styles.tagName}>{tag}</span>
                      </span>
                    );
                  })}
                </div>
                <p className={styles.cardContent}>{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
