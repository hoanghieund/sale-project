import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers";
import AppRouter from "@/router/AppRouter";

const App = () => {
  // useEffect(() => {
  //   initPerformanceOptimizations();
  //   initSEO();
  // }, []);

  return (
    <Providers>
      <AppRouter />
      <Toaster />
      <Sonner />
    </Providers>
  );
};

export default App;
