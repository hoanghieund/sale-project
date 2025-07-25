import Providers from "@/providers";
import AppRouter from "@/router/AppRouter";
import { ReactPlugin } from '@21st-extension/react';
import { TwentyFirstToolbar } from '@21st-extension/toolbar-react';

const App = () => {
  // useEffect(() => {
  //   initPerformanceOptimizations();
  //   initSEO();
  // }, []);

  return (
    <Providers>
      <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />
      <AppRouter />
    </Providers>
  );
};

export default App;
