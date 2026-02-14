import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api/euromillions': {
        target: 'https://euromillions.api.pedromealha.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/euromillions/, ''),
        secure: false,
      },
      '/api/apiverve': {
        target: 'https://api.apiverve.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/apiverve/, ''),
        secure: false,
      },
    },
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
}));