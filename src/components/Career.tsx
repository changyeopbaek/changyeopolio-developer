import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import styles from "./Career.module.css";

const careerItems = [
  {
    period: "2025.04 ~ 2025.11",
    company: "멋쟁이사자처럼",
    role: "프론트엔드 부트캠프 14기",
    description:
      "HTML, CSS, JavaScript, React를 배웠으며, 총 3개의 프로젝트를 수행하고 부트캠프를 정상 수료",
    bullets: [
      "HTML, CSS, JavaScript, React 학습",
      "UI 프로젝트 수행",
      "바닐라 자바스크립트 프로젝트 수행",
      "리액트 파이널 프로젝트 수행",
      "동료 칭찬상 수상 및 정상 수료",
    ],
  },
  {
    period: "2023.08 ~ 2024.10",
    company: "(주)에스엠씨인터내셔널",
    role: "IT 개발팀 / PM",
    description:
      "IT 개발팀에서 서비스 기획과 회사 운영에 필요한 전반적인 업무들을 담당",
    bullets: [
      "디저트39 오더앱 고도화",
      "삼구 AI 헬퍼 기획 및 런칭",
      "디저트39 포스 프로그램 QA",
      "탄소감축 지표 계산식 제작",
      "탄소배출권 사업 계획서 제작",
      "친환경 정부 지원 방안을 위한 환경부 미팅 자료 제작 및 PT 진행",
      "리유저블컵 인프라 구축 방안 기획",
      "가맹점 내 DID 업그레이드 진행",
      "커피 & 베이커리 구독 시장 물색 및 신규 구독 서비스 기획",
      "기존 IP와 건강을 활용한 신규 아이템 기획",
      "글로벌 소프트 드링크 시장 분석 및 신규 제품 방향성 기획",
      "디저트 트렌드 분석 및 신규 디저트 발굴",
    ],
  },
  {
    period: "2020.12 ~ 2023.04",
    company: "주식회사 씨엘엑스엠",
    role: "기획 / 공동창업자",
    description:
      "서비스 기획, 인사, 마케팅 기획, 콘텐츠 기획, 고객 관리 등을 총괄",
    bullets: [
      "2021.06 E-Sports 크라우드 펀딩 플랫폼 콜로세움 서비스를 기획 및 런칭",
      "2021.12 미술품 조각거래 정보를 모아볼 수 있는 GREEMY 플랫폼을 기획, 런칭, 데이터베이스 관리",
      "2022.04 GREEMERZ NFT 프로젝트 마케팅 및 커뮤니티 관리",
      "2022.04 GREEMY 플랫폼 NFT 종합 정보와 자산 분석 서비스로 리뉴얼 기획 및 런칭",
      "2023.02 P4N GREEMERZ ADVENTURE 게임 기획 및 런칭",
    ],
  },
  {
    period: "2020.07 ~ 2020.11",
    company: "주식회사 패스트림",
    role: "전략기획실 / 서비스 기획",
    description:
      "제품과 서비스를 영상으로 만나볼 수 있는 패스트림 플랫폼 초기 서비스 APP 기획",
  },
];

export const Career = () => {
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <section
      ref={ref}
      className={`${styles.section} fade-in ${isVisible ? "visible" : ""}`}
      id="career"
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.titleLine1}>Journey, </span>
          <span className={`${styles.titleLine2} title-serif`}>
            which I went through
          </span>
        </h2>
        <div className={styles.card}>
          <div className={styles.timeline}>
            {careerItems.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <span className={styles.timelineDot} />
                </div>
                <div className={styles.timelineContent}>
                  <span className={styles.period}>{item.period}</span>
                  <h3 className={styles.company}>{item.company}</h3>
                  <p className={styles.role}>{item.role}</p>
                  <p className={styles.description}>{item.description}</p>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className={styles.bullets}>
                      {item.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
