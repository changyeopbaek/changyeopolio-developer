import { useEffect, useRef } from "react";
import selfImage from "/self.jpg";
import styles from "./Hero.module.css";

const LERP_FACTOR_1 = 0.08; // 1번이 마우스를 따라가는 속도
const LERP_FACTOR_2 = 0.045; // 2번이 1번을 따라가는 속도 (너무 작으면 거의 안 움직임)
const LERP_FACTOR_3 = 0.055; // 3번이 2번을 따라가는 속도
const LERP_TILT = 0.06; // 기울기 보간 속도
const MOVE_SCALE = 100; // 마우스 이동량 스케일
const MAX_TILT_DEG = 14; // 좌/우 끝에서 ±7deg (target.x≈±50 기준)

function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const targetRef = useRef({ x: 0, y: 0 });
  const pos1Ref = useRef({ x: 0, y: 0 });
  const pos2Ref = useRef({ x: 0, y: 0 });
  const pos3Ref = useRef({ x: 0, y: 0 });
  const tiltRef = useRef(0); // 현재 기울기(deg), 좌=음수 반시계 / 우=양수 시계
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      targetRef.current = { x: x * MOVE_SCALE, y: y * MOVE_SCALE };
    };

    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

    const tick = () => {
      const target = targetRef.current;
      const p1 = pos1Ref.current;
      const p2 = pos2Ref.current;
      const p3 = pos3Ref.current;

      p1.x = lerp(p1.x, target.x, LERP_FACTOR_1);
      p1.y = lerp(p1.y, target.y, LERP_FACTOR_1);
      p2.x = lerp(p2.x, p1.x, LERP_FACTOR_2);
      p2.y = lerp(p2.y, p1.y, LERP_FACTOR_2);
      p3.x = lerp(p3.x, p2.x, LERP_FACTOR_3);
      p3.y = lerp(p3.y, p2.y, LERP_FACTOR_3);

      // 좌측=반시계(음수) / 우측=시계(양수) 기울기, 정규화된 x = target.x / MOVE_SCALE
      const tiltTarget = (target.x / MOVE_SCALE) * MAX_TILT_DEG;
      tiltRef.current = lerp(tiltRef.current, tiltTarget, LERP_TILT);
      const tilt = tiltRef.current;

      // 서브픽셀 translate/rotate는 레이어 블러 원인 → 픽셀/각도 반올림
      const tx1 = Math.round(p1.x);
      const ty1 = Math.round(p1.y);
      const tx2 = Math.round(p2.x);
      const ty2 = Math.round(p2.y);
      const tx3 = Math.round(p3.x);
      const ty3 = Math.round(p3.y);
      const tiltDeg = Math.round(tilt * 10) / 10;

      if (card1Ref.current)
        card1Ref.current.style.transform = `translate(${tx1}px, ${ty1}px) rotateZ(${tiltDeg}deg)`;
      if (card2Ref.current)
        card2Ref.current.style.transform = `translate(${tx2}px, ${ty2}px) scale(0.95) rotateZ(${tiltDeg}deg)`;
      if (card3Ref.current)
        card3Ref.current.style.transform = `translate(${tx3}px, ${ty3}px) scale(0.9) rotateZ(${tiltDeg}deg)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.rollingLayer} aria-hidden="true">
        <div className={styles.rollingTrack}>
          <div className={styles.rollingContent}>
            <span className={styles.rollingText}>CHANGYEOPOLIO</span>
            <span className={styles.rollingText}>CHANGYEOPOLIO</span>
          </div>
        </div>
      </div>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.cardsWrapper}>
          <div className={`${styles.card} ${styles.card1}`} ref={card1Ref}>
            <div className={styles.imageWrapper}>
              <img
                src={selfImage}
                srcSet="/self.jpg 1x, /self2x.jpg 2x"
                alt="Changyeop Baek"
                className={styles.image}
              />
            </div>
          </div>
          <div className={`${styles.card} ${styles.card2}`} ref={card2Ref}>
            <div className={styles.imageWrapper}>
              <img
                src={selfImage}
                srcSet="/self.jpg 1x, /self2x.jpg 2x"
                alt="Changyeop Baek"
                className={styles.image}
              />
            </div>
          </div>
          <div className={`${styles.card} ${styles.card3}`} ref={card3Ref}>
            <div className={styles.imageWrapper}>
              <img
                src={selfImage}
                srcSet="/self.jpg 1x, /self2x.jpg 2x"
                alt="Changyeop Baek"
                className={styles.image}
              />
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <p className={styles.descriptionText}>PURSUE DETAILED, FLEXIBLE</p>
          <p className={styles.descriptionText}>FRONTEND DEVELOPER</p>
        </div>
      </div>
    </section>
  );
};
