import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import styles from "./Comments.module.css";

const commentsList = [
  {
    name: "멋쟁이사자처럼 부트캠프 14기",
    role: "프론트엔드 개발자 A",
    comment:
      "소통에 적극적으로 임하고 지속적인 팀원 독려 덕에 좋은 팀 분위기를 유지할 수 있었습니다. 맡은 바를 마무리하고자 하는 책임감이 강하고 성실한 모습을 보여주셨습니다.",
  },
  {
    name: "멋쟁이사자처럼 부트캠프 14기",
    role: "프론트엔드 개발자 B",
    comment: (
      <>
        프로젝트 기획 능력을 보고 배웠던 것 같습니다. 원래도 조금씩 구상했던
        내용인지라 잘 작성해 주신 것도 있지만, 관련 일을 하셨다보니 앞으로 개인
        프로젝트나 기획 단계가 필요할 경우 창엽님은 어떻게 하셨는가?를 떠올리며
        자업할 수 있을 것 같아요. 또한 적극적으로 소통해주셔서 협업에 <br />{" "}
        차질없이 잘 진행이 되도록 조율해 주셨습니다{" "}
      </>
    ),
  },
  {
    name: "멋쟁이사자처럼 부트캠프 14기",
    role: "프론트엔드 개발자 C",
    comment:
      "기본적으로 이야기를 많이 들어주시고 함께 방향성을 잡아주시는 동료의 느낌이 많이 들었습니다. 좋은 아이디어가 있다면 주저하지 말고 바로 이야기 해주셨으면 좋겠습니다.",
  },
  {
    name: "멋쟁이사자처럼 부트캠프 14기",
    role: "프론트엔드 개발자 D",
    comment:
      "프로젝트 진행 중 다양한 아이디어와 의견을 적극적으로 제시해 주셔서 프로젝트의 기획이 더 세밀해질 수 있었던 것 같습니다. 자신의 의견을 적극적으로 제시할 뿐만 아니라, 다른 팀원의 의견도 잘 경청하고, 이를 바탕으로 자신의 생각을 잘 정리해 전달해주는 점이 강점이라고 생각합니다.",
  },
  {
    name: "멋쟁이사자처럼 부트캠프 14기",
    role: "프론트엔드 개발자 E",
    comment:
      "자신의 일 뿐만 아니라 다른 외적인 부분도 최선을 다해서 확인하고 도움을 주셨기에 여러모로 팀 프로젝트가 진행하는 데에 있어서 편한 상황이 많이 나올 수 있었습니다.",
  },
];

const CARD_WIDTH = 328;
const CARD_GAP = 24;
const AUTO_SLIDE_MS = 4000;
const MASK_BORDER_COLOR = "#032d81";

/* 끊김 없는 무한 루프: 3복사본, 중앙 세트에서 시작 후 리셋 */
const N = commentsList.length;
const comments = [...commentsList, ...commentsList, ...commentsList];
const totalCount = comments.length;
const TRANSITION_MS = 500;
const INITIAL_INDEX = N; // 두 번째 세트 첫 카드에서 시작(seamless 리셋용)

function QuoteIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 300 600"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 0V300H200C200 410.25 110.35 500 0 500V600C165.425 600 300 465.425 300 300V0H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

const HOVER_ZONE_WIDTH = 180;
const FOLLOW_MAX_OFFSET = 24;

export const Comments = () => {
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [skipTransition, setSkipTransition] = useState(false);
  const [leftOffset, setLeftOffset] = useState({ x: 0, y: 0 });
  const [rightOffset, setRightOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(totalCount - 1, index));
    setCurrentIndex(clamped);
  };

  const goPrev = () => goTo(currentIndex - 1);
  const goNext = () => goTo(currentIndex + 1);
  const displayIndex = currentIndex % N;
  const goToSlide = (i: number) => setCurrentIndex(N + i);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, []);

  /* 슬라이드 끝에서 중앙 세트로 리셋 → 끊김 없는 무한 루프 */
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

    const handleMouseLeave = () => {
      setLeftOffset({ x: 0, y: 0 });
      setRightOffset({ x: 0, y: 0 });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const translateX = -currentIndex * (CARD_WIDTH + CARD_GAP);
  const trackWidth = totalCount * CARD_WIDTH + (totalCount - 1) * CARD_GAP;
  const CARD_HALF = CARD_WIDTH / 2;
  const BUTTON_OFFSET = CARD_HALF + 40;

  const cardContent = (item: (typeof commentsList)[0]) => (
    <>
      <div className={styles.cardHeader}>
        <QuoteIcon
          className={styles.quoteIcon}
          style={{ color: MASK_BORDER_COLOR }}
        />
        <QuoteIcon
          className={styles.quoteIcon}
          style={{ color: MASK_BORDER_COLOR }}
        />
      </div>
      <p className={styles.comment}>{item.comment}</p>
      <div className={styles.author}>
        <span>
          멋쟁이사자처럼 부트캠프 14기
          <br />
          프론트엔드 개발자
        </span>
      </div>
    </>
  );

  return (
    <section className={styles.section} id="comments" ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.titleLine1}>Teammates,</span>
          <span className={`${styles.titleLine2} title-serif`}>
            who I worked with.
          </span>
        </h2>

        <div className={styles.viewportWrapper}>
          <div className={styles.carouselViewport}>
            {/* 뒤쪽: 전체 트랙 블러 처리 (마스크 밖까지 다 보임) */}
            <div
              className={`${styles.trackBlurred} ${skipTransition ? styles.noTransition : ""}`}
              style={{
                width: trackWidth,
                gap: CARD_GAP,
                transform: `translateX(${translateX}px)`,
              }}
            >
              {comments.map((item, index) => (
                <div
                  key={`blur-${index}`}
                  className={styles.card}
                  style={{ width: CARD_WIDTH, height: 360 }}
                >
                  {cardContent(item)}
                </div>
              ))}
            </div>

            {/* 앞쪽: 328x360 마스크 안만 선명하게 보임 */}
            <div className={styles.maskWindow}>
              <div
                className={`${styles.trackSharp} ${skipTransition ? styles.noTransition : ""}`}
                style={{
                  width: trackWidth,
                  gap: CARD_GAP,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                {comments.map((item, index) => (
                  <div
                    key={`sharp-${index}`}
                    className={styles.card}
                    style={{ width: CARD_WIDTH, height: 360 }}
                  >
                    {cardContent(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.indicators}>
          {commentsList.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.indicator} ${index === displayIndex ? styles.indicatorActive : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`코멘트 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className={styles.navButton}
        onClick={goPrev}
        aria-label="이전 코멘트"
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
        aria-label="다음 코멘트"
        style={{
          transform: `translateX(calc(-50% + ${BUTTON_OFFSET}px)) translateY(-50%) translate(${rightOffset.x}px, ${rightOffset.y}px)`,
        }}
      >
        <ChevronRightIcon className={styles.navButtonIcon} aria-hidden />
      </button>
    </section>
  );
};
