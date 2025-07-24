import { useEffect, useState } from "react";

export function useIsDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage first
    const savedMode = localStorage.getItem("theme");

    if (savedMode) {
      setIsDarkMode(savedMode === "dark");
    } else {
      // // Check system preference
      // const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      // setIsDarkMode(mediaQuery.matches);
      // // Listen for changes
      // const handler = (e: MediaQueryListEvent) => {
      //   setIsDarkMode(e.matches);
      // };
      // mediaQuery.addEventListener("change", handler);
      // return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  return isDarkMode;
}
