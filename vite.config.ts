import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/adopt_project/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  server: {
    proxy: {
      '/api': {
      	target: "http://apis.data.go.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      },
    },
  },
});
