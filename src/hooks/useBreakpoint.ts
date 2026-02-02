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
    const mql = window.matchMedia(`(max-width: ${TABLET_MAX}px)`);
    const update = () => setBreakpoint(getBreakpoint());

    update();
    mql.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mql.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return breakpoint;
}
