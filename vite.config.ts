import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  publicDir: "./../public",
  cacheDir: "./../.yarn/.vite",
  base: "./",
  build: {
    outDir: "./../dist",
  },
  plugins: [react(), tsconfigPaths(), svgr()],
});
