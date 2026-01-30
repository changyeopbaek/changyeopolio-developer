export interface ProjectReferenceLink {
  label: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  image: string;
  /** 목업 이미지 Y축 크롭 위치 (object-position). 예: "30%", "50%", "top", "center" */
  imagePositionY?: string;
  tags: string[];
  serviceName?: string;
  fullDescription?: string;
  techStack?: string[];
  role?: string;
  retrospective?: string;
  referenceLinks?: ProjectReferenceLink[];
}

export const projectsList: Project[] = [
  {
    id: 1,
    title: "Market Karly",
    shortDescription: "마켓 컬리의 UI를 벤치마킹한 쇼핑 플랫폼",
    image: "/project1.png",
    tags: ["BOOTCAMP", "TEAM PJ"],
    serviceName: "Market Karly",
    fullDescription:
      "마켓 컬리 UI를 참고하여 구현한 쇼핑 플랫폼입니다. 상품 목록, 장바구니, 주문 플로우를 경험할 수 있습니다.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Netlify"],
    role: "Component: Input, Text, Table, Mobile \n Page: Product Detail",
    retrospective:
      "프로젝트를 하기 전에는 제 자신에 대해서 수많은 의구심이 들었었습니다. 팀원들과 잘 소통할 수 있을지, 제 자신에게 주어진 몫을 다 할 수 있을지 등 많은 걱정과 함께 시작했었지만 협업 경험이 있어 먼저 이끌어주는 사람과 그 사람의 말에 귀를 기울이고 적극적으로 참여하려는 팀원들을 만나게 되었고, 모르는 부분, 이해가 안 가는 부분, 파트 분배, 피드백 등 친절하게 대해주셨던 팀장 아래 모두가 같은 목표를 향해 달려가고 있는 모습을 보았습니다. 물론, 요구사항에 맞는 결과물을 내는 게 개발에 있어서 제일 중요하다고 생각하지만, 저는 이번 프로젝트를 협업에 첫 발을 내딛는 과정이라는 것에 의의를 두고 접근하였습니다. 저 뿐만이 아니라 팀원들도 과정을 거치면서 협업에 대한 프로세스와 책임감을 가짐으로써 앞으로 수없이 다가올 협업에 조금이라도 익숙해졌다고 생각하고 앞으로 있을 협업에 있어서도 더 나은 개발자로서 참여한다면 이번 UI 프로젝트에서 충분히 성공했다고 생각이 들 것 같습니다.",
    referenceLinks: [
      {
        label: "GitHub",
        url: "https://github.com/FRONTENDBOOTCAMP-14th/project-team-1",
      },
    ],
  },
  {
    id: 2,
    title: "타자의 세계",
    shortDescription:
      "사용자의 타자 실력을 기르면서 일상 단어와 개발 관련 단어까지 익힐 수 있는 재미있는 타자 게임 프로젝트",
    image: "/project2.png",
    tags: ["BOOTCAMP", "TEAM PJ"],
    serviceName: "타자의 세계",
    fullDescription:
      "부트캠프에서 2번째로 진행했던 바닐라 프로젝트입니다. \n 사용자의 타자 실력을 기르면서 일상 단어와 개발 관련 단어까지 익힐 수 있는 재미있는 학습 환경 구축을 위해 다양한 타자 게임을 제작했습니다 \n\n 일반 모드: 일반 상식 기반의 한글 단어 및 문제 \n개발자 모드: 개발 관련 단어 및 문제",
    techStack: ["JavaScript", "HTML5", "CSS3"],
    role: "Component: Button, Slider \n Common Page: Game Select \n Individual Page: Mole Game",
    retrospective:
      "일시정지 시 타이머는 멈췄지만, 두더지 등장 타이머는 계속 동작하거나 그대로 멈춰서 예상치 못한 타이밍 오류 발생하였었고, hideEndTime과 pauseRemain 변수를 사용하여 각 두더지의 등장 시간 상태를 저장하고 재개 시 그 시간만큼 다시 타임아웃을 설정하여 정확하게 두더지들이 복귀하도록 수정하였습니다. UI도 paused 클래스를 활용해서 화면 상태를 일관되게 유지할 수 있도록 하였습니다. \n\n 처음에는 두더지들이 랜덤 위치에서 등장하도록 구현했지만, 단어가 겹치거나 중복되는 문제가 발생하였고, getUniqueRandomWord 함수를 만들어, \n현재 화면에 표시되고 있는 단어들을 activeWords set으로 관리하며 중복 단어가 선택되지 않도록 처리하였습니다. 타이밍이 밀리면서 두더지 등장 \n이벤트가 꼬이는 문제는 setTimeout을 사용하여 등장 지연과 자동 숨김을 구현하고, 이를 moleTimers 배열로 관리하여 해결하였습니다. \n\n 이번 프로젝트를 하면서 느꼈던 부분은 기획 단계에서 확실히 잡고 나가야 한다는 것이었습니다. 기존의 서비스를 클로닝을 하는 게 아니라 컨셉을 정하고 \n 그에 맞는 디자인을 뽑아내서 구현해야 했기 때문에, 주어진 시간 내에서 소통을 통해 기획과 디자인을 했지만 다소 부족했던 부분이 있었다고 생각합니다. 컴포넌트 단계에서 유연하게 대처했을지라도, 복잡하게 얽혀있는 페이지들에서 문제가 생겼을 때 해결하는 과정이 더 힘겹게 느껴졌던 것 같습니다.",
    referenceLinks: [
      {
        label: "GitHub",
        url: "https://github.com/FRONTENDBOOTCAMP-14th/js-project-team-5",
      },
    ],
  },
  {
    id: 3,
    title: "Shuttlers 셔틀러스",
    shortDescription:
      "배드민턴 동호인들이 필요로 하는 모든 것을 해결할 수 있는 통합 플랫폼 서비스",
    image: "/project3.png",
    tags: ["BOOTCAMP", "TEAM PJ"],
    serviceName: "Shuttlers",
    fullDescription:
      "전국 곳곳에서 진행하는 배드민턴 대회들이 통합되지 않아 대회에 참여했을 때 실력의 불균형으로 인한 불쾌감, 정기적으로 만나는 모임을 제외하고 \n 일회성으로 운동을 하고 싶어 하는 동호인들이 이용할 수 있는 시스템의 필요성을 짚으면서 배드민턴 동호인들의 수요가 있는 기능인 대회 전적 검색, \n캘린더 기반 대회 검색, 데이터들을 2차 가공하여 통계화 및 분석 기능을 제공하는 배드민턴 동호인을 위한 통합 플랫폼입니다.",
    techStack: [
      "TypeScript",
      "Bun",
      "Next.js",
      "React",
      "Zustand",
      "React Hook Form",
      "Zod",
      "Vanila-extract",
      "supabase",
      "Vercel",
      "ESLint",
      "Prettier",
    ],
    role: "기획 \nIA, 와이어 프레임, 개요문서 \n\n 개발 \n Component: Textbox, Input, CardSection, ScoreResultCard \n Page: Landing, FindGroup \n\n 발표 \n 발표자료 제작(스크립트, 시연 영상) ",
    retrospective:
      "부트캠프 수료 전 마지막 파이널 프로젝트로 Shuttlers를 진행하면서 4주간의 긴 여정을 마무리했습니다. 평소 관심 있던 배드민턴 플랫폼 아이디어를 \n제안하고 팀원들의 호응을 얻어 채택되면서 기획부터 개발까지 전 과정을 주도적으로 경험했습니다. 최초 Supabase 도입으로 팀원이 작성한 API 명세서를 분석하며 DB 스키마를 직접 설계하고 실시간 데이터 연동을 구현해 봤고, Vanilla JS 대비 React로 체계적인 컴포넌트 구조와 상태 관리를 경험하며 개발 \n 효율이 크게 향상되었습니다. \n\n Vanilla-extract라는 새로운 CSS 스타일링 시스템도 익히며 CSS-in-JS와는 다른 타입 스크립트 기반 접근을 배웠습니다. 프론트엔드 개발자로서 기획 \n→ DB설계 → 프론트엔드 구현까지 연결되는 전체 흐름을 이해하게 되었지만, 상태 관리 패턴, 컴포넌트 설계 일관성, 성능 최적화 등 해결하지 못한 숙제가 \n여전히 많음을 깨달았습니다. Shuttlers는 개발자로서의 방향성을 재확인하고 앞으로 나아가야 할 길을 명확히 보여준 소중한 경험이었습니다.",
    referenceLinks: [
      {
        label: "GitHub",
        url: "https://github.com/FRONTENDBOOTCAMP-14th/shuttlers.gg",
      },
    ],
  },
  {
    id: 4,
    title: "GameMatcher",
    shortDescription: "배드민턴 동호인을 위한 게임 매칭 서비스",
    image: "/project4.png",
    tags: ["INDIVIDUAL PJ"],
    serviceName: "GameMatcher",
    fullDescription:
      " 미리 참가자 리스트, 코트 수, 운동 시간 등 매칭 미리 원하는 조건에 맞게 매칭 설정을 작성하면 참가자별 게임 수, 중복 매치업 방지, 균형 잡힌 매치업 까지 자동으로 처리해 주는 게임 매칭 서비스입니다. ",
    techStack: ["TypeScript", "React", "Vite", "CSS", "npm"],
    role: "기획, 개발",
    retrospective:
      "가장 큰 도전은 여러 요구사항이 서로 충돌한다는 점이었다. 전체 경기 수 대비 혼복 비율 20% 유지, 참가자별 게임 수 균등화(최대 1경기 차이), 파트너 \n중복 최소화, 등급 밸런스 등 모든 조건을 동시에 만족시키는 것은 단순한 if-else 로직으로는 불가능하다는 것을 깨닫았습니다. 하나를 엄격히 지키면 \n다른 하나가 무너지는 트레이드오프가 계속 발생하여 딜레마에 빠질 수 밖에 없었습니다. \n\n그래서 저는 완벽한 해결책보다는 우선순위 기반의 유연한 접근 방법을 채택해서 필터를 점진적으로 완화하고, 정렬 로직에서 우선순위를 명확히 하니 \n 효과적이었습니다. \n\n '경기 배정'이라는 것이 얼핏 보면 단순해 보이지만, 실제로는 조합들의 대환장 파티였습니다. 12명의 남자와 5명의 여자로 가능한 팀 조합, 그 팀들 간의 \n경기 조합, 라운드별 코트 배정까지 고려하면 경우의 수가 기하급수적으로 늘어나는 것을 볼 수 있었습니다.  이 프로젝트는 제약 조건 만족 문제(CSP)와 \n최적화 문제가 결합된 도전으로, 우선순위를 명확히 하고 유연하게 대응하는 설계가 실용적인 해결책임을 배웠습니다.",
    referenceLinks: [
      {
        label: "GitHub",
        url: "https://github.com/changyeopbaek/gameMatcher",
      },
    ],
  },
  {
    id: 5,
    title: "BTY GOLF ACADEMY",
    shortDescription: "BTY 골프 아카데미 · 프로 관리 시스템",
    image: "/project5.png",
    tags: ["OUTSOURCING"],
    serviceName: "BTY GOLF ACADEMY",
    fullDescription:
      "주니어·엘리트 골퍼를 위한 골프 아카데미의 공식 웹사이트와 회원·코치·관리자용 관리 시스템을 하나의 SPA로 제공하는 프로젝트입니다",
    techStack: ["React 19", "Vite 7", "React Router", "Tailwind CSS", "ESLint"],
    role: "웹사이트 UI·반응형 / 성능·로딩 / 훅·유틸 보강 / 품질·문서 개선",
    retrospective:
      "처음으로 돈을 받고 웹사이트를 제작할 기회가 생겨서 더 꼼꼼하고 완성도 있는 결과물을 만들고 싶었고, 제작했던 페이지들에 이미지가 많이 담겨있다\n보니 이미지 성능에 대해서 많이 공부하고 배우게 되었던 것 같습니다. loading/fetchPriority/preload와 브라우저 캐시를 함께 고려헤야 했고, React\n상태만으로는 한번 받은 이미지 다시 안받기를 보장하기 어렵다는 것도 경험하였습니다. \n\n 애니메이션 부분에서도 CSS의 transition만 믿고 인덱스를 바꾸면 무한 루프에서 한 프레임 점프가 발생하므로, transitioned로 시각적 전환이 끝난 뒤 인덱스를 맞추는 방식이 필요하다는 것도 느꼈습니다. \n\n 여태 부트캠프에서 진행했던 프로젝트·개인적으로 했던 프로젝트·지인과 함께하는 프로젝트들만 해왔다보니 실제로 대금을 지급받고 용역을 제공한 경험이 처음이다보니 더 잘하고 싶었고, 성능적인 부분에서 개인적으로 아쉬웠던 점이 많이 남는 것 같습니다. ",
    referenceLinks: [],
  },
  {
    id: 6,
    title: "RallyOn",
    shortDescription: "배드민턴 동호인을 위한 개인 맞춤 통합 플랫폼",
    image: "/comingsoon.png",
    tags: ["TEAM PJ"],
    serviceName: "RallyOn",
    fullDescription: "기획중입니다.",
    techStack: [],
    role: "",
    retrospective: "",
    referenceLinks: [],
  },
  {
    id: 7,
    title: "Untitled",
    shortDescription: "방송 출연자 의상, 액세서리 정보 제공 서비스",
    image: "/comingsoon.png",
    tags: ["INDIVIDUAL PJ"],
    serviceName: "Untitled",
    fullDescription: "기획중입니다.",
    techStack: [],
    role: "",
    retrospective: "",
    referenceLinks: [],
  },
];

export function getProjectById(id: number): Project | undefined {
  return projectsList.find((p) => p.id === id);
}

/** 이전/다음 프로젝트 id. 첫 프로젝트의 이전 = 마지막, 마지막의 다음 = 첫 프로젝트(순환) */
export function getPrevNextProjectIds(currentId: number): {
  prevId: number | null;
  nextId: number | null;
} {
  const index = projectsList.findIndex((p) => p.id === currentId);
  if (index === -1 || projectsList.length === 0)
    return { prevId: null, nextId: null };
  const n = projectsList.length;
  const prevIndex = index === 0 ? n - 1 : index - 1;
  const nextIndex = index === n - 1 ? 0 : index + 1;
  return {
    prevId: projectsList[prevIndex].id,
    nextId: projectsList[nextIndex].id,
  };
}
