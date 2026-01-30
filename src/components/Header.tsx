import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { SectionId } from "../hooks/useActiveSection";
import { Bars3Icon } from "./Icons";
import styles from "./Header.module.css";

const HOVER_STAGGER_MS = 35;

/** 텍스트를 글자 단위로 나누고, 호버 시 위로 사라짐 + 아래에서 같은 글자가 순서대로 올라옴 */
function LetterHoverText({ text }: { text: string }) {
  const delay = (i: number) => `${i * HOVER_STAGGER_MS}ms`;
  return (
    <span className={styles.letterWrapper}>
      {text.split("").map((char, i) => (
        <span key={i} className={styles.letterCell}>
          <span
            className={styles.letterOut}
            style={{ transitionDelay: delay(i) }}
            aria-hidden
          >
            {char}
          </span>
          <span
            className={styles.letterIn}
            style={{ transitionDelay: delay(i) }}
            aria-hidden
          >
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}

interface HeaderProps {
  activeSection?: SectionId | null;
}

const SECTION_IDS = ["skills", "work", "career", "comments"] as const;

export const Header = ({ activeSection = null }: HeaderProps) => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/project");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    if (isDetailPage) return;
    scrollTo(id);
  };

  return (
    <header className={styles.header}>
      <div
        className={`${styles.container} ${menuOpen ? styles.containerMenuOpen : ""}`}
      >
        <Link
          to="/#hero"
          className={styles.logo}
          aria-label="Hero 섹션으로"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              scrollTo("hero");
            }
            setMenuOpen(false);
          }}
        >
          <img src="/self.jpg" alt="Profile" className={styles.profileImage} />
        </Link>

        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            {SECTION_IDS.map((id) => {
              const label =
                id === "skills"
                  ? "SKILLS"
                  : id === "work"
                    ? "WORK"
                    : id === "career"
                      ? "CAREER"
                      : "COMMENTS";
              if (isDetailPage) {
                return (
                  <Link
                    key={id}
                    to={`/#${id}`}
                    className={styles.navLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    <LetterHoverText text={label} />
                  </Link>
                );
              }
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleNavClick(id)}
                  className={`${styles.navLink} ${activeSection === id ? styles.navLinkActive : ""}`}
                >
                  <LetterHoverText text={label} />
                </button>
              );
            })}
          </div>

          <div className={styles.navActions}>
            {isDetailPage ? (
              <Link to="/#contact" className={styles.contactLink}>
                <LetterHoverText text="CONTACT" />
              </Link>
            ) : (
              <button
                type="button"
                className={styles.contactLink}
                onClick={() => scrollTo("contact")}
                aria-label="Contact 섹션으로"
              >
                <LetterHoverText text="CONTACT" />
              </button>
            )}

            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
            >
              <Bars3Icon className={styles.hamburgerIcon} aria-hidden />
            </button>
          </div>
        </nav>
      </div>

      {/* 모바일 메뉴 패널 */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenuInner}>
          {SECTION_IDS.map((id) => {
            const label =
              id === "skills"
                ? "SKILLS"
                : id === "work"
                  ? "WORK"
                  : id === "career"
                    ? "CAREER"
                    : "COMMENTS";
            if (isDetailPage) {
              return (
                <Link
                  key={id}
                  to={`/#${id}`}
                  className={styles.mobileMenuLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              );
            }
            return (
              <button
                key={id}
                type="button"
                className={`${styles.mobileMenuLink} ${activeSection === id ? styles.mobileMenuLinkActive : ""}`}
                onClick={() => handleNavClick(id)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
