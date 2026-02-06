import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import { projectsList } from "../data/projects";
import styles from "./Work.module.css";

const HOVER_ZONE_WIDTH = 180;
const FOLLOW_MAX_OFFSET = 24;

const CARD_ASPECT = 447 / 745;
const CARD_GAP = 24;
const AUTO_SLIDE_MS = 5000;
const N = projectsList.length;
const projects = [...projectsList, ...projectsList, ...projectsList];
const totalCount = projects.length;
const TRANSITION_MS = 500;
const INITIAL_INDEX = N;

export const Work = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useFadeInOnScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cardSize, setCardSize] = useState({ width: 745, height: 447 });
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [skipTransition, setSkipTransition] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [leftOffset, setLeftOffset] = useState({ x: 0, y: 0 });
  const [rightOffset, setRightOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      const w = rect.width || 745;
      const h = rect.height || w * CARD_ASPECT;
      setCardSize({ width: w, height: h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (currentIndex >= 2 * N) {
      const t = setTimeout(() => {
        setSkipTransition(true);
        setCurrentIndex(currentIndex - N);
      }, TRANSITION_MS);
      return () => clearTimeout(t);
    }
    if (currentIndex < N) {
      const t = setTimeout(() => {
        setSkipTransition(true);
        setCurrentIndex(currentIndex + N);
      }, TRANSITION_MS);
      return () => clearTimeout(t);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!skipTransition) return;
    const id = requestAnimationFrame(() => setSkipTransition(false));
    return () => cancelAnimationFrame(id);
  }, [skipTransition]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerY = rect.height / 2;

      if (x <= HOVER_ZONE_WIDTH) {
        const dx = (x - 100) * 0.35;
        const dy = (y - centerY) * 0.15;
        setLeftOffset({
          x: Math.max(-FOLLOW_MAX_OFFSET, Math.min(FOLLOW_MAX_OFFSET, dx)),
          y: Math.max(-FOLLOW_MAX_OFFSET, Math.min(FOLLOW_MAX_OFFSET, dy)),
        });
      } else {
        setLeftOffset({ x: 0, y: 0 });
      }

      if (x >= rect.width - HOVER_ZONE_WIDTH) {
        const dx = (x - (rect.width - 100)) * 0.35;
        const dy = (y - centerY) * 0.15;
        setRightOffset({
          x: Math.max(-FOLLOW_MAX_OFFSET, Math.min(FOLLOW_MAX_OFFSET, dx)),
          y: Math.max(-FOLLOW_MAX_OFFSET, Math.min(FOLLOW_MAX_OFFSET, dy)),
        });
      } else {
        setRightOffset({ x: 0, y: 0 });
      }
    };

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => {
      setLeftOffset({ x: 0, y: 0 });
      setRightOffset({ x: 0, y: 0 });
      setIsPaused(false);
    };

    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const { width: cardWidth, height: cardHeight } = cardSize;
  const translateX = -currentIndex * (cardWidth + CARD_GAP);
  const trackWidth = totalCount * cardWidth + (totalCount - 1) * CARD_GAP;
  const BUTTON_OFFSET = Math.max(60, cardWidth / 2 - 10);

  const goPrev = () => setCurrentIndex((prev) => prev - 1);
  const goNext = () => setCurrentIndex((prev) => prev + 1);
  const displayIndex = currentIndex % N;
  const goToSlide = (i: number) => setCurrentIndex(N + i);

  const handleProjectClick = (projectId: number) => {
    navigate(`/project/${projectId}`);
  };

  const setSectionRef = (el: HTMLElement | null) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    sectionRef.current = el;
  };

  return (
    <section
      ref={setSectionRef}
      className={`${styles.section} fade-in ${isVisible ? "visible" : ""}`}
      id="work"
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.titleLine1}>THINGS, </span>
          <span className={`${styles.titleLine2} title-serif`}>
            WHICH I MADE
          </span>
        </h2>

        <div className={styles.viewportWrapper}>
          <div ref={viewportRef} className={styles.carouselViewport}>
            <div
              className={`${styles.trackBlurred} ${skipTransition ? styles.noTransition : ""}`}
              style={{
                width: trackWidth,
                gap: CARD_GAP,
                transform: `translateX(${translateX}px)`,
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={`blur-${project.id}-${index}`}
                  className={styles.projectCard}
                  style={{ width: cardWidth, height: cardHeight }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className={styles.cardImageWrap}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className={styles.projectImage}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <span>{project.title}</span>
                      </div>
                    )}
                  </div>
                  {project.tags?.length ? (
                    <div className={styles.projectTags}>
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.projectTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className={styles.projectInfoOverlay}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>
                      {project.shortDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.maskWindow}>
              <div
                className={`${styles.trackSharp} ${skipTransition ? styles.noTransition : ""}`}
                style={{
                  width: trackWidth,
                  gap: CARD_GAP,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                {projects.map((project, index) => (
                  <div
                    key={`sharp-${project.id}-${index}`}
                    className={styles.projectCard}
                    style={{ width: cardWidth, height: cardHeight }}
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <div className={styles.cardImageWrap}>
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className={styles.projectImage}
                        />
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <span>{project.title}</span>
                        </div>
                      )}
                    </div>
                    {project.tags?.length ? (
                      <div className={styles.projectTags}>
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.projectTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className={styles.projectInfoOverlay}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectDescription}>
                        {project.shortDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.indicators}>
          {projectsList.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.indicator} ${index === displayIndex ? styles.indicatorActive : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`프로젝트 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className={styles.navButton}
        onClick={goPrev}
        aria-label="이전 프로젝트"
        style={{
          transform: `translateX(calc(-50% - ${BUTTON_OFFSET}px)) translateY(-50%) translate(${leftOffset.x}px, ${leftOffset.y}px)`,
        }}
      >
        <ChevronLeftIcon className={styles.navButtonIcon} aria-hidden />
      </button>
      <button
        type="button"
        className={`${styles.navButton} ${styles.navButtonRight}`}
        onClick={goNext}
        aria-label="다음 프로젝트"
        style={{
          transform: `translateX(calc(-50% + ${BUTTON_OFFSET}px)) translateY(-50%) translate(${rightOffset.x}px, ${rightOffset.y}px)`,
        }}
      >
        <ChevronRightIcon className={styles.navButtonIcon} aria-hidden />
      </button>
    </section>
  );
};
