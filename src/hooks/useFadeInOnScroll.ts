import { useEffect, useRef, useState } from "react";

const DEFAULT_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

export type UseFadeInOnScrollOptions = Partial<IntersectionObserverInit> & {
  /** 이 값이 바뀌면 isVisible을 false로 리셋 (예: 라우트 param). 같은 컴포넌트 인스턴스 재사용 시 페이드인 재생용 */
  resetDependency?: unknown;
};

/**
 * 뷰포트에 들어오면 true로 설정 (한 번만). 스크롤 시 아래→위 페이드인용.
 * resetDependency를 넘기면 해당 값이 바뀔 때마다 isVisible이 false로 리셋되어 애니메이션이 다시 재생된다.
 */
export function useFadeInOnScroll(
  options: UseFadeInOnScrollOptions = {},
) {
  const { resetDependency, ...observerOptions } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (resetDependency !== undefined) setIsVisible(false);
  }, [resetDependency]);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { ...DEFAULT_OPTIONS, ...observerOptions },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  return { ref, isVisible };
}
