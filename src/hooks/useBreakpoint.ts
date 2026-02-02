import { useState, useEffect } from "react";

/** 프로젝트 전역 미디어 구간과 맞춤: 모바일 ≤768, 태블릿 769~1024, 데스크탑 ≥1025 */
export type Breakpoint = "mobile" | "tablet" | "desktop";

const MOBILE_MAX = 768;
const TABLET_MAX = 1024;

function getBreakpoint(): Breakpoint {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w <= MOBILE_MAX) return "mobile";
  if (w <= TABLET_MAX) return "tablet";
  return "desktop";
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getBreakpoint);

  useEffect(() => {
    const update = () => setBreakpoint(getBreakpoint());
    update(); // SSR hydration 후 클라이언트 값 동기화
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return breakpoint;
}
