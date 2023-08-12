import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import macrosPlugin from "vite-plugin-babel-macros";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  publicDir: "./../public",
  base: "./",
  envDir: "./../",
  build: {
    outDir: "./../dist",
    rollupOptions: {
      output: {
        manualChunks: {
          "lottie-web": ["lottie-web"],
          firebase: ["firebase/analytics", "firebase/app"],
        },
      },
    },
  },
  plugins: [react(), tsconfigPaths(), svgr(), macrosPlugin()],
});
