import { useState, useEffect } from "react";

const SECTION_IDS = ["skills", "work", "career", "comments"] as const;
/** 헤더 아래 기준선(px) - 이 선이 속한 섹션이 활성 */
const ACTIVE_OFFSET = 120;

export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection(): SectionId | null {
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const check = () => {
      const y = ACTIVE_OFFSET;
      let current: SectionId | null = null;

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= y && rect.bottom >= y) {
          current = id;
          break;
        }
      }

      setActiveId((prev) => (prev !== current ? current : prev));
    };

    const onScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        check();
        rafId = null;
      });
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return activeId;
}
