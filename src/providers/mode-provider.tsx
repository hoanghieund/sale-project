import { useEffect } from "react";
import type { ReactNode } from "react";
import { useIsDarkMode } from "@/hooks/use-mode";

export function ModeProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useIsDarkMode();
  const mode = isDarkMode ? "dark" : "light";

  useEffect(() => {
    const rootElement = document.documentElement;

    // Update class names in the <html> tag
    rootElement.classList.remove("light", "dark");
    rootElement.classList.add(mode);
    
    // Save to localStorage for persistence
    localStorage.setItem('theme', mode);
  }, [mode]);

  return <>{children}</>;
}
