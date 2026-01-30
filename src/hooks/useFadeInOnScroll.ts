import { useEffect, useRef, useState } from "react";

const DEFAULT_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

/**
 * 뷰포트에 들어오면 true로 설정 (한 번만). 스크롤 시 아래→위 페이드인용.
 */
export function useFadeInOnScroll(
  options: Partial<IntersectionObserverInit> = {},
) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { ...DEFAULT_OPTIONS, ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  return { ref, isVisible };
}
