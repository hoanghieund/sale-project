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
    </Providers>
  );
};

export default App;
