import { useState, useEffect } from "react";

type Mode = "developer" | "pm";

export const useMode = () => {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem("mode") as Mode;
    return saved || "developer";
  });

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => {
      if (prev === "developer") {
        setTimeout(() => {
          alert("리뉴얼된 PM 포트폴리오는 준비중입니다");
          setMode("developer");
        }, 0);
        return "pm";
      }
      return "developer";
    });
  };

  return { mode, toggleMode };
};
