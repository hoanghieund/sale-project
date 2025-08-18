import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Buộc Vite pre-bundle nuqs để tránh lỗi "Outdated Optimize Dep"
  optimizeDeps: {
    include: [
      "nuqs",
      "nuqs/adapters/react-router/v6", // adapter đang sử dụng
    ],
  },
}));
