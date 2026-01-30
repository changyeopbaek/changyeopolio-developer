/**
 * Skills 태그 이름 → simple-icons slug + 브랜드 색상(hex)
 * CDN: https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/{slug}.svg
 */
const SIMPLE_ICONS_CDN = "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons";

/** slug → hex (simple-icons 브랜드 색상, # 제외) */
const SLUG_HEX: Record<string, string> = {
  javascript: "F7DF1E",
  typescript: "3178C6",
  html5: "E34F26",
  css3: "1572B6",
  react: "61DAFB",
  nextdotjs: "000000",
  reactquery: "FF4154",
  sass: "CC6699",
  tailwindcss: "06B6D4",
  git: "F05032",
  github: "181717",
  figma: "F24E1E",
  notion: "000000",
  slack: "4A154B",
  jira: "0052CC",
  vercel: "000000",
  netlify: "00C7B7",
  vite: "646CFF",
  bun: "FBF0DF",
};

export const SKILL_ICON_SLUGS: Record<string, string> = {
  "JavaScript(ES6+)": "javascript",
  JavaScript: "javascript",
  TypeScript: "typescript",
  HTML5: "html5",
  CSS3: "css3",
  React: "react",
  "Next.js": "nextdotjs",
  "React Query": "reactquery",
  Sass: "sass",
  "Tailwind CSS": "tailwindcss",
  Git: "git",
  GitHub: "github",
  Figma: "figma",
  Notion: "notion",
  Slack: "slack",
  Jira: "jira",
  Vercel: "vercel",
  Netlify: "netlify",
  Vite: "vite",
  Bun: "bun",
};

export function getSkillIconUrl(tagName: string): string | null {
  const slug = SKILL_ICON_SLUGS[tagName];
  if (!slug) return null;
  return `${SIMPLE_ICONS_CDN}/${slug}.svg`;
}

export function getSkillIconHex(tagName: string): string | null {
  const slug = SKILL_ICON_SLUGS[tagName];
  if (!slug) return null;
  const hex = SLUG_HEX[slug];
  return hex ? `#${hex}` : null;
}

/** url + hex 둘 다 있을 때만 사용 (아이콘 + 브랜드 색) */
export function getSkillIconInfo(
  tagName: string,
): { url: string; hex: string } | null {
  const slug = SKILL_ICON_SLUGS[tagName];
  if (!slug) return null;
  const hex = SLUG_HEX[slug];
  if (!hex) return null;
  return { url: `${SIMPLE_ICONS_CDN}/${slug}.svg`, hex: `#${hex}` };
}
