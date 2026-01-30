import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectById, getPrevNextProjectIds } from "../data/projects";
import { Layout } from "../components/Layout";
import { Header } from "../components/Header";
import { SectionDivider } from "../components/SectionDivider";
import styles from "./ProjectDetail.module.css";

const HOVER_STAGGER_MS = 35;

/** 헤더 Developer 버튼과 동일: 호버 시 글자가 위로 사라지고 아래에서 같은 글자가 순서대로 올라옴 */
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

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const projectId = id ? parseInt(id, 10) : NaN;
  const project = getProjectById(projectId);
  const { prevId, nextId } = getPrevNextProjectIds(projectId);
  const prevProject = prevId != null ? getProjectById(prevId) : null;
  const nextProject = nextId != null ? getProjectById(nextId) : null;

  if (!project) {
    return (
      <Layout>
        <Header activeSection={null} />
        <SectionDivider />
        <div className={styles.page}>
          <section className={styles.sectionHero}>
            <p>프로젝트를 찾을 수 없습니다.</p>
            <Link to="/">메인으로 돌아가기</Link>
          </section>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header activeSection={null} />
      <SectionDivider />
      <div className={styles.page}>
        {/* 섹션 1: 타이틀 + 간단 설명 + 목업 이미지 + 태그 */}
        <section className={styles.sectionHero}>
          <h1 className={styles.projectTitle}>{project.title}</h1>
          <p className={styles.shortDescription}>{project.shortDescription}</p>
          <div
            className={styles.mockupWrap}
            style={
              {
                "--mockup-image-position-y": project.imagePositionY ?? "30%",
              } as React.CSSProperties
            }
          >
            <img src={project.image} alt="" className={styles.mockupImage} />
          </div>
          <div className={styles.tagList}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* 섹션 2: 서비스명, 풀 설명, 기술 스택, 역할, 회고, 참고 링크 */}
        <section className={styles.sectionContent}>
          {project.serviceName && (
            <div className={styles.contentBlock}>
              <h2 className={styles.serviceName}>{project.serviceName}</h2>
            </div>
          )}
          {project.fullDescription && (
            <div className={styles.contentBlock}>
              <span className={styles.blockLabel}>Full Description</span>
              <p className={styles.blockValue}>{project.fullDescription}</p>
            </div>
          )}
          {project.techStack && project.techStack.length > 0 && (
            <div className={styles.contentBlock}>
              <span className={styles.blockLabel}>TECH STACK</span>
              <ul className={styles.techStackList}>
                {project.techStack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          )}
          {project.role && (
            <div className={styles.contentBlock}>
              <span className={styles.blockLabel}>ROLE</span>
              <p className={styles.blockValue}>{project.role}</p>
            </div>
          )}
          {project.retrospective && (
            <div className={styles.contentBlock}>
              <span className={styles.blockLabel}>retrospective</span>
              <p className={styles.blockValue}>{project.retrospective}</p>
            </div>
          )}
          {project.referenceLinks && project.referenceLinks.length > 0 && (
            <div className={styles.contentBlock}>
              <span className={styles.blockLabel}>참고 링크</span>
              <div className={styles.refLinks}>
                {project.referenceLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.refLink}
                  >
                    <LetterHoverText text={link.label} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>

        <SectionDivider />

        {/* 섹션 3: 다른 프로젝트 더 보기 (452x446 이전/다음 목업 카드 2개) */}
        <section className={styles.sectionMore}>
          <h2 className={styles.sectionMoreTitle}>EXPLORE MORE PROJECTS</h2>
          <div className={styles.moreCards}>
            <div className={styles.moreCardSlot}>
              {prevProject ? (
                <Link
                  to={`/project/${prevProject.id}`}
                  className={styles.moreCard}
                >
                  <div className={styles.moreCardImageWrap}>
                    <img
                      src={prevProject.image}
                      alt=""
                      className={styles.moreCardImage}
                    />
                  </div>
                  {prevProject.tags?.length ? (
                    <div className={styles.moreCardTags}>
                      {prevProject.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.moreCardTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className={styles.moreCardOverlay}>
                    <h3 className={styles.moreCardTitle}>
                      {prevProject.title}
                    </h3>
                    <p className={styles.moreCardDesc}>
                      {prevProject.shortDescription}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link to="/#work" className={styles.moreCard}>
                  <div className={styles.moreCardPlaceholder}>—</div>
                  <div className={styles.moreCardOverlay}>
                    <h3 className={styles.moreCardTitle}>목록으로</h3>
                    <p className={styles.moreCardDesc}>Work 섹션 보기</p>
                  </div>
                </Link>
              )}
            </div>
            <div className={styles.moreCardSlot}>
              {nextProject ? (
                <Link
                  to={`/project/${nextProject.id}`}
                  className={styles.moreCard}
                >
                  <div className={styles.moreCardImageWrap}>
                    <img
                      src={nextProject.image}
                      alt=""
                      className={styles.moreCardImage}
                    />
                  </div>
                  {nextProject.tags?.length ? (
                    <div className={styles.moreCardTags}>
                      {nextProject.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.moreCardTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className={styles.moreCardOverlay}>
                    <h3 className={styles.moreCardTitle}>
                      {nextProject.title}
                    </h3>
                    <p className={styles.moreCardDesc}>
                      {nextProject.shortDescription}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link to="/#work" className={styles.moreCard}>
                  <div className={styles.moreCardPlaceholder}>—</div>
                  <div className={styles.moreCardOverlay}>
                    <h3 className={styles.moreCardTitle}>목록으로</h3>
                    <p className={styles.moreCardDesc}>Work 섹션 보기</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* 섹션 4: 푸터 */}
        <section className={styles.sectionFooter}>
          <p className={styles.footerText}>
            © 2025. BAEK CHANGYEOP. ALL rights reserved.
          </p>
        </section>
      </div>
    </Layout>
  );
};
