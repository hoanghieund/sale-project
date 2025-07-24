import Providers from "@/providers";
import AppRouter from "@/router/AppRouter";
import { useEffect } from "react";
import { initPerformanceOptimizations } from "./utils/performance";
import { initSEO } from "./utils/seo";

const App = () => {
  useEffect(() => {
    initPerformanceOptimizations();
    initSEO();
  }, []);

  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};

export default App;
